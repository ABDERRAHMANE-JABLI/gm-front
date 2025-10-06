// lib/i8n/client.ts
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const translations = {
  fr,
  en,
};

export type Language = 'fr' | 'en';

export function useClientTranslation(lang: Language = 'fr') {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: Record<string, unknown> | string = translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        const nextValue = (value as Record<string, unknown>)[k];
        if (typeof nextValue === 'string' || (typeof nextValue === 'object' && nextValue !== null)) {
          value = nextValue as Record<string, unknown> | string;
        } else {
          return key;
        }
      } else {
        return key; 
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t };
}
