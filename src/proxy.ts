import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/i18n/types';

const PATHNAME_HAS_LOCALE = new RegExp(`^/(${LOCALES.join('|')})(?:/|$)`);

/**
 * Pick a locale from the Accept-Language header. Looks at the languages in
 * priority order and returns the first supported one, ignoring q-values
 * (the browser already orders entries by preference).
 */
function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language');
  if (!header) return DEFAULT_LOCALE;

  const tags = header
    .split(',')
    .map((entry) => entry.trim().split(';')[0].toLowerCase())
    .filter(Boolean);

  for (const tag of tags) {
    const primary = tag.split('-')[0];
    if ((LOCALES as string[]).includes(primary)) {
      return primary as Locale;
    }
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PATHNAME_HAS_LOCALE.test(pathname)) return;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - Next.js internals (_next/*)
     * - locale-free public files (sitemap, robots, favicons, OG image)
     * - the /assets/* asset directory
     * - any path that contains a file extension (catches future static assets)
     */
    '/((?!api|_next|assets|favicon\\.ico|apple-touch-icon\\.png|og-image\\.png|sitemap\\.xml|robots\\.txt|.*\\..*).*)',
  ],
};
