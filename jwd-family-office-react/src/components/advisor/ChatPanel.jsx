import { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from '../../i18n.jsx';
import { AiSpark } from './AiSpark.jsx';

/* ── Ported as-is from the main JWD site's advisor. ──
   In-chat [[GOTO:...]] directives are stripped from display; on this
   standalone hub they are not navigated (the paths belong to the main site). */
function stripDirectives(text) {
  return text.replace(/\[\[GOTO:[^\]]*\]\]/g, '').replace(/\[\[[^\]]*$/g, '').trimEnd();
}

function getRecognizerCtor() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

function stripMarkdown(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/^[-•]\s*/gm, '')
    .replace(/\n{2,}/g, '. ')
    .trim();
}

const MAX_MESSAGES = 20;
const STORAGE_KEY = 'jwd-advisor-history';

const SUGGESTIONS_EN = [
  'How does the 10-year rule work?',
  'Japanese inheritance tax basics',
  'Dubai rental yields?',
  'I have ¥100M to invest',
  'Dubai vs Japan comparison',
];
const SUGGESTIONS_JA = [
  '10年ルールとは？',
  '日本の相続税の基本',
  'ドバイの利回りは？',
  '1億円の投資先は？',
  'ドバイvs日本の比較',
];

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={j}>{part.slice(2, -2)}</strong>;
    }
    return part.replace(/`/g, '');
  });
}

/** Lightweight markdown: headings, bullets, bold, table flattening. */
function renderMarkdown(text) {
  const out = [];
  text.split('\n').forEach((line, i) => {
    const trimmed = line.trim();
    const heading = trimmed.match(/^#{1,6}\s+(.*)$/);
    if (heading) { out.push(<p key={i} className="advp-h">{inline(heading[1])}</p>); return; }
    if (/^\|?[\s:|-]+\|?$/.test(trimmed) && trimmed.includes('-') && trimmed.includes('|')) return;
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2) {
      const cells = trimmed.slice(1, -1).split('|').map((c) => c.trim()).filter(Boolean);
      out.push(
        <div key={i} className="advp-row">
          {cells.map((c, k) => (
            <span key={k}>{inline(c)}{k < cells.length - 1 && <span className="advp-dot"> · </span>}</span>
          ))}
        </div>,
      );
      return;
    }
    const bullet = trimmed.match(/^[-*•]\s+(.*)$/);
    if (bullet) {
      out.push(
        <div key={i} className="advp-li"><span className="advp-b">•</span><span>{inline(bullet[1])}</span></div>,
      );
      return;
    }
    if (trimmed === '') { out.push(<div key={i} style={{ height: 8 }} />); return; }
    out.push(<p key={i} className="advp-p">{inline(line)}</p>);
  });
  return out;
}

function ThinkingDots() {
  return (
    <div className="advp-think">
      {[0, 1, 2].map((i) => <span key={i} style={{ animationDelay: `${i * 0.2}s` }} />)}
    </div>
  );
}

export function ChatPanel() {
  const { lang, t } = useLang();
  const ja = lang === 'ja';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [ttsOn, setTtsOn] = useState(false);
  const [voiceInOk, setVoiceInOk] = useState(false);
  const [voiceOutOk, setVoiceOutOk] = useState(false);
  const scrollRef = useRef(null);
  const abortRef = useRef(null);
  const recognizerRef = useRef(null);

  const suggestions = ja ? SUGGESTIONS_JA : SUGGESTIONS_EN;
  const userCount = messages.filter((m) => m.role === 'user').length;
  const limitReached = userCount >= MAX_MESSAGES;

  useEffect(() => {
    setVoiceInOk(!!getRecognizerCtor());
    setVoiceOutOk('speechSynthesis' in window);
  }, []);

  useEffect(() => () => {
    recognizerRef.current?.abort();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return;
    const clean = stripMarkdown(text);
    if (!clean) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = ja ? 'ja-JP' : 'en-US';
    window.speechSynthesis.speak(u);
  }, [ja]);

  // Restore prior conversation for the browser session.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      const clean = Array.isArray(saved) ? saved.filter((m) => m.role === 'user' || m.content) : [];
      if (clean.length) setMessages(clean);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      if (messages.length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch { /* ignore */ }
  }, [messages]);

  useEffect(() => {
    const pin = () => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; };
    pin();
    const id = requestAnimationFrame(pin);
    return () => cancelAnimationFrame(id);
  }, [messages, streaming, limitReached]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || streaming || limitReached) return;
    setError('');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text.trim() };
    const assistantMsg = { id: `a-${Date.now()}`, role: 'assistant', content: '' };
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
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          locale: lang,
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
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              accumulated += parsed.text;
              setMessages((prev) => prev.map((m) =>
                m.id === assistantMsg.id ? { ...m, content: stripDirectives(accumulated) } : m));
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }
      const finalText = stripDirectives(accumulated);
      if (!finalText) {
        const fallback = ja
          ? '申し訳ありません、うまく理解できませんでした。別の言い方で試していただけますか？'
          : "Sorry, I didn't quite catch that — could you rephrase?";
        setMessages((prev) => prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: fallback } : m)));
        if (ttsOn) speak(fallback);
      } else if (ttsOn) {
        speak(finalText);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setMessages((prev) => prev.filter((m) => m.id !== assistantMsg.id));
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [messages, streaming, limitReached, lang, ja, ttsOn, speak]);

  const toggleMic = useCallback(() => {
    if (listening) { recognizerRef.current?.stop(); return; }
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

  const toggleTts = useCallback(() => {
    setTtsOn((on) => {
      if (on && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      return !on;
    });
  }, []);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    recognizerRef.current?.abort();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setListening(false);
    setStreaming(false);
    setMessages([]);
    setInput('');
    setError('');
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const handler = () => resetChat();
    window.addEventListener('advisor-new-chat', handler);
    return () => window.removeEventListener('advisor-new-chat', handler);
  }, [resetChat]);

  return (
    <div className="advp">
      {/* Messages */}
      <div ref={scrollRef} className="advp-scroll">
        {messages.length === 0 && (
          <div className="advp-welcome">
            <div className="advp-avatar-lg"><AiSpark style={{ width: 32, height: 32 }} /></div>
            <h3>{t('AI Investment Advisor', 'AI投資アドバイザー')}</h3>
            <p>{t(
              "Ask me anything about protecting and transferring family wealth through Dubai. I'm powered by JWD's own knowledge.",
              'ドバイを通じた資産保全・承継について、何でもお聞きください。JWDの知識をもとにお答えします。',
            )}</p>
            <div className="advp-chips">
              {suggestions.map((s) => (
                <button key={s} onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`advp-msgrow ${msg.role === 'user' ? 'user' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="advp-avatar-sm"><AiSpark style={{ width: 16, height: 16 }} /></div>
            )}
            <div className={`advp-bubble ${msg.role}`}>
              {msg.role === 'assistant'
                ? (msg.content ? <div className="advp-md">{renderMarkdown(msg.content)}</div> : <ThinkingDots />)
                : <p>{msg.content}</p>}
            </div>
          </div>
        ))}

        {messages.length > 0 && !streaming && !limitReached &&
          messages[messages.length - 1]?.role === 'assistant' && (
            <div className="advp-after">
              {suggestions.slice(0, 3).map((s) => (
                <button key={s} onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          )}

        {error && <div className="advp-err">{error}</div>}

        {limitReached && (
          <div className="advp-limit">
            <p>{t(
              'Session limit reached. For deeper, personalized guidance, book a consultation.',
              'セッション上限に達しました。より深いご相談は無料相談をご予約ください。',
            )}</p>
            <a href="#contact" onClick={() => window.dispatchEvent(new CustomEvent('advisor-close'))}>
              {t('Book a consultation with Tomo →', 'Tomoに無料相談を予約 →')}
            </a>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="advp-input">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}>
          {voiceInOk && (
            <button type="button" onClick={toggleMic} disabled={streaming || limitReached}
              className={`advp-mic ${listening ? 'live' : ''}`}
              aria-label={ja ? '音声入力' : 'Voice input'} title={ja ? '話して入力' : 'Speak your question'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3z" /><path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8" />
              </svg>
            </button>
          )}
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={listening
              ? (ja ? '聞いています…' : 'Listening…')
              : t('Ask about Dubai investment, yields, visas...', 'ドバイ投資、利回り、ビザについて質問...')}
            disabled={streaming || limitReached}
          />
          <button type="submit" className="advp-send" disabled={!input.trim() || streaming || limitReached} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9z" />
            </svg>
          </button>
        </form>
        <div className="advp-foot">
          {voiceOutOk ? (
            <button type="button" onClick={toggleTts} className={`advp-tts ${ttsOn ? 'on' : ''}`}
              aria-pressed={ttsOn} title={ja ? '回答を読み上げ' : 'Read answers aloud'}>
              {ja ? (ttsOn ? '音声 ON' : '音声 OFF') : (ttsOn ? 'Voice on' : 'Voice off')}
            </button>
          ) : <span />}
          <p>{t(
            'AI-generated guidance — not financial advice.',
            'AIによる参考情報です。正式なアドバイスはJWDにご相談ください。',
          )}</p>
        </div>
      </div>
    </div>
  );
}
