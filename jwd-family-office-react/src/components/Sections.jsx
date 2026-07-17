import { useLang } from '../i18n.jsx';

export function License() {
  const { t } = useLang();
  const rows = [
    ['Business activity', '事業内容', t('Management Consultancies', '経営コンサルティング')],
    ['Registration no.', '登録番号', '937'],
    ['Legal form', '法的形態', 'DWC-LLC'],
    ['License valid until', 'ライセンス有効期限', t('25 March 2027', '2027年3月25日')],
    ['Representative', '代表者', t('Tomoyuki Kawana', '川名 智之（Tomoyuki Kawana）')],
  ];
  return (
    <section className="blk" id="license">
      <div className="wrap">
        <div className="head center">
          <div className="ey">{t('A Licensed Dubai Entity', 'ライセンスを持つドバイ法人')}</div>
          <h2 className="sec">Japan Worldlink DWC-LLC</h2>
          <p className="lead center">{t(
            'The Family Office hub is a formally licensed company in Dubai — not an introduction desk. Your structure is built on a regulated foundation.',
            'ファミリーオフィスの中核は、ドバイで正式にライセンスを受けた法人です。単なる紹介窓口ではなく、規制された基盤の上にストラクチャーを構築します。',
          )}</p>
        </div>
        <div className="lic">
          <div className="main2">
            <div className="co">Japan Worldlink DWC-LLC</div>
            <div className="sub2">Dubai Aviation City Corporation — {t('Licensed Entity', '公認ライセンス法人')}</div>
            {rows.map(([en, ja, v]) => (
              <div className="rowli" key={en}>
                <span className="k2">{t(en, ja)} <small>{t(ja, en)}</small></span>
                <span className="v2">{v}</span>
              </div>
            ))}
          </div>
          <aside>
            <div className="seal">DACC<br />LICENSE</div>
            <h4>{t('Official license — Dubai Aviation City Corporation', 'ドバイ航空都市公社 発行の公式ライセンス')}</h4>
            <p>{t('Dubai Aviation City — Business Center, Building A3, Floor 3 · P.O. Box 282807',
                  'ドバイ航空都市 ビジネスセンター Building A3, Floor 3 · P.O. Box 282807')}</p>
            <span className="ok"><i />{t('License active — issued March 2013, valid to March 2027',
                                          'ライセンス有効中 — 2013年3月発行 → 2027年3月まで有効')}</span>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function GenerationalWealth() {
  const { t } = useLang();
  const pts = [
    ['Preserve', '守る', 'Shield assets from erosion across the transfer.', '移転の過程で資産が目減りしないよう保全します。'],
    ['Prepare', '備える', 'Ready the next generation through education and residency.', '教育と居住設計を通じて、次世代を育てます。'],
    ['Pass on', '引き継ぐ', 'Legally reduce overseas inheritance tax toward zero over ten years.', '10年をかけて、海外資産の相続税を合法的にゼロへ近づけます。'],
  ];
  return (
    <section className="feature">
      <div className="wrap">
        <div className="ph" style={{ backgroundImage: "url('/img/generations.jpg')" }}>
          <div className="tag2">{t('Three generations · one plan', '三世代 · ひとつの設計')}</div>
        </div>
        <div>
          <div className="ey">{t('Generational Wealth', '世代を超える資産')}</div>
          <h2 className="sec">{t('Wealth that outlives the people who built it.', '築いた人より、長く生きる資産を。')}</h2>
          <p className="lead">{t(
            "In Japan, up to 55% of a family's wealth can be lost to inheritance tax in a single generation. We build the structures that let you pass it on — intact — to the children and grandchildren who come after.",
            '日本では、相続税により一世代で一族の資産の最大55%が失われることがあります。私たちは、その資産を目減りさせることなく、子へ、孫へと引き継ぐためのストラクチャーを構築します。',
          )}</p>
          <ul className="pts">
            {pts.map(([en, ja, dEn, dJa]) => (
              <li key={en}>
                <svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" /></svg>
                <div><b>{t(en, ja)}</b><span>{t(dEn, dJa)}</span></div>
              </li>
            ))}
          </ul>
          <a href="#approach" className="btn btn-primary">{t('See how it works →', '仕組みを見る →')}</a>
        </div>
      </div>
    </section>
  );
}

export function WhoWeServe() {
  const { t } = useLang();
  return (
    <section className="blk tint" id="clients">
      <div className="wrap">
        <div className="head center">
          <div className="ey">{t('Who We Serve', '顧客層')}</div>
          <h2 className="sec">{t('Family wealth, beyond generations', '一族の資産を、世代を超えて。')}</h2>
          <p className="lead center">{t(
            'Cross-border wealth preservation anchored in both Japan and Dubai — comprehensive structuring only JWD can deliver.',
            '日本とドバイ、二つの拠点を活かしたクロスボーダーの資産保全。JWDだけが提供できる、一族のための包括設計です。',
          )}</p>
        </div>
        <div className="serve">
          <div className="who">
            <div className="ph" style={{ backgroundImage: "url('/img/couple-bright.jpg')" }}>
              <span className="lab">{t('Affluent families', '富裕層ファミリー')}</span>
            </div>
            <div className="bd">
              <h3>{t('Affluent families', '富裕層ファミリー')}</h3>
              <p>{t(
                "Japan's aging affluent, facing the ¥1,400 trillion generational transfer — and up to 55% inheritance tax on what they pass down.",
                '¥1,400兆円の世代間移転期を迎える日本の富裕層。引き継ぐ資産には最高55%の相続税が課されます。',
              )}</p>
            </div>
          </div>
          <div className="who">
            <div className="ph" style={{ backgroundImage: "url('/img/business-owner.jpg')" }}>
              <span className="lab">{t('Business owners', 'オーナー経営者')}</span>
            </div>
            <div className="bd">
              <h3>{t('SME business owners', '中小企業オーナー')}</h3>
              <p>{t(
                'A ¥9 trillion blue ocean of corporate surplus capital — deployable even when personal financial assets sit below ¥100 million.',
                '約9兆円の法人余剰資本というブルーオーシャン。個人金融資産が1億円未満でも活用できます。',
              )}</p>
            </div>
          </div>
        </div>
        <div className="chips">
          {[['Asset Protection', '資産保護'], ['Succession Planning', '事業承継'], ['Tax Planning', 'タックスプランニング'],
            ['Family Office Setup', 'ファミリーオフィス設立'], ['Multi-Country Structures', '多国間資産ストラクチャー']]
            .map(([en, ja]) => <span key={en}>{t(en, ja)}</span>)}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  ['M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18', 'Global Asset Management', 'グローバル資産運用',
   'Discretionary investment management across global markets.', 'グローバル市場を横断した一任運用。', true],
  ['M12 3l7 4v5c0 5-3 7-7 9-4-2-7-4-7-9V7z', 'Trust & Estate Planning', '信託・資産承継設計',
   'Trust structures and estate planning for wealth protection.', '資産保全のための信託ストラクチャーと承継設計。'],
  ['M12 3v18M6 8h12M5 8l-2 6a4 4 0 008 0zM21 14l-2-6M16 8l-2 6a4 4 0 008 0', 'Tax & Legal Advisory', '税務・法務アドバイザリー',
   'International tax planning and legal structuring.', '国際税務プランニングと法的ストラクチャリング。'],
  ['M2 12l20-8-8 20-2-8z', 'Relocation & Residency', '移住・居住サポート',
   'Residency, visa and relocation support for global mobility.', 'ビザ・居住権取得と移住支援によるグローバル・モビリティ。'],
  ['M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6', 'Family Governance & Succession', 'ファミリーガバナンス・承継',
   'Family constitution, governance and succession planning.', '家憲・ガバナンス体制の構築と承継計画。'],
  ['M12 3l2.5 6H21l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z', 'Lifestyle & Concierge', 'ライフスタイル・コンシェルジュ',
   'Premium lifestyle, concierge and family-office support.', 'プレミアムなライフスタイルとコンシェルジュ支援。'],
];

export function Services() {
  const { t } = useLang();
  return (
    <section className="blk" id="services">
      <div className="wrap">
        <div className="head">
          <div className="ey">{t('Family Office as a Service', 'ファミリーオフィス・アズ・ア・サービス')}</div>
          <h2 className="sec">{t('One integrated platform for the whole family balance sheet', '一族のすべてを、ひとつの統合プラットフォームで')}</h2>
          <p className="lead">{t(
            'International tax planning, global asset management, relocation and succession — coordinated as a single whole.',
            '国際税務、グローバル資産運用、移住、事業承継——そのすべてをひとつに統合してご提供します。',
          )}</p>
        </div>
        <div className="grid g3">
          {SERVICES.map(([d, en, ja, dEn, dJa, circle]) => (
            <div className="card" key={en}>
              <div className="ic"><svg viewBox="0 0 24 24">{circle && <circle cx="12" cy="12" r="9" />}<path d={d} /></svg></div>
              <h3>{t(en, ja)}</h3>
              <p>{t(dEn, dJa)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  ['M4 6h11a3 3 0 013 3v9a3 3 0 00-3-3H4zM20 6h-1a3 3 0 00-3 3v9', 'Education', '学ぶ', 'Market insight, tax education, case studies.', '市場の知見、税務の学び、事例のご共有。'],
  ['M4 5h16v11H8l-4 4z', 'Consultation', '相談', 'Understand needs, design the optimal structure.', 'ご要望を理解し、最適なストラクチャーを設計。'],
  ['M3 12h18M12 3a15 15 0 010 18', 'Experience', '体験', 'Visit Dubai, experience the ecosystem.', 'ドバイを訪れ、エコシステムを体感。', true],
  ['M4 19V5M4 19h16M8 15l3-4 3 2 5-7', 'Investment', '投資', 'Implement strategy and wealth planning.', '投資戦略と資産設計を実行。'],
  ['M2 12l20-8-8 20-2-8z', 'Relocation', '移住', 'Global relocation and long-term residency.', 'グローバル移住と長期居住をサポート。'],
];

export function Journey() {
  const { t } = useLang();
  return (
    <section className="blk tint" id="approach">
      <div className="wrap">
        <div className="head center">
          <div className="ey">{t('The Client Journey', 'クライアント・ジャーニー')}</div>
          <h2 className="sec">{t('Five stages to global wealth management', '5つのステップで、グローバルな資産管理へ')}</h2>
        </div>
        <div className="steps">
          {STEPS.map(([d, en, ja, dEn, dJa, circle], i) => (
            <div className="step" key={en}>
              <div className="num"><b>{i + 1}</b><svg viewBox="0 0 24 24">{circle && <circle cx="12" cy="12" r="9" />}<path d={d} /></svg></div>
              <h4>{t(en, ja)}</h4>
              <p>{t(dEn, dJa)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
