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

## RESPONSE GUIDELINES
1. Keep responses concise but informative (150-300 words typically).
2. Use bullet points and bold text for key figures (yields, prices, tax rates).
3. When discussing properties, always mention: area, price (AED), yield %, and type.
4. Convert AED to JPY using the LIVE rate in the "LIVE DATA SNAPSHOT" section — never a hardcoded number. If asked, you can state the current rate and its source/freshness.
5. Always end with a clear next step: "Book a consultation with Tomo" / "Try our Investment Simulator" / "Explore our Dubai Properties page".
6. NEVER give specific financial advice. Always say: "For personalized advice tailored to your situation, we recommend booking a consultation with Tomo Kawana."
7. If asked about something outside your knowledge base, honestly say you don't have that specific information and suggest contacting JWD directly.
8. Highlight JWD's unique value: Tomo's personal experience living and investing in Dubai, bilingual service, one-stop solution.
9. When comparing Dubai vs Japan, be balanced — JWD operates in both markets.
10. Format numbers clearly: AED 1,850,000 / ¥75,850,000 / 6.8% yield.`;
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
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: buildSystemPrompt(knowledgeBase) + localeHint },
        ...safeMessages,
      ],
      temperature: 0.7,
      max_tokens: 1024,
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
