import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PrivacyContent } from '@/components/PrivacyContent';
import { messages } from '@/i18n/messages';
import { isLocale } from '@/i18n/types';
import { buildPageMetadata } from '@/i18n/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = messages[locale].privacy.meta;
  return buildPageMetadata({
    locale,
    path: '/privacy',
    title: m.title,
    description: m.description,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="page">
      <Nav />
      <PrivacyContent />
      <Footer />
    </div>
  );
}
