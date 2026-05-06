"use client";

import { useMemo, useState, useTransition } from "react";

type TransactionType = "EXPENSE" | "REFUND" | "PAYMENT" | "ADJUSTMENT";
type QuickAddOption = {
  merchant: string;
  category: string;
  type?: TransactionType;
};

const QUICK_ADD_OPTIONS: QuickAddOption[] = [
  { merchant: "Blinkit", category: "Groceries" },
  { merchant: "Zomato", category: "Food Delivery" },
  { merchant: "Swiggy", category: "Food Delivery" },
  { merchant: "Dominos", category: "Food Delivery" },
  { merchant: "Instamart", category: "Groceries" },
  { merchant: "ChatGPT", category: "Subscription" },
  { merchant: "YouTube Premium", category: "Subscription" },
  { merchant: "Bills", category: "Bills" },
  { merchant: "Gaming", category: "Gaming" },
  { merchant: "Health", category: "Health" },
  { merchant: "Alcohol", category: "Alcohol" },
  { merchant: "Refund", category: "Refund", type: "REFUND" },
  { merchant: "Payment", category: "Payment", type: "PAYMENT" },
  { merchant: "Previous Balance", category: "Adjustment", type: "ADJUSTMENT" },
];

const CATEGORY_OPTIONS = [
  "Food Delivery",
  "Groceries",
  "Subscription",
  "Bills",
  "Gaming",
  "Health",
  "Alcohol",
  "Refund",
  "Payment",
  "Adjustment",
  "Other",
];

export default function QuickAddForm({ cardId }: { cardId: string }) {
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [isMerchantFocused, setIsMerchantFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const filteredOptions = useMemo(() => {
    const query = merchant.trim().toLowerCase();
    if (!query) return QUICK_ADD_OPTIONS;

    return QUICK_ADD_OPTIONS.filter((option) => {
      return (
        option.merchant.toLowerCase().includes(query) ||
        option.category.toLowerCase().includes(query)
      );
    });
  }, [merchant]);

  const inferredOption = useMemo(() => {
    return QUICK_ADD_OPTIONS.find(
      (option) => option.merchant.toLowerCase() === merchant.trim().toLowerCase()
    );
  }, [merchant]);

  const canSubmit = merchant.trim() && Number(amount) > 0;

  async function submit() {
    setError(null);
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardId,
        merchantRaw: merchant,
        category,
        amount: Number(amount),
        type,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? "Unable to save transaction");
      return;
    }

    setMerchant("");
    setCategory("");
    setAmount("");
    setType("EXPENSE");
    window.location.reload();
  }

  function selectOption(option: QuickAddOption) {
    setMerchant(option.merchant);
    setCategory(option.category);
    setType((option.type ?? "EXPENSE") as TransactionType);
    setIsMerchantFocused(false);
  }

  return (
    <section className="card">
      <h2 style={{ marginTop: 0 }}>Quick add</h2>

      <div className="quick-add">
        <div className="quick-add-search quick-add-merchant">
          <input
            className="input"
            value={merchant}
            onChange={(e) => {
              const nextMerchant = e.target.value;
              const option = QUICK_ADD_OPTIONS.find(
                (item) =>
                  item.merchant.toLowerCase() === nextMerchant.toLowerCase()
              );

              setMerchant(nextMerchant);

              if (option) {
                setCategory(option.category);
                setType((option.type ?? "EXPENSE") as TransactionType);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canSubmit) {
                startTransition(submit);
              }
            }}
            onBlur={() => setIsMerchantFocused(false)}
            onFocus={() => setIsMerchantFocused(true)}
            placeholder="Search or type merchant"
          />

          {isMerchantFocused && filteredOptions.length > 0 && (
            <div className="quick-add-options">
              {filteredOptions.slice(0, 8).map((option) => (
                <button
                  className={`quick-add-option ${
                    option.merchant === merchant ? "selected" : ""
                  }`}
                  key={`${option.merchant}-${option.category}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectOption(option);
                  }}
                  type="button"
                >
                  <span>{option.merchant}</span>
                  <span>{option.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="quick-add-category">
          <input
            className="input"
            list="category-options"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder={
              inferredOption
                ? `Category: ${inferredOption.category}`
                : "Category, optional"
            }
          />
          <datalist id="category-options">
            {CATEGORY_OPTIONS.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </div>

        <div className="quick-add-amount">
          <span>₹</span>
          <input
            inputMode="numeric"
            min="1"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canSubmit) {
                startTransition(submit);
              }
            }}
            placeholder="Amount"
          />
        </div>

        <select
          className="input quick-add-type"
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
        >
          <option value="EXPENSE">Expense</option>
          <option value="REFUND">Refund</option>
          <option value="PAYMENT">Payment</option>
          <option value="ADJUSTMENT">Adjustment</option>
        </select>

        <button
          className="btn quick-add-submit"
          disabled={isPending || !canSubmit}
          onClick={() => startTransition(submit)}
          type="button"
        >
          {isPending ? "Saving..." : "Add"}
        </button>
      </div>
      {error && <p className="bad">{error}</p>}
    </section>
  );
}
