import { calculateCycleTotal } from "@/app/lib/accounting";

export type ParsedLine = {
  rawText: string;
  merchantRaw: string;
  merchantNormalized: string;
  category: string;
  amount: number;
  type: "EXPENSE" | "REFUND" | "PAYMENT" | "ADJUSTMENT";
  expression?: string;
  isExcluded?: boolean;
  warning?: string;
};

export type ParsedCycle = {
  label: string;
  startDate?: string;
  endDate?: string;
  transactions: ParsedLine[];
  declaredTotal?: number;
  calculatedTotal: number;
  difference?: number;
};

const MONTH_PATTERN =
  "Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|Sept|September|Oct|October|Nov|November|Dec|December";

function normalizeAppleNotesText(input: string) {
  return (
    input
      // Remove invisible Apple Notes / Unicode junk.
      .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, "")
      .replace(/\u00A0/g, " ")
      .replace(/[‎ ]/g, " ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")

      // Normalize line endings first.
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")

      // Do NOT collapse newlines into spaces.
      .replace(/[ \t]+/g, " ")

      // Put cycle headers on their own lines.
      .replace(
        new RegExp(
          `(\\d{1,2}\\s*(?:${MONTH_PATTERN})(?:\\s+\\d{4})?\\s+to\\s+\\d{1,2}\\s*(?:${MONTH_PATTERN})?(?:\\s+\\d{4})?)`,
          "gi"
        ),
        "\n$1\n"
      )

      // Put summaries on their own lines.
      .replace(/\b(Total|Balance)\s*:/gi, "\n$1:")
      .replace(/\b(December\s+\d{4}\s+month spendings)\s*:/gi, "\n$1:")
      .replace(/\b(November\s+\d{4}\s+month spendings)\s*:/gi, "\n$1:")
      .replace(/\b(remaining from [a-z]+)\b/gi, "\n$1")

      // Put Paid markers on separate lines.
      .replace(/\b(Paid\s+in\s+full)\b/gi, "\n$1")
      .replace(/\b(Paid\s+[-+*/=,\d ]+)/gi, "\n$1")

      // Fix lines where Apple Notes removed newline between entries.
      // Restrict to non-newline whitespace using [^\S\n], not \s.
      .replace(
        /[^\S\n]+([A-Za-z][A-Za-z0-9 &'()./-]{1,60})[^\S\n]*:[^\S\n]*(-?\d[\d,]*(?:[^\S\n]*[-+*/][^\S\n]*\d[\d,]*)?(?:[^\S\n]*=[^\S\n]*-?\d[\d,]*)?)/g,
        "\n$1: $2"
      )

      // Amount-first entries like "215 swiggy", but don't cross lines.
      .replace(
        /[^\S\n]+(-?\d[\d,]{1,8}[^\S\n]+[A-Za-z(][A-Za-z0-9 &'()./-]{1,60})/g,
        "\n$1"
      )

      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

const aliasRules: Array<{ test: RegExp; merchant: string; category: string }> =
  [
    { test: /blinkit/i, merchant: "Blinkit", category: "Groceries" },
    { test: /instamart/i, merchant: "Instamart", category: "Groceries" },
    { test: /zomato/i, merchant: "Zomato", category: "Food Delivery" },
    { test: /swiggy/i, merchant: "Swiggy", category: "Food Delivery" },
    {
      test: /domino|domino’s|dominos/i,
      merchant: "Dominos",
      category: "Food Delivery"
    },
    {
      test: /pizza\s*hut|pizzahut/i,
      merchant: "Pizza Hut",
      category: "Food Delivery"
    },
    { test: /kfc/i, merchant: "KFC", category: "Food Delivery" },
    {
      test: /chat\s*gpt|chatgpt|\bgpt\b/i,
      merchant: "ChatGPT",
      category: "Subscription"
    },
    {
      test: /yt\s*premium|youtube\s*premium/i,
      merchant: "YouTube Premium",
      category: "Subscription"
    },
    {
      test: /jio|wifi|electricity|recharge/i,
      merchant: "Bills",
      category: "Bills"
    },
    {
      test: /liquor|beer|daaru|old monk|alchohol|alcohol/i,
      merchant: "Alcohol",
      category: "Alcohol"
    },
    {
      test: /fancode|signal\s*rgb|aimlab|game|vandal|kurunami|reaver|phantom/i,
      merchant: "Gaming",
      category: "Gaming"
    },
    {
      test: /man matters|taurine|theanine|caffeine|m?caffeine|nakpro|biotin/i,
      merchant: "Health",
      category: "Health"
    },
    { test: /refund/i, merchant: "Refund", category: "Refund" },
    {
      test: /remaining|outstanding|pending|last month/i,
      merchant: "Previous Balance",
      category: "Adjustment"
    },
    { test: /paid/i, merchant: "Payment", category: "Payment" }
  ];

export function normalizeMerchant(raw: string) {
  const match = aliasRules.find((rule) => rule.test.test(raw));
  return {
    merchantNormalized: match?.merchant ?? titleCase(raw.trim()),
    category: match?.category ?? "Other"
  };
}

function titleCase(value: string) {
  return value
    .replace(/[’']/g, "'")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function safeEvalExpression(expression: string): number | null {
  const clean = expression.replace(/,/g, "").replace(/₹/g, "").trim();
  if (!/^[0-9+\-*/().\s]+$/.test(clean)) return null;
  try {
    // Limited arithmetic parser via Function after strict character whitelist.
    const result = Function(`"use strict"; return (${clean});`)();
    return Number.isFinite(result) ? Math.round(result) : null;
  } catch {
    return null;
  }
}

function extractAmountFromRightSide(value: string): {
  amount: number | null;
  expression?: string;
} {
  const cleaned = value.replace(/‎| |₹|,/g, "").trim();
  const equalParts = cleaned.split("=");
  if (equalParts.length > 1) {
    const rightAmount =
      equalParts[equalParts.length - 1].match(/-?\d+(?:\.\d+)?/);
    if (rightAmount)
      return {
        amount: Math.round(Number(rightAmount[0])),
        expression: equalParts[0].trim()
      };
  }

  const arithmetic = cleaned.match(
    /[0-9][0-9+\-*/().\s]*[+\-*/][0-9+\-*/().\s]*/
  );
  if (arithmetic) {
    const evaluated = safeEvalExpression(arithmetic[0]);
    if (evaluated !== null)
      return { amount: evaluated, expression: arithmetic[0].trim() };
  }

  const number = cleaned.match(/-?\d+(?:\.\d+)?/);
  return { amount: number ? Math.round(Number(number[0])) : null };
}

export function parseExpenseLine(line: string): ParsedLine | null {
  const rawText = line.trim();
  if (!rawText) return null;

  if (
    /^(total|balance|december\s+\d{4}\s+month spendings|november\s+\d{4}\s+month spendings)\b/i.test(
      rawText
    )
  ) {
    return null;
  }

  if (/^remaining from [a-z]+/i.test(rawText)) {
    return null;
  }

  if (/^\d{1,2}\s*[a-z]+/i.test(rawText) && /\b(to|month)\b/i.test(rawText)) {
    return null;
  }

  if (/^\(?paid\s+in\s+full\)?$/i.test(rawText)) {
    return {
      rawText,
      merchantRaw: "Paid",
      ...normalizeMerchant("Paid"),
      amount: 0,
      type: "PAYMENT",
      warning: "Paid in full has no explicit amount"
    };
  }

  const paidInline = rawText.match(/^paid(?:\s+(.+))?$/i);

  if (paidInline) {
    const valueText = paidInline[1] ?? "";
    const { amount, expression } = extractAmountFromRightSide(valueText);

    if (amount === null) return null;

    return {
      rawText,
      merchantRaw: "Paid",
      ...normalizeMerchant("Paid"),
      amount: Math.abs(amount),
      type: "PAYMENT",
      expression
    };
  }

  const amountPaidMatch = rawText.match(/^(-?\d[\d,]*)\s*\((paid)\)$/i);

  if (amountPaidMatch) {
    const amount = Number(amountPaidMatch[1].replace(/,/g, ""));

    return {
      rawText,
      merchantRaw: "Paid",
      ...normalizeMerchant("Paid"),
      amount: Math.abs(amount),
      type: "PAYMENT"
    };
  }

  const colonIndex = rawText.indexOf(":");

  let merchantRaw = "Other";
  let valueText = rawText;

  if (colonIndex !== -1) {
    merchantRaw = rawText.slice(0, colonIndex).trim();
    valueText = rawText.slice(colonIndex + 1).trim();
  } else {
    const amountFirstMatch = rawText.match(/^(-?\d[\d,]*)\s+(.+)$/);
    const merchantFirstMatch = rawText.match(
      /^(.+?)\s+(-?\d[\d,]*(?:\.\d+)?)(?:\s|$)/
    );

    if (amountFirstMatch) {
      valueText = amountFirstMatch[1].trim();
      merchantRaw = amountFirstMatch[2].replace(/\(paid\)/i, "").trim();

      if (/\bpaid\b/i.test(rawText)) {
        const amount = Number(valueText.replace(/,/g, ""));
        if (!Number.isFinite(amount)) return null;

        return {
          rawText,
          merchantRaw: "Paid",
          ...normalizeMerchant("Paid"),
          amount: Math.abs(amount),
          type: "PAYMENT"
        };
      }
    } else if (merchantFirstMatch) {
      merchantRaw = merchantFirstMatch[1].trim();
      valueText = merchantFirstMatch[2].trim();
    }
  }

  const { amount, expression } = extractAmountFromRightSide(valueText);
  if (amount === null) return null;

  const normalized = normalizeMerchant(merchantRaw);
  const isRefund = /refund/i.test(merchantRaw);
  const isAdjustment = /remaining|outstanding|pending|last month/i.test(
    merchantRaw
  );

  return {
    rawText,
    merchantRaw,
    ...normalized,
    amount: isRefund ? -Math.abs(amount) : Math.abs(amount),
    type: isRefund ? "REFUND" : isAdjustment ? "ADJUSTMENT" : "EXPENSE",
    expression
  };
}

const MONTHS: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
};

function makeLocalDate(year: number, monthIndex: number, day: number) {
  return new Date(year, monthIndex, day, 0, 0, 0, 0);
}

function toISODateOnly(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseMonth(value: string) {
  return MONTHS[value.trim().toLowerCase()];
}

function parseCycleHeader(line: string, fallbackYear: number) {
  const cleaned = line.replace(/\s+/g, " ").trim();

  const match = cleaned.match(
    /^(\d{1,2})\s*([A-Za-z]+)(?:\s+(\d{4}))?\s+to\s+(\d{1,2})\s*([A-Za-z]+)?(?:\s+(\d{4}))?$/i
  );

  if (!match) return null;

  const startDay = Number(match[1]);
  const startMonthName = match[2];
  const explicitStartYear = match[3] ? Number(match[3]) : undefined;

  const endDay = Number(match[4]);
  const endMonthName = match[5] || startMonthName;
  const explicitEndYear = match[6] ? Number(match[6]) : undefined;

  const startMonth = parseMonth(startMonthName);
  const endMonth = parseMonth(endMonthName);

  if (startMonth === undefined || endMonth === undefined) return null;

  let startYear = explicitStartYear ?? fallbackYear;
  let endYear = explicitEndYear ?? startYear;

  // Example: 11 December to 11 January
  if (!explicitEndYear && endMonth < startMonth) {
    endYear = startYear + 1;
  }

  // Example: 11 Dec to 11 jan 2025 means Dec 2024 -> Jan 2025
  if (!explicitStartYear && explicitEndYear && startMonth > endMonth) {
    startYear = explicitEndYear - 1;
    endYear = explicitEndYear;
  }

  // Example: 11 November to 11 December 2025
  if (!explicitStartYear && explicitEndYear && startMonth <= endMonth) {
    startYear = explicitEndYear;
    endYear = explicitEndYear;
  }

  return {
    label: cleaned,
    hasExplicitYear: Boolean(explicitStartYear || explicitEndYear),
    startDate: makeLocalDate(startYear, startMonth, startDay),
    endDate: makeLocalDate(endYear, endMonth, endDay)
  };
}

function extractDeclaredTotal(line: string): number | undefined {
  const cleaned = line.replace(/‎| |₹|,/g, "").trim();

  const equalsMatch = cleaned.match(/=\s*(-?\d+(?:\.\d+)?)/);

  if (equalsMatch) {
    return Math.round(Number(equalsMatch[1]));
  }

  const numbers = [...cleaned.matchAll(/-?\d+(?:\.\d+)?/g)].map((match) =>
    Number(match[0])
  );

  if (numbers.length === 0) return undefined;

  return Math.round(numbers[numbers.length - 1]);
}

export function parseAppleNotes(text: string): ParsedCycle[] {
  const normalizedText = normalizeAppleNotesText(text);

  const lines = normalizedText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const cycles: ParsedCycle[] = [];
  let current: ParsedCycle | null = null;

  let fallbackYear = new Date().getFullYear();
  let previousStartDate: Date | null = null;
  let ignoreUntilNextCycle = false;

  for (const line of lines) {
    if (/^(december|november)\s+\d{4}\s+month spendings/i.test(line)) {
      if (current) {
        finalizeCycle(current);
        current = null;
      }

      ignoreUntilNextCycle = true;
      continue;
    }

    const heading = parseCycleHeader(line, fallbackYear);

    if (heading) {
      ignoreUntilNextCycle = false;

      if (current) {
        finalizeCycle(current);
      }

      let startDate = heading.startDate;
      let endDate = heading.endDate;

      if (heading.hasExplicitYear) {
        fallbackYear = startDate.getFullYear();
      } else if (previousStartDate && startDate >= previousStartDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        startDate.setFullYear(startDate.getFullYear() - 1);
        endDate.setFullYear(endDate.getFullYear() - 1);
      }

      fallbackYear = startDate.getFullYear();
      previousStartDate = startDate;

      current = {
        label: heading.label,
        startDate: toISODateOnly(startDate),
        endDate: toISODateOnly(endDate),
        transactions: [],
        calculatedTotal: 0
      };

      cycles.push(current);
      continue;
    }

    if (ignoreUntilNextCycle) continue;
    if (!current) continue;

    if (/^(total|balance)\s*:/i.test(line)) {
      const declaredTotal = extractDeclaredTotal(line);

      if (typeof declaredTotal === "number") {
        current.declaredTotal = declaredTotal;
      }

      continue;
    }

    const parsed = parseExpenseLine(line);

    if (parsed) {
      current.transactions.push(parsed);
    }
  }

  if (current) {
    finalizeCycle(current);
  }

  return cycles;
}
function finalizeCycle(cycle: ParsedCycle) {
  cycle.calculatedTotal = calculateCycleTotal(cycle.transactions);

  if (typeof cycle.declaredTotal === "number") {
    cycle.difference = cycle.calculatedTotal - cycle.declaredTotal;
  }
}
