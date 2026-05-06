import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { normalizeMerchant } from "@/app/lib/parser";
import { axisBankCleanedCycles } from "@/app/data/axis-bank-cleaned";

function toDate(value: string) {
  return new Date(`${value}T00:00:00.000`);
}

export async function GET() {
  const card = await prisma.card.findUnique({
    where: { id: "axis-default" },
    include: {
      _count: {
        select: {
          cycles: true,
          transactions: true,
        },
      },
    },
  });

  const cycles = await prisma.billingCycle.findMany({
    where: { cardId: "axis-default" },
    orderBy: { startDate: "desc" },
    take: 5,
    include: {
      _count: {
        select: {
          transactions: true,
          payments: true,
        },
      },
    },
  });

  return NextResponse.json({
    card,
    recentCycles: cycles.map((cycle) => ({
      id: cycle.id,
      startDate: cycle.startDate,
      endDate: cycle.endDate,
      transactions: cycle._count.transactions,
      payments: cycle._count.payments,
    })),
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.cardId) {
    return NextResponse.json(
      { error: "cardId is required" },
      { status: 400 }
    );
  }

  const mode: "append" | "replace" = body.mode ?? "append";

  try {
    let card = await prisma.card.findUnique({
      where: { id: body.cardId },
    });

    if (!card && body.cardId === "axis-default") {
      card = await prisma.card.create({
        data: {
          id: "axis-default",
          name: "Axis Bank Credit Card",
          bankName: "Axis Bank",
          billingStartDay: 11,
          billingEndDay: 11,
        },
      });
    }

    if (!card) {
      return NextResponse.json(
        {
          error: "Card not found",
          hint: "Use an existing cardId or import with cardId axis-default.",
        },
        { status: 404 }
      );
    }

    let cyclesCreated = 0;
    let cyclesUpdated = 0;
    let transactionsCreated = 0;
    let paymentsCreated = 0;
    let skippedExistingCycles = 0;

    for (const cycleData of axisBankCleanedCycles) {
      const startDate = toDate(cycleData.startDate);
      const endDate = toDate(cycleData.endDate);

      const existingCycle = await prisma.billingCycle.findFirst({
        where: {
          cardId: card.id,
          startDate,
          endDate,
        },
      });

      if (existingCycle && mode === "append") {
        skippedExistingCycles += 1;
        continue;
      }

      if (existingCycle && mode === "replace") {
        await prisma.transaction.deleteMany({
          where: { billingCycleId: existingCycle.id },
        });

        await prisma.payment.deleteMany({
          where: { billingCycleId: existingCycle.id },
        });

        cyclesUpdated += 1;
      }

      const cycle =
        existingCycle ??
        (await prisma.billingCycle.create({
          data: {
            cardId: card.id,
            startDate,
            endDate,
          },
        }));

      if (!existingCycle) {
        cyclesCreated += 1;
      }

      const transactionRows = cycleData.entries.map((item) => {
        const normalized = normalizeMerchant(item.merchantRaw);

        return {
          cardId: card.id,
          billingCycleId: cycle.id,
          date: startDate,
          merchantRaw: item.merchantRaw,
          merchantNormalized: normalized.merchantNormalized,
          category: normalized.category,
          amount: item.amount,
          type: item.type,
          isExcluded: item.isExcluded ?? false,
          rawText: item.rawText,
          expression: item.expression,
          note: item.note,
        };
      });

      if (transactionRows.length > 0) {
        await prisma.transaction.createMany({
          data: transactionRows,
        });

        transactionsCreated += transactionRows.length;
      }

      const paymentRows = (cycleData.payments ?? [])
        .filter((payment) => payment.amount !== null)
        .map((payment) => ({
            billingCycleId: cycle.id,
            amount: payment.amount!,
            paidDate: endDate,
            note: payment.rawText,
        }));

      if (paymentRows.length > 0) {
        await prisma.payment.createMany({
          data: paymentRows,
        });

        paymentsCreated += paymentRows.length;
      }
    }

    const result = {
      cyclesInDataset: axisBankCleanedCycles.length,
      cyclesCreated,
      cyclesUpdated,
      skippedExistingCycles,
      transactionsCreated,
      paymentsCreated,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Axis Bank cleaned import failed", error);

    return NextResponse.json(
      {
        error: "Axis Bank cleaned import failed",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
