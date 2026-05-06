export type TotalableTransaction = {
  amount: number;
  type: string;
  isExcluded?: boolean;
};

export function isIncludedInCycleTotal(transaction: TotalableTransaction) {
  return !transaction.isExcluded && transaction.type !== "PAYMENT";
}

export function calculateCycleTotal(transactions: TotalableTransaction[]) {
  return transactions.reduce((sum, transaction) => {
    if (!isIncludedInCycleTotal(transaction)) return sum;

    return sum + transaction.amount;
  }, 0);
}
