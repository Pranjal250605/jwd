import { useLang } from '../i18n.jsx';
import { useVideo } from '../videos.jsx';

export function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <span className="kick"><span className="dot" /> {t('The center of the JWD ecosystem', 'JWDエコシステムの中心')}</span>
          <h1>
            {t('Protect, grow, and ', '一族の資産を、守り、育て、')}
            <em>{t('pass on', '次世代へ。')}</em>
            {t(" your family's wealth.", '')}
          </h1>
          <p className="sub">{t(
            "For Japan's affluent families and business owners — a Dubai-based family office that answers one question first: how do you keep what you've built, across generations?",
            '日本の富裕層とオーナー経営者のために。「築いた資産を、いかに世代を超えて守り抜くか」——その問いにまず答える、ドバイ拠点のファミリーオフィスです。',
          )}</p>
          <div className="cta">
            <a href="#contact" className="btn btn-gold">{t('Book a Consultation →', '無料相談を予約 →')}</a>
            <a href="#approach" className="btn btn-ghost">{t('How it works', '仕組みを見る')}</a>
          </div>
          <div className="assure">
            <span>✓ {t('Licensed in Dubai since ', 'ドバイでライセンス保有 ')}<b>2013</b>{t(' · Reg. No. 937', '年〜 · 登録番号937')}</span>
            <span>✓ {t('International tax & succession', '国際税務・資産承継')}</span>
            <span>✓ {t('Japanese-language advisory', '日本語での対応')}</span>
          </div>
          <div className="portals">
            <span className="plab">{t('Group sites', 'グループサイト')}</span>
            <a className="portal" href="#ecosystem"><span className="swatch" style={{ background: '#0097a7' }} />JWD Investment ↗</a>
            <a className="portal" href="#ecosystem"><span className="swatch" style={{ background: 'linear-gradient(135deg,#123a6b,#b8912f)' }} />{t('ANAWAK Real Estate', 'ANAWAK不動産')} ↗</a>
            <a className="portal" href="#ecosystem"><span className="swatch" style={{ background: '#2f7d80' }} />{t('Luna Travel', 'ルナトラベル')} ↗</a>
          </div>
        </div>
        <div className="hcard">
          <div className="img" style={{ backgroundImage: "url('/img/new-couple.jpg')", backgroundPosition: 'center 22%' }} />
          <div className="float">
            <div className="t">{t('Consolidated Net Worth', '統合純資産')}</div>
            <div className="v"><small>¥</small>2,847,500,000</div>
            <div className="row"><span>{t('YTD return', '年初来リターン')}</span><b>+9.7%</b></div>
            <div className="row"><span>{t('Overseas inheritance tax', '海外資産の相続税')}</span><b>→ 0%</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** AI-avatar video strip — the HeyGen videos from the production plan. */
export function VideoPromo() {
  const { t } = useLang();
  const { open } = useVideo();
  const title = t('Protect your family’s wealth through Dubai real-estate investment',
                  'ドバイの不動産投資で家族の財産を守る');
  return (
    <div className="vpromo">
      <div className="wrap">
        <div className="vthumbs">
          <button className="vthumb" style={{ backgroundImage: "url('/img/avatar-standing.jpg')", backgroundPosition: 'center 20%' }}
             onClick={() => open('hero-1', title)} aria-label="Watch video 1">
            <span className="vplay" />
          </button>
          <button className="vthumb" style={{ backgroundImage: "url('/img/avatar-face.jpg')" }}
             onClick={() => open('hero-2', title)} aria-label="Watch video 2">
            <span className="vplay" />
          </button>
        </div>
        <div className="vlead">
          <span className="varrow">◀</span>
          <div>
            <h3>{t('Protect your family’s wealth through Dubai real-estate investment',
                   'ドバイの不動産投資で家族の財産を守る')}</h3>
            <p>{t('(Click an image to watch the video)', '（画像をクリックして映像を視聴できます）')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const TILES = [
  ['#strategies', 'M12 3l7 4v5c0 5-3 7-7 9-4-2-7-4-7-9V7z', 'Asset Protection', '資産保護', 'Shield & preserve', '守る・保全する'],
  ['#services', 'M12 3v18M6 8h12M9 21h6', 'Succession Planning', '承継プランニング', 'Across generations', '世代を超えて'],
  ['#strategies', 'M9 7h6M9 11h6M9 15h4M6 3h12v18l-3-2-3 2-3-2-3 2z', 'Tax Planning', 'タックスプランニング', 'International', '国際税務'],
  ['#services', 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6', 'Family Office Setup', 'ファミリーオフィス設立', 'DIFC / ADGM', 'DIFC / ADGM'],
  ['#ecosystem', 'M3 12h18M12 3a15 15 0 010 18', 'Multi-Country Structures', '多国間ストラクチャー', 'Japan · Dubai', '日本 · ドバイ'],
];

export function QuickTiles() {
  const { t } = useLang();
  return (
    <div className="quick">
      <div className="wrap">
        {TILES.map(([href, d, en, ja, sEn, sJa]) => (
          <a key={en} href={href}>
            <span className="qi"><svg viewBox="0 0 24 24"><path d={d} /></svg></span>
            <span className="ql">{t(en, ja)}<small>{t(sEn, sJa)}</small></span>
            <span className="qar">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function StatBand() {
  const { t } = useLang();
  const stats = [
    ['¥1,400T', 'Japanese household wealth in transfer', '移転期にある日本の家計金融資産'],
    ['55%', 'Maximum Japanese inheritance tax', '日本の相続税 最高税率'],
    ['0%', 'UAE income · inheritance · capital gains', 'UAEの所得税・相続税・譲渡益税'],
    ['6,700', 'HNW individuals moved to the UAE in 2024', '2024年にUAEへ移住した富裕層'],
  ];
  return (
    <div className="stats">
      <div className="wrap">
        {stats.map(([n, en, ja]) => (
          <div className="s" key={en}><div className="n"><span>{n}</span></div><div className="l">{t(en, ja)}</div></div>
        ))}
      </div>
    </div>
  );
}

export function Question() {
  const { t } = useLang();
  return (
    <section className="q">
      <div className="wrap">
        <div className="ey">{t('The starting point', 'すべての出発点')}</div>
        <h2>
          {t('"How can wealthy Japanese families ', '「日本の富裕層は、いかに資産を')}
          <em>{t('protect and transfer', '守り、引き継ぐ')}</em>
          {t(' their assets?"', 'のか。」')}
        </h2>
        <p>{t(
          'Everything else — real estate, investment, relocation, travel — becomes a solution that branches from this single question. The Family Office is where the journey begins.',
          '不動産、投資、移住、旅行——そのすべてが、この一つの問いから枝分かれするソリューションです。ファミリーオフィスが、その旅の始まりです。',
        )}</p>
      </div>
    </section>
  );
}
