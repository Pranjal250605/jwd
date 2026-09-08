'use client';

import { useLocale } from 'next-intl';

export function EcosystemFlower() {
  const locale = useLocale();
  const ja = locale === 'ja';

  return (
    <section id="group" className="relative overflow-hidden bg-[#FAF8F5] py-24 lg:py-32">
      <div className="relative mx-auto max-w-screen-xl px-7 text-center lg:px-12">
        <div className="mb-10 flex flex-col items-center gap-3">
          <span className="text-sm uppercase tracking-[0.38em] text-[#b6892d]">
            {ja ? 'JWDグループ' : 'The JWD Group'}
          </span>
          <h2 className="font-jp text-3xl font-extrabold text-[#0b2a5b] lg:text-[2.6rem]">
            {ja ? 'ひとつのグループとして' : 'One group, moving as one'}
          </h2>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-sumi-soft">
            {ja
              ? 'ファミリーオフィスを中核に、投資・不動産・旅行の各社がひとつのグループとして連携します。'
              : 'The Family Office sits at the hub — investment, real estate, AI technology and travel companies working together around it.'}
          </p>
        </div>

        {/* 5-Petal Venn Diagram */}
        <div className="relative mx-auto mt-8 aspect-[1/0.88] w-full max-w-[680px]">
          {/* Top Petal: Family Office */}
          <div className="absolute left-[25%] top-0 flex h-[52%] w-[50%] flex-col items-center justify-start rounded-full border border-[#b6892d]/30 bg-[#e4dcc4]/55 pt-[5%] text-center mix-blend-multiply transition-all hover:brightness-95">
            <span className="font-sans text-[clamp(12px,1.7vw,16px)] font-bold leading-tight text-[#0b2a5b]">
              Japan Worldlink<br />DWC-LLC
            </span>
            <span className="mt-1 text-[clamp(9px,1.1vw,11px)] tracking-wider text-sumi-soft">
              {ja ? 'ファミリーオフィス' : 'Family Office'}
            </span>
          </div>

          {/* Top-Left Petal: JWD INVESTMENT */}
          <div className="absolute left-[1%] top-[21%] flex h-[52%] w-[50%] flex-col items-center justify-center rounded-full border border-[#5aa0b4]/30 bg-[#b9d7e1]/55 pb-[6%] pr-[16%] text-center mix-blend-multiply transition-all hover:brightness-95">
            <span className="font-sans text-[clamp(12px,1.7vw,16px)] font-bold leading-tight text-[#0b2a5b]">
              JWD INVESTMENT
            </span>
            <span className="mt-1 text-[clamp(9px,1.1vw,11px)] tracking-wider text-sumi-soft">
              {ja ? 'インベストメント' : 'Investment'}
            </span>
          </div>

          {/* Bottom-Left Petal: EDIFY Japan */}
          <div className="absolute bottom-[1%] left-[10%] flex h-[52%] w-[50%] flex-col items-center justify-center rounded-full border border-[#6e7dc3]/30 bg-[#afb9e1]/55 pr-[12%] pt-[10%] text-center mix-blend-multiply transition-all hover:brightness-95">
            <span className="font-sans text-[clamp(12px,1.7vw,16px)] font-bold leading-tight text-[#0b2a5b]">
              EDIFY Japan
            </span>
            <span className="mt-1 text-[clamp(9px,1.1vw,11px)] tracking-wider text-sumi-soft">
              {ja ? 'AI テクノロジー' : 'AI Technology'}
            </span>
          </div>

          {/* Bottom-Right Petal: JWD Luna Travel */}
          <div className="absolute bottom-[1%] right-[10%] flex h-[52%] w-[50%] flex-col items-center justify-center rounded-full border border-[#c891aa]/30 bg-[#ebd7d9]/55 pl-[12%] pt-[10%] text-center mix-blend-multiply transition-all hover:brightness-95">
            <span className="font-sans text-[clamp(12px,1.7vw,16px)] font-bold leading-tight text-[#0b2a5b]">
              JWD Luna Travel<br />& Tourism LLC
            </span>
            <span className="mt-1 text-[clamp(9px,1.1vw,11px)] tracking-wider text-sumi-soft">
              {ja ? 'トラベル' : 'Travel'}
            </span>
          </div>

          {/* Top-Right Petal: ANAWAK Real Estate */}
          <div className="absolute right-[1%] top-[21%] flex h-[52%] w-[50%] flex-col items-center justify-center rounded-full border border-[#968cb9]/30 bg-[#c8c3dc]/55 pb-[6%] pl-[16%] text-center mix-blend-multiply transition-all hover:brightness-95">
            <span className="font-sans text-[clamp(12px,1.7vw,16px)] font-bold leading-tight text-[#0b2a5b]">
              ANAWAK Real<br />Estate L.L.C
            </span>
            <span className="mt-1 text-[clamp(9px,1.1vw,11px)] tracking-wider text-sumi-soft">
              {ja ? '不動産' : 'Real Estate'}
            </span>
          </div>

          {/* Center Core Hub */}
          <div className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[32%] min-w-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[3px] border-[#e2e4e8] bg-white p-2.5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-center leading-none">
              <span className="font-sans text-xl font-extrabold tracking-wide text-[#0b2a5b]">
                JWD
              </span>
              <span className="mt-1.5 whitespace-nowrap text-[7.5px] font-semibold tracking-wider text-sumi-soft">
                JAPAN WORLDLINK DWC GROUP
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
