"use client";

import { useState, useTransition } from "react";

type TransactionType = "EXPENSE" | "REFUND" | "PAYMENT" | "ADJUSTMENT";

type EditableTransaction = {
  id: string;
  merchantRaw: string;
  merchantNormalized: string;
  category: string | null;
  amount: number;
  type: TransactionType;
  date: string;
  isExcluded: boolean;
};

export default function EditTransactionButton({
  transaction,
}: {
  transaction: EditableTransaction;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [merchantRaw, setMerchantRaw] = useState(transaction.merchantRaw);
  const [category, setCategory] = useState(transaction.category ?? "Other");
  const [amount, setAmount] = useState(String(Math.abs(transaction.amount)));
  const [type, setType] = useState<TransactionType>(transaction.type);
  const [date, setDate] = useState(toDateTimeLocalValue(transaction.date));
  const [isExcluded, setIsExcluded] = useState(transaction.isExcluded);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function save() {
    setError(null);

    startTransition(async () => {
      const response = await fetch(`/api/transactions/${transaction.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchantRaw,
          category,
          amount: Number(amount),
          type,
          date,
          isExcluded,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body.error ?? "Unable to update transaction");
        return;
      }

      window.location.reload();
    });
  }

  return (
    <>
      <button
        className="btn secondary compact"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Edit
      </button>

      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="section-heading-row">
              <div>
                <h2 style={{ margin: 0 }}>Edit transaction</h2>
                <p className="label" style={{ marginBottom: 0 }}>
                  {transaction.merchantNormalized}
                </p>
              </div>
              <button
                className="btn secondary compact"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="edit-form">
              <label>
                <span className="label">Merchant</span>
                <input
                  className="input"
                  value={merchantRaw}
                  onChange={(event) => setMerchantRaw(event.target.value)}
                />
              </label>

              <label>
                <span className="label">Category</span>
                <input
                  className="input"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                />
              </label>

              <label>
                <span className="label">Amount</span>
                <input
                  className="input"
                  inputMode="numeric"
                  min="1"
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </label>

              <label>
                <span className="label">Type</span>
                <select
                  className="input"
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value as TransactionType)
                  }
                >
                  <option value="EXPENSE">Expense</option>
                  <option value="REFUND">Refund</option>
                  <option value="PAYMENT">Payment</option>
                  <option value="ADJUSTMENT">Adjustment</option>
                </select>
              </label>

              <label>
                <span className="label">Date and time</span>
                <input
                  className="input"
                  type="datetime-local"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </label>

              <label className="checkbox-row">
                <input
                  checked={isExcluded}
                  onChange={(event) => setIsExcluded(event.target.checked)}
                  type="checkbox"
                />
                <span>Exclude from totals</span>
              </label>
            </div>

            {error && <p className="bad">{error}</p>}

            <div className="modal-actions">
              <button
                className="btn secondary"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn"
                disabled={isPending || !merchantRaw.trim() || Number(amount) <= 0}
                onClick={save}
                type="button"
              >
                {isPending ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function toDateTimeLocalValue(value: string) {
  const date = new Date(value);
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;

  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}
