'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/i18n/LocaleProvider';
import { localePath } from '@/i18n/metadata';
import { LanguageSwitcher } from './LanguageSwitcher';

export type NavProps = {
  activeLink?: 'employers' | 'partners';
  ctaHref?: string;
  ctaLabel?: string;
  ctaExternal?: boolean;
};

export function Nav({ activeLink, ctaHref, ctaLabel, ctaExternal }: NavProps = {}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale } = useLocale();

  const ctaContent = ctaLabel ?? t.nav.joinWaitlist;

  const home = localePath(locale, '/');
  const employers = localePath(locale, '/employers');
  const partners = localePath(locale, '/partners');

  return (
    <nav className="nav">
      <Link className="word" href={home} aria-label={t.nav.homeAria}>
        Coride
      </Link>
      <div className="navRight">
        <div className={`navLinks ${open ? 'navLinksOpen' : ''}`}>
          <Link
            href={home}
            className={pathname === home ? 'current' : undefined}
            onClick={() => setOpen(false)}
          >
            {t.nav.home}
          </Link>
          <Link
            href={employers}
            className={pathname === employers || activeLink === 'employers' ? 'current' : undefined}
            onClick={() => setOpen(false)}
          >
            {t.nav.forEmployers}
          </Link>
          <Link
            href={partners}
            className={pathname === partners || activeLink === 'partners' ? 'current' : undefined}
            onClick={() => setOpen(false)}
          >
            {t.nav.forPartners}
          </Link>
        </div>
        {ctaHref ? (
          <a
            className="navCta"
            href={ctaHref}
            {...(ctaExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {ctaContent}
          </a>
        ) : (
          <button className="navCta" type="button">
            {ctaContent}
          </button>
        )}
        <LanguageSwitcher />
        <button
          className={`navBurger ${open ? 'navBurgerOpen' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label={t.nav.menuAria}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
