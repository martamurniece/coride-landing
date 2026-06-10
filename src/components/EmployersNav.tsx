'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';
import { CALENDLY_URL } from '@/lib/constants';
import { Nav, type NavProps } from './Nav';

export function EmployersNav(props: Omit<NavProps, 'activeLink' | 'ctaHref' | 'ctaLabel' | 'ctaExternal'>) {
  const { t } = useLocale();

  return (
    <Nav
      activeLink="employers"
      ctaHref={CALENDLY_URL}
      ctaLabel={t.nav.bookCall}
      ctaExternal
      {...props}
    />
  );
}
