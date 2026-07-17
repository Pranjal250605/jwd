import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Minimal bilingual helper — the same tl(en, ja) pattern used in jwd-web.
 * Default language is Japanese (the primary client base is 60+ Japanese
 * families); persisted in localStorage.
 */
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('jwd-lang') ?? 'ja');
  useEffect(() => {
    localStorage.setItem('jwd-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const t = (en, ja) => (lang === 'ja' ? ja : en);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
