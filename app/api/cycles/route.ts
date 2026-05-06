import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { calculateCycleTotal } from "@/app/lib/accounting";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get("cardId");
  const cycles = await prisma.billingCycle.findMany({
    where: cardId ? { cardId } : undefined,
    orderBy: { startDate: "desc" },
    include: { transactions: true, payments: true },
  });

  const result = cycles.map((cycle) => {
    const total = calculateCycleTotal(cycle.transactions);
    const paid = cycle.payments.reduce((sum, p) => sum + p.amount, 0);
    return { ...cycle, total, paid, pending: total - paid };
  });

  return NextResponse.json({ cycles: result });
}
