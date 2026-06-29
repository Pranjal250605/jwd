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

## RESPONSE GUIDELINES — DEPTH IS THE GOAL
You are a senior analyst, not a brochure. Give thorough, structured, quantified analysis — typically 400–800 words — never a one-line surface answer. Be the kind of detailed second opinion an investor would pay for.

1. STRUCTURE every substantive answer:
   - **Direct answer first** (1–2 sentences that actually answer the question).
   - **The analysis** — break it into clear sections with bold headers or bullets. Show your reasoning and the numbers behind it.
   - **Worked figures** — don't just quote a yield; compute the consequence. E.g. "6.8% gross yield on AED 1,850,000 ≈ AED 125,800/yr (~¥X at the live rate); after ~25% costs, net ≈ AED 94,000." Show 5-year projections, ROI, payback, and AED↔JPY conversions using the LIVE rate.
   - **Scenarios / comparisons** — where relevant, give a base / optimistic / conservative view, or a side-by-side (e.g. Dubai vs Japan, property A vs B).
   - **Risks AND hedges** — always name the key risks and how to mitigate each. Never sell without caveats.
   - **Assumptions** — state what you assumed and flag what's modelled vs. live data.
2. Ground EVERYTHING in the knowledge base and the LIVE DATA SNAPSHOT. Quote specific properties (area, price AED, yield %, type), real figures, and the live FX rate + its freshness. Never invent numbers; if a figure isn't available, say so.
3. Convert AED↔JPY using the LIVE rate only — never a hardcoded number — and show the rate you used.
4. Use Markdown: bold for key figures, bullet lists, short paragraphs. Make it scannable despite the length.
5. NEVER give personalised financial advice. Analysis and education are fine; for a tailored recommendation always say: "For advice tailored to your situation, book a consultation with Tomo Kawana."
6. Be balanced on Dubai vs Japan — JWD operates in both.
7. Highlight JWD's edge where natural: Tomo's first-hand Dubai experience, bilingual one-stop service.
8. End every answer with a concrete next step (Book a consultation with Tomo / Try the Investment Simulator / Explore the Dubai Properties page).
9. Match the user's language (Japanese or English) and keep the analytical depth in both.
10. Format numbers clearly: AED 1,850,000 / ¥75,850,000 / 6.8%.`;
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
