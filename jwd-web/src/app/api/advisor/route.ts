import Groq from 'groq-sdk';
import { buildKnowledgeBase } from '@/lib/knowledge-base';

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? '';

// ── Input limits (cost-abuse / prompt-injection defence) ──
const MAX_MESSAGES = 40; // conversation turns accepted per request
const MAX_MSG_CHARS = 4000; // per-message content cap (token-cost guard)
const VALID_ROLES = new Set(['user', 'assistant']); // never trust 'system' from a client

// ── Best-effort per-IP rate limit ──
// NOTE: in-memory, so on serverless this throttles per warm instance rather than
// globally, and resets on cold start. It blunts casual scripted abuse with zero
// infra; for a hard guarantee, back it with Upstash/Vercel KV.
const RATE_LIMIT = 15; // requests…
const RATE_WINDOW_MS = 60_000; // …per minute, per IP
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Returns null if allowed, or seconds-to-retry if the IP is over the limit. */
function rateLimited(ip: string): number | null {
  const now = Date.now();
  if (hits.size > 5000) {
    // opportunistic sweep so the map can't grow unbounded
    for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
  }
  const e = hits.get(ip);
  if (!e || now > e.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return null;
  }
  if (e.count >= RATE_LIMIT) return Math.ceil((e.resetAt - now) / 1000);
  e.count++;
  return null;
}

/**
 * Build the system prompt around a freshly-compiled knowledge base. The KB is
 * rebuilt per request (not frozen at cold start) so live FX and DLD-based
 * property figures stay current — and upgrade themselves when paid real-time
 * feeds are connected, with no change here.
 */
function buildSystemPrompt(knowledgeBase: string): string {
  return `You are the JWD Group AI Investment Advisor — a knowledgeable, friendly, and professional real estate investment consultant for JWD Group (Japan WorldLink DWC), the bridge between Japan and Dubai real estate and wealth creation.

## YOUR ROLE
- You help investors (primarily Japanese) understand Dubai and Japan real estate investment opportunities.
- You speak with confidence and authority, grounded in JWD's actual data and Tomo Kawana's first-hand experience.
- You are bilingual: respond in the SAME LANGUAGE the user writes in (Japanese or English). If they mix, default to the locale provided.
- You use a warm but professional tone — like a trusted advisor over coffee, not a corporate robot.

## YOUR KNOWLEDGE BASE
Below is everything you know about JWD, their properties, services, market data, and investment information. Ground ALL your answers in this data. Do NOT make up properties, yields, or facts not in this knowledge base.

${knowledgeBase}

## RESPONSE GUIDELINES — MATCH THE DEPTH TO THE QUESTION
Read the user's intent first and size your answer to it. Do NOT pad. Short questions get short answers; only genuine analysis questions get the long treatment. When unsure, lean SHORTER.

### A) SHORT answers — 1–3 sentences, no headers, no CTA padding — for:
- Greetings / small talk ("hi", "what's good", "thanks") → a warm one-liner and a quick offer to help. Do NOT explain what JWD is unless asked.
- Navigation / "take me to X" / "where is Y" → just point them with the link and stop. e.g. "Sure — here's our Dubai Properties page: {dubai-properties link}."
- Simple factual lookups (one figure, a yes/no, a definition) → answer in a sentence or two.

### B) DETAILED analysis — only when the user actually asks for analysis, a comparison, planning, or "should I…":
(e.g. evaluating a property, Dubai vs Japan, "I have ¥X to invest", questions about yield/ROI/IRR/tax). Aim for ~300–600 words, and only as long as the question needs:
- **Direct answer first**, then sections with bold headers / bullets.
- **Worked figures** — compute the consequence, not just the rate (e.g. "6.8% on AED 1,850,000 ≈ AED 125,800/yr; net after ~25% costs ≈ AED 94,000"). Show AED↔JPY using the LIVE rate, plus projections/ROI where relevant.
- **Scenarios / comparison**, then **risks AND hedges**, then **assumptions** (flag modelled vs. live data).
- Close with ONE concrete next step (book a consultation / try the Simulator / open the relevant page).

### Always:
1. Ground everything in the knowledge base + LIVE DATA SNAPSHOT. Never invent numbers; if a figure isn't there, say so. Convert AED↔JPY only with the live rate.
2. NEVER give personalised financial advice — for a tailored recommendation say: "For advice tailored to your situation, book a consultation with Tomo Kawana." (Don't bolt this onto greetings or simple link replies.)
3. Match the user's language (Japanese or English). Be balanced on Dubai vs Japan.
4. Links: Japanese users get bare paths (e.g. /dubai-properties); English users get /en-prefixed paths (e.g. /en/dubai-properties). Useful pages: dubai-properties, simulator, heart-of-europe, why-dubai, funds, family-office, japan-properties, contact.
5. Format numbers clearly: AED 1,850,000 / ¥75,850,000 / 6.8%.`;
}

export async function POST(request: Request) {
  if (!GROQ_API_KEY) {
    return Response.json(
      {
        error:
          'AI advisor is not configured. Please set GROQ_API_KEY in your environment.',
      },
      { status: 503 }
    );
  }

  // Per-IP rate limit before doing any work (protects the Groq budget).
  const retry = rateLimited(clientIp(request));
  if (retry !== null) {
    return Response.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(retry) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const { messages, locale } = (body ?? {}) as {
      messages?: unknown;
      locale?: string;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages are required.' }, { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return Response.json(
        { error: 'Too many messages. Please start a new session.' },
        { status: 400 }
      );
    }

    // Trust only well-formed user/assistant turns. Drop any injected roles
    // (e.g. 'system') and clamp each message's length to bound token cost.
    const safeMessages = (messages as { role?: unknown; content?: unknown }[])
      .filter(
        (m): m is { role: 'user' | 'assistant'; content: string } =>
          !!m &&
          typeof m.role === 'string' &&
          VALID_ROLES.has(m.role) &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MSG_CHARS) }));

    if (safeMessages.length === 0) {
      return Response.json({ error: 'No valid messages.' }, { status: 400 });
    }

    const groq = new Groq({ apiKey: GROQ_API_KEY });

    // Compile a FRESH knowledge base per request so live data stays current.
    const knowledgeBase = await buildKnowledgeBase();

    // Add locale hint to the system instruction
    const localeHint =
      locale === 'ja'
        ? '\n\nThe user is viewing the Japanese version of the site. Default to Japanese unless they write in English.'
        : '\n\nThe user is viewing the English version of the site. Default to English unless they write in Japanese.';

    const stream = await groq.chat.completions.create({
      // gpt-oss-120b: a current 120B reasoning model — far deeper analysis than
      // the (now-deprecated) llama-3.1-8b-instant. reasoning_format 'hidden'
      // keeps its scratchpad out of the streamed answer; we only show the prose.
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: buildSystemPrompt(knowledgeBase) + localeHint },
        ...safeMessages,
      ],
      temperature: 0.6,
      max_completion_tokens: 4096, // headroom for reasoning + a detailed reply
      reasoning_effort: 'medium',
      reasoning_format: 'hidden',
      stream: true,
    });

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? '';
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          // Log details server-side; never leak internals to the client.
          console.error('Advisor stream error:', err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'The advisor hit a problem. Please try again.' })}\n\n`
            )
          );
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
  } catch (err) {
    // Log the real error; return a generic message so we don't leak internals.
    console.error('Advisor API error:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
