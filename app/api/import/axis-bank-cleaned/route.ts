import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { normalizeMerchant } from "@/app/lib/parser";
import { axisBankCleanedCycles } from "@/app/data/axis-bank-cleaned";

function toDate(value: string) {
  return new Date(`${value}T00:00:00.000`);
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

    const result = await prisma.$transaction(async (tx) => {
    let cyclesCreated = 0;
    let cyclesUpdated = 0;
    let transactionsCreated = 0;
    let paymentsCreated = 0;
    let skippedExistingCycles = 0;

    for (const cycleData of axisBankCleanedCycles) {
      const startDate = toDate(cycleData.startDate);
      const endDate = toDate(cycleData.endDate);

      const existingCycle = await tx.billingCycle.findFirst({
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
        await tx.transaction.deleteMany({
          where: { billingCycleId: existingCycle.id },
        });

        await tx.payment.deleteMany({
          where: { billingCycleId: existingCycle.id },
        });

        cyclesUpdated += 1;
      }

      const cycle =
        existingCycle ??
        (await tx.billingCycle.create({
          data: {
            cardId: card.id,
            startDate,
            endDate,
          },
        }));

      if (!existingCycle) {
        cyclesCreated += 1;
      }

      for (const item of cycleData.entries) {
        const normalized = normalizeMerchant(item.merchantRaw);

        await tx.transaction.create({
          data: {
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
          },
        });

        transactionsCreated += 1;
      }

      for (const payment of cycleData.payments ?? []) {
        if (payment.amount === null) {
          continue;
        }

        await tx.payment.create({
          data: {
            billingCycleId: cycle.id,
            amount: payment.amount,
            paidDate: endDate,
            note: payment.rawText,
          },
        });

        paymentsCreated += 1;
      }
    }

    return {
      cyclesInDataset: axisBankCleanedCycles.length,
      cyclesCreated,
      cyclesUpdated,
      skippedExistingCycles,
      transactionsCreated,
      paymentsCreated,
    };
    }, {
      maxWait: 20_000,
      timeout: 60_000,
    });

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
