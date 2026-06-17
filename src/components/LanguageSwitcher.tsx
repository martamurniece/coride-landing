'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/i18n/LocaleProvider';
import { LOCALES, type Locale } from '@/i18n/types';

const OPTIONS: { id: Locale; label: string }[] = LOCALES.map((id) => ({
  id,
  label: id.toUpperCase(),
}));

const LOCALE_PREFIX = new RegExp(`^/(?:${LOCALES.join('|')})(?=/|$)`);

export function LanguageSwitcher() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const swap = (next: Locale) => {
    if (next === locale) return;
    const rest = pathname.replace(LOCALE_PREFIX, '');
    router.push(`/${next}${rest || ''}`);
  };

  return (
    <div className="lang" role="group" aria-label="Language">
      {OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={locale === id ? 'on' : undefined}
          aria-pressed={locale === id}
          onClick={() => swap(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
