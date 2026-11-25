import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeProblem } from '@/components/home/HomeProblem';
import { HomeImpact } from '@/components/home/HomeImpact';
import { HomeBackers } from '@/components/home/HomeBackers';
import { HomeHow } from '@/components/home/HomeHow';
import { HomeRoad } from '@/components/home/HomeRoad';
import { SignupForm } from '@/components/SignupForm';
import { Footer } from '@/components/Footer';
import { messages } from '@/i18n/messages';
import { isLocale } from '@/i18n/types';
import { buildPageMetadata } from '@/i18n/metadata';
import '@/styles/home.css';

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
    <div className="page homePage">
      <Nav ctaHref="#signup" />
      <HomeRoad />
      <HomeHero />
      <HomeProblem />
      <HomeImpact />
      <HomeBackers />
      <HomeHow />
      <SignupForm />
      <Footer showSupport={false} />
    </div>
  );
}
