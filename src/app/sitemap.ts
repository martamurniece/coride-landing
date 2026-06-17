import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/types';
import { localeUrl } from '@/i18n/metadata';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const ROUTES: { path: string; changeFrequency: ChangeFrequency; priority: number }[] = [
  { path: '/',          changeFrequency: 'weekly',  priority: 1 },
  { path: '/employers', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/partners',  changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacy',   changeFrequency: 'yearly',  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.flatMap(({ path, changeFrequency, priority }) => {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) {
      languages[l] = localeUrl(l, path);
    }

    return LOCALES.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
