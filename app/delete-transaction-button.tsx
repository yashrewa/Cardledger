"use client";

import { useState, useTransition } from "react";

export default function DeleteTransactionButton({
  transactionId,
  merchant,
}: {
  transactionId: string;
  merchant: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function deleteTransaction() {
    setError(null);

    if (!window.confirm(`Delete ${merchant}?`)) {
      return;
    }

    startTransition(async () => {
      const response = await fetch(`/api/transactions/${transactionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body.error ?? "Unable to delete transaction");
        return;
      }

      window.location.reload();
    });
  }

  return (
    <>
      <button
        className="btn danger compact"
        disabled={isPending}
        onClick={deleteTransaction}
        type="button"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {error && <div className="bad action-error">{error}</div>}
    </>
  );
}
