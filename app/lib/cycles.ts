export type CycleRange = {
  startDate: Date;
  endDate: Date;
};

export function getBillingCycleForDate(date: Date, billingStartDay = 11): CycleRange {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  const startMonth = d >= billingStartDay ? m : m - 1;
  const startDate = new Date(y, startMonth, billingStartDay, 0, 0, 0, 0);
  const endDate = new Date(y, startMonth + 1, billingStartDay, 0, 0, 0, 0);

  return { startDate, endDate };
}

export function formatCycleLabel(startDate: Date, endDate: Date) {
  return `${startDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} - ${endDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`;
}
