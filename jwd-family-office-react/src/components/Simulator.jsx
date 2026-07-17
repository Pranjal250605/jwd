import { useState } from 'react';
import { useLang } from '../i18n.jsx';

/** Japan inheritance-tax brackets (per statutory share, values in ¥M). */
const BRACKETS = [
  [10, 0.10, 0], [30, 0.15, 0.5], [50, 0.20, 2], [100, 0.30, 7],
  [200, 0.40, 17], [300, 0.45, 27], [600, 0.50, 42], [Infinity, 0.55, 72],
];
const shareTax = (s) => {
  for (const [cap, rate, ded] of BRACKETS) if (s <= cap) return Math.max(0, s * rate - ded);
};
const oku = (m) => (m / 100).toLocaleString('en-US', { maximumFractionDigits: 1 });

const TABS = [
  ['tax', 'M9 7h6M9 11h6M9 15h4M6 3h12v18l-3-2-3 2-3-2-3 2z', 'Inheritance Tax', '相続税'],
  ['grow', 'M4 19V5M4 19h16M8 15l3-4 3 2 5-7M21 6h-4M21 6v4', 'Wealth Growth', '資産成長'],
  ['fx', 'M8 10h8M8 14h8M12 6v12', 'Currency Risk', '為替リスク'],
];

function Slider({ label, min, max, step, value, onChange, lo, hi }) {
  return (
    <div className="ctrl2">
      <label>{label}</label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
      <div className="minmax"><span>{lo}</span><span>{hi}</span></div>
    </div>
  );
}

export function Simulator() {
  const { t } = useLang();
  const [tab, setTab] = useState('tax');
  const [est, setEst] = useState(1000);   // ¥M
  const [heirs, setHeirs] = useState(3);
  const [init, setInit] = useState(1000); // ¥M
  const [yrs, setYrs] = useState(15);
  const [amt, setAmt] = useState(1000);   // ¥M
  const [dep, setDep] = useState(2);      // %/yr

  let label, big, sub, negative = false;
  if (tab === 'tax') {
    const taxable = Math.max(0, est - (30 + 6 * heirs));
    const tax = Math.round(shareTax(taxable / heirs) * heirs);
    const eff = est ? Math.round((tax / est) * 100) : 0;
    label = t('Estimated Japanese inheritance tax', '相続税の概算（日本）');
    big = `−¥${oku(tax)}億`;
    negative = true;
    sub = (
      <>
        {t(`On a ¥${oku(est)}億 estate with ${heirs} heir${heirs > 1 ? 's' : ''} · effective ~${eff}%`,
           `総資産¥${oku(est)}億・相続人${heirs}人 · 実効税率 約${eff}%`)}
        {' · '}
        {t('with a JWD Dubai structure: ', 'JWDのドバイ・ストラクチャーなら')}
        <b>{t('potentially → ¥0', '実質¥0の可能性')}</b>
      </>
    );
  } else if (tab === 'grow') {
    const dom = init * Math.pow(1.035, yrs);
    const ovs = init * Math.pow(1.065 * 1.01, yrs);
    label = t(`Projected value after ${yrs} years`, `${yrs}年後の資産推計`);
    big = `¥${oku(ovs)}億`;
    sub = (
      <>
        {t('Global strategy vs ', '海外運用の場合。国内運用は')}
        <b>¥{oku(dom)}億</b>
        {t(` domestic — a difference of ¥${oku(ovs - dom)}億`, ` — 差額 ¥${oku(ovs - dom)}億`)}
      </>
    );
  } else {
    const left = amt * Math.pow(1 - dep / 100, 10);
    label = t('Purchasing power after 10 years', '10年後の購買力');
    big = `¥${oku(left)}億`;
    negative = dep > 0;
    sub = dep ? (
      <>
        {t(`Un-hedged yen assets of ¥${oku(amt)}億 lose `, `¥${oku(amt)}億の円資産は、年${dep}%の円安で`)}
        <b style={{ color: '#b3432f' }}>−¥{oku(amt - left)}億</b>
        {t(` of global purchasing power at ${dep}%/yr`, 'の国際購買力を失います')}
      </>
    ) : t('No depreciation assumed — move the slider to stress-test the yen',
          '円安率0%の想定です——スライダーを動かして円リスクを確認してください');
  }

  return (
    <section className="blk sim" id="simulator" style={{ background: 'var(--tint-2)' }}>
      <div className="head center" style={{ padding: '0 28px' }}>
        <div className="ey" style={{ color: 'var(--muted)', fontWeight: 500, letterSpacing: '.08em', textTransform: 'none' }}>
          {t('Wealth Simulator', '資産シミュレーター')}
        </div>
        <h2 className="sec" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, letterSpacing: '-.02em' }}>
          {t("Planning your legacy? Estimate what's at stake", '資産承継をお考えですか？失われる額を試算しましょう')}
        </h2>
      </div>
      <div className="wrap2">
        <div>
          <div className="simtabs">
            {TABS.map(([id, d, en, ja]) => (
              <button key={id} className={`simtab ${tab === id ? 'on' : ''}`} onClick={() => setTab(id)}>
                <svg viewBox="0 0 24 24">{id === 'fx' && <circle cx="12" cy="12" r="9" />}<path d={d} /></svg>
                {t(en, ja)}
              </button>
            ))}
          </div>

          {tab === 'tax' && (
            <div className="simpane on">
              <Slider label={t('Total family estate', '一族の総資産')} min={100} max={3000} step={50} value={est} onChange={setEst} lo="¥1億" hi="¥30億" />
              <Slider label={t('Number of statutory heirs', '法定相続人の数')} min={1} max={6} step={1} value={heirs} onChange={setHeirs} lo="1" hi="6" />
              <p className="fine">{t(
                "Illustrative estimate using Japan's progressive inheritance-tax brackets (10–55%) and the basic deduction (¥30M + ¥6M × heirs), assuming equal statutory shares. Actual liability varies — consult a licensed tax professional.",
                '日本の相続税の累進税率（10〜55%）と基礎控除（3,000万円＋600万円×法定相続人数）に基づく概算です（法定相続分で均等按分と仮定）。実際の税額は異なります。税理士にご相談ください。',
              )}</p>
            </div>
          )}
          {tab === 'grow' && (
            <div className="simpane on">
              <Slider label={t('Initial assets', '初期資産')} min={100} max={3000} step={50} value={init} onChange={setInit} lo="¥1億" hi="¥30億" />
              <Slider label={t('Investment horizon', '運用年数')} min={5} max={30} step={1} value={yrs} onChange={setYrs} lo={t('5 years', '5年')} hi={t('30 years', '30年')} />
              <p className="fine">{t(
                'Compares 3.5% p.a. domestic with 6.5% p.a. global (plus 1% annual yen-depreciation effect). Simple compounding, before fees and tax; not a guarantee of returns.',
                '国内運用3.5%と海外運用6.5%（年率、円安効果1%を加味）を単純複利で比較。手数料・税引前であり、将来の成果を保証するものではありません。',
              )}</p>
            </div>
          )}
          {tab === 'fx' && (
            <div className="simpane on">
              <Slider label={t('Yen-denominated assets', '円建て資産')} min={100} max={3000} step={50} value={amt} onChange={setAmt} lo="¥1億" hi="¥30億" />
              <Slider label={t('Annual yen depreciation', '円安率（年率）')} min={0} max={5} step={0.5} value={dep} onChange={setDep} lo="0%" hi={t('5% / yr', '5% / 年')} />
              <p className="fine">{t(
                'Shows the loss of global purchasing power of un-hedged yen assets over 10 years at the selected depreciation rate. The yen weakened roughly 30% against the USD from 2020–2024.',
                'ヘッジなしの円資産が、選択した円安率で10年間にどれだけ国際購買力を失うかを示します。2020〜2024年に円は対米ドルで約30%下落しました。',
              )}</p>
            </div>
          )}
        </div>

        <div className="simcard">
          <div className="res">
            <div className="t3">{label}</div>
            <div className="big3">{negative ? <span className="neg">{big}</span> : big}</div>
            <div className="sub3">{sub}</div>
            <a href="#contact" className="btn btn-primary">{t('Book a consultation now', '今すぐ相談を予約する')}</a>
            <a className="lnk" href="#strategies">{t('See the three strategies ›', '3つの戦略を見る ›')}</a>
          </div>
          <div className="tip">
            <div className="bulb">
              <svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 014 10c-.7.6-1 1.4-1 2H9c0-.6-.3-1.4-1-2a6 6 0 014-10z" /></svg>
            </div>
            <div className="tt">{t('Plan early — the 10-year rule takes time', '早めの設計を——10年ルールには時間が必要です')}</div>
            <a href="#strategies">{t('Read more ›', '詳しく見る ›')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
