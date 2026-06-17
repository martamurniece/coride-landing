import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Problem } from '@/components/Problem';
import { HowItWorks } from '@/components/HowItWorks';
import { SignupForm } from '@/components/SignupForm';
import { Footer } from '@/components/Footer';
import { RouteSwitch } from '@/components/RouteSwitch';
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
  const m = messages[locale].meta;
  return buildPageMetadata({
    locale,
    path: '/',
    title: m.title,
    description: m.description,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="page">
      <Nav />
      <RouteSwitch />
      <Hero />
      <Problem />
      <HowItWorks />
      <SignupForm />
      <Footer />
    </div>
  );
}
