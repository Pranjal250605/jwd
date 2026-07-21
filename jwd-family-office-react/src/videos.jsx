import { createContext, useContext, useState, useCallback } from 'react';
import { useLang } from './i18n.jsx';

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  VIDEO SOURCES — the ONE place to plug in HeyGen (or YouTube) videos.
 *
 *  When a video is ready, paste its URL against the matching key below.
 *  Supported: YouTube links (youtu.be/… or youtube.com/watch?v=…),
 *  direct .mp4 links, or any embeddable iframe URL (e.g. a HeyGen share URL).
 *  Leave '' to show a tasteful "coming soon / 準備中" placeholder.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const VIDEO_SOURCES = {
  // Hero avatar promo (the two HeyGen reference clips)
  'hero-1': 'https://youtu.be/bNwfUe41t2U',
  'hero-2': 'https://youtu.be/mmZjAihSBGM',
  // Core education library — paste HeyGen URLs here as they are produced
  'edu-01': '', // Japanese inheritance tax, explained
  'edu-02': '', // How to transfer wealth across generations
  'edu-03': '', // Asset protection for your family
  'edu-04': '', // Business succession without the tax hit
  'edu-05': '', // Legal tax-reduction strategies
  // "What is…?" explainer series
  'exp-dubai': '', 'exp-fo': '', 'exp-10yr': '',
  'exp-visa': '', 'exp-difc': '', 'exp-cfc': '',
};

/** Turn any supported URL into an embeddable src (or null for <video>). */
function toEmbed(url) {
  if (!url) return { kind: 'none' };
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (yt) return { kind: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0` };
  if (/\.mp4($|\?)/i.test(url)) return { kind: 'video', src: url };
  return { kind: 'iframe', src: url }; // HeyGen share / other embeds
}

const VideoContext = createContext(null);
export const useVideo = () => useContext(VideoContext);

export function VideoProvider({ children }) {
  const [active, setActive] = useState(null); // { id, title }
  const open = useCallback((id, title) => setActive({ id, title }), []);
  const close = useCallback(() => setActive(null), []);
  return (
    <VideoContext.Provider value={{ open, close }}>
      {children}
      {active && <VideoModal active={active} onClose={close} />}
    </VideoContext.Provider>
  );
}

function VideoModal({ active, onClose }) {
  const { t } = useLang();
  const url = VIDEO_SOURCES[active.id] ?? '';
  const embed = toEmbed(url);

  return (
    <div className="vmodal" onClick={onClose}>
      <div className="vmodal-box" onClick={(e) => e.stopPropagation()}>
        <button className="vmodal-x" onClick={onClose} aria-label="Close">✕</button>
        {active.title && <div className="vmodal-title">{active.title}</div>}
        <div className="vmodal-frame">
          {embed.kind === 'iframe' && (
            <iframe src={embed.src} title={active.title || 'Video'} allow="autoplay; fullscreen"
              allowFullScreen frameBorder="0" />
          )}
          {embed.kind === 'video' && (
            <video src={embed.src} controls autoPlay playsInline />
          )}
          {embed.kind === 'none' && (
            <div className="vmodal-soon">
              <span className="vmodal-soon-ic">▶</span>
              <h4>{t('Video coming soon', '動画は準備中です')}</h4>
              <p>{t('This educational video is being produced and will be available shortly.',
                    'この解説動画は現在制作中です。まもなく公開いたします。')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
