import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { normalizeMerchant } from "@/app/lib/parser";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const merchantRaw = String(body?.merchantRaw ?? "").trim();
  const amount = Number(body?.amount);
  const type = body?.type ?? "EXPENSE";

  if (!merchantRaw || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "merchantRaw and positive amount are required" },
      { status: 400 }
    );
  }

  if (!["EXPENSE", "REFUND", "PAYMENT", "ADJUSTMENT"].includes(type)) {
    return NextResponse.json({ error: "Invalid transaction type" }, { status: 400 });
  }

  const normalized = normalizeMerchant(merchantRaw);
  const signedAmount = type === "REFUND" ? -Math.abs(amount) : Math.abs(amount);
  const date = body?.date ? new Date(body.date) : undefined;

  if (date && Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        merchantRaw,
        merchantNormalized: normalized.merchantNormalized,
        category: body?.category
          ? String(body.category).trim()
          : normalized.category,
        amount: signedAmount,
        type,
        date,
        isExcluded: Boolean(body?.isExcluded),
        rawText: `${merchantRaw}: ${Math.abs(amount)}`,
      },
    });

    return NextResponse.json({ transaction });
  } catch (error: unknown) {
    if (isPrismaNotFound(error)) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    console.error("Failed to update transaction", error);

    return NextResponse.json(
      { error: "Unable to update transaction" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    if (isPrismaNotFound(error)) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    console.error("Failed to delete transaction", error);

    return NextResponse.json(
      { error: "Unable to delete transaction" },
      { status: 500 }
    );
  }
}

function isPrismaNotFound(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2025"
  );
}
