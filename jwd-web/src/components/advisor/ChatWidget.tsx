'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChatPanel } from './ChatPanel';
import { AiSpark } from './AiSpark';

export function ChatWidget() {
  const t = useTranslations('advisor');
  const ja = useLocale() === 'ja';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); // e.g. after an in-chat navigation
    window.addEventListener('open-advisor-chat', handleOpen);
    window.addEventListener('advisor-close', handleClose);
    return () => {
      window.removeEventListener('open-advisor-chat', handleOpen);
      window.removeEventListener('advisor-close', handleClose);
    };
  }, []);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            onClick={() => setOpen(true)}
            className="group fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 rounded-full border border-gold/30 bg-gradient-to-br from-[#0e3336] to-sumi py-2.5 pl-3 pr-5 shadow-[0_12px_34px_-8px_rgba(0,196,204,0.5),0_12px_28px_-12px_rgba(20,20,18,0.7)] transition-transform duration-300 hover:scale-[1.04]"
            aria-label={t('label')}
          >
            {/* soft gold inner glow */}
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-80"
              style={{ background: 'radial-gradient(circle at 16% 30%, rgba(0,196,204,0.28), transparent 60%)' }}
            />

            {/* AI sparkle mark */}
            <AiSpark className="relative h-9 w-9 shrink-0 drop-shadow-[0_1px_3px_rgba(0,196,204,0.4)]" />

            {/* readable label */}
            <span className={`relative text-[15px] font-semibold tracking-wide text-washi ${ja ? 'font-jp' : ''}`}>
              {ja ? 'AIアドバイザー' : 'AI Advisor'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop (mobile only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-sumi/30 backdrop-blur-sm sm:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 28,
              }}
              className="fixed z-[61] flex flex-col overflow-hidden border border-sumi/8 bg-washi/95 shadow-2xl shadow-sumi/15 backdrop-blur-xl
                /* Mobile: full screen with safe area */
                inset-0
                /* Desktop: floating panel bottom-right */
                sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[620px] sm:w-[400px] sm:rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-sumi/8 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sumi">
                    <AiSpark className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-sumi leading-tight">
                      {t('title')}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] text-sumi-soft/60 tracking-wide uppercase">
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('advisor-new-chat'))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sumi-soft transition-colors hover:bg-sumi/5 hover:text-sumi"
                    aria-label={ja ? '新しいチャット' : 'New chat'}
                    title={ja ? '新しいチャット' : 'New chat'}
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
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sumi-soft transition-colors hover:bg-sumi/5 hover:text-sumi"
                    aria-label="Close"
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
                      <path d="M18 6 6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat */}
              <ChatPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
