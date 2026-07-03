import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const SECTIONS = [
  { key: 'about', href: '/about' },
  { key: 'whyDubai', href: '/why-dubai' },
  { key: 'properties', href: '/dubai-properties' },
  { key: 'heartOfEurope', href: '/heart-of-europe' },
  { key: 'funds', href: '/funds' },
  { key: 'japanProperties', href: '/japan-properties' },
  { key: 'familyOffice', href: '/family-office' },
  { key: 'simulator', href: '/simulator' },
  { key: 'knowledge', href: '/knowledge' },
  { key: 'stories', href: '/stories' },
  { key: 'consulting', href: '/consulting' },
] as const;

const CHANNELS = [
  { label: 'WhatsApp', href: '/contact' },
  { label: 'LINE', href: '/contact' },
  { label: 'Zoom', href: '/contact' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="relative overflow-hidden bg-night-deep text-washi/55">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,176,225,0.5), transparent)',
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-7 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <span className="font-en text-2xl font-semibold tracking-[0.16em] text-washi">
              JWD
              <span className="ml-2 align-middle text-[8px] tracking-[0.5em] text-gold-bright">
                GROUP
              </span>
            </span>
            <p className="max-w-xs text-[13px] font-light leading-relaxed text-washi/45">
              {t('blurb')}
            </p>
            <p className="font-en text-sm italic text-gold-pale/55">{t('tagline')}</p>
          </div>

          {/* Explore */}
          <nav className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-bright/70">
              {t('explore')}
            </span>
            <ul className="flex flex-col gap-2.5">
              {SECTIONS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-[13px] text-washi/55 transition-colors duration-300 hover:text-gold-bright"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <nav className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-bright/70">
              {t('connect')}
            </span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-[13px] text-washi/55 transition-colors duration-300 hover:text-gold-bright"
                >
                  {nav('contact')}
                </Link>
              </li>
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-[13px] text-washi/55 transition-colors duration-300 hover:text-gold-bright"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Office */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-bright/70">
              {t('company')}
            </span>
            <p className="text-[13px] font-light leading-relaxed text-washi/45">
              {t('address')}
            </p>
          </div>
        </div>

        {/* Disclaimer + legal */}
        <div className="mt-16 flex flex-col gap-6 border-t border-washi/10 pt-8">
          <p className="max-w-3xl text-[11px] leading-relaxed text-washi/30">
            {t('disclaimer')}
          </p>
          <p className="text-[10px] tracking-[0.2em] text-washi/40">
            © {new Date().getFullYear()} JWD GROUP. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
