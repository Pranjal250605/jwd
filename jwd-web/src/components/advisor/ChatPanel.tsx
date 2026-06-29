'use client';

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Mic, Volume2, VolumeX } from 'lucide-react';

// ── In-chat navigation: the model can emit [[GOTO:/path]] to route the user. ──
// We validate against this allowlist so a prompt-injected directive can never
// send anyone to an arbitrary or external URL.
const NAV_ALLOW = [
  '/', '/dubai-properties', '/simulator', '/heart-of-europe', '/why-dubai',
  '/funds', '/family-office', '/japan-properties', '/knowledge', '/stories',
  '/consulting', '/contact', '/about', '/news', '/advisor',
];
function allowedNavPath(p: string): boolean {
  if (!p.startsWith('/') || p.startsWith('//')) return false; // internal only
  return NAV_ALLOW.some((a) => p === a || (a !== '/' && p.startsWith(a + '/')));
}
/** Hide the directive (and any partial one mid-stream) from the shown text. */
function stripDirectives(text: string): string {
  return text
    .replace(/\[\[GOTO:[^\]]*\]\]/g, '')
    .replace(/\[\[[^\]]*$/g, '')
    .trimEnd();
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// ── Web Speech API typings (not in the standard DOM lib) ──
interface SpeechAlt { transcript: string }
interface SpeechResult { 0: SpeechAlt; isFinal: boolean }
interface SpeechResultList { length: number; [i: number]: SpeechResult }
interface SpeechEvent { resultIndex: number; results: SpeechResultList }
interface SpeechRecognizer {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type SpeechRecognizerCtor = new () => SpeechRecognizer;

function getRecognizerCtor(): SpeechRecognizerCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognizerCtor;
    webkitSpeechRecognition?: SpeechRecognizerCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Flatten markdown to plain prose so the text-to-speech voice reads cleanly. */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/^[-•]\s*/gm, '')
    .replace(/\n{2,}/g, '. ')
    .trim();
}

const MAX_MESSAGES = 20;
// Persist the conversation for the browser session so closing/reopening the
// widget (which unmounts this panel) doesn't wipe the chat.
const STORAGE_KEY = 'jwd-advisor-history';

const SUGGESTIONS_EN = [
  'Dubai rental yields?',
  'Golden Visa guide',
  'I have ¥100M to invest',
  'Heart of Europe project',
  'Dubai vs Japan comparison',
];

const SUGGESTIONS_JA = [
  'ドバイの利回りは？',
  'ゴールデンビザについて',
  '1億円の投資先は？',
  'ハート・オブ・ヨーロッパとは？',
  'ドバイvs日本の比較',
];

/** Minimal markdown-ish rendering: bold, bullets, line breaks. */
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={j} className="font-semibold text-sumi">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    // Bullet point
    if (line.startsWith('- ') || line.startsWith('• ')) {
      return (
        <div key={i} className="flex gap-2 pl-1">
          <span className="text-gold mt-0.5 shrink-0">•</span>
          <span>{parts.slice(0, 1)}{parts.slice(1).map((p, k) =>
            typeof p === 'string' ? p.replace(/^[-•]\s*/, '') : p
          )}</span>
        </div>
      );
    }

    // Empty line → spacing
    if (line.trim() === '') {
      return <div key={i} className="h-2" />;
    }

    return (
      <p key={i} className="leading-relaxed">
        {parts}
      </p>
    );
  });
}

export function ChatPanel({
  fullPage = false,
  className = '',
}: {
  fullPage?: boolean;
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations('advisor');
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  // Voice: input (speech-to-text) + output (text-to-speech). Both browser-native.
  const [listening, setListening] = useState(false);
  const [ttsOn, setTtsOn] = useState(false);
  const [voiceInOk, setVoiceInOk] = useState(false);
  const [voiceOutOk, setVoiceOutOk] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const ja = locale === 'ja';

  const suggestions = ja ? SUGGESTIONS_JA : SUGGESTIONS_EN;
  const userCount = messages.filter((m) => m.role === 'user').length;
  const limitReached = userCount >= MAX_MESSAGES;

  // Feature-detect voice support on the client (avoids hydration mismatch).
  useEffect(() => {
    setVoiceInOk(!!getRecognizerCtor());
    setVoiceOutOk('speechSynthesis' in window);
  }, []);

  // Stop any speech / mic when the panel unmounts.
  useEffect(
    () => () => {
      recognizerRef.current?.abort();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    },
    []
  );

  /** Speak text aloud in the active locale (stops any prior utterance). */
  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const clean = stripMarkdown(text);
      if (!clean) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = ja ? 'ja-JP' : 'en-US';
      window.speechSynthesis.speak(u);
    },
    [ja]
  );

  // Restore any prior conversation once, on mount (drops empty placeholder
  // bubbles left behind if the panel was closed mid-stream).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Message[];
      const clean = Array.isArray(saved)
        ? saved.filter((m) => m.role === 'user' || m.content)
        : [];
      if (clean.length) setMessages(clean);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Persist the conversation whenever it changes.
  useEffect(() => {
    try {
      if (messages.length) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [messages]);

  // Auto-scroll to bottom (instant — no smooth animation to fight the stream).
  // Also re-runs when streaming/limit state flips, since the post-answer
  // suggestion chips and limit notice render *after* the last message and would
  // otherwise be cut off below the fold; an rAF lets layout settle first.
  useEffect(() => {
    const pin = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    pin();
    const id = requestAnimationFrame(pin);
    return () => cancelAnimationFrame(id);
  }, [messages, streaming, limitReached]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming || limitReached) return;
      setError('');
      // Stop any speech still playing from the previous reply.
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: text.trim(),
      };

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: '',
      };

      const updated = [...messages, userMsg];
      setMessages([...updated, assistantMsg]);
      setInput('');
      setStreaming(true);

      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const res = await fetch('/api/advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updated.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            locale,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Server error (${res.status})`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No response stream');

        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.text) {
                  accumulated += parsed.text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsg.id
                        ? { ...m, content: stripDirectives(accumulated) }
                        : m
                    )
                  );
                }
              } catch (e) {
                if (e instanceof SyntaxError) continue; // skip malformed chunks
                throw e;
              }
            }
          }
        }

        const finalText = stripDirectives(accumulated);
        const goto = accumulated.match(/\[\[GOTO:\s*([^\]\s]+)\s*\]\]/);
        const willNavigate = !!(goto && allowedNavPath(goto[1]));

        // Guard against a rare empty reply: show a gentle fallback, not a blank
        // bubble. (Skip if we're navigating away — empty text is fine then.)
        if (!finalText && !willNavigate) {
          const fallback = ja
            ? '申し訳ありません、うまく理解できませんでした。別の言い方で試していただけますか？'
            : "Sorry, I didn't quite catch that — could you rephrase?";
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: fallback } : m))
          );
          if (ttsOn) speak(fallback);
        } else if (ttsOn && finalText) {
          speak(finalText);
        }

        // Honour an in-chat navigation directive, if present and allowlisted.
        if (willNavigate) {
          const path = goto![1];
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('advisor-close'));
            router.push(path);
          }, 700);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        const msg =
          err instanceof Error ? err.message : 'Something went wrong';
        setError(msg);
        // Remove the empty assistant message on error
        setMessages((prev) =>
          prev.filter((m) => m.id !== assistantMsg.id)
        );
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming, limitReached, locale, ttsOn, speak, router]
  );

  /** Toggle voice input. Fills the box live and auto-sends the final transcript. */
  const toggleMic = useCallback(() => {
    if (listening) {
      recognizerRef.current?.stop();
      return;
    }
    const Ctor = getRecognizerCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    recognizerRef.current = rec;
    rec.lang = ja ? 'ja-JP' : 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    let finalText = '';
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      setInput(finalText + interim);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => {
      setListening(false);
      const text = finalText.trim();
      if (text) sendMessage(text);
    };
    setListening(true);
    rec.start();
  }, [listening, ja, sendMessage]);

  /** Toggle voice output; turning it off silences any in-progress speech. */
  const toggleTts = useCallback(() => {
    setTtsOn((on) => {
      if (on && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return !on;
    });
  }, []);

  /** Clear the conversation and stored history; stop any stream/voice. */
  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    recognizerRef.current?.abort();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setListening(false);
    setStreaming(false);
    setMessages([]);
    setInput('');
    setError('');
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  // Any "New chat" button (widget header / advisor sidebar) resets this panel.
  useEffect(() => {
    const handler = () => resetChat();
    window.addEventListener('advisor-new-chat', handler);
    return () => window.removeEventListener('advisor-new-chat', handler);
  }, [resetChat]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (text: string) => {
    sendMessage(text);
  };

  const msgVariants = {
    initial: { opacity: 0, y: 16, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div
      className={`flex flex-col ${
        fullPage ? 'h-[calc(100vh-5rem)]' : 'h-full'
      } ${className}`}
    >
      {/* Messages */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-4"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#9a7b2d33 transparent' }}
      >
        {/* Welcome / empty state */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center pt-8 pb-4"
          >
            {/* AI Avatar */}
            <div className="w-14 h-14 rounded-full bg-sumi flex items-center justify-center mb-5">
              <span className="text-gold font-jp text-xl font-bold">金</span>
            </div>

            <h3 className="font-jp text-lg font-bold text-sumi mb-2">
              {t('title')}
            </h3>
            <p className="text-sm text-sumi-soft/80 max-w-xs leading-relaxed mb-6">
              {t('intro')}
            </p>

            {/* Suggestion chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="rounded-full border border-sumi/10 bg-washi px-3.5 py-1.5 text-[11px] text-sumi-soft transition-all duration-300 hover:border-gold/40 hover:text-gold hover:bg-gold/5"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Message bubbles */}
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={msgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-sumi flex items-center justify-center mr-2 mt-1 shrink-0">
                  <span className="text-gold text-[10px] font-jp font-bold">金</span>
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-sumi text-washi rounded-br-md'
                    : 'bg-washi-deep text-sumi border border-sumi/5 rounded-bl-md'
                }`}
              >
                {msg.role === 'assistant' ? (
                  msg.content ? (
                    <div className="space-y-1">
                      {renderMarkdown(msg.content)}
                    </div>
                  ) : (
                    <ThinkingDots />
                  )
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Post-response suggestions */}
        {messages.length > 0 &&
          !streaming &&
          !limitReached &&
          messages[messages.length - 1]?.role === 'assistant' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap gap-1.5 pl-9"
            >
              {suggestions.slice(0, 3).map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="rounded-full border border-sumi/8 px-3 py-1 text-[10px] text-sumi-soft/70 transition-all duration-300 hover:border-gold/40 hover:text-gold"
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-xs rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600"
          >
            {error}
          </motion.div>
        )}

        {/* Limit reached */}
        {limitReached && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-xs rounded-lg border border-gold/20 bg-gold/5 px-4 py-3 text-center text-xs text-sumi-soft"
          >
            <p className="mb-2">{t('limit')}</p>
            <a
              href={`/${locale}/contact`}
              className="inline-block rounded-full bg-sumi px-4 py-1.5 text-[10px] uppercase tracking-widest text-washi transition-colors hover:bg-gold"
            >
              {t('cta')}
            </a>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-sumi/8 bg-washi px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {voiceInOk && (
            <button
              type="button"
              onClick={toggleMic}
              disabled={streaming || limitReached}
              aria-label={ja ? '音声入力' : 'Voice input'}
              title={ja ? '話して入力' : 'Speak your question'}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 disabled:opacity-30 ${
                listening
                  ? 'border-red-400 bg-red-50 text-red-500 animate-pulse'
                  : 'border-sumi/10 bg-washi-deep/50 text-sumi-soft hover:border-gold/40 hover:text-gold'
              }`}
            >
              <Mic className="h-4 w-4" strokeWidth={1.8} />
            </button>
          )}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? (ja ? '聞いています…' : 'Listening…') : t('placeholder')}
            disabled={streaming || limitReached}
            className="flex-1 rounded-full border border-sumi/10 bg-washi-deep/50 px-4 py-2.5 text-sm text-sumi placeholder:text-sumi/30 outline-none transition-colors duration-300 focus:border-gold/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || streaming || limitReached}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sumi text-washi transition-all duration-300 hover:bg-gold disabled:opacity-30 disabled:hover:bg-sumi"
            aria-label="Send"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22 11 13 2 9z" />
            </svg>
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between gap-2">
          {voiceOutOk ? (
            <button
              type="button"
              onClick={toggleTts}
              aria-pressed={ttsOn}
              title={ja ? '回答を読み上げ' : 'Read answers aloud'}
              className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] tracking-wide transition-colors duration-300 ${
                ttsOn
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-sumi/10 text-sumi/40 hover:text-sumi-soft'
              }`}
            >
              {ttsOn ? <Volume2 className="h-3 w-3" strokeWidth={1.8} /> : <VolumeX className="h-3 w-3" strokeWidth={1.8} />}
              {ja ? (ttsOn ? '音声 ON' : '音声 OFF') : ttsOn ? 'Voice on' : 'Voice off'}
            </button>
          ) : (
            <span />
          )}
          <p className="text-[9px] tracking-wide text-sumi/25">{t('disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}

/** Animated thinking dots with gold shimmer. */
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-gold"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
