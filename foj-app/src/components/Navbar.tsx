import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import jwdLogo from '../jwdlogo.png';

const LogoMark = ({ nameColor, subColor }: { nameColor: string; subColor: string }) => (
  <Link to="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
    <div style={{ width: '44px', height: '44px', overflow: 'hidden', flexShrink: 0 }}>
      <img src={jwdLogo} alt="JWD" style={{ height: '44px', width: 'auto', display: 'block' }} />
    </div>
    <div className="flex flex-col" style={{ gap: '2px' }}>
      <span className="font-headline" style={{ fontWeight: 700, fontSize: '1rem', color: nameColor, letterSpacing: '0.05em', lineHeight: 1 }}>JWD</span>
      <span className="font-label" style={{ fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: subColor, lineHeight: 1.3 }}>Japan WorldLink DWC Group</span>
    </div>
  </Link>
);

export function navHref(link: string): string {
  switch (link) {
    case '法人設立': return '/company-formation';
    case 'ライセンス取得': return '/license-acquisition';
    case 'VISA取得': return '/visa-acquisition';
    case 'エミレーツID取得': return '/emirates-id-acquisition';
    case '法人銀行口座開設': return '/corporate-bank-account';
    case '個人銀行口座開設': return '/personal-bank-account';
    case '税務署登録': return '/tax-registration';
    case '会計監査': return '/accounting-audit';
    default: return '/';
  }
}

function NavLink({ link, style, className, onMouseEnter, onMouseLeave }: {
  link: string;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const href = navHref(link);
  return (
    <Link to={href} style={style} className={className}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {link}
    </Link>
  );
}

export const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const { companyName, tagline, notice, navLinks } = siteContent.global;

  if (theme === 'formal') {
    return (
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md"
        style={{ background: 'rgba(240,235,226,0.88)', borderBottom: '1px solid rgba(0,17,58,0.07)', boxShadow: '0 8px 32px rgba(0,17,58,0.06)' }}>
        <div className="flex justify-between items-center px-8 lg:px-12 py-5 max-w-screen-2xl mx-auto">
          <LogoMark nameColor="#00113a" subColor="rgba(0,17,58,0.5)" />
          <div className="hidden md:flex items-center gap-6 lg:gap-8 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = pathname === navHref(link) || (pathname === '/' && link === '法人設立');
              return (
                <NavLink
                  key={link}
                  link={link}
                  className="font-label text-[10px] uppercase tracking-widest transition-all duration-300 hover:text-[#00113a] whitespace-nowrap"
                  style={{
                    color: isActive ? '#00113a' : '#7a7060',
                    fontWeight: isActive ? 600 : 400,
                    borderBottom: isActive ? '2px solid #cca830' : 'none',
                    paddingBottom: isActive ? '2px' : '0',
                  }}
                />
              )
            })}
          </div>
          <div className="hidden lg:flex flex-col items-end shrink-0 ml-4">
            <p className="font-label text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: '#cca830' }}>完全紹介制</p>
            <p className="font-label text-[8px] tracking-widest uppercase" style={{ color: '#9a8c6e' }}>Referral Required</p>
          </div>
        </div>
      </nav>
    );
  }

  if (theme === 'luxurious') {
    return (
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl"
        style={{ background: 'rgba(10,10,10,0.8)', borderBottom: '1px solid rgba(233,193,118,0.08)' }}>
        <div className="flex justify-between items-center px-8 lg:px-12 py-5 max-w-screen-2xl mx-auto">
          <LogoMark nameColor="#e9c176" subColor="rgba(233,193,118,0.45)" />
          <div className="hidden md:flex gap-6 lg:gap-8 items-center overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = pathname === navHref(link) || (pathname === '/' && link === '法人設立');
              return (
                <NavLink
                  key={link}
                  link={link}
                  className="font-label text-[10px] tracking-widest uppercase transition-all duration-300 hover:text-[#c5a059] whitespace-nowrap"
                  style={{
                    color: isActive ? '#e9c176' : '#6b6050',
                    borderBottom: isActive ? '1px solid rgba(233,193,118,0.35)' : 'none',
                    paddingBottom: isActive ? '2px' : '0',
                  }}
                />
              )
            })}
          </div>
          <div className="hidden lg:flex items-center gap-3 shrink-0 ml-4">
            <div className="w-[1px] h-5" style={{ background: 'linear-gradient(to bottom, transparent, #4e4639, transparent)' }}></div>
            <span className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: '#4e4639' }}>完全紹介制</span>
          </div>
        </div>
      </nav>
    );
  }

  if (theme === 'pavilion') {
    return (
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl"
        style={{ background: 'rgba(8,6,4,0.92)', borderBottom: '1px solid rgba(196,134,42,0.15)' }}>
        <div className="absolute top-0 left-0 right-0 flex items-center" style={{ height: '2px' }}>
          <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, transparent, #c4862a)' }}></div>
          <div className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ background: '#c4862a' }}></div>
          <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, #c4862a, transparent)' }}></div>
        </div>
        <div className="flex justify-between items-center px-8 lg:px-12 py-5 max-w-screen-2xl mx-auto">
          <LogoMark nameColor="#c4862a" subColor="rgba(196,134,42,0.4)" />
          <div className="hidden md:flex gap-6 lg:gap-8 items-center overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = pathname === navHref(link) || (pathname === '/' && link === '法人設立');
              return (
                <NavLink
                  key={link}
                  link={link}
                  className="font-label text-[10px] tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: isActive ? '#c4862a' : '#5a4030',
                    borderBottom: isActive ? '1px solid rgba(196,134,42,0.4)' : 'none',
                    paddingBottom: isActive ? '2px' : '0',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#9a8878'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#5a4030'; }}
                />
              )
            })}
          </div>
          <div className="hidden lg:flex items-center gap-3 shrink-0 ml-4">
            <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(196,134,42,0.3)' }}></div>
            <span className="font-label text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(196,134,42,0.35)' }}>完全紹介制</span>
            <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(196,134,42,0.3)' }}></div>
          </div>
        </div>
      </nav>
    );
  }

  if (theme === 'sovereign') {
    return (
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl"
        style={{ background: 'rgba(4,13,30,0.93)', borderBottom: '1px solid rgba(212,175,55,0.18)' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, transparent 100%)' }}></div>
        <div className="flex justify-between items-center px-8 lg:px-12 py-5 max-w-screen-2xl mx-auto">
          <LogoMark nameColor="#d4af37" subColor="rgba(212,175,55,0.45)" />
          <div className="hidden md:flex gap-6 lg:gap-8 items-center overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = pathname === navHref(link) || (pathname === '/' && link === '法人設立');
              return (
                <NavLink
                  key={link}
                  link={link}
                  className="font-label text-[10px] tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: isActive ? '#d4af37' : '#4a6090',
                    borderBottom: isActive ? '1px solid rgba(212,175,55,0.5)' : 'none',
                    paddingBottom: isActive ? '2px' : '0',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#8fa4c0'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#4a6090'; }}
                />
              )
            })}
          </div>
          <div className="hidden lg:flex items-center gap-3 shrink-0 ml-4">
            <div className="w-[1px] h-6" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.4), transparent)' }}></div>
            <span className="font-label text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(212,175,55,0.45)' }}>完全紹介制</span>
          </div>
        </div>
      </nav>
    );
  }

  // zen
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg"
      style={{
        background: 'rgba(250,249,245,0.78)',
        borderBottom: '1px solid rgba(119,90,25,0.09)',
        boxShadow: '0 1px 24px rgba(47,52,46,0.05)',
      }}>
      <div className="flex justify-between items-center px-8 lg:px-12 py-5 w-full max-w-screen-2xl mx-auto">
        <LogoMark nameColor="#2f342e" subColor="rgba(119,90,25,0.55)" />
        <div className="hidden md:flex items-center gap-6 lg:gap-8 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = pathname === navHref(link) || (pathname === '/' && link === '法人設立');
            return (
              <NavLink key={link} link={link}
                className="font-label text-[10px] tracking-widest uppercase transition-all duration-400 whitespace-nowrap"
                style={{
                  color: isActive ? '#775a19' : '#9a9590',
                  borderBottom: isActive ? '1px solid rgba(119,90,25,0.4)' : 'none',
                  paddingBottom: isActive ? '2px' : '0',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#5c605a'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#9a9590'; }}
              />
            )
          })}
        </div>
        <div className="hidden lg:flex flex-col items-end shrink-0 ml-4">
          <p className="font-headline text-[9px] tracking-[0.3em]" style={{ color: '#775a19', opacity: 0.7 }}>完全紹介制</p>
          <p className="font-label text-[8px] tracking-widest uppercase" style={{ color: '#afb3ac' }}>Referral Only</p>
        </div>
      </div>
    </nav>
  );
};
