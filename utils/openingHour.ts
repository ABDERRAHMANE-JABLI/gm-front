import { OpeningPeriods, Hour, AnyMinute, TimeFormat } from "@/types/Time";

// utils/isOpenNow.ts
type DayKey =
    | "sunday" | "monday" | "tuesday" | "wednesday"
    | "thursday" | "friday" | "saturday";

const dayKeys: DayKey[] = [
    "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
];

const toMinutes = (t: TimeFormat): number => {
    const [hh, mm] = t.split(":") as [Hour, AnyMinute];
    return Number(hh) * 60 + Number(mm);
};

export function isOpenNow(periods?: OpeningPeriods, now: Date = new Date()): boolean {
    if (!periods) return false;

    const dayIdx = now.getDay(); // 0=Sunday ... 6=Saturday
    const today = dayKeys[dayIdx];
    const prev = dayKeys[(dayIdx + 6) % 7];
    const nowMin = now.getHours() * 60 + now.getMinutes();

    const inRange = (begin: TimeFormat, end: TimeFormat) => {
        const start = toMinutes(begin);
        // 00:00 = minuit -> on le considère comme 24:00 pour “jusqu’à minuit”
        let endMin = end === "00:00" ? 24 * 60 : toMinutes(end);

        // créneau qui traverse minuit (ex: 19:00-02:00)
        if (endMin <= start && end !== "00:00") {
            return nowMin >= start || nowMin < endMin;
        }
        // créneau normal dans la journée
        return nowMin >= start && nowMin < endMin; // [start, end)
    };

    // 1) créneaux du jour
    if ((periods[today] ?? []).some(p => inRange(p.begin, p.end))) return true;

    // 2) si après minuit: vérifier les créneaux d’hier qui DÉBORDENT après minuit
    return (periods[prev] ?? []).some(p => {
        const start = toMinutes(p.begin);
        const endRaw = toMinutes(p.end);
        const endMin = p.end === "00:00" ? 24 * 60 : endRaw;
        // débordement = end <= start (sauf 00:00 qui signifie “jusqu’à minuit”)
        return endMin <= start && p.end !== "00:00" && nowMin < endMin;
    });
}
