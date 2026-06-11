import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative bg-night-deep py-16 text-washi/50">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,92,0.5), transparent)',
        }}
      />
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-6 px-7 text-center">
        <span className="font-en text-2xl font-semibold tracking-[0.16em] text-washi">
          JWD
          <span className="ml-2 align-middle text-[8px] tracking-[0.5em] text-gold-bright">
            GROUP
          </span>
        </span>
        <p className="font-en text-sm italic text-gold-pale/60">{t('tagline')}</p>
        <p className="text-[10px] tracking-[0.2em]">
          © {new Date().getFullYear()} JWD GROUP. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
