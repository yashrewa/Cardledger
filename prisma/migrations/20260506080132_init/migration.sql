-- CreateEnum
CREATE TYPE "public"."CycleStatus" AS ENUM ('OPEN', 'BILL_GENERATED', 'PAID');

-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('EXPENSE', 'REFUND', 'PAYMENT', 'ADJUSTMENT');

-- CreateTable
CREATE TABLE "public"."Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "billingStartDay" INTEGER NOT NULL DEFAULT 11,
    "billingEndDay" INTEGER NOT NULL DEFAULT 11,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BillingCycle" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."CycleStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BillingCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "billingCycleId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "merchantRaw" TEXT NOT NULL,
    "merchantNormalized" TEXT NOT NULL,
    "category" TEXT,
    "amount" INTEGER NOT NULL,
    "type" "public"."TransactionType" NOT NULL DEFAULT 'EXPENSE',
    "rawText" TEXT,
    "expression" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "billingCycleId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paidDate" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillingCycle_cardId_startDate_endDate_key" ON "public"."BillingCycle"("cardId", "startDate", "endDate");

-- AddForeignKey
ALTER TABLE "public"."BillingCycle" ADD CONSTRAINT "BillingCycle_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "public"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "public"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_billingCycleId_fkey" FOREIGN KEY ("billingCycleId") REFERENCES "public"."BillingCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_billingCycleId_fkey" FOREIGN KEY ("billingCycleId") REFERENCES "public"."BillingCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
