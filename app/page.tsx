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
import CycleSelector from "./cycle-selector";
import CopyNotesButton from "./copy-notes-button";

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

  return {
    card,
    cycle,
    total,
    paid,
    pending,
    merchantTotals,
    countedTransactionCount: includedTransactions.length,
    notesExportText,
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
  const {
    card,
    cycle,
    total,
    paid,
    pending,
    merchantTotals,
    countedTransactionCount,
    notesExportText,
    cycleOptions,
  } = await getData(cycleId);

  return (
    <main className="container grid">
      <div>
        <h1 style={{ marginBottom: 4 }}>CardLedger</h1>
        <p className="label" style={{ marginTop: 0 }}>Manual-first credit card billing-cycle tracker</p>
      </div>

      <section className="grid grid-3">
        <div className="card">
          <div className="label">Card</div>
          <div className="value" style={{ fontSize: 22 }}>{card.name}</div>
        </div>
        <div className="card">
          <div className="label">Billing cycle</div>
          <div className="value" style={{ fontSize: 22 }}>{formatCycleLabel(cycle.startDate, cycle.endDate)}</div>
          <div style={{ marginTop: 12 }}>
            <CycleSelector
              cycles={cycleOptions}
              selectedCycleId={cycle.id}
            />
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

      <QuickAddForm cardId={card.id} />

      <section className="card notes-export">
        <div>
          <h2 style={{ margin: 0 }}>Apple Notes export</h2>
          <p className="label" style={{ marginBottom: 0 }}>
            Copy this cycle in your old one-line notes format.
          </p>
        </div>
        <CopyNotesButton text={notesExportText} />
        <textarea
          className="textarea notes-export-text"
          readOnly
          value={notesExportText}
        />
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
                  <DeleteTransactionButton
                    transactionId={tx.id}
                    merchant={tx.merchantNormalized}
                  />
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
  ].join(" ");
}
