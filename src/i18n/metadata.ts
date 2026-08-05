import type { Metadata } from 'next';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './types';

export const BASE_URL = 'https://coride.org';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  lv: 'lv_LV',
};

/** Build the canonical URL for `path` ('/', '/employers', …) under `locale`. */
export function localeUrl(locale: Locale, path: string): string {
  const suffix = path === '/' ? '' : path;
  return `${BASE_URL}/${locale}${suffix}`;
}

/** Build the in-app pathname for `path` under `locale` (no origin). */
export function localePath(locale: Locale, path: string): string {
  const suffix = path === '/' ? '' : path;
  return `/${locale}${suffix}`;
}

interface PageMetadataInput {
  /** Active locale. */
  locale: Locale;
  /** Logical path with no locale prefix. Use '/' for the homepage. */
  path: string;
  title: string;
  description: string;
}

/**
 * Per-page metadata for a localized route. Sets the canonical URL to the
 * current locale's full URL, declares all locale variants as hreflang
 * alternates, and mirrors og:locale / og:alternateLocale to match.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  const canonical = localeUrl(locale, path);

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = localeUrl(l, path);
  }
  // x-default: the version served to visitors whose language we don't cover.
  // The proxy falls back to English, so it points at the /en URL.
  languages['x-default'] = localeUrl(DEFAULT_LOCALE, path);

  const alternateLocale = LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Coride',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      locale: OG_LOCALE[locale],
      alternateLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}
