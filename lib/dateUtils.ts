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
