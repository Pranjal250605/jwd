import { Link } from '@/i18n/navigation';

export interface Crumb {
  label: string;
  href?: string;
}

/** Slim kintsugi breadcrumb shown under each subsection hero. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-sumi/8 bg-washi"
    >
      <ol className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-x-3 gap-y-1 px-7 py-4 text-[11px] tracking-[0.12em] lg:px-12">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-3">
            {i > 0 && <span className="text-gold/50">/</span>}
            {c.href ? (
              <Link
                href={c.href}
                className="text-sumi-soft uppercase transition-colors hover:text-gold"
              >
                {c.label}
              </Link>
            ) : (
              <span className="uppercase text-sumi/45">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
