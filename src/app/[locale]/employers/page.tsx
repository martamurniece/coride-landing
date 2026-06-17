import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { EmployersContent } from '@/components/EmployersContent';
import { EmployersNav } from '@/components/EmployersNav';
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
  const m = messages[locale].employers.meta;
  return buildPageMetadata({
    locale,
    path: '/employers',
    title: m.title,
    description: m.description,
  });
}

export default async function EmployersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="page employersPage">
      <EmployersNav />
      <EmployersContent />
      <Footer />
    </div>
  );
}
