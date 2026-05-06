export type CycleRange = {
  startDate: Date;
  endDate: Date;
};

export function getBillingCycleForDate(date: Date, billingStartDay = 11): CycleRange {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = Number(parts.find((part) => part.type === "year")?.value);
  const m = Number(parts.find((part) => part.type === "month")?.value) - 1;
  const d = Number(parts.find((part) => part.type === "day")?.value);

  const startMonth = d >= billingStartDay ? m : m - 1;
  const startDate = new Date(Date.UTC(y, startMonth, billingStartDay));
  const endDate = new Date(Date.UTC(y, startMonth + 1, billingStartDay));

  return { startDate, endDate };
}

export function formatCycleLabel(startDate: Date, endDate: Date) {
  return `${startDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })} - ${endDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })}`;
}

export function formatCycleNotesLabel(startDate: Date, endDate: Date) {
  return `${startDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })} to ${endDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}`;
}
