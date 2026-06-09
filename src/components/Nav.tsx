'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Nav() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  return (
    <nav className="nav">
      <Link className="word" href="/" aria-label={t.nav.homeAria}>
        Coride
      </Link>
      <div className="navRight">
        <div className={`navLinks ${open ? 'navLinksOpen' : ''}`}>
          {/* Hidden until the destination pages exist — do not delete. */}
          {/* <a href="#" onClick={() => setOpen(false)}>For employers</a> */}
          {/* <a href="#" onClick={() => setOpen(false)}>For partners</a> */}
        </div>
        <button className="navCta" type="button">
          {t.nav.joinWaitlist}
        </button>
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
