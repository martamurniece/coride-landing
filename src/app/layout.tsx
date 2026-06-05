import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import '../styles/globals.css';
import '../styles/nav.css';
import '../styles/hero.css';
import '../styles/problem.css';
import '../styles/how.css';
import '../styles/signup.css';
import '../styles/footer.css';
import '../styles/route.css';

export const metadata: Metadata = {
  title: 'Coride - Co-ride with colleagues',
  description:
    'Employer-gated carpooling for Rīga. Join verified communities, share rides, earn perks from local partners.',
  openGraph: {
    title: 'Coride - Skip traffic. Earn perks. Co-ride with colleagues.',
    description:
      'Join verified communities going on the same routes as you. Drive together and earn perks from our local partners.',
    type: 'website',
    locale: 'en_LV',
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
      </body>
    </html>
  );
}
