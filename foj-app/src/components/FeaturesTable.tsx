import React from 'react';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';

export const FeaturesTable: React.FC = () => {
  const { theme } = useTheme();
  const { features } = siteContent.sections;

  if (theme === 'formal') {
    return (
      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <h2 className="font-headline text-3xl md:text-4xl leading-tight mb-16 text-center text-[#00113a]">{features.title}</h2>
          <div className="overflow-x-auto pb-8">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 gap-4 mb-4 border-b border-[#c5c6d2]/50 pb-4 px-2">
                {features.headers.map((header, idx) => (
                  <div key={idx} className={`font-label text-xs uppercase tracking-widest ${idx === 1 ? 'text-[#00113a] font-bold' : 'text-[#444650]'}`}>
                    {header}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {features.rows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-4 py-8 border-b border-[#c5c6d2]/20 hover:bg-surface transition-colors px-2">
                    <div className="font-label text-sm text-[#444650] font-medium">{row.label}</div>
                    <div className="bg-surface-container-highest p-6 shadow-sm border-l-2 border-[#00113a]/50">
                      <ul className="space-y-3">
                        {row.fo.map((item, i) => (
                          <li key={i} className="font-sans text-sm text-on-surface leading-loose">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 text-[#444650] opacity-80">
                      <ul className="space-y-3">
                        {row.general.map((item, i) => (
                          <li key={i} className="font-sans text-sm leading-loose">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 text-[#444650] opacity-80">
                      <ul className="space-y-3">
                        {row.private.map((item, i) => (
                          <li key={i} className="font-sans text-sm leading-loose">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (theme === 'luxurious') {
    return (
      <section className="py-16 bg-surface-container">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <h2 className="font-headline text-3xl mb-12 text-on-surface">{features.title}</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[700px] space-y-0">
              <div className="grid grid-cols-4 gap-4 border-b border-outline-variant/30 pb-4 mb-4">
                {features.headers.map((header, idx) => (
                  <div key={idx} className={`font-label text-xs uppercase tracking-widest ${idx === 1 ? 'text-[#e9c176]' : 'text-on-surface-variant'}`}>
                    {header}
                  </div>
                ))}
              </div>
              {features.rows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-4 py-6 border-b border-outline-variant/10">
                  <div className="font-label text-sm text-on-surface-variant font-medium">{row.label}</div>
                  <div className="border-l-2 border-[#e9c176]/50 pl-4">
                    {row.fo.map((item, i) => (
                      <p key={i} className="font-sans text-sm text-on-surface leading-relaxed">{item}</p>
                    ))}
                  </div>
                  <div className="text-on-surface-variant opacity-70">
                    {row.general.map((item, i) => (
                      <p key={i} className="font-sans text-sm leading-relaxed">{item}</p>
                    ))}
                  </div>
                  <div className="text-on-surface-variant opacity-70">
                    {row.private.map((item, i) => (
                      <p key={i} className="font-sans text-sm leading-relaxed">{item}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (theme === 'pavilion') {
    return (
      <section className="py-28 relative overflow-hidden" style={{ background: '#140e06' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(196,134,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-5 mb-14">
            <div className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ background: '#c4862a', opacity: 0.55 }}></div>
            <h2 className="font-headline" style={{ fontWeight: 100, fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#f0e8d8' }}>
              {features.title}
            </h2>
            <div className="flex-grow h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(196,134,42,0.3), transparent)' }}></div>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 gap-4 pb-4 mb-2 px-2"
                style={{ borderBottom: '1px solid rgba(196,134,42,0.18)' }}>
                {features.headers.map((header, idx) => (
                  <div key={idx} className="font-label text-xs uppercase tracking-widest"
                    style={{ color: idx === 1 ? '#c4862a' : '#5a4030' }}>
                    {header}
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {features.rows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-4 py-7 px-2"
                    style={{ borderBottom: '1px solid rgba(42,28,10,0.8)' }}>
                    <div className="font-label text-sm font-medium" style={{ color: '#9a8878' }}>{row.label}</div>
                    <div className="pl-4" style={{ borderLeft: '2px solid rgba(196,134,42,0.4)' }}>
                      {row.fo.map((item, i) => (
                        <p key={i} className="font-sans text-sm leading-loose" style={{ color: '#d4c0a0' }}>{item}</p>
                      ))}
                    </div>
                    <div>
                      {row.general.map((item, i) => (
                        <p key={i} className="font-sans text-sm leading-loose" style={{ color: '#5a4030' }}>{item}</p>
                      ))}
                    </div>
                    <div>
                      {row.private.map((item, i) => (
                        <p key={i} className="font-sans text-sm leading-loose" style={{ color: '#5a4030' }}>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (theme === 'sovereign') {
    return (
      <section className="py-28 relative overflow-hidden" style={{ background: '#061025' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }}></div>
            <h2 className="font-headline" style={{ fontWeight: 100, fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#f0ece6' }}>
              {features.title}
            </h2>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 pb-4 mb-2 px-2"
                style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
                {features.headers.map((header, idx) => (
                  <div key={idx} className={`font-label text-xs uppercase tracking-widest ${idx === 1 ? 'text-[#d4af37]' : ''}`}
                    style={{ color: idx === 1 ? '#d4af37' : '#4a6090' }}>
                    {header}
                  </div>
                ))}
              </div>
              {/* Rows */}
              <div className="space-y-2">
                {features.rows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-4 py-7 px-2"
                    style={{ borderBottom: '1px solid rgba(30,51,88,0.5)' }}>
                    <div className="font-label text-sm font-medium" style={{ color: '#8fa4c0' }}>{row.label}</div>
                    <div className="pl-4" style={{ borderLeft: '2px solid rgba(212,175,55,0.45)' }}>
                      {row.fo.map((item, i) => (
                        <p key={i} className="font-sans text-sm leading-loose" style={{ color: '#c8d4e8' }}>{item}</p>
                      ))}
                    </div>
                    <div>
                      {row.general.map((item, i) => (
                        <p key={i} className="font-sans text-sm leading-loose" style={{ color: '#4a6090' }}>{item}</p>
                      ))}
                    </div>
                    <div>
                      {row.private.map((item, i) => (
                        <p key={i} className="font-sans text-sm leading-loose" style={{ color: '#4a6090' }}>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // zen
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-12">
        <h2 className="font-headline text-3xl font-light mb-12 text-[#2f342e] tracking-wide">{features.title}</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-4 gap-4 border-b border-[#afb3ac]/40 pb-4 mb-4">
              {features.headers.map((header, idx) => (
                <div key={idx} className={`font-label text-xs uppercase tracking-widest ${idx === 1 ? 'text-[#775a19] font-semibold' : 'text-[#787c75]'}`}>
                  {header}
                </div>
              ))}
            </div>
            {features.rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-4 py-8 border-b border-[#afb3ac]/20">
                <div className="font-label text-sm text-[#5c605a] font-medium">{row.label}</div>
                <div className="border-l-2 border-[#775a19]/40 pl-4">
                  {row.fo.map((item, i) => (
                    <p key={i} className="font-body text-sm text-[#2f342e] leading-relaxed">{item}</p>
                  ))}
                </div>
                <div className="text-[#5c605a] opacity-80">
                  {row.general.map((item, i) => (
                    <p key={i} className="font-body text-sm leading-relaxed">{item}</p>
                  ))}
                </div>
                <div className="text-[#5c605a] opacity-80">
                  {row.private.map((item, i) => (
                    <p key={i} className="font-body text-sm leading-relaxed">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
