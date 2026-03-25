import { OpeningHour, DayOfWeek, parseApiTime } from '@/types/Time';

// Correspondance DayOfWeek abrégé → index JS (0=Dim … 6=Sam)
const DAY_INDEX: Record<DayOfWeek, number> = {
  Dim: 0,
  Lun: 1,
  Mar: 2,
  Mer: 3,
  Jeu: 4,
  Ven: 5,
  Sam: 6,
};

/** Convertit "HH:MM" en minutes depuis minuit */
function toMin(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Vérifie si l'heure `nowMin` est dans [openMin, closeMin[.
 * Gère les créneaux qui traversent minuit (ex: 22:00 → 02:00).
 */
function inRange(openMin: number, closeMin: number, nowMin: number): boolean {
  if (closeMin <= openMin) {
    // traverse minuit
    return nowMin >= openMin || nowMin < closeMin;
  }
  return nowMin >= openMin && nowMin < closeMin;
}

/**
 * Retourne true si le restaurant est actuellement ouvert
 * selon la liste d'OpeningHour retournée par l'API.
 */
export function isOpenNow(hours: OpeningHour[] | undefined, now: Date = new Date()): boolean {
  if (!hours || hours.length === 0) return false;

  const todayIdx = now.getDay();
  const nowMin   = now.getHours() * 60 + now.getMinutes();

  const todaySlots = hours.filter((h) => DAY_INDEX[h.dayOfWeek] === todayIdx);

  for (const slot of todaySlots) {
    const lunchOpen  = parseApiTime(slot.lunchOpeningTime);
    const lunchClose = parseApiTime(slot.lunchClosingTime);
    const dinnerOpen = parseApiTime(slot.dinnerOpeningTime);
    const dinnerClose = parseApiTime(slot.dinnerClosingTime);

    // Cas 1 : service déjeuner complet
    if (lunchOpen && lunchClose && inRange(toMin(lunchOpen), toMin(lunchClose), nowMin)) {
      return true;
    }

    // Cas 2 : service dîner complet
    if (dinnerOpen && dinnerClose && inRange(toMin(dinnerOpen), toMin(dinnerClose), nowMin)) {
      return true;
    }

    // Cas 3 : ouverture continue (lunchOpen = ouverture, dinnerClose = fermeture)
    if (lunchOpen && dinnerClose && !lunchClose && !dinnerOpen) {
      if (inRange(toMin(lunchOpen), toMin(dinnerClose), nowMin)) return true;
    }
  }

  return false;
}
