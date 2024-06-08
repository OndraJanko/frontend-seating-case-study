import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(dateFrom: string, dateTo: string) {
  const fromDate = new Date(dateFrom);
  const toDate = new Date(dateTo);

  const dayFrom = String(fromDate.getDate()).padStart(2, "0");
  const monthFrom = String(fromDate.getMonth() + 1).padStart(2, "0");
  const yearFrom = fromDate.getFullYear();
  const hoursFrom = String(fromDate.getHours()).padStart(2, "0");
  const minutesFrom = String(fromDate.getMinutes()).padStart(2, "0");

  const dayTo = String(toDate.getDate()).padStart(2, "0");
  const monthTo = String(toDate.getMonth() + 1).padStart(2, "0");
  const yearTo = toDate.getFullYear();
  const hoursTo = String(toDate.getHours()).padStart(2, "0");
  const minutesTo = String(toDate.getMinutes()).padStart(2, "0");

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
