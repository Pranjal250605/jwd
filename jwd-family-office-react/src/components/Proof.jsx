import { useLang } from '../i18n.jsx';

const STRATEGIES = [
  ['01', 'Art. 22 · Inheritance Tax Act', '相続税法 第22条', 'Asset Valuation Optimization', '資産評価の最適化',
   'Dubai holding structures use valuation differentials so private-company shares can often be valued below market.',
   'ドバイの持株ストラクチャーと評価差を活用。非上場株式を市場価格より低く評価できる場合があります。',
   'Up to 60% reduction in taxable estate valuation', '課税対象評価額を最大60%圧縮'],
  ['02', 'Special Taxation Measures Act · Art. 40-4', '租税特別措置法 第40条の4', 'CFC Optimization via Genuine Substance', '実体を伴うCFC最適化',
   'Real business operations in Dubai — genuine activity, physical office, local management — to satisfy substance requirements.',
   'ドバイに実体ある事業を設立。実際の事業活動・物理的オフィス・現地管理により実体基準を充足します。',
   'Legally defer Japanese tax on overseas business profits', '海外事業利益への日本課税を合法的に繰り延べ'],
  ['03', 'Art. 1-3 · Inheritance Tax Act', '相続税法 第1条の3', 'Next-Generation 10-Year Rule', '次世代・10年ルール',
   'When both heirs and assets are non-resident for over ten years, inheritance tax on overseas assets can effectively be eliminated.',
   '相続人と資産の双方が10年超の非居住者となる場合、海外資産への相続税を実質的にゼロにできます。',
   'Overseas inheritance tax effectively → 0 after 10 years', '10年経過後、海外資産の相続税は実質ゼロに'],
];

export function Strategies() {
  const { t } = useLang();
  return (
    <section className="blk" id="strategies">
      <div className="wrap">
        <div className="head">
          <div className="ey">{t('Three Strategic Inheritance Solutions', '3つの相続プランニング戦略')}</div>
          <h2 className="sec">{t('Legally compliant tax optimization, built on UAE regulations', 'UAE規制に基づく、合法的な税務最適化')}</h2>
          <p className="lead">{t(
            'Designed and executed as one integrated Family Office solution through the JWD ecosystem.',
            'JWDのエコシステムを通じ、ひとつの統合されたファミリーオフィス・ソリューションとして設計・実行します。',
          )}</p>
        </div>
        <div className="grid g3">
          {STRATEGIES.map(([no, lawEn, lawJa, en, ja, dEn, dJa, rEn, rJa]) => (
            <div className="strat" key={no}>
              <div className="no">{no}</div>
              <div className="law">{t(lawEn, lawJa)}</div>
              <h3>{t(en, ja)}</h3>
              <p>{t(dEn, dJa)}</p>
              <div className="res"><span className="d" />{t(rEn, rJa)}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 22, fontSize: 13, color: 'var(--muted)', maxWidth: 820 }}>{t(
          '※ Strategies are illustrative and depend on individual circumstances, residency substance and prevailing law. Not tax advice — always consult a licensed international tax professional.',
          '※ 戦略は一例であり、個別の状況・居住実態・現行法により結果は異なります。税務助言ではありません。国際税務に精通した専門家に必ずご相談ください。',
        )}</p>
      </div>
    </section>
  );
}

const TAX_ROWS = [
  ['Personal income tax (top)', '個人所得税（最高）', '55%', '0%'],
  ['Capital gains & dividends', '株式譲渡益・配当', '20.315%', '0%'],
  ['Inheritance tax (top)', '相続税（最高）', '55%', '0%'],
  ['Corporate tax (effective)', '法人税（実効）', '~30%', '9%'],
  ['Consumption tax / VAT', '消費税 / VAT', '10%', '5%'],
  ['Wealth tax', '富裕税', ['None', 'なし'], ['None', 'なし']],
];

export function Compare() {
  const { t } = useLang();
  const v = (x) => (Array.isArray(x) ? t(x[0], x[1]) : x);
  return (
    <section className="blk tint" id="compare">
      <div className="wrap">
        <div className="head center">
          <div className="ey">{t('Japan vs Dubai', '日本 vs ドバイ')}</div>
          <h2 className="sec">{t('Why structure through the UAE', 'なぜUAEでストラクチャーを組むのか')}</h2>
          <p className="lead center">{t(
            'The same wealth, under two tax regimes. This gap is the reason families build their structure in Dubai.',
            '同じ資産でも、税制が違えば残る額が変わります。この差こそ、一族がドバイでストラクチャーを組む理由です。',
          )}</p>
        </div>
        <div className="compare">
          <div className="rw hd2">
            <div>{t('Tax (individual)', '税目（個人）')}</div>
            <div className="c jp">{t('Japan', '日本')}</div>
            <div className="c ae">{t('Dubai · UAE', 'ドバイ · UAE')}</div>
          </div>
          {TAX_ROWS.map(([en, ja, jp, ae]) => (
            <div className="rw" key={en}>
              <div className="k">{t(en, ja)}</div>
              <div className="vj">{v(jp)}</div>
              <div className="va">{v(ae)}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--muted)' }}>{t(
          "※ Indicative rates for illustration only; Dubai's 0% treatment depends on genuine UAE tax residency. Not tax advice — consult a licensed professional.",
          '※ 税率は説明用の概要です。ドバイの0%はUAEの税務上の居住実態が前提となります。税務助言ではありません。専門家にご相談ください。',
        )}</p>
      </div>
    </section>
  );
}

const CASES = [
  ['Real-estate succession', '不動産の承継', '¥1 billion real-estate owner', '資産10億円の不動産オーナー',
   'Primarily domestic real estate · three children.', '資産の大半が国内不動産 · 子ども3人。',
   [['Reallocate domestic holdings into Dubai real estate', '国内不動産をドバイ不動産へ再配分'],
    ["Support the eldest son's relocation to Dubai", '長男のドバイ移住をサポート'],
    ['Establish a DIFC family office for succession', 'DIFCにファミリーオフィスを設立し承継へ']],
   'Inheritance tax reduced from 55% to effectively zero after ten years', '相続税を55%から、10年後に実質ゼロへ'],
  ['Business-owner exit', '経営者のExit', '¥3 billion after an M&A exit', 'M&A後 資産30億円',
   'IT founder · assets heavily concentrated in yen.', 'IT企業創業者 · 資産が円に極端に集中。',
   [['Establish a Dubai family office with genuine CFC substance', '実体を伴うドバイ・ファミリーオフィスを設立'],
    ['Diversify into global equities, PE, FX and USD assets', 'グローバル株式・PE・為替・USD資産へ分散'],
    ['Acquire Dubai real estate + apply the 10-year rule', 'ドバイ不動産取得と10年ルールの適用']],
   'Full hedge against yen depreciation · 8–12% target annual return', '円安への完全ヘッジ · 年率8〜12%を目標'],
  ['Multi-generational', '多世代', '¥2 billion, three generations', '資産20億円・三世代',
   'Family-business owner · three children and three grandchildren.', '同族企業オーナー · 子ども3人と孫3人。',
   [['Relocate children and grandchildren to Dubai (IB education)', '子・孫のドバイ移住（国際バカロレア教育）'],
    ['Acquire Dubai real estate via Golden Visa (7–10% yield)', 'ゴールデンビザでドバイ不動産取得（利回り7〜10%）'],
    ['Establish a multi-generational family office', '多世代型ファミリーオフィスを設立']],
   'Overseas inheritance tax eliminated · wealth diversified from regional risk', '海外資産の相続税を撤廃 · 地政学リスクから分散'],
];

export function Cases() {
  const { t } = useLang();
  return (
    <section className="blk" id="cases">
      <div className="wrap">
        <div className="head">
          <div className="ey">{t('Case Studies', 'ケーススタディ')}</div>
          <h2 className="sec">{t("How families keep what they've built", '築いた資産を、どう守り抜くか')}</h2>
        </div>
        <div className="grid g3">
          {CASES.map(([tagEn, tagJa, hEn, hJa, pEn, pJa, steps, oEn, oJa]) => (
            <div className="case" key={hEn}>
              <span className="tag">{t(tagEn, tagJa)}</span>
              <h3>{t(hEn, hJa)}</h3>
              <div className="pf">{t(pEn, pJa)}</div>
              <ol>
                {steps.map(([sEn, sJa], i) => <li key={i}><i>{i + 1}</i>{t(sEn, sJa)}</li>)}
              </ol>
              <div className="out">
                <svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" /></svg>
                {t(oEn, oJa)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Ecosystem() {
  const { t } = useLang();
  return (
    <section className="blk" id="ecosystem">
      <div className="wrap">
        <div className="head center">
          <div className="ey">{t('The JWD Group Bridge', 'JWDグループの架け橋')}</div>
          <h2 className="sec">{t('One licensed hub, three specialized companies', 'ひとつのハブと、3つの専門会社')}</h2>
          <p className="lead center">{t(
            'Every relationship begins here at the Family Office (Japan Worldlink DWC-LLC). From this hub, we bridge you to the specialist company your plan requires — each a separate licensed business.',
            'すべてのご縁は、このファミリーオフィス（Japan Worldlink DWC-LLC）から始まります。ここをハブに、お客様のプランに必要な専門会社へと橋を架けます——各社はそれぞれ独立したライセンス企業です。',
          )}</p>
        </div>
        <div className="eco-grid">
          <div className="pill hubme">
            <span className="badge" style={{ background: 'var(--navy)' }}>{t('TOP · You are here', 'TOP · 現在地')}</span>
            <h3>{t('Family Office', 'ファミリーオフィス')}</h3>
            <p>{t('Japan Worldlink DWC-LLC — inheritance, succession, tax strategy, asset protection, wealth consulting.',
                  'Japan Worldlink DWC-LLC — 相続、承継、税務戦略、資産保護、ウェルスコンサルティング。')}</p>
            <span className="go">{t('The central hub', '中核ハブ')}</span>
          </div>
          <a className="pill" href="#" target="_blank" rel="noreferrer">
            <span className="badge" style={{ background: '#0097a7' }}>Investment</span>
            <h3>{t('JWD Investment', 'JWDインベストメント')}</h3>
            <p>{t('Wealth management & advisory — Equiti and AIX investment platforms.',
                  '資産運用・アドバイザリー — Equiti・AIX投資プラットフォーム。')}</p>
            <span className="go">{t('Visit site →', 'サイトへ →')}</span>
          </a>
          <a className="pill" href="#" target="_blank" rel="noreferrer">
            <span className="badge" style={{ background: 'linear-gradient(90deg,#123a6b,var(--gold))' }}>Real Estate</span>
            <h3>ANAWAK Real Estate L.L.C</h3>
            <p>{t('Dubai property investment, acquisition and management.', 'ドバイ不動産の投資・取得・管理。')}</p>
            <span className="go">{t('Visit site →', 'サイトへ →')}</span>
          </a>
          <a className="pill" href="#" target="_blank" rel="noreferrer">
            <span className="badge" style={{ background: '#2f7d80' }}>Travel</span>
            <h3>JWD Luna Travel &amp; Tourism LLC</h3>
            <p>{t("Licensed by Dubai's Department of Economy & Tourism — property tours, investment tours, luxury travel.",
                  'ドバイ政府観光局認可 — 物件ツアー、投資ツアー、ラグジュアリートラベル。')}</p>
            <span className="go">{t('Visit site →', 'サイトへ →')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Core educational library — the five priority videos from the 13-July meeting.
const VIDEOS = [
  ['/img/hero-couple.jpg', '01 · Family Office', '01 · ファミリーオフィス', '5 min', 'Japanese inheritance tax, explained', '日本の相続税とは？'],
  ['/img/generations.jpg', '02 · Strategy', '02 · 戦略', '8 min', 'How to transfer wealth across generations', '世代を超えて資産を引き継ぐには'],
  ['/img/business-owner.jpg', '03 · Protection', '03 · 保全', '6 min', 'Asset protection for your family', '一族の資産を守る方法'],
  ['/img/couple-bright.jpg', '04 · Succession', '04 · 承継', '7 min', 'Business succession without the tax hit', '税負担を抑えた事業承継'],
  ['/img/couple-beach.jpg', '05 · Tax', '05 · 税務', '9 min', 'Legal tax-reduction strategies', '合法的な税負担軽減の戦略'],
];

// Short "What is…?" explainer series — reusable across the group.
const EXPLAINERS = [
  ['What is Dubai?', 'ドバイとは？'],
  ['What is a Family Office?', 'ファミリーオフィスとは？'],
  ['What is the 10-year rule?', '10年ルールとは？'],
  ['What is the Golden Visa?', 'ゴールデンビザとは？'],
  ['What is DIFC / ADGM?', 'DIFC・ADGMとは？'],
  ['What is CFC substance?', 'CFC実体基準とは？'],
];

export function Insights() {
  const { t } = useLang();
  return (
    <section className="blk tint" id="insights">
      <div className="wrap">
        <div className="head">
          <div className="ey">{t('Insights & Education', 'インサイト＆教育')}</div>
          <h2 className="sec">{t('The wealth-preservation library', '資産保全ライブラリー')}</h2>
          <p className="lead">{t(
            'Short, plain-language videos — the essentials, in five to ten minutes each. New topics added continuously.',
            '5〜10分の短い動画で、要点をわかりやすく。トピックは随時追加します。',
          )}</p>
        </div>

        {/* core library — 5 priority videos */}
        <div className="ins ins5">
          {VIDEOS.map(([img, tEn, tJa, dur, hEn, hJa]) => (
            <div className="vid" key={hEn}>
              <div className="thumb" style={{ backgroundImage: `url('${img}')` }}>
                <div className="play" />
                <span className="vdur">{dur}</span>
              </div>
              <div className="b">
                <div className="t">{t(tEn, tJa)}</div>
                <h4>{t(hEn, hJa)}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* "What is…?" explainer series */}
        <div className="explain">
          <div className="explain-h">{t('Two-minute explainers', '2分でわかる用語解説')}</div>
          <div className="explain-grid">
            {EXPLAINERS.map(([en, ja]) => (
              <a className="explain-chip" href="#contact" key={en}>
                <span className="ec-play">▶</span>
                <span>{t(en, ja)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
