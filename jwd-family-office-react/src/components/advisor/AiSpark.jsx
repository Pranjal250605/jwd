/**
 * JWD's AI mark — four-point sparkle with orbiting ring and dot (ported
 * as-is from the main site). Inherits size via className/style.
 */
export function AiSpark({ className = '', style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="jwd-spark" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0e2bd" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#b8912f" />
        </linearGradient>
      </defs>
      <ellipse cx="12" cy="11.2" rx="8.4" ry="3.5" transform="rotate(-27 12 11.2)"
        stroke="url(#jwd-spark)" strokeWidth="1.1" opacity="0.55" />
      <path d="M12 3.8c.5 4.45 3.27 7.22 7.7 7.7-4.43.5-7.2 3.27-7.7 7.7-.5-4.43-3.27-7.2-7.7-7.7C8.73 11 11.5 8.23 12 3.8Z"
        fill="url(#jwd-spark)" />
      <path d="M6 5.4c.18 1.28.93 2.03 2.2 2.2-1.27.18-2.02.93-2.2 2.2-.17-1.27-.92-2.02-2.2-2.2C5.08 7.43 5.83 6.68 6 5.4Z"
        fill="url(#jwd-spark)" opacity="0.78" />
      <circle cx="18.7" cy="13.9" r="1.05" fill="url(#jwd-spark)" />
    </svg>
  );
}
