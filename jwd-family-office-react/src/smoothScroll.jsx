import { useEffect } from 'react';

// Sticky-header height to offset anchor targets so section headings aren't
// hidden behind the bar. Header nav is 74px; add a little breathing room.
const HEADER_OFFSET = 88;

// easeInOutCubic — the calm accelerate/decelerate curve polished sites use.
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Global smooth-scroll for in-page anchor links (nav, footer, hero portals,
 * CTAs). Intercepts clicks on same-page hash links and animates the scroll
 * with an eased curve + header offset, instead of the browser's flat jump.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let raf = 0;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a || a.target === '_blank') return;

      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || url.search !== location.search) return;
      if (!url.hash || url.hash === '#') return;

      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      e.preventDefault();
      history.pushState(null, '', url.hash);

      const targetY = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      );
      const startY = window.scrollY;
      const dist = targetY - startY;
      if (Math.abs(dist) < 2) return;

      if (prefersReduced) {
        window.scrollTo(0, targetY);
        return;
      }

      // Duration scales gently with distance so short hops feel snappy and
      // long ones stay graceful — capped either end.
      const duration = Math.min(1100, Math.max(450, Math.abs(dist) * 0.6));
      let start;

      cancelAnimationFrame(raf);
      const step = (ts) => {
        if (start === undefined) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        window.scrollTo({ top: startY + dist * easeInOutCubic(p), behavior: 'auto' });
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    // Cancel an in-flight animation if the user grabs the wheel / touches.
    const cancel = () => cancelAnimationFrame(raf);

    document.addEventListener('click', onClick);
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
    };
  }, []);
}
