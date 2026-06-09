'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="footer" id="footer">
      <div className="footMain">
        <div className="footBrand">
          <Link className="footWord" href="/" aria-label={t.footer.homeAria}>
            Coride
          </Link>
          <a className="footEmail" href="mailto:info@coride.org">info@coride.org</a>
        </div>
        <nav className="footLegal" aria-label={t.footer.legal}>
          <span className="footColLabel">{t.footer.legal}</span>
          <a href="/privacy">{t.footer.privacy}</a>
        </nav>
      </div>

      <div className="footBar">
        <span className="footCopy">© 2026 Coride</span>
        <div className="footBarRight">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="footSupport">
        <span className="footSupportLabel">{t.footer.supportedBy}</span>
        <Image
          className="footRtu"
          src="/assets/rtu-logo.png"
          alt="RTU Innovations"
          width={530}
          height={343}
        />
      </div>
    </footer>
  );
}
