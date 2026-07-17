import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));

/** GROQ key for LOCAL runs: env var, or reuse the main site's .env.local. */
function localGroqKey() {
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
  try {
    const env = readFileSync(resolve(__dir, '../jwd-web/.env.local'), 'utf8');
    const m = env.match(/^GROQ_API_KEY=(.+)$/m);
    return m ? m[1].trim() : '';
  } catch {
    return '';
  }
}

/**
 * Local /api/advisor for `vite dev` and `vite preview` (Vercel runs the real
 * edge function in api/advisor.js in production). Non-streaming upstream call,
 * answered in the same SSE format the ChatPanel expects.
 */
function advisorDevApi() {
  const handler = async (req, res, next) => {
    if (!req.url?.startsWith('/api/advisor') || req.method !== 'POST') return next();
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', async () => {
      try {
        const key = localGroqKey();
        if (!key) {
          res.statusCode = 503;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'AI advisor is not configured (GROQ_API_KEY missing).' }));
          return;
        }
        const { messages, locale } = JSON.parse(raw || '{}');
        const { KNOWLEDGE_BASE } = await import('./shared/knowledge-base.js');
        const system = `You are the JWD Family Office AI Advisor for Japan WorldLink DWC-LLC. Respond in the user's language (locale: ${locale}). Ground answers ONLY in this knowledge base; short questions get short answers; no Markdown tables; never give personalised financial advice — refer to a consultation with Tomo Kawana.\n\n${KNOWLEDGE_BASE}`;
        const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: [{ role: 'system', content: system }, ...(messages ?? [])],
            temperature: 0.6,
            max_completion_tokens: 4096,
            reasoning_effort: 'medium',
            reasoning_format: 'hidden',
          }),
        });
        const data = await upstream.json();
        const text = data.choices?.[0]?.message?.content ?? '';
        res.setHeader('Content-Type', 'text/event-stream');
        res.end(`data: ${JSON.stringify({ text })}\n\ndata: [DONE]\n\n`);
      } catch (err) {
        console.error('advisor dev api:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'The advisor hit a problem. Please try again.' }));
      }
    });
  };
  return {
    name: 'advisor-dev-api',
    configureServer(server) { server.middlewares.use(handler); },
    configurePreviewServer(server) { server.middlewares.use(handler); },
  };
}

export default defineConfig({
  plugins: [react(), advisorDevApi()],
});
