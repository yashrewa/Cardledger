import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function cycleKey(startDate: Date, endDate: Date) {
  return `${dateKeyInIndia(startDate)}|${dateKeyInIndia(endDate)}`;
}

function dateKeyInIndia(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function isUtcDateOnly(date: Date) {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  );
}

export async function POST() {
  const cycles = await prisma.billingCycle.findMany({
    where: { cardId: "axis-default" },
    orderBy: [{ startDate: "asc" }, { createdAt: "asc" }],
  });
  const canonicalByKey = new Map<string, (typeof cycles)[number]>();
  let cyclesMerged = 0;
  let transactionsMoved = 0;
  let paymentsMoved = 0;

  for (const cycle of cycles) {
    const key = cycleKey(cycle.startDate, cycle.endDate);
    let canonical = canonicalByKey.get(key);

    if (!canonical) {
      canonicalByKey.set(key, cycle);
      continue;
    }

    if (!isUtcDateOnly(canonical.startDate) && isUtcDateOnly(cycle.startDate)) {
      canonicalByKey.set(key, cycle);
      const transactionResult = await prisma.transaction.updateMany({
        where: { billingCycleId: canonical.id },
        data: { billingCycleId: cycle.id },
      });
      const paymentResult = await prisma.payment.updateMany({
        where: { billingCycleId: canonical.id },
        data: { billingCycleId: cycle.id },
      });

      await prisma.billingCycle.delete({
        where: { id: canonical.id },
      });

      cyclesMerged += 1;
      transactionsMoved += transactionResult.count;
      paymentsMoved += paymentResult.count;
      continue;
    }

    const transactionResult = await prisma.transaction.updateMany({
      where: { billingCycleId: cycle.id },
      data: { billingCycleId: canonical.id },
    });
    const paymentResult = await prisma.payment.updateMany({
      where: { billingCycleId: cycle.id },
      data: { billingCycleId: canonical.id },
    });

    await prisma.billingCycle.delete({
      where: { id: cycle.id },
    });

    cyclesMerged += 1;
    transactionsMoved += transactionResult.count;
    paymentsMoved += paymentResult.count;
  }

  return NextResponse.json({
    cyclesScanned: cycles.length,
    cyclesMerged,
    transactionsMoved,
    paymentsMoved,
  });
}
