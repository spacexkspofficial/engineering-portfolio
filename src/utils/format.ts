const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string): string {
  const [year, month] = ym.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "Sep 2026 – Present", "May – Oct 2026", "Aug 2022 – Sep 2024". */
export function formatRange(start: string, end?: string): string {
  if (!end) return `${formatMonth(start)} – Present`;
  const [startYear] = start.split("-");
  const [endYear] = end.split("-");
  if (startYear === endYear) return `${formatMonth(start).split(" ")[0]} – ${formatMonth(end)}`;
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

/** Year span for compact lists: "2026 – Present", "2019 – 2023". */
export function formatYears(start: string, end?: string): string {
  const s = start.slice(0, 4);
  if (!end) return `${s} – Present`;
  const e = end.slice(0, 4);
  return s === e ? s : `${s} – ${e}`;
}
