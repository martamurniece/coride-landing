import type { Metadata } from 'next';
import Script from 'next/script';
import { SmoothScroll } from '@/components/SmoothScroll';
import '../styles/globals.css';
import '../styles/nav.css';
import '../styles/hero.css';
import '../styles/problem.css';
import '../styles/how.css';
import '../styles/signup.css';
import '../styles/footer.css';
import '../styles/route.css';
import '../styles/legal.css';

export const metadata: Metadata = {
  title: 'Coride: Skip traffic. Earn perks. Co-ride with colleagues.',
  description:
    'Join verified communities going on the same routes as you. Drive together and earn perks from local partners across Riga.',
  metadataBase: new URL('https://coride.org'),
  openGraph: {
    title: 'Coride',
    description: "Let's ride together.",
    url: 'https://coride.org',
    siteName: 'Coride',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coride',
    description: "Let's ride together.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
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
