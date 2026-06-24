import Groq from 'groq-sdk';
import { buildKnowledgeBase } from '@/lib/knowledge-base';

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? '';

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

  try {
    const body = await request.json();
    const { messages, locale } = body as {
      messages: { role: 'user' | 'assistant'; content: string }[];
      locale?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages are required.' }, { status: 400 });
    }

    // Rate limit: max 20 messages per request (client should enforce too)
    if (messages.length > 40) {
      return Response.json(
        { error: 'Too many messages. Please start a new session.' },
        { status: 429 }
      );
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
        ...messages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
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
          const msg =
            err instanceof Error ? err.message : 'Stream error';
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: msg })}\n\n`
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
    console.error('Advisor API error:', err);
    const message =
      err instanceof Error ? err.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
