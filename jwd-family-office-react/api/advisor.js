/**
 * JWD AI Advisor — Vercel Edge Function.
 * Port of the main site's /api/advisor route: Groq (openai/gpt-oss-120b),
 * streamed SSE as `data:{"text":...}` events, with the same input guards.
 * Requires GROQ_API_KEY in the Vercel project environment.
 */
export const config = { runtime: 'edge' };

import { KNOWLEDGE_BASE } from '../shared/knowledge-base.js';

const MAX_MESSAGES = 40;
const MAX_MSG_CHARS = 4000;
const VALID_ROLES = new Set(['user', 'assistant']);

function buildSystemPrompt() {
  return `You are the JWD Family Office AI Advisor — a knowledgeable, friendly, professional wealth-preservation consultant for JWD (Japan WorldLink DWC-LLC), the Dubai-based family office serving Japan's affluent families.

## YOUR ROLE
- You help wealthy Japanese families and business owners understand how to protect and transfer their wealth across generations — inheritance planning, tax strategy, Dubai structures, real estate, relocation.
- You are bilingual: respond in the SAME LANGUAGE the user writes in (Japanese or English). If they mix, default to the locale provided.
- Warm but professional tone — a trusted advisor over coffee, not a corporate robot.

## YOUR KNOWLEDGE BASE
Ground ALL answers in this data. Do NOT invent properties, yields, tax rates or facts not present here.

${KNOWLEDGE_BASE}

## RESPONSE GUIDELINES
- Match answer depth to the question: greetings/simple lookups → 1-3 sentences; genuine analysis/comparison/planning questions → ~300-600 words with a bold lead line and "-" bullets. Never pad.
- Read intent through typos/mixed language; never nitpick spelling.
- NEVER use Markdown tables (narrow chat) — one bullet per option with figures inline.
- Show worked figures where relevant (e.g. "55% on ¥10億 ≈ ¥3.5億 with 3 heirs").
- NEVER give personalised financial or tax advice — for tailored guidance say: "For advice tailored to your situation, book a consultation with Tomo Kawana."
- Format numbers clearly: AED 1,850,000 / ¥75,850,000 / 6.8%.`;
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
  }
  const GROQ_API_KEY = process.env.GROQ_API_KEY ?? '';
  if (!GROQ_API_KEY) {
    return Response.json(
      { error: 'AI advisor is not configured. Please set GROQ_API_KEY in your environment.' },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { messages, locale } = body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'Messages are required.' }, { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return Response.json({ error: 'Too many messages. Please start a new session.' }, { status: 400 });
  }
  const safeMessages = messages
    .filter((m) => m && typeof m.role === 'string' && VALID_ROLES.has(m.role)
      && typeof m.content === 'string' && m.content.trim().length > 0)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MSG_CHARS) }));
  if (safeMessages.length === 0) {
    return Response.json({ error: 'No valid messages.' }, { status: 400 });
  }

  const localeHint = locale === 'ja'
    ? '\n\nThe user is viewing the Japanese version of the site. Default to Japanese unless they write in English.'
    : '\n\nThe user is viewing the English version of the site. Default to English unless they write in Japanese.';

  const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: buildSystemPrompt() + localeHint },
        ...safeMessages,
      ],
      temperature: 0.6,
      max_completion_tokens: 4096,
      reasoning_effort: 'medium',
      reasoning_format: 'hidden',
      stream: true,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    let detail = '';
    try { detail = await upstream.text(); } catch { /* ignore */ }
    console.error('Advisor upstream error:', upstream.status, detail.slice(0, 400));
    return Response.json({ error: 'The advisor hit a problem. Please try again.' }, { status: 502 });
  }

  // Transform Groq's OpenAI-style SSE into the app's `data:{"text"}` events.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buf = '';
  const readable = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop() ?? '';
          for (const line of lines) {
            const s = line.trim();
            if (!s.startsWith('data:')) continue;
            const data = s.slice(5).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const text = parsed.choices?.[0]?.delta?.content ?? '';
              if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            } catch { /* partial chunk — ignore */ }
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        console.error('Advisor stream error:', err);
        controller.enqueue(encoder.encode(
          `data: ${JSON.stringify({ error: 'The advisor hit a problem. Please try again.' })}\n\n`,
        ));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
