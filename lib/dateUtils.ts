import { DateTime } from "luxon";

function isValidDateFormat(date: string): boolean {
  const dateFormatRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[+-]\d{2}:\d{2})$/;
  return dateFormatRegex.test(date);
}

export function formatDateRange(dateFrom: string, dateTo: string): string {
  if (
    !dateFrom ||
    !dateTo ||
    !isValidDateFormat(dateFrom) ||
    !isValidDateFormat(dateTo)
  ) {
    return "N/A";
  }

  const fromDate = DateTime.fromISO(dateFrom).setZone("utc");
  const toDate = DateTime.fromISO(dateTo).setZone("utc");

  const dayFrom = String(fromDate.day).padStart(2, "0");
  const monthFrom = String(fromDate.month).padStart(2, "0");
  const yearFrom = fromDate.year;
  const hoursFrom = String(fromDate.hour).padStart(2, "0");
  const minutesFrom = String(fromDate.minute).padStart(2, "0");

  const dayTo = String(toDate.day).padStart(2, "0");
  const monthTo = String(toDate.month).padStart(2, "0");
  const yearTo = toDate.year;
  const hoursTo = String(toDate.hour).padStart(2, "0");
  const minutesTo = String(toDate.minute).padStart(2, "0");

  if (yearFrom === yearTo && monthFrom === monthTo && dayFrom === dayTo) {
    // Same day
    return `${dayFrom}. ${monthFrom}. ${yearFrom} ${hoursFrom}:${minutesFrom} - ${hoursTo}:${minutesTo}`;
  } else if (yearFrom === yearTo) {
    // Same year
    return `${dayFrom}. ${monthFrom}. ${hoursFrom}:${minutesFrom} - ${dayTo}. ${monthTo}. ${yearFrom} ${hoursTo}:${minutesTo}`;
  } else {
    // Different years
    return `${dayFrom}. ${monthFrom}. ${yearFrom} ${hoursFrom}:${minutesFrom} - ${dayTo}. ${monthTo}. ${yearTo} ${hoursTo}:${minutesTo}`;
  }
}
