export type Language = 'fr' | 'en';

export interface TranslationData {
  [key: string]: string | TranslationData;
}
