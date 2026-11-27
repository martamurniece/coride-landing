import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { SmoothScroll } from '@/components/SmoothScroll';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { LOCALES, isLocale } from '@/i18n/types';
import OrganizationSchema from '../organization-schema';
import '../../styles/globals.css';
import '../../styles/ui.css';
import '../../styles/nav.css';
import '../../styles/signup.css';
import '../../styles/footer.css';
import '../../styles/route.css';
import '../../styles/legal.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://coride.org'),
  // Icons come from the app/ file conventions (favicon.ico, icon.png,
  // apple-icon.png); Next.js emits the <link> tags automatically.
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body>
        <OrganizationSchema />
        <LocaleProvider locale={locale}>
          <SmoothScroll />
          {children}
        </LocaleProvider>
        {/* Simple Analytics (EU-hosted, cookieless). Production deploys only,
            so Vercel preview URLs don't pollute the stats. */}
        {process.env.VERCEL_ENV === 'production' && (
          <Script
            src="https://scripts.simpleanalyticscdn.com/latest.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
