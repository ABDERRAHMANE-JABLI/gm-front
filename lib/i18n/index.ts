import { headers } from 'next/headers';
import frTranslations from '@/locales/fr.json';
import enTranslations from '@/locales/en.json';

export type Language = 'fr' | 'en';
export type Country = 'fr' | 'en';

const translations = {
  fr: frTranslations,
  en: enTranslations,
};

export async function getLanguage(): Promise<Language> {
  const headersList = await headers();
  const language = headersList.get('x-language') as Language;
  return language || 'fr';
}

export async function getCountry(): Promise<Country> {
  const headersList = await headers();
  const country = headersList.get('x-country') as Country;
  return country || 'fr';
}

export function getTranslation(key: string, language?: Language): string {
  const lang = language || 'fr';
  const keys = key.split('.');
  let value: Record<string, unknown> | string = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k] as Record<string, unknown> | string;
    } else {
      // Fallback to French if key not found
      value = translations.fr;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey] as Record<string, unknown> | string;
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export async function useTranslation() {
  const language = await getLanguage();
  const country = await getCountry();
  
  const t = (key: string) => getTranslation(key, language);
  
  return { t, language, country };
}
