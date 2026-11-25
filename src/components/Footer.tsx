'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';
import { localePath } from '@/i18n/metadata';
import { LanguageSwitcher } from './LanguageSwitcher';

const LINKEDIN_URL = 'https://www.linkedin.com/company/corideapp';

export function Footer({ showSupport = true }: { showSupport?: boolean } = {}) {
  const { t, locale } = useLocale();

  return (
    <footer className="footer" id="footer">
      <div className="footMain">
        <div className="footBrand">
          <Link className="footWord" href={localePath(locale, '/')} aria-label={t.footer.homeAria}>
            Coride
          </Link>
          <a className="footEmail" href="mailto:info@coride.org">info@coride.org</a>
        </div>
        <nav className="footLegal" aria-label={t.footer.legal}>
          <span className="footColLabel">{t.footer.legal}</span>
          <a href={localePath(locale, '/privacy')}>{t.footer.privacy}</a>
        </nav>
      </div>

      <div className="footBar">
        <span className="footCopy">© 2026 Coride</span>
        <div className="footBarRight">
          <a className="footLinkedIn" href={LINKEDIN_URL} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="footSupport">
        {showSupport && (
          <>
            <span className="footSupportLabel">{t.footer.supportedBy}</span>
            <Image
              className="footRtu"
              src="/assets/rtu-logo.png"
              alt="RTU Innovations"
              width={530}
              height={343}
            />
          </>
        )}
        {/* Required on Simple Analytics' free plan: keep the link intact. */}
        <a
          className="footBadge"
          href="https://www.simpleanalytics.com/?utm_source=coride.org&utm_content=badge"
          referrerPolicy="origin"
          target="_blank"
          rel="noopener"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://simpleanalyticsbadges.com/coride.org?mode=light&counter=false"
            alt="Simple Analytics"
            loading="lazy"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        </a>
      </div>
    </footer>
  );
}
