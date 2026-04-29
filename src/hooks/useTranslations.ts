import { useLocaleContext } from '@/contexts/LocaleContext';
import en from '@/translations/en.json';
import de from '@/translations/de.json';
import fr from '@/translations/fr.json';
import es from '@/translations/es.json';

type Translations = typeof en;
type Locale = 'en' | 'de' | 'fr' | 'es';

const translations: Record<Locale, Translations> = {
  en,
  de,
  fr,
  es,
};

export function useTranslations() {
  const { locale } = useLocaleContext();
  return translations[locale] || translations.en;
}

// Helper function for deep object access (e.g., "nav.shop")
export function getTranslation(key: string, locale?: Locale): string {
  const finalLocale = locale || 'en';
  const translation = translations[finalLocale] || translations.en;
  const keys = key.split('.');
  let value: any = translation;

  for (const k of keys) {
    value = value?.[k];
  }

  return typeof value === 'string' ? value : key;
}

// Hook for getting a specific translation key
export function useTranslation(key: string): string {
  const translations_obj = useTranslations();
  const keys = key.split('.');
  let value: any = translations_obj;

  for (const k of keys) {
    value = value?.[k];
  }

  return typeof value === 'string' ? value : key;
}
