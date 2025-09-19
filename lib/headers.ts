import { headers } from 'next/headers';

/**
 * Extract country and language data from middleware headers
 * @description Reads custom headers set by middleware.ts to determine user location and language preferences
 * @returns Promise resolving to object containing country, language, locale, and hostname information
 * @example
 * ```typescript
 * const { country, language, locale, hostname } = await getCountryAndLanguage();
 * 
 * console.log(country);  // 'FR'
 * console.log(language); // 'fr'
 * console.log(locale);   // 'fr-FR'
 * console.log(hostname); // 'gaultmillau.fr'
 * ```
 * @see middleware.ts for header setting logic
 */
export async function getCountryAndLanguage() {
  const headersList = await headers();
  
  return {
    /** @description Country code in uppercase format (e.g., 'FR', 'US', 'DE') - defaults to 'FR' */
    country: headersList.get('x-country') || 'FR',
    /** @description Language code in lowercase format (e.g., 'fr', 'en') - defaults to 'en' */
    language: headersList.get('x-language') || 'en',
    /** @description Full locale string (e.g., 'fr-FR', 'en-US') - defaults to 'en-US' */
    locale: headersList.get('x-locale') || 'en-US',
    /** @description Original hostname from the request - defaults to empty string */
    hostname: headersList.get('x-hostname') || '',
  };
}
