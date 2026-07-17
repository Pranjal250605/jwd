import { useEffect, useState } from 'react';
import { useLang } from '../i18n.jsx';

export function UtilBar() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="util">
      <div className="wrap">
        <div className="eco">
          <span className="brand">{t('JWD Group:', 'JWDグループ：')}</span>
          <a href="#ecosystem"><b>{t('Family Office', 'ファミリーオフィス')}</b></a>
          <a href="#ecosystem">{t('JWD Investment', 'JWDインベストメント')}</a>
          <a href="#ecosystem">{t('ANAWAK Real Estate', 'ANAWAK不動産')}</a>
          <a href="#ecosystem">{t('Luna Travel', 'ルナトラベル')}</a>
        </div>
        <div className="lang">
          <a className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} role="button">EN</a>·
          <a className={lang === 'ja' ? 'on' : ''} onClick={() => setLang('ja')} role="button">日本語</a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  const links = [
    ['#clients', 'Clients', '顧客層'],
    ['#services', 'Services', 'サービス'],
    ['#approach', 'Approach', 'アプローチ'],
    ['#strategies', 'Strategies', '戦略'],
    ['#simulator', 'Simulator', 'シミュレーター'],
    ['#cases', 'Case Studies', '事例'],
    ['#ecosystem', 'Ecosystem', 'グループ'],
    ['#insights', 'Insights', 'インサイト'],
  ];

  return (
    <header id="hd" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap">
        <nav className="main">
          <a href="#top" className="logo">
            <span className="mk">JWD <b>family office</b></span>
            <span className="sb">{t('Japan · Dubai · Wealth Preservation', '日本 · ドバイ · 資産保全')}</span>
          </a>
          <div className="navlinks">
            {links.map(([href, en, ja]) => <a key={href} href={href}>{t(en, ja)}</a>)}
          </div>
          <div className="navcta">
            <a href="#contact" className="btn btn-primary">{t('Book a Consultation', '無料相談を予約')}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function CtaBand() {
  const { t } = useLang();
  return (
    <section className="blk" id="contact">
      <div className="wrap">
        <div className="band">
          <h2>{t('Begin with a private consultation', 'まずは、個別相談から。')}</h2>
          <p>{t(
            "Understand your position, then design the structure that carries your family's wealth to its next horizon.",
            '現状を正しく把握し、一族の資産を次の地平へ運ぶストラクチャーを設計しましょう。',
          )}</p>
          <div className="cta">
            <a href="mailto:contact@jwd.example" className="btn btn-gold">{t('Book a Consultation', '無料相談を予約')}</a>
            <a href="#services" className="btn btn-ghost" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.4)' }}>
              {t('Explore services', 'サービスを見る')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap">
        <div className="fcols">
          <div>
            <div className="mk">JWD <b>family office</b></div>
            <p style={{ marginTop: 14, maxWidth: 300 }}>{t(
              'The bridge between Japan and Dubai — protecting and transferring family wealth across generations. Japan WorldLink DWC.',
              '日本とドバイを結ぶ架け橋——一族の資産を世代を超えて守り、引き継ぐ。Japan WorldLink DWC.',
            )}</p>
          </div>
          <div>
            <h5>{t('Family Office', 'ファミリーオフィス')}</h5>
            <ul>
              <li><a href="#services">{t('Services', 'サービス')}</a></li>
              <li><a href="#approach">{t('Approach', 'アプローチ')}</a></li>
              <li><a href="#strategies">{t('Strategies', '戦略')}</a></li>
              <li><a href="#cases">{t('Case Studies', '事例')}</a></li>
            </ul>
          </div>
          <div>
            <h5>{t('JWD Group', 'JWDグループ')}</h5>
            <ul>
              <li><a href="#ecosystem">{t('JWD Investment (Equiti · AIX)', 'JWDインベストメント（Equiti · AIX）')}</a></li>
              <li><a href="#ecosystem">ANAWAK Real Estate L.L.C</a></li>
              <li><a href="#ecosystem">JWD Luna Travel &amp; Tourism LLC</a></li>
              <li><a href="#insights">{t('Insights', 'インサイト')}</a></li>
            </ul>
          </div>
          <div>
            <h5>{t('Contact', 'お問い合わせ')}</h5>
            <ul>
              <li><a href="#contact">{t('Book a consultation', '無料相談を予約')}</a></li>
              <li><a href="#">{t('Dubai (DIFC)', 'ドバイ（DIFC）')}</a></li>
              <li><a href="#">{t('Tokyo', '東京')}</a></li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© {new Date().getFullYear()} JWD Family Office · Japan WorldLink DWC</span>
          <span className="disc">{t(
            '※ Illustrative content for demonstration. Figures and strategies are not investment or tax advice; consult a licensed professional.',
            '※ 本サイトはデモ用の説明コンテンツです。数値・戦略は投資助言・税務助言ではありません。専門家にご相談ください。',
          )}</span>
        </div>
      </div>
    </footer>
  );
}
