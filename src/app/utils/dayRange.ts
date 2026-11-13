/**
 * Timezone helpers for the daily/periodic visitor reports. MongoDB stores
 * timestamps in UTC, but "today" must be interpreted in the operator's local
 * timezone (Bangladesh by default), not the server's timezone.
 */

const partsFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

const zonedParts = (date: Date, timeZone: string) => {
  const parts = partsFormatter(timeZone).formatToParts(date);
  const read = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: read("hour"),
    minute: read("minute"),
    second: read("second"),
  };
};

const timezoneOffsetMs = (date: Date, timeZone: string) => {
  const parts = zonedParts(date, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );

  // Intl formatter parts are second-precision; drop milliseconds so both sides
  // are comparable.
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
};

const zonedTimeToUtc = (
  year: number,
  month: number,
  day: number,
  timeZone: string,
  hour = 0,
  minute = 0,
  second = 0,
) => {
  const guess = Date.UTC(year, month - 1, day, hour, minute, second);
  let result = guess - timezoneOffsetMs(new Date(guess), timeZone);

  // Re-check once in case the guess landed on the other side of a DST change.
  const corrected = guess - timezoneOffsetMs(new Date(result), timeZone);
  if (corrected !== result) result = corrected;

  return new Date(result);
};

export const getZonedDayRange = (timeZone: string, date = new Date()) => {
  const parts = zonedParts(date, timeZone);

  return {
    start: zonedTimeToUtc(parts.year, parts.month, parts.day, timeZone),
    end: zonedTimeToUtc(parts.year, parts.month, parts.day + 1, timeZone),
    label: `${String(parts.day).padStart(2, "0")}/${String(parts.month).padStart(2, "0")}/${parts.year}`,
    isoDate: `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`,
  };
};

export const getZonedDayRangeFromIso = (
  timeZone: string,
  isoDate?: string,
) => {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return getZonedDayRange(timeZone);
  }

  const [year, month, day] = isoDate.split("-").map(Number);
  const start = zonedTimeToUtc(year, month, day, timeZone);

  return {
    start,
    end: zonedTimeToUtc(year, month, day + 1, timeZone),
    label: `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`,
    isoDate,
  };
};
