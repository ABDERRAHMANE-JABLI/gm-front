/**
 * Abréviations des jours de la semaine retournées par l'API
 */
export type DayOfWeek = 'Lun' | 'Mar' | 'Mer' | 'Jeu' | 'Ven' | 'Sam' | 'Dim';

/**
 * Un créneau horaire renvoyé par l'API pour un jour donné.
 *
 * Cas 1 — service déjeuner + dîner séparés :
 *   lunchOpeningTime / lunchClosingTime  pour le midi
 *   dinnerOpeningTime / dinnerClosingTime pour le soir
 *
 * Cas 2 — ouverture continue (ex. 11h → 23h) :
 *   lunchOpeningTime = heure d'ouverture
 *   dinnerClosingTime = heure de fermeture
 *   les deux autres champs sont null
 *
 * Tous les champs sont des ISO strings ("1970-01-01T10:30:00+00:00") ou null.
 */
export interface OpeningHour {
  dayOfWeek:          DayOfWeek;
  lunchOpeningTime:   string | null;
  lunchClosingTime:   string | null;
  dinnerOpeningTime:  string | null;
  dinnerClosingTime:  string | null;
}

/**
 * Extrait "HH:MM" depuis une ISO string de l'API.
 * Retourne null si la valeur est null ou invalide.
 *
 * @example
 * parseApiTime("1970-01-01T10:30:00+00:00") // "10:30"
 */
export function parseApiTime(iso: string | null): string | null {
  if (!iso) return null;
  const match = iso.match(/T(\d{2}:\d{2})/);
  return match ? match[1] : null;
}
