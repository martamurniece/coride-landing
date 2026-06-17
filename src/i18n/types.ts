export type Locale = 'en' | 'lv';

export const LOCALES: Locale[] = ['en', 'lv'];
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}
