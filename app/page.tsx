import { prisma } from "@/app/lib/prisma";
import {
  calculateCycleTotal,
  isIncludedInCycleTotal,
} from "@/app/lib/accounting";
import {
  getBillingCycleForDate,
  formatCycleLabel,
  formatCycleNotesLabel,
} from "@/app/lib/cycles";
import QuickAddForm from "./quick-add-form";
import DeleteTransactionButton from "./delete-transaction-button";
import EditTransactionButton from "./edit-transaction-button";
import CycleSelector from "./cycle-selector";
import CopyNotesButton from "./copy-notes-button";
import InsightsCard from "./insights-card";

export const dynamic = "force-dynamic";

async function getData(selectedCycleId?: string) {
  const card = await prisma.card.upsert({
    where: { id: "axis-default" },
    update: {},
    create: {
      id: "axis-default",
      name: "Axis Bank Credit Card",
      bankName: "Axis Bank",
      billingStartDay: 11,
      billingEndDay: 11,
    },
  });

  const currentRange = getBillingCycleForDate(new Date(), card.billingStartDay);
  const currentCycle = await prisma.billingCycle.upsert({
    where: {
      cardId_startDate_endDate: {
        cardId: card.id,
        startDate: currentRange.startDate,
        endDate: currentRange.endDate,
      },
    },
    update: {},
    create: {
      cardId: card.id,
      startDate: currentRange.startDate,
      endDate: currentRange.endDate,
    },
  });

  const cycles = await prisma.billingCycle.findMany({
    where: { cardId: card.id },
    orderBy: { startDate: "desc" },
  });

  const cycleId = selectedCycleId
    ? cycles.find((item) => item.id === selectedCycleId)?.id
    : currentCycle.id;

  const cycle = await prisma.billingCycle.findUniqueOrThrow({
    where: { id: cycleId ?? currentCycle.id },
    include: {
      transactions: { orderBy: [{ date: "desc" }, { createdAt: "desc" }] },
      payments: true,
    },
  });

  const total = calculateCycleTotal(cycle.transactions);
  const paid = cycle.payments.reduce((sum, p) => sum + p.amount, 0);
  const pending = total - paid;
  const includedTransactions = cycle.transactions.filter(isIncludedInCycleTotal);
  const cycleProgress = getCycleProgress(cycle.startDate, cycle.endDate);

  const merchantTotals = Object.entries(
    includedTransactions.reduce<Record<string, number>>((acc, t) => {
      acc[t.merchantNormalized] = (acc[t.merchantNormalized] ?? 0) + t.amount;
      return acc;
    }, {})
  ).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  const notesExportText = formatAppleNotesCycleText(
    cycle.startDate,
    cycle.endDate,
    includedTransactions
  );
  const historicalInsights = await getHistoricalInsights(card.id);
  const historicalInsight =
    historicalInsights[Math.floor(Math.random() * historicalInsights.length)] ??
    "No historical insights yet.";

  return {
    card,
    cycle,
    total,
    paid,
    pending,
    merchantTotals,
    countedTransactionCount: includedTransactions.length,
    cycleProgress,
    notesExportText,
    historicalInsight,
    cycleOptions: cycles.map((item) => ({
      id: item.id,
      label: formatCycleLabel(item.startDate, item.endDate),
    })),
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ cycleId?: string }>;
}) {
  const { cycleId } = await searchParams;
  let data: Awaited<ReturnType<typeof getData>>;

  try {
    data = await getData(cycleId);
  } catch (error) {
    console.error("Unable to load CardLedger data", error);

    return (
      <main className="container grid">
        <div>
          <h1 style={{ marginBottom: 4 }}>CardLedger</h1>
          <p className="label" style={{ marginTop: 0 }}>
            Manual-first credit card billing-cycle tracker
          </p>
        </div>

        <section className="card db-error">
          <h2 style={{ marginTop: 0 }}>Database unavailable</h2>
          <p>
            CardLedger could not connect to Postgres. Check that your Neon
            database is active and that `DATABASE_URL` is set correctly.
          </p>
          <p className="label" style={{ marginBottom: 0 }}>
            If this is local development, you can either restore internet access
            to Neon or switch `.env` back to your local Docker Postgres URL.
          </p>
        </section>
      </main>
    );
  }

  const {
    card,
    cycle,
    total,
    paid,
    pending,
    merchantTotals,
    countedTransactionCount,
    cycleProgress,
    notesExportText,
    historicalInsight,
    cycleOptions,
  } = data;

  return (
    <main className="container grid">
      <div>
        <h1 style={{ marginBottom: 4 }}>CardLedger</h1>
        <p className="label" style={{ marginTop: 0 }}>Manual-first credit card billing-cycle tracker</p>
      </div>

      <QuickAddForm cardId={card.id} />

      <section className="bill-countdown">
        <div>
          <div className="label">Next bill in</div>
          <div className="bill-countdown-value">
            {cycleProgress.daysRemaining <= 0
              ? "Bill day"
              : `${cycleProgress.daysRemaining} days`}
          </div>
          <div className="label">
            {cycle.endDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
        <div className="bill-countdown-meter" aria-hidden="true">
          <div
            style={{ width: `${cycleProgress.percentElapsed}%` }}
          />
        </div>
        <div className="bill-countdown-meta">
          <span>{cycleProgress.daysElapsed} elapsed</span>
          <span>{cycleProgress.totalDays} day cycle</span>
        </div>
      </section>

      <InsightsCard insight={historicalInsight} />

      <section className="grid grid-3">
        <div className="card">
          <div className="label">Card</div>
          <div className="value" style={{ fontSize: 22 }}>{card.name}</div>
        </div>
        <div className="card">
          <div className="label">Billing cycle</div>
          <div className="cycle-control">
            <CycleSelector
              cycles={cycleOptions}
              selectedCycleId={cycle.id}
            />
          </div>
          <div className="label" style={{ marginTop: 8 }}>
            Select a previous cycle to review older spending.
          </div>
        </div>
        <div className="card">
          <div className="label">Pending</div>
          <div className="value">₹{pending.toLocaleString("en-IN")}</div>
        </div>
      </section>

      <section className="grid grid-3">
        <div className="card">
          <div className="label">Cycle total</div>
          <div className="value">₹{total.toLocaleString("en-IN")}</div>
        </div>
        <div className="card">
          <div className="label">Paid</div>
          <div className="value">₹{paid.toLocaleString("en-IN")}</div>
        </div>
        <div className="card">
          <div className="label">Counted transactions</div>
          <div className="value">{countedTransactionCount}</div>
          {countedTransactionCount !== cycle.transactions.length && (
            <div className="label">
              {cycle.transactions.length - countedTransactionCount} excluded
            </div>
          )}
        </div>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Transactions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Status</th>
              <th className="amount">Amount</th>
              <th className="action-heading">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cycle.transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.merchantNormalized}<div className="label">{tx.rawText}</div></td>
                <td>
                  {tx.date.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                  <div className="label">
                    {tx.date.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td>{tx.category ?? "Other"}</td>
                <td>{tx.type}</td>
                <td>{tx.isExcluded ? "Excluded" : "Counted"}</td>
                <td className="amount">₹{tx.amount.toLocaleString("en-IN")}</td>
                <td>
                  <div className="action-cell">
                    <EditTransactionButton
                      transaction={{
                        id: tx.id,
                        merchantRaw: tx.merchantRaw,
                        merchantNormalized: tx.merchantNormalized,
                        category: tx.category,
                        amount: tx.amount,
                        type: tx.type,
                        date: tx.date.toISOString(),
                        isExcluded: tx.isExcluded,
                      }}
                    />
                    <DeleteTransactionButton
                      transactionId={tx.id}
                      merchant={tx.merchantNormalized}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {cycle.transactions.length === 0 && (
              <tr><td colSpan={7} className="label">No transactions yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="card">
        <div className="section-heading-row">
          <div>
            <h2 style={{ margin: 0 }}>Apple Notes export</h2>
            <p className="label" style={{ marginBottom: 0 }}>
              Copy this cycle in your old one-line notes format.
            </p>
          </div>
          <CopyNotesButton text={notesExportText} />
        </div>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Payments</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Note</th>
              <th>Date</th>
              <th className="amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            {cycle.payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.note ?? "Payment"}</td>
                <td>{payment.paidDate.toLocaleDateString("en-IN")}</td>
                <td className="amount">
                  ₹{payment.amount.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}

            {cycle.payments.length === 0 && (
              <tr>
                <td colSpan={3} className="label">
                  No payments recorded for this cycle.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Top merchants this cycle</h2>
        <table className="table">
          <tbody>
            {merchantTotals.map(([merchant, amount]) => (
              <tr key={merchant}>
                <td>{merchant}</td>
                <td className="amount">₹{amount.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function formatAppleNotesCycleText(
  startDate: Date,
  endDate: Date,
  transactions: Array<{
    amount: number;
    merchantRaw: string;
    merchantNormalized: string;
  }>
) {
  const entries = transactions
    .slice()
    .reverse()
    .map((transaction) => {
      const merchant =
        transaction.merchantRaw.trim() || transaction.merchantNormalized;

      return `${merchant}: ${Math.abs(transaction.amount)}`;
    });

  const expression = transactions
    .slice()
    .reverse()
    .map((transaction) => String(transaction.amount))
    .join("+");
  const total = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return [
    formatCycleNotesLabel(startDate, endDate),
    ...entries,
    `Total: ${expression || "0"} = ${total.toLocaleString("en-IN")}`,
  ].join("\n");
}

function getCycleProgress(startDate: Date, endDate: Date) {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const end = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  const dayMs = 24 * 60 * 60 * 1000;
  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / dayMs));
  const daysElapsed = Math.min(
    totalDays,
    Math.max(0, Math.floor((todayStart.getTime() - start.getTime()) / dayMs))
  );
  const daysRemaining = Math.max(
    0,
    Math.ceil((end.getTime() - todayStart.getTime()) / dayMs)
  );

  return {
    daysElapsed,
    daysRemaining,
    totalDays,
    percentElapsed: Math.round((daysElapsed / totalDays) * 100),
  };
}

async function getHistoricalInsights(cardId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      cardId,
      isExcluded: false,
      type: {
        not: "PAYMENT",
      },
    },
    include: {
      billingCycle: true,
    },
  });

  if (transactions.length === 0) {
    return ["No historical spending patterns yet."];
  }

  const expenses = transactions.filter((transaction) => transaction.amount > 0);
  const refunds = transactions.filter((transaction) => transaction.amount < 0);
  const merchantTotals = new Map<string, number>();
  const categoryTotals = new Map<string, number>();
  const dayTotals = new Map<string, number>();
  const cycleTotals = new Map<string, { label: string; amount: number }>();

  for (const transaction of expenses) {
    const merchant = transaction.merchantNormalized;
    const category = transaction.category ?? "Other";
    const day = transaction.date.toLocaleDateString("en-IN", {
      weekday: "long",
    });
    const cycleLabel = formatCycleLabel(
      transaction.billingCycle.startDate,
      transaction.billingCycle.endDate
    );

    merchantTotals.set(
      merchant,
      (merchantTotals.get(merchant) ?? 0) + transaction.amount
    );
    categoryTotals.set(
      category,
      (categoryTotals.get(category) ?? 0) + transaction.amount
    );
    dayTotals.set(day, (dayTotals.get(day) ?? 0) + transaction.amount);
    cycleTotals.set(transaction.billingCycleId, {
      label: cycleLabel,
      amount:
        (cycleTotals.get(transaction.billingCycleId)?.amount ?? 0) +
        transaction.amount,
    });
  }

  const topMerchant = topEntry(merchantTotals);
  const topCategory = topEntry(categoryTotals);
  const topDay = topEntry(dayTotals);
  const biggestCycle = [...cycleTotals.values()].sort(
    (a, b) => b.amount - a.amount
  )[0];
  const biggestTransaction = expenses.sort((a, b) => b.amount - a.amount)[0];
  const totalRefunded = Math.abs(
    refunds.reduce((sum, transaction) => sum + transaction.amount, 0)
  );
  const insights: string[] = [];

  if (topMerchant) {
    insights.push(
      `${topMerchant.key} is your all-time top merchant at ₹${topMerchant.value.toLocaleString("en-IN")}.`
    );
  }

  if (topCategory) {
    insights.push(
      `${topCategory.key} is your biggest category historically: ₹${topCategory.value.toLocaleString("en-IN")}.`
    );
  }

  if (topDay) {
    insights.push(
      `You spend the most on ${topDay.key}s: ₹${topDay.value.toLocaleString("en-IN")} logged so far.`
    );
  }

  if (biggestCycle) {
    insights.push(
      `Your heaviest cycle was ${biggestCycle.label}, with ₹${biggestCycle.amount.toLocaleString("en-IN")} counted spend.`
    );
  }

  if (biggestTransaction) {
    insights.push(
      `Your largest single spend was ${biggestTransaction.merchantNormalized}: ₹${biggestTransaction.amount.toLocaleString("en-IN")}.`
    );
  }

  if (totalRefunded > 0) {
    insights.push(
      `Refunds have reduced your bills by ₹${totalRefunded.toLocaleString("en-IN")} so far.`
    );
  }

  return insights;
}

function topEntry(values: Map<string, number>) {
  const [entry] = [...values.entries()].sort((a, b) => b[1] - a[1]);

  if (!entry) return null;

  return { key: entry[0], value: entry[1] };
}
