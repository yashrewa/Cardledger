import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getBillingCycleForDate } from "@/app/lib/cycles";
import {
  normalizeMerchant,
  parseExpenseLine,
  type ParsedLine,
} from "@/app/lib/parser";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.cardId) {
    return NextResponse.json({ error: "cardId is required" }, { status: 400 });
  }

  const card = await prisma.card.findUnique({ where: { id: body.cardId } });
  if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

  const parsed = body.rawText
    ? parseExpenseLine(body.rawText)
    : parseStructuredTransaction(body);

  if (!parsed) {
    return NextResponse.json(
      { error: "Could not parse transaction line" },
      { status: 400 }
    );
  }

  const date = body.date ? new Date(body.date) : new Date();
  const range = getBillingCycleForDate(date, card.billingStartDay);
  const cycle = await prisma.billingCycle.upsert({
    where: {
      cardId_startDate_endDate: {
        cardId: card.id,
        startDate: range.startDate,
        endDate: range.endDate,
      },
    },
    update: {},
    create: {
      cardId: card.id,
      startDate: range.startDate,
      endDate: range.endDate,
    },
  });

  if (parsed.type === "PAYMENT") {
    const payment = await prisma.payment.create({
      data: {
        billingCycleId: cycle.id,
        amount: Math.abs(parsed.amount),
        paidDate: date,
        note: parsed.rawText,
      },
    });

    return NextResponse.json({ payment });
  }

  const transaction = await prisma.transaction.create({
    data: {
      cardId: card.id,
      billingCycleId: cycle.id,
      date,
      merchantRaw: parsed.merchantRaw,
      merchantNormalized: parsed.merchantNormalized,
      category: parsed.category,
      amount: parsed.amount,
      type: parsed.type,
      rawText: parsed.rawText,
      expression: parsed.expression,
    },
  });

  return NextResponse.json({ transaction });
}

function parseStructuredTransaction(body: any): ParsedLine | null {
  const merchantRaw = String(body.merchantRaw ?? "").trim();
  const amount = Number(body.amount);
  const type = body.type ?? "EXPENSE";

  if (!merchantRaw || !Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  if (!["EXPENSE", "REFUND", "PAYMENT", "ADJUSTMENT"].includes(type)) {
    return null;
  }

  const normalized = normalizeMerchant(merchantRaw);
  const signedAmount = type === "REFUND" ? -Math.abs(amount) : Math.abs(amount);
  const category = body.category
    ? String(body.category).trim()
    : normalized.category;

  return {
    rawText: `${merchantRaw}: ${Math.abs(amount)}`,
    merchantRaw,
    merchantNormalized: normalized.merchantNormalized,
    category,
    amount: signedAmount,
    type,
  };
}
