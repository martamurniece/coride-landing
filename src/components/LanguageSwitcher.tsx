'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import type { Locale } from '@/i18n/types';

const OPTIONS: { id: Locale; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'lv', label: 'LV' },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="lang" role="group" aria-label="Language">
      {OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={locale === id ? 'on' : undefined}
          aria-pressed={locale === id}
          onClick={() => setLocale(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
