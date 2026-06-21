import { OpeningHour, DayOfWeek, parseApiTime } from '@/types/Time';

const DAY_INDEX: Record<DayOfWeek, number> = {
  Dim: 0, Lun: 1, Mar: 2, Mer: 3, Jeu: 4, Ven: 5, Sam: 6,
};

function toMin(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function inRange(openMin: number, closeMin: number, nowMin: number): boolean {
  if (closeMin <= openMin) {
    return nowMin >= openMin || nowMin < closeMin;
  }
  return nowMin >= openMin && nowMin < closeMin;
}

export function isOpenNow(hours: OpeningHour[] | undefined, now: Date = new Date()): boolean {
  if (!hours || hours.length === 0) return false;

  const todayIdx = now.getDay();
  const nowMin   = now.getHours() * 60 + now.getMinutes();

  const todaySlots = hours.filter((h) => h.days.some((d) => DAY_INDEX[d] === todayIdx));

  for (const slot of todaySlots) {
    const lunchOpen  = parseApiTime(slot.lunchOpeningTime);
    const lunchClose = parseApiTime(slot.lunchClosingTime);
    const dinnerOpen = parseApiTime(slot.dinnerOpeningTime);
    const dinnerClose = parseApiTime(slot.dinnerClosingTime);

    if (lunchOpen && lunchClose && inRange(toMin(lunchOpen), toMin(lunchClose), nowMin)) {
      return true;
    }

    if (dinnerOpen && dinnerClose && inRange(toMin(dinnerOpen), toMin(dinnerClose), nowMin)) {
      return true;
    }

    if (lunchOpen && dinnerClose && !lunchClose && !dinnerOpen) {
      if (inRange(toMin(lunchOpen), toMin(dinnerClose), nowMin)) return true;
    }
  }

  return false;
}
