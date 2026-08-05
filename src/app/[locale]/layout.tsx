import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { SmoothScroll } from '@/components/SmoothScroll';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { LOCALES, isLocale } from '@/i18n/types';
import OrganizationSchema from '../organization-schema';
import '../../styles/globals.css';
import '../../styles/nav.css';
import '../../styles/hero.css';
import '../../styles/showcase.css';
import '../../styles/problem.css';
import '../../styles/how.css';
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
        {process.env.NODE_ENV === 'production' && (
          <Script
            defer
            data-domain="coride.org"
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
