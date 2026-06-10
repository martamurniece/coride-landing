'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { CALENDLY_URL } from '@/lib/constants';
import { Nav, type NavProps } from './Nav';

export function PartnersNav(props: Omit<NavProps, 'activeLink' | 'ctaHref' | 'ctaLabel' | 'ctaExternal'>) {
  const { t } = useLocale();

  return (
    <Nav
      activeLink="partners"
      ctaHref={CALENDLY_URL}
      ctaLabel={t.nav.becomePartner}
      ctaExternal
      {...props}
    />
  );
}
