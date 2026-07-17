import { useState, useEffect } from 'react';
import { useLang } from '../../i18n.jsx';
import { ChatPanel } from './ChatPanel.jsx';
import { AiSpark } from './AiSpark.jsx';

/** Floating AI-advisor widget — ported as-is from the main JWD site. */
export function ChatWidget() {
  const { lang, t } = useLang();
  const ja = lang === 'ja';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    window.addEventListener('open-advisor-chat', handleOpen);
    window.addEventListener('advisor-close', handleClose);
    return () => {
      window.removeEventListener('open-advisor-chat', handleOpen);
      window.removeEventListener('advisor-close', handleClose);
    };
  }, []);

  return (
    <>
      {!open && (
        <button className="adv-fab" onClick={() => setOpen(true)} aria-label={t('AI Property Advisor', 'AI投資アドバイザー')}>
          <span className="adv-fab-glow" />
          <AiSpark style={{ position: 'relative', width: 36, height: 36, flex: 'none' }} />
          <span className="adv-fab-label">{ja ? 'AIアドバイザー' : 'AI Advisor'}</span>
        </button>
      )}

      {open && (
        <>
          <div className="adv-backdrop" onClick={() => setOpen(false)} />
          <div className="adv-panel">
            {/* Header */}
            <div className="adv-head">
              <div className="adv-head-l">
                <div className="adv-head-mark"><AiSpark style={{ width: 20, height: 20 }} /></div>
                <div>
                  <h3>{t('AI Investment Advisor', 'AI投資アドバイザー')}</h3>
                  <div className="adv-online"><span className="dot" />Online</div>
                </div>
              </div>
              <div className="adv-head-r">
                <button onClick={() => window.dispatchEvent(new CustomEvent('advisor-new-chat'))}
                  aria-label={ja ? '新しいチャット' : 'New chat'} title={ja ? '新しいチャット' : 'New chat'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <ChatPanel />
          </div>
        </>
      )}
    </>
  );
}
