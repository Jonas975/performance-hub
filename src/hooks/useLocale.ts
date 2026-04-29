import { useState, useEffect } from 'react';

export type Locale = 'en' | 'de' | 'fr' | 'es';

const STORAGE_KEY = 'performance-hub-locale';
const DEFAULT_LOCALE: Locale = 'en';
const SUPPORTED_LOCALES: Locale[] = ['en', 'de', 'fr', 'es'];

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isReady, setIsReady] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
      setLocaleState(saved);
    }
    setIsReady(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  };

  return { locale, setLocale, isReady };
}
