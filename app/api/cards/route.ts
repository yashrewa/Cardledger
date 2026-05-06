import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const cards = await prisma.card.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ cards });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.bankName) {
    return NextResponse.json({ error: "name and bankName are required" }, { status: 400 });
  }

  const card = await prisma.card.create({
    data: {
      name: body.name,
      bankName: body.bankName,
      billingStartDay: body.billingStartDay ?? 11,
      billingEndDay: body.billingEndDay ?? 11,
    },
  });

  return NextResponse.json({ card });
}
