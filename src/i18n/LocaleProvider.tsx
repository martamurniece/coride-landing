'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { messages, type Messages } from './messages';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from './types';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === 'lv' ? 'lv' : DEFAULT_LOCALE;
}

function pageTitle(locale: Locale): string {
  if (typeof window !== 'undefined' && window.location.pathname === '/privacy') {
    return messages[locale].privacy.documentTitle;
  }
  return messages[locale].meta.title;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    document.documentElement.lang = next;
    document.title = pageTitle(next);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    document.title = pageTitle(locale);
  }, [locale, ready]);

  const value = useMemo(
    () => ({ locale, setLocale, t: messages[locale] }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
