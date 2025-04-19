import { differenceInDays, formatDistance, parseISO } from "date-fns";

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDistanceFromNow(date) {
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
}

export const getToday = (options = {}) => {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));
