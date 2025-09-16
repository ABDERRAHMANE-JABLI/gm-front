import { headers } from 'next/headers';

/**
 * Get country and language data from middleware headers
 * This function reads the custom headers set by middleware.ts
 */
export async function getCountryAndLanguage() {
  const headersList = await headers();
  
  return {
    country: headersList.get('x-country') || 'FR',        // Country code (uppercase): FR, US, DE, etc.
    language: headersList.get('x-language') || 'en',      // Language code (lowercase): fr, en
    locale: headersList.get('x-locale') || 'en-US',       // Full locale: fr-FR, en-US
    hostname: headersList.get('x-hostname') || '',        // Original hostname
  };
}
