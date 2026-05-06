import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function cycleKey(startDate: Date, endDate: Date) {
  return `${startDate.getUTCFullYear()}-${startDate.getUTCMonth()}-${startDate.getUTCDate()}|${endDate.getUTCFullYear()}-${endDate.getUTCMonth()}-${endDate.getUTCDate()}`;
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
    const canonical = canonicalByKey.get(key);

    if (!canonical) {
      canonicalByKey.set(key, cycle);
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
