import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { PartnersContent } from '@/components/PartnersContent';
import { PartnersNav } from '@/components/PartnersNav';
import { messages } from '@/i18n/messages';
import { isLocale } from '@/i18n/types';
import { buildPageMetadata } from '@/i18n/metadata';
import '@/styles/employers.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = messages[locale].partners.meta;
  return buildPageMetadata({
    locale,
    path: '/partners',
    title: m.title,
    description: m.description,
  });
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    /* .employersPage carries the shared section/grid/metro/band layout system this page reuses. */
    <div className="page employersPage partnersPage">
      <PartnersNav />
      <PartnersContent />
      <Footer />
    </div>
  );
}
