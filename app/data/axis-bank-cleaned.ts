export type AxisBankCleanEntry = {
  rawText: string;
  merchantRaw: string;
  amount: number;
  type: "EXPENSE" | "REFUND" | "ADJUSTMENT" | "PAYMENT";
  expression?: string;
  isExcluded?: boolean;
  note?: string;
};

export type AxisBankCleanPayment = {
  rawText: string;
  amount: number | null;
  expression?: string;
  note?: string;
};

export type AxisBankCleanNote = {
  rawText: string;
  amount?: number;
  type: "META" | "UNPARSED";
};

export type AxisBankCleanCycle = {
  label: string;
  startDate: string;
  endDate: string;
  declaredTotal: number | null;
  calculatedFromIncludedEntries: number;
  differenceFromDeclared: number | null;
  entries: AxisBankCleanEntry[];
  payments?: AxisBankCleanPayment[];
  notes?: AxisBankCleanNote[];
};

export type AxisBankExtraMonthlySection = {
  label: string;
  month: string;
  declaredTotal: number;
  entries: AxisBankCleanEntry[];
  payments?: AxisBankCleanPayment[];
  notes?: AxisBankCleanNote[];
};

export const axisBankCleanedCycles: AxisBankCleanCycle[] = [
  {
    "label": "11 April 2026 to 11 May 2026",
    "startDate": "2026-04-11",
    "endDate": "2026-05-11",
    "declaredTotal": 11169,
    "entries": [
      {
        "rawText": "Remaining: 423",
        "merchantRaw": "Remaining",
        "amount": 423,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "Blinkit: 265",
        "merchantRaw": "Blinkit",
        "amount": 265,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 254",
        "merchantRaw": "Zomato",
        "amount": 254,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 222",
        "merchantRaw": "Blinkit",
        "amount": 222,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 223",
        "merchantRaw": "Zomato",
        "amount": 223,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 178",
        "merchantRaw": "Dominos",
        "amount": 178,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 211",
        "merchantRaw": "Dominos",
        "amount": 211,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 438",
        "merchantRaw": "Blinkit",
        "amount": 438,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 210",
        "merchantRaw": "Blinkit",
        "amount": 210,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 195",
        "merchantRaw": "Zomato",
        "amount": 195,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 142",
        "merchantRaw": "Zomato",
        "amount": 142,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 193",
        "merchantRaw": "Zomato",
        "amount": 193,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 528",
        "merchantRaw": "Blinkit",
        "amount": 528,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 163",
        "merchantRaw": "Zomato",
        "amount": 163,
        "type": "EXPENSE"
      },
      {
        "rawText": "Man matters: 1358",
        "merchantRaw": "Man matters",
        "amount": 1358,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 532",
        "merchantRaw": "Blinkit",
        "amount": 532,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 191",
        "merchantRaw": "Zomato",
        "amount": 191,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 164",
        "merchantRaw": "Zomato",
        "amount": 164,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 210",
        "merchantRaw": "Zomato",
        "amount": 210,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 318",
        "merchantRaw": "Zomato",
        "amount": 318,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 143",
        "merchantRaw": "Swiggy",
        "amount": 143,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 141",
        "merchantRaw": "Zomato",
        "amount": 141,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 156",
        "merchantRaw": "Zomato",
        "amount": 156,
        "type": "EXPENSE"
      },
      {
        "rawText": "Gpt: 1999",
        "merchantRaw": "Gpt",
        "amount": 1999,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 374",
        "merchantRaw": "Zomato",
        "amount": 374,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 324",
        "merchantRaw": "Blinkit",
        "amount": 324,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 1290",
        "merchantRaw": "Blinkit",
        "amount": 1290,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 83",
        "merchantRaw": "Zomato",
        "amount": 83,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 231",
        "merchantRaw": "Zomato",
        "amount": 231,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 11159,
    "differenceFromDeclared": -10
  },
  {
    "label": "11 March 2026 to 11 April 2026",
    "startDate": "2026-03-11",
    "endDate": "2026-04-11",
    "declaredTotal": 15710,
    "entries": [
      {
        "rawText": "Remaining: 176",
        "merchantRaw": "Remaining",
        "amount": 176,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "Dominos: 181",
        "merchantRaw": "Dominos",
        "amount": 181,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 236",
        "merchantRaw": "Blinkit",
        "amount": 236,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 219",
        "merchantRaw": "Swiggy",
        "amount": 219,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 177",
        "merchantRaw": "Zomato",
        "amount": 177,
        "type": "EXPENSE"
      },
      {
        "rawText": "Refund: 44",
        "merchantRaw": "Refund",
        "amount": -44,
        "type": "REFUND"
      },
      {
        "rawText": "Zomato: 132",
        "merchantRaw": "Zomato",
        "amount": 132,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 185",
        "merchantRaw": "Dominos",
        "amount": 185,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 296",
        "merchantRaw": "Blinkit",
        "amount": 296,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 179",
        "merchantRaw": "Zomato",
        "amount": 179,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 203",
        "merchantRaw": "Zomato",
        "amount": 203,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 341",
        "merchantRaw": "Blinkit",
        "amount": 341,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 143",
        "merchantRaw": "Zomato",
        "amount": 143,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 181",
        "merchantRaw": "Dominos",
        "amount": 181,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 223",
        "merchantRaw": "Blinkit",
        "amount": 223,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 134",
        "merchantRaw": "Zomato",
        "amount": 134,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 180",
        "merchantRaw": "Dominos",
        "amount": 180,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 177",
        "merchantRaw": "Zomato",
        "amount": 177,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 309",
        "merchantRaw": "Blinkit",
        "amount": 309,
        "type": "EXPENSE"
      },
      {
        "rawText": "Domino's: 179",
        "merchantRaw": "Domino's",
        "amount": 179,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 143",
        "merchantRaw": "Zomato",
        "amount": 143,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 212",
        "merchantRaw": "Blinkit",
        "amount": 212,
        "type": "EXPENSE"
      },
      {
        "rawText": "Keyboard: 8890-2510 = 6,380",
        "merchantRaw": "Keyboard",
        "amount": 6380,
        "type": "EXPENSE",
        "expression": "8890-2510"
      },
      {
        "rawText": "Zomato: 117",
        "merchantRaw": "Zomato",
        "amount": 117,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 165",
        "merchantRaw": "Zomato",
        "amount": 165,
        "type": "EXPENSE"
      },
      {
        "rawText": "Domino's: 220",
        "merchantRaw": "Domino's",
        "amount": 220,
        "type": "EXPENSE"
      },
      {
        "rawText": "Gpt: 1999",
        "merchantRaw": "Gpt",
        "amount": 1999,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 209",
        "merchantRaw": "Blinkit",
        "amount": 209,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 236",
        "merchantRaw": "Zomato",
        "amount": 236,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 210",
        "merchantRaw": "Blinkit",
        "amount": 210,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 180",
        "merchantRaw": "Zomato",
        "amount": 180,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 136",
        "merchantRaw": "Zomato",
        "amount": 136,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 171",
        "merchantRaw": "Dominos",
        "amount": 171,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 297",
        "merchantRaw": "Blinkit",
        "amount": 297,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 224",
        "merchantRaw": "Blinkit",
        "amount": 224,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 243",
        "merchantRaw": "Blinkit",
        "amount": 243,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 220",
        "merchantRaw": "Blinkit",
        "amount": 220,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 179",
        "merchantRaw": "Dominos",
        "amount": 179,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 192",
        "merchantRaw": "Swiggy",
        "amount": 192,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 170",
        "merchantRaw": "Dominos",
        "amount": 170,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 15710,
    "differenceFromDeclared": 0
  },
  {
    "label": "11 Feb 2026 to 11 March 2026",
    "startDate": "2026-02-11",
    "endDate": "2026-03-11",
    "declaredTotal": 9708,
    "entries": [
      {
        "rawText": "Dominos: 153",
        "merchantRaw": "Dominos",
        "amount": 153,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 233",
        "merchantRaw": "Blinkit",
        "amount": 233,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 235",
        "merchantRaw": "Blinkit",
        "amount": 235,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 152",
        "merchantRaw": "Dominos",
        "amount": 152,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 215",
        "merchantRaw": "Blinkit",
        "amount": 215,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 193",
        "merchantRaw": "Dominos",
        "amount": 193,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 111",
        "merchantRaw": "Zomato",
        "amount": 111,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 990",
        "merchantRaw": "Yt premium",
        "amount": 990,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 160",
        "merchantRaw": "Dominos",
        "amount": 160,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 539",
        "merchantRaw": "Blinkit",
        "amount": 539,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 152",
        "merchantRaw": "Dominos",
        "amount": 152,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 152",
        "merchantRaw": "Dominos",
        "amount": 152,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 160",
        "merchantRaw": "Dominos",
        "amount": 160,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 131",
        "merchantRaw": "Zomato",
        "amount": 131,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 642",
        "merchantRaw": "Blinkit",
        "amount": 642,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 390",
        "merchantRaw": "Blinkit",
        "amount": 390,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 135",
        "merchantRaw": "Dominos",
        "amount": 135,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 907",
        "merchantRaw": "Zomato",
        "amount": 907,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 168",
        "merchantRaw": "Zomato",
        "amount": 168,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 232",
        "merchantRaw": "Blinkit",
        "amount": 232,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 242",
        "merchantRaw": "Blinkit",
        "amount": 242,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 421",
        "merchantRaw": "Zomato",
        "amount": 421,
        "type": "EXPENSE"
      },
      {
        "rawText": "Domino's: 159",
        "merchantRaw": "Domino's",
        "amount": 159,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 279",
        "merchantRaw": "Blinkit",
        "amount": 279,
        "type": "EXPENSE"
      },
      {
        "rawText": "Fancode: 899",
        "merchantRaw": "Fancode",
        "amount": 899,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 132",
        "merchantRaw": "Zomato",
        "amount": 132,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 246",
        "merchantRaw": "Blinkit",
        "amount": 246,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 160",
        "merchantRaw": "Dominos",
        "amount": 160,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 243",
        "merchantRaw": "Blinkit",
        "amount": 243,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 193",
        "merchantRaw": "Zomato",
        "amount": 193,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 507",
        "merchantRaw": "Blinkit",
        "amount": 507,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 177",
        "merchantRaw": "Zomato",
        "amount": 177,
        "type": "EXPENSE"
      }
    ],
    "notes": [
      {
        "rawText": "9708-9100 = 608",
        "amount": 608,
        "type": "META"
      }
    ],
    "calculatedFromIncludedEntries": 9708,
    "differenceFromDeclared": 0
  },
  {
    "label": "11 January 2026 to 11 Feb 2026",
    "startDate": "2026-01-11",
    "endDate": "2026-02-11",
    "declaredTotal": 9803,
    "entries": [
      {
        "rawText": "Dominos: 124",
        "merchantRaw": "Dominos",
        "amount": 124,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 166",
        "merchantRaw": "Dominos",
        "amount": 166,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit (mummy): 219",
        "merchantRaw": "Blinkit (mummy)",
        "amount": 219,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 149",
        "merchantRaw": "Yt premium",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Chatgpt: 1999",
        "merchantRaw": "Chatgpt",
        "amount": 1999,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 166",
        "merchantRaw": "Zomato",
        "amount": 166,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 219",
        "merchantRaw": "Blinkit",
        "amount": 219,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 221",
        "merchantRaw": "Blinkit",
        "amount": 221,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 220",
        "merchantRaw": "Blinkit",
        "amount": 220,
        "type": "EXPENSE"
      },
      {
        "rawText": "Mobile mummy: 10658-10000 = 658 (sent 10000)",
        "merchantRaw": "Mobile mummy",
        "amount": 658,
        "type": "EXPENSE",
        "expression": "10658-10000"
      },
      {
        "rawText": "Blinkit: 236",
        "merchantRaw": "Blinkit",
        "amount": 236,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 178",
        "merchantRaw": "Dominos",
        "amount": 178,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 208",
        "merchantRaw": "Dominos",
        "amount": 208,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 213",
        "merchantRaw": "Blinkit",
        "amount": 213,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 186",
        "merchantRaw": "Dominos",
        "amount": 186,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 186",
        "merchantRaw": "Dominos",
        "amount": 186,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 145",
        "merchantRaw": "Zomato",
        "amount": 145,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 227",
        "merchantRaw": "Blinkit",
        "amount": 227,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 211",
        "merchantRaw": "Blinkit",
        "amount": 211,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 179",
        "merchantRaw": "Dominos",
        "amount": 179,
        "type": "EXPENSE"
      },
      {
        "rawText": "Caffeine: 320",
        "merchantRaw": "Caffeine",
        "amount": 320,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 179",
        "merchantRaw": "Dominos",
        "amount": 179,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 246",
        "merchantRaw": "Dominos",
        "amount": 246,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 179",
        "merchantRaw": "Dominos",
        "amount": 179,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 290",
        "merchantRaw": "Blinkit",
        "amount": 290,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 181",
        "merchantRaw": "Dominos",
        "amount": 181,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 272",
        "merchantRaw": "Zomato",
        "amount": 272,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 175",
        "merchantRaw": "Dominos",
        "amount": 175,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 225",
        "merchantRaw": "Dominos",
        "amount": 225,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 181",
        "merchantRaw": "Dominos",
        "amount": 181,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 211",
        "merchantRaw": "Blinkit",
        "amount": 211,
        "type": "EXPENSE"
      },
      {
        "rawText": "Signal rgb: 6 dollar",
        "merchantRaw": "Signal rgb",
        "amount": 600,
        "type": "EXPENSE",
        "note": "Original note says 6 dollar; total expression used 600."
      },
      {
        "rawText": "Blinkit: 429",
        "merchantRaw": "Blinkit",
        "amount": 429,
        "type": "EXPENSE",
        "note": "Recovered after Signal rgb dollar text."
      },
      {
        "rawText": "Dominos: 205",
        "merchantRaw": "Dominos",
        "amount": 205,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 9803,
    "differenceFromDeclared": 0
  },
  {
    "label": "11 December 2025 to 11 January 2026",
    "startDate": "2025-12-11",
    "endDate": "2026-01-11",
    "declaredTotal": 23365,
    "entries": [
      {
        "rawText": "Outstanding amount: 175",
        "merchantRaw": "Outstanding amount",
        "amount": 175,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "Blinkit: 271",
        "merchantRaw": "Blinkit",
        "amount": 271,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 219",
        "merchantRaw": "Blinkit",
        "amount": 219,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 149",
        "merchantRaw": "Yt premium",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Chatgpt: 1999",
        "merchantRaw": "Chatgpt",
        "amount": 1999,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 220",
        "merchantRaw": "Swiggy",
        "amount": 220,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 283",
        "merchantRaw": "Zomato",
        "amount": 283,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 175",
        "merchantRaw": "Swiggy",
        "amount": 175,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 285",
        "merchantRaw": "Blinkit",
        "amount": 285,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 244",
        "merchantRaw": "Blinkit",
        "amount": 244,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 149",
        "merchantRaw": "Dominos",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 176",
        "merchantRaw": "Zomato",
        "amount": 176,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 487",
        "merchantRaw": "Blinkit",
        "amount": 487,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 88",
        "merchantRaw": "Zomato",
        "amount": 88,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 132",
        "merchantRaw": "Zomato",
        "amount": 132,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 387",
        "merchantRaw": "Blinkit",
        "amount": 387,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 165",
        "merchantRaw": "Zomato",
        "amount": 165,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 246",
        "merchantRaw": "Blinkit",
        "amount": 246,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 168",
        "merchantRaw": "Dominos",
        "amount": 168,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 204",
        "merchantRaw": "Swiggy",
        "amount": 204,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 185",
        "merchantRaw": "Dominos",
        "amount": 185,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 185",
        "merchantRaw": "Dominos",
        "amount": 185,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 790",
        "merchantRaw": "Zomato",
        "amount": 790,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 214",
        "merchantRaw": "Blinkit",
        "amount": 214,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 1000",
        "merchantRaw": "Liquor",
        "amount": 1000,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 127",
        "merchantRaw": "Dominos",
        "amount": 127,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 288",
        "merchantRaw": "Blinkit",
        "amount": 288,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 244",
        "merchantRaw": "Blinkit",
        "amount": 244,
        "type": "EXPENSE"
      },
      {
        "rawText": "New year: 7200-1440 = 5,760 (assuming 2880 on me) (received 1440 from avinash)",
        "merchantRaw": "New year",
        "amount": 5760,
        "type": "EXPENSE",
        "expression": "7200-1440"
      },
      {
        "rawText": "Zomato: 450",
        "merchantRaw": "Zomato",
        "amount": 450,
        "type": "EXPENSE",
        "note": "Recovered after New year note text."
      },
      {
        "rawText": "Dominos: 185",
        "merchantRaw": "Dominos",
        "amount": 185,
        "type": "EXPENSE"
      },
      {
        "rawText": "F1 25 Game: 1499",
        "merchantRaw": "F1 25 Game",
        "amount": 1499,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 3000",
        "merchantRaw": "Liquor",
        "amount": 3000,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 458",
        "merchantRaw": "Blinkit",
        "amount": 458,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 245",
        "merchantRaw": "Blinkit",
        "amount": 245,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 149",
        "merchantRaw": "Dominos",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Domino's: 207",
        "merchantRaw": "Domino's",
        "amount": 207,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 219",
        "merchantRaw": "Blinkit",
        "amount": 219,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 1457",
        "merchantRaw": "Blinkit",
        "amount": 1457,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 541",
        "merchantRaw": "Blinkit",
        "amount": 541,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 149",
        "merchantRaw": "Dominos",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 149",
        "merchantRaw": "Dominos",
        "amount": 149,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 23723,
    "differenceFromDeclared": 358
  },
  {
    "label": "11 November to 11 December 2025",
    "startDate": "2025-11-11",
    "endDate": "2025-12-11",
    "declaredTotal": 11286,
    "entries": [
      {
        "rawText": "Outstanding amount: 399",
        "merchantRaw": "Outstanding amount",
        "amount": 399,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "Blinkit: 216",
        "merchantRaw": "Blinkit",
        "amount": 216,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 177",
        "merchantRaw": "Zomato",
        "amount": 177,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 261",
        "merchantRaw": "Blinkit",
        "amount": 261,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 242",
        "merchantRaw": "Zomato",
        "amount": 242,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 149",
        "merchantRaw": "Yt premium",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Gpt: 1999",
        "merchantRaw": "Gpt",
        "amount": 1999,
        "type": "EXPENSE"
      },
      {
        "rawText": "Book my show: 1250",
        "merchantRaw": "Book my show",
        "amount": 1250,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 218",
        "merchantRaw": "Blinkit",
        "amount": 218,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 310",
        "merchantRaw": "Blinkit",
        "amount": 310,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 216",
        "merchantRaw": "Blinkit",
        "amount": 216,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato kfc: 296",
        "merchantRaw": "Zomato kfc",
        "amount": 296,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 231",
        "merchantRaw": "Blinkit",
        "amount": 231,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 233",
        "merchantRaw": "Blinkit",
        "amount": 233,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 203",
        "merchantRaw": "Zomato",
        "amount": 203,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 153",
        "merchantRaw": "Zomato",
        "amount": 153,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 196",
        "merchantRaw": "Zomato",
        "amount": 196,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 3000",
        "merchantRaw": "Liquor",
        "amount": 3000,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 268",
        "merchantRaw": "Zomato",
        "amount": 268,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 159",
        "merchantRaw": "Zomato",
        "amount": 159,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 260",
        "merchantRaw": "Blinkit",
        "amount": 260,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 152",
        "merchantRaw": "Zomato",
        "amount": 152,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 160",
        "merchantRaw": "Zomato",
        "amount": 160,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 547",
        "merchantRaw": "Blinkit",
        "amount": 547,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 207",
        "merchantRaw": "Blinkit",
        "amount": 207,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 11502,
    "differenceFromDeclared": 216
  },
  {
    "label": "11 October to 11 November 2025",
    "startDate": "2025-10-11",
    "endDate": "2025-11-11",
    "declaredTotal": 11237,
    "entries": [
      {
        "rawText": "Last month pending: 285",
        "merchantRaw": "Last month pending",
        "amount": 285,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "Blinkit: 1007",
        "merchantRaw": "Blinkit",
        "amount": 1007,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 363",
        "merchantRaw": "Zomato",
        "amount": 363,
        "type": "EXPENSE"
      },
      {
        "rawText": "ChatGPT: 1999",
        "merchantRaw": "ChatGPT",
        "amount": 1999,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 222",
        "merchantRaw": "Blinkit",
        "amount": 222,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 463",
        "merchantRaw": "Zomato",
        "amount": 463,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 263",
        "merchantRaw": "Zomato",
        "amount": 263,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 236",
        "merchantRaw": "Blinkit",
        "amount": 236,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 228",
        "merchantRaw": "Blinkit",
        "amount": 228,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 214",
        "merchantRaw": "Dominos",
        "amount": 214,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 164",
        "merchantRaw": "Zomato",
        "amount": 164,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 223",
        "merchantRaw": "Dominos",
        "amount": 223,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 211",
        "merchantRaw": "Blinkit",
        "amount": 211,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 190",
        "merchantRaw": "Dominos",
        "amount": 190,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 232",
        "merchantRaw": "Blinkit",
        "amount": 232,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 237",
        "merchantRaw": "Blinkit",
        "amount": 237,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 248",
        "merchantRaw": "Blinkit",
        "amount": 248,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 2000",
        "merchantRaw": "Liquor",
        "amount": 2000,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 212",
        "merchantRaw": "Blinkit",
        "amount": 212,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 188",
        "merchantRaw": "Dominos",
        "amount": 188,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 235",
        "merchantRaw": "Blinkit",
        "amount": 235,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 234",
        "merchantRaw": "Zomato",
        "amount": 234,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 284",
        "merchantRaw": "Zomato",
        "amount": 284,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 209",
        "merchantRaw": "Dominos",
        "amount": 209,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 223",
        "merchantRaw": "Blinkit",
        "amount": 223,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 151",
        "merchantRaw": "Zomato",
        "amount": 151,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 539",
        "merchantRaw": "Zomato",
        "amount": 539,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 183",
        "merchantRaw": "Dominos",
        "amount": 183,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 217",
        "merchantRaw": "Blinkit",
        "amount": 217,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 11460,
    "differenceFromDeclared": 223
  },
  {
    "label": "11 September to 11 october 2025",
    "startDate": "2025-09-11",
    "endDate": "2025-10-11",
    "declaredTotal": 22914,
    "entries": [
      {
        "rawText": "Last month pending: 843",
        "merchantRaw": "Last month pending",
        "amount": 843,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "ChatGpt: 1999",
        "merchantRaw": "ChatGpt",
        "amount": 1999,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 237",
        "merchantRaw": "Blinkit",
        "amount": 237,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 212",
        "merchantRaw": "Blinkit",
        "amount": 212,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 166",
        "merchantRaw": "Swiggy",
        "amount": 166,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 182",
        "merchantRaw": "Zomato",
        "amount": 182,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 211",
        "merchantRaw": "Blinkit",
        "amount": 211,
        "type": "EXPENSE"
      },
      {
        "rawText": "Beer: 500",
        "merchantRaw": "Beer",
        "amount": 500,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zudio: 2407",
        "merchantRaw": "Zudio",
        "amount": 2407,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 162",
        "merchantRaw": "Zomato",
        "amount": 162,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 294",
        "merchantRaw": "Blinkit",
        "amount": 294,
        "type": "EXPENSE"
      },
      {
        "rawText": "Beer: 4800",
        "merchantRaw": "Beer",
        "amount": 4800,
        "type": "EXPENSE"
      },
      {
        "rawText": "Instamart: 528",
        "merchantRaw": "Instamart",
        "amount": 528,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 265",
        "merchantRaw": "Blinkit",
        "amount": 265,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 261",
        "merchantRaw": "Blinkit",
        "amount": 261,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 1804",
        "merchantRaw": "Blinkit",
        "amount": 1804,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 2250",
        "merchantRaw": "Liquor",
        "amount": 2250,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 317",
        "merchantRaw": "Blinkit",
        "amount": 317,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 129",
        "merchantRaw": "Zomato",
        "amount": 129,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 176",
        "merchantRaw": "Zomato",
        "amount": 176,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 161",
        "merchantRaw": "Zomato",
        "amount": 161,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 288",
        "merchantRaw": "Zomato",
        "amount": 288,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 208",
        "merchantRaw": "Blinkit",
        "amount": 208,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 295",
        "merchantRaw": "Blinkit",
        "amount": 295,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 329",
        "merchantRaw": "Swiggy",
        "amount": 329,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 3190",
        "merchantRaw": "Liquor",
        "amount": 3190,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 267",
        "merchantRaw": "Swiggy",
        "amount": 267,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 235",
        "merchantRaw": "Blinkit",
        "amount": 235,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 210",
        "merchantRaw": "Blinkit",
        "amount": 210,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 198",
        "merchantRaw": "Kfc",
        "amount": 198,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 23124,
    "differenceFromDeclared": 210
  },
  {
    "label": "11 August to 11 September 2025",
    "startDate": "2025-08-11",
    "endDate": "2025-09-11",
    "declaredTotal": 16246,
    "entries": [
      {
        "rawText": "Zomato: 184",
        "merchantRaw": "Zomato",
        "amount": 184,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 331",
        "merchantRaw": "Blinkit",
        "amount": 331,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 187",
        "merchantRaw": "Zomato",
        "amount": 187,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 325",
        "merchantRaw": "Blinkit",
        "amount": 325,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 1340",
        "merchantRaw": "Liquor",
        "amount": 1340,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 149",
        "merchantRaw": "Yt premium",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 320",
        "merchantRaw": "Blinkit",
        "amount": 320,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 225",
        "merchantRaw": "Blinkit",
        "amount": 225,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 213",
        "merchantRaw": "Zomato",
        "amount": 213,
        "type": "EXPENSE"
      },
      {
        "rawText": "Sherrif kurunami: 1660",
        "merchantRaw": "Sherrif kurunami",
        "amount": 1660,
        "type": "EXPENSE"
      },
      {
        "rawText": "GST: 30",
        "merchantRaw": "GST",
        "amount": 30,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 143",
        "merchantRaw": "Dominos",
        "amount": 143,
        "type": "EXPENSE"
      },
      {
        "rawText": "Wifi: 2500",
        "merchantRaw": "Wifi",
        "amount": 2500,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 247",
        "merchantRaw": "Blinkit",
        "amount": 247,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 255",
        "merchantRaw": "Blinkit",
        "amount": 255,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 245+482 = 727",
        "merchantRaw": "Blinkit",
        "amount": 727,
        "type": "EXPENSE",
        "expression": "245+482"
      },
      {
        "rawText": "Dominos: 177",
        "merchantRaw": "Dominos",
        "amount": 177,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 226",
        "merchantRaw": "Zomato",
        "amount": 226,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 364",
        "merchantRaw": "Zomato",
        "amount": 364,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 257",
        "merchantRaw": "Zomato",
        "amount": 257,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 219",
        "merchantRaw": "Zomato",
        "amount": 219,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 236",
        "merchantRaw": "Blinkit",
        "amount": 236,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 215",
        "merchantRaw": "Blinkit",
        "amount": 215,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 313",
        "merchantRaw": "Blinkit",
        "amount": 313,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 219",
        "merchantRaw": "Zomato",
        "amount": 219,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 404",
        "merchantRaw": "Blinkit",
        "amount": 404,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 207",
        "merchantRaw": "Blinkit",
        "amount": 207,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 431",
        "merchantRaw": "Blinkit",
        "amount": 431,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 187",
        "merchantRaw": "Zomato",
        "amount": 187,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 3000",
        "merchantRaw": "Liquor",
        "amount": 3000,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 220",
        "merchantRaw": "Swiggy",
        "amount": 220,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 235",
        "merchantRaw": "Dominos",
        "amount": 235,
        "type": "EXPENSE"
      }
    ],
    "payments": [
      {
        "rawText": "(Paid)",
        "amount": null,
        "note": "Marked paid without explicit amount."
      }
    ],
    "calculatedFromIncludedEntries": 15746,
    "differenceFromDeclared": -500
  },
  {
    "label": "11 July to 11 August 2025",
    "startDate": "2025-07-11",
    "endDate": "2025-08-11",
    "declaredTotal": 15150,
    "entries": [
      {
        "rawText": "Blinkit: 514",
        "merchantRaw": "Blinkit",
        "amount": 514,
        "type": "EXPENSE"
      },
      {
        "rawText": "Mouse: 4350",
        "merchantRaw": "Mouse",
        "amount": 4350,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 194",
        "merchantRaw": "Zomato",
        "amount": 194,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 203",
        "merchantRaw": "Zomato",
        "amount": 203,
        "type": "EXPENSE"
      },
      {
        "rawText": "Drools: 806",
        "merchantRaw": "Drools",
        "amount": 806,
        "type": "EXPENSE"
      },
      {
        "rawText": "Alchohol: 1000",
        "merchantRaw": "Alchohol",
        "amount": 1000,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 150",
        "merchantRaw": "Yt premium",
        "amount": 150,
        "type": "EXPENSE"
      },
      {
        "rawText": "zomato: 255",
        "merchantRaw": "zomato",
        "amount": 255,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 217",
        "merchantRaw": "Blinkit",
        "amount": 217,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 165",
        "merchantRaw": "Swiggy",
        "amount": 165,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 245",
        "merchantRaw": "Blinkit",
        "amount": 245,
        "type": "EXPENSE"
      },
      {
        "rawText": "Aimlab: 500",
        "merchantRaw": "Aimlab",
        "amount": 500,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 209",
        "merchantRaw": "Blinkit",
        "amount": 209,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 352",
        "merchantRaw": "Blinkit",
        "amount": 352,
        "type": "EXPENSE"
      },
      {
        "rawText": "Jio: 1060",
        "merchantRaw": "Jio",
        "amount": 1060,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 580",
        "merchantRaw": "Zomato",
        "amount": 580,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 149",
        "merchantRaw": "Swiggy",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 227",
        "merchantRaw": "Blinkit",
        "amount": 227,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 232",
        "merchantRaw": "Zomato",
        "amount": 232,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 310",
        "merchantRaw": "Blinkit",
        "amount": 310,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 217",
        "merchantRaw": "Blinkit",
        "amount": 217,
        "type": "EXPENSE"
      },
      {
        "rawText": "Ticket: 2616",
        "merchantRaw": "Ticket",
        "amount": 2616,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 151",
        "merchantRaw": "Zomato",
        "amount": 151,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 210",
        "merchantRaw": "Blinkit",
        "amount": 210,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 238",
        "merchantRaw": "Zomato",
        "amount": 238,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 15150,
    "differenceFromDeclared": 0
  },
  {
    "label": "11 june to 11 july 2025",
    "startDate": "2025-06-11",
    "endDate": "2025-07-11",
    "declaredTotal": 9026,
    "entries": [
      {
        "rawText": "Ac EMI Last: 11247 (sent to saver account)",
        "merchantRaw": "Ac EMI Last",
        "amount": 11247,
        "type": "EXPENSE",
        "isExcluded": true,
        "note": "Excluded because declared total does not include this amount."
      },
      {
        "rawText": "Pizzahut: 175",
        "merchantRaw": "Pizzahut",
        "amount": 175,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 275",
        "merchantRaw": "Pizza hut",
        "amount": 275,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 149",
        "merchantRaw": "Yt premium",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 155",
        "merchantRaw": "Pizza hut",
        "amount": 155,
        "type": "EXPENSE"
      },
      {
        "rawText": "Biryani: 144",
        "merchantRaw": "Biryani",
        "amount": 144,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 195",
        "merchantRaw": "Pizza hut",
        "amount": 195,
        "type": "EXPENSE"
      },
      {
        "rawText": "Liquor: 3300",
        "merchantRaw": "Liquor",
        "amount": 3300,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 177",
        "merchantRaw": "Kfc",
        "amount": 177,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 165",
        "merchantRaw": "Pizza hut",
        "amount": 165,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 165",
        "merchantRaw": "Pizza hut",
        "amount": 165,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 167",
        "merchantRaw": "Pizza hut",
        "amount": 167,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 198",
        "merchantRaw": "Dominos",
        "amount": 198,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 197",
        "merchantRaw": "Pizza hut",
        "amount": 197,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kurunami Vandal: 1660",
        "merchantRaw": "Kurunami Vandal",
        "amount": 1660,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza Hut: 198",
        "merchantRaw": "Pizza Hut",
        "amount": 198,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 198",
        "merchantRaw": "Dominos",
        "amount": 198,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 188",
        "merchantRaw": "Dominos",
        "amount": 188,
        "type": "EXPENSE"
      },
      {
        "rawText": "Jio fiber: 1060",
        "merchantRaw": "Jio fiber",
        "amount": 1060,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 399",
        "merchantRaw": "Blinkit",
        "amount": 399,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 295",
        "merchantRaw": "Blinkit",
        "amount": 295,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizzahut: 186",
        "merchantRaw": "Pizzahut",
        "amount": 186,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 219",
        "merchantRaw": "Blinkit",
        "amount": 219,
        "type": "EXPENSE"
      }
    ],
    "payments": [
      {
        "rawText": "(Paid in full)",
        "amount": null,
        "note": "No explicit payment amount."
      }
    ],
    "calculatedFromIncludedEntries": 9865,
    "differenceFromDeclared": 839
  },
  {
    "label": "11 may to 11 june 2025",
    "startDate": "2025-05-11",
    "endDate": "2025-06-11",
    "declaredTotal": 6929,
    "entries": [
      {
        "rawText": "Remaining: 345",
        "merchantRaw": "Remaining",
        "amount": 345,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "DIY SHOPPING: 489",
        "merchantRaw": "DIY SHOPPING",
        "amount": 489,
        "type": "EXPENSE"
      },
      {
        "rawText": "Paneer: 260",
        "merchantRaw": "Paneer",
        "amount": 260,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 149",
        "merchantRaw": "Yt premium",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 322",
        "merchantRaw": "Kfc",
        "amount": 322,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 206",
        "merchantRaw": "Dominos",
        "amount": 206,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 234",
        "merchantRaw": "Dominos",
        "amount": 234,
        "type": "EXPENSE"
      },
      {
        "rawText": "Recon phantom: 1660",
        "merchantRaw": "Recon phantom",
        "amount": 1660,
        "type": "EXPENSE"
      },
      {
        "rawText": "L theanine: 442",
        "merchantRaw": "L theanine",
        "amount": 442,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 280",
        "merchantRaw": "Kfc",
        "amount": 280,
        "type": "EXPENSE"
      },
      {
        "rawText": "Taurine: 258",
        "merchantRaw": "Taurine",
        "amount": 258,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 239",
        "merchantRaw": "Dominos",
        "amount": 239,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 206",
        "merchantRaw": "Zomato",
        "amount": 206,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 234",
        "merchantRaw": "Kfc",
        "amount": 234,
        "type": "EXPENSE"
      },
      {
        "rawText": "AC EMI 2nd: 11247",
        "merchantRaw": "AC EMI 2nd",
        "amount": 11247,
        "type": "EXPENSE",
        "isExcluded": true,
        "note": "Excluded because declared total does not include this amount."
      },
      {
        "rawText": "Fish fry: 199",
        "merchantRaw": "Fish fry",
        "amount": 199,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 253",
        "merchantRaw": "Pizza hut",
        "amount": 253,
        "type": "EXPENSE"
      },
      {
        "rawText": "Fish(too much kanta): 202",
        "merchantRaw": "Fish(too much kanta)",
        "amount": 202,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizza hut: 138",
        "merchantRaw": "Pizza hut",
        "amount": 138,
        "type": "EXPENSE"
      },
      {
        "rawText": "Paneer from ganesham: 463",
        "merchantRaw": "Paneer from ganesham",
        "amount": 463,
        "type": "EXPENSE"
      },
      {
        "rawText": "Jio: 1060 (pay from different account)",
        "merchantRaw": "Jio",
        "amount": 1060,
        "type": "EXPENSE",
        "isExcluded": true,
        "note": "Excluded because note says pay from different account and declared total does not include it."
      },
      {
        "rawText": "Pizzahut bread: 175",
        "merchantRaw": "Pizzahut bread",
        "amount": 175,
        "type": "EXPENSE"
      },
      {
        "rawText": "Pizzahut bread: 175",
        "merchantRaw": "Pizzahut bread",
        "amount": 175,
        "type": "EXPENSE"
      }
    ],
    "calculatedFromIncludedEntries": 6929,
    "differenceFromDeclared": 0
  },
  {
    "label": "11 April to 11 May 2025",
    "startDate": "2025-04-11",
    "endDate": "2025-05-11",
    "declaredTotal": 4548,
    "entries": [
      {
        "rawText": "Dominos: 193",
        "merchantRaw": "Dominos",
        "amount": 193,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 282",
        "merchantRaw": "Zomato",
        "amount": 282,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 113",
        "merchantRaw": "Zomato",
        "amount": 113,
        "type": "EXPENSE"
      },
      {
        "rawText": "Yt premium: 149",
        "merchantRaw": "Yt premium",
        "amount": 149,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 235",
        "merchantRaw": "Dominos",
        "amount": 235,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 252",
        "merchantRaw": "Zomato",
        "amount": 252,
        "type": "EXPENSE"
      },
      {
        "rawText": "KFC: 199",
        "merchantRaw": "KFC",
        "amount": 199,
        "type": "EXPENSE"
      },
      {
        "rawText": "KFC: 204",
        "merchantRaw": "KFC",
        "amount": 204,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 242",
        "merchantRaw": "Zomato",
        "amount": 242,
        "type": "EXPENSE"
      },
      {
        "rawText": "KFC: 198",
        "merchantRaw": "KFC",
        "amount": 198,
        "type": "EXPENSE"
      },
      {
        "rawText": "Hotel star fish curry: 234",
        "merchantRaw": "Hotel star fish curry",
        "amount": 234,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 235",
        "merchantRaw": "Dominos",
        "amount": 235,
        "type": "EXPENSE"
      },
      {
        "rawText": "KFC: 262",
        "merchantRaw": "KFC",
        "amount": 262,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 298",
        "merchantRaw": "Kfc",
        "amount": 298,
        "type": "EXPENSE"
      },
      {
        "rawText": "Chappan bhog zomato: 285",
        "merchantRaw": "Chappan bhog zomato",
        "amount": 285,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 230",
        "merchantRaw": "Kfc",
        "amount": 230,
        "type": "EXPENSE"
      },
      {
        "rawText": "EMI: 11247",
        "merchantRaw": "EMI",
        "amount": 11247,
        "type": "EXPENSE",
        "isExcluded": true,
        "note": "Excluded because declared total does not include this EMI."
      },
      {
        "rawText": "Zomato: 268",
        "merchantRaw": "Zomato",
        "amount": 268,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 177",
        "merchantRaw": "Kfc",
        "amount": 177,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 267",
        "merchantRaw": "Dominos",
        "amount": 267,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 225",
        "merchantRaw": "Dominos",
        "amount": 225,
        "type": "EXPENSE"
      }
    ],
    "notes": [
      {
        "rawText": "4548-4203 = 345",
        "amount": 345,
        "type": "META"
      }
    ],
    "calculatedFromIncludedEntries": 4548,
    "differenceFromDeclared": 0
  },
  {
    "label": "11 March to 11 April 2025",
    "startDate": "2025-03-11",
    "endDate": "2025-04-11",
    "declaredTotal": 13667,
    "entries": [
      {
        "rawText": "Remaining: 840",
        "merchantRaw": "Remaining",
        "amount": 840,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "Instamart: 124",
        "merchantRaw": "Instamart",
        "amount": 124,
        "type": "EXPENSE"
      },
      {
        "rawText": "Jacket: 2999",
        "merchantRaw": "Jacket",
        "amount": 2999,
        "type": "EXPENSE"
      },
      {
        "rawText": "Blinkit: 487",
        "merchantRaw": "Blinkit",
        "amount": 487,
        "type": "EXPENSE"
      },
      {
        "rawText": "Realme buds: 3303",
        "merchantRaw": "Realme buds",
        "amount": 3303,
        "type": "EXPENSE"
      },
      {
        "rawText": "Rudraksh: 1110",
        "merchantRaw": "Rudraksh",
        "amount": 1110,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 278",
        "merchantRaw": "Dominos",
        "amount": 278,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 213",
        "merchantRaw": "Dominos",
        "amount": 213,
        "type": "EXPENSE"
      },
      {
        "rawText": "Maharaja swiggy: 261",
        "merchantRaw": "Maharaja swiggy",
        "amount": 261,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 213",
        "merchantRaw": "Dominos",
        "amount": 213,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 404",
        "merchantRaw": "Kfc",
        "amount": 404,
        "type": "EXPENSE"
      },
      {
        "rawText": "AC Remaining: 33000",
        "merchantRaw": "AC Remaining",
        "amount": 33000,
        "type": "ADJUSTMENT",
        "isExcluded": true,
        "note": "Excluded/memo only; declared total uses a separate -1100 adjustment."
      },
      {
        "rawText": "Manual adjustment from total expression: -1100",
        "merchantRaw": "Manual adjustment",
        "amount": -1100,
        "type": "ADJUSTMENT",
        "note": "Present in declared total expression but not as a standalone note line."
      },
      {
        "rawText": "Wifi: 1060",
        "merchantRaw": "Wifi",
        "amount": 1060,
        "type": "EXPENSE"
      },
      {
        "rawText": "Tax: 225",
        "merchantRaw": "Tax",
        "amount": 225,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 197",
        "merchantRaw": "Zomato",
        "amount": 197,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 197",
        "merchantRaw": "Zomato",
        "amount": 197,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 214",
        "merchantRaw": "Dominos",
        "amount": 214,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 220",
        "merchantRaw": "Zomato",
        "amount": 220,
        "type": "EXPENSE"
      },
      {
        "rawText": "Instamart: 322",
        "merchantRaw": "Instamart",
        "amount": 322,
        "type": "EXPENSE"
      },
      {
        "rawText": "Gpt: 2110",
        "merchantRaw": "Gpt",
        "amount": 2110,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 215",
        "merchantRaw": "Zomato",
        "amount": 215,
        "type": "EXPENSE"
      }
    ],
    "payments": [
      {
        "rawText": "Paid 8326+1800+3508 = 13,634",
        "amount": 13634,
        "expression": "8326+1800+3508"
      }
    ],
    "notes": [
      {
        "rawText": "33000+16991 = 49,991",
        "amount": 49991,
        "type": "META"
      },
      {
        "rawText": "48191-50000 = -1,809",
        "amount": -1809,
        "type": "META"
      }
    ],
    "calculatedFromIncludedEntries": 13892,
    "differenceFromDeclared": 225
  },
  {
    "label": "3 Feb to 11Feb 2025",
    "startDate": "2025-02-03",
    "endDate": "2025-02-11",
    "declaredTotal": 840,
    "entries": [
      {
        "rawText": "Swiggy: 214",
        "merchantRaw": "Swiggy",
        "amount": 214,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 342",
        "merchantRaw": "Swiggy",
        "amount": 342,
        "type": "EXPENSE"
      },
      {
        "rawText": "Chat gpt: 2154",
        "merchantRaw": "Chat gpt",
        "amount": 2154,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 213",
        "merchantRaw": "Swiggy",
        "amount": 213,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 228",
        "merchantRaw": "Swiggy",
        "amount": 228,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 293",
        "merchantRaw": "Swiggy",
        "amount": 293,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 191",
        "merchantRaw": "Swiggy",
        "amount": 191,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 214",
        "merchantRaw": "Swiggy",
        "amount": 214,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 198",
        "merchantRaw": "Swiggy",
        "amount": 198,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 268",
        "merchantRaw": "Swiggy",
        "amount": 268,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 261",
        "merchantRaw": "Swiggy",
        "amount": 261,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 234",
        "merchantRaw": "Swiggy",
        "amount": 234,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 238",
        "merchantRaw": "Swiggy",
        "amount": 238,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggydominos: 253",
        "merchantRaw": "Swiggydominos",
        "amount": 253,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggysoup: 245",
        "merchantRaw": "Swiggysoup",
        "amount": 245,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomatodedh: 231",
        "merchantRaw": "Zomatodedh",
        "amount": 231,
        "type": "EXPENSE"
      },
      {
        "rawText": "Kfc: 406",
        "merchantRaw": "Kfc",
        "amount": 406,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 188",
        "merchantRaw": "Dominos",
        "amount": 188,
        "type": "EXPENSE"
      },
      {
        "rawText": "ChatGpt: 2100",
        "merchantRaw": "ChatGpt",
        "amount": 2100,
        "type": "EXPENSE"
      },
      {
        "rawText": "Prateek: 2095",
        "merchantRaw": "Prateek",
        "amount": 2095,
        "type": "EXPENSE"
      }
    ],
    "payments": [
      {
        "rawText": "Paid 1400",
        "amount": 1400
      },
      {
        "rawText": "Implicit payment from total expression: 8326",
        "amount": 8326,
        "note": "The Total expression subtracts 8326 but there is no standalone row."
      }
    ],
    "calculatedFromIncludedEntries": 10566,
    "differenceFromDeclared": 9726
  },
  {
    "label": "11Jan to 2 Feb 2025",
    "startDate": "2025-01-11",
    "endDate": "2025-02-02",
    "declaredTotal": 9989,
    "entries": [
      {
        "rawText": "Last month remaining: 1816",
        "merchantRaw": "Last month remaining",
        "amount": 1816,
        "type": "ADJUSTMENT"
      },
      {
        "rawText": "CancelchargeIRCTC: 170",
        "merchantRaw": "CancelchargeIRCTC",
        "amount": 170,
        "type": "EXPENSE"
      },
      {
        "rawText": "AmazonPrime: 299",
        "merchantRaw": "AmazonPrime",
        "amount": 299,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 444",
        "merchantRaw": "Swiggy",
        "amount": 444,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 171",
        "merchantRaw": "Swiggy",
        "amount": 171,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 219",
        "merchantRaw": "Swiggy",
        "amount": 219,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 249",
        "merchantRaw": "Swiggy",
        "amount": 249,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 288",
        "merchantRaw": "Swiggy",
        "amount": 288,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 312",
        "merchantRaw": "Swiggy",
        "amount": 312,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 351",
        "merchantRaw": "Swiggy",
        "amount": 351,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 312",
        "merchantRaw": "Swiggy",
        "amount": 312,
        "type": "EXPENSE"
      },
      {
        "rawText": "Ticket: 2760",
        "merchantRaw": "Ticket",
        "amount": 2760,
        "type": "EXPENSE"
      },
      {
        "rawText": "Jio: 1060",
        "merchantRaw": "Jio",
        "amount": 1060,
        "type": "EXPENSE"
      },
      {
        "rawText": "MCaffeine: 474",
        "merchantRaw": "MCaffeine",
        "amount": 474,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 331",
        "merchantRaw": "Dominos",
        "amount": 331,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 328",
        "merchantRaw": "Dominos",
        "amount": 328,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 187",
        "merchantRaw": "Swiggy",
        "amount": 187,
        "type": "EXPENSE"
      }
    ],
    "payments": [
      {
        "rawText": "(Paid)",
        "amount": null,
        "note": "Marked paid without explicit amount."
      }
    ],
    "calculatedFromIncludedEntries": 9771,
    "differenceFromDeclared": -218
  },
  {
    "label": "11 Dec to 11 jan 2025",
    "startDate": "2024-12-11",
    "endDate": "2025-01-11",
    "declaredTotal": 26396,
    "entries": [
      {
        "rawText": "886 dot & key",
        "merchantRaw": "dot & key",
        "amount": 886,
        "type": "EXPENSE"
      },
      {
        "rawText": "Electricity bill: 5802",
        "merchantRaw": "Electricity bill",
        "amount": 5802,
        "type": "EXPENSE"
      },
      {
        "rawText": "YouTube premium: 159",
        "merchantRaw": "YouTube premium",
        "amount": 159,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 292",
        "merchantRaw": "Swiggy",
        "amount": 292,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy: 197",
        "merchantRaw": "Swiggy",
        "amount": 197,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 190",
        "merchantRaw": "Zomato",
        "amount": 190,
        "type": "EXPENSE"
      },
      {
        "rawText": "Bajaj optical: 500",
        "merchantRaw": "Bajaj optical",
        "amount": 500,
        "type": "EXPENSE"
      },
      {
        "rawText": "Swiggy 220",
        "merchantRaw": "Swiggy",
        "amount": 220,
        "type": "EXPENSE"
      },
      {
        "rawText": "Dominos: 300",
        "merchantRaw": "Dominos",
        "amount": 300,
        "type": "EXPENSE"
      },
      {
        "rawText": "AkshatFlipkarttransaction: 7200",
        "merchantRaw": "AkshatFlipkarttransaction",
        "amount": 7200,
        "type": "EXPENSE"
      },
      {
        "rawText": "Prateek's EMI: 2100",
        "merchantRaw": "Prateek's EMI",
        "amount": 2100,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato:391",
        "merchantRaw": "Zomato",
        "amount": 391,
        "type": "EXPENSE"
      },
      {
        "rawText": "Zomato: 434",
        "merchantRaw": "Zomato",
        "amount": 434,
        "type": "EXPENSE"
      },
      {
        "rawText": "Nakpro: 3953",
        "merchantRaw": "Nakpro",
        "amount": 3953,
        "type": "EXPENSE"
      },
      {
        "rawText": "Unlabelled amount from Balance expression: 3792",
        "merchantRaw": "Unlabelled balance amount",
        "amount": 3792,
        "type": "ADJUSTMENT",
        "note": "Amount appears in Balance expression but not as a separate transaction line."
      }
    ],
    "notes": [
      {
        "rawText": "remaining from december 26396-24580 = 1,816",
        "amount": 1816,
        "type": "META"
      }
    ],
    "calculatedFromIncludedEntries": 26416,
    "differenceFromDeclared": 20
  }
];

export const axisBankExtraMonthlySections = [
  {
    "label": "December 2024 month spendings",
    "month": "2024-12",
    "declaredTotal": 3749,
    "entries": [
      {
        "rawText": "215 swiggy",
        "merchantRaw": "swiggy",
        "amount": 215,
        "type": "EXPENSE"
      },
      {
        "rawText": "175 Swiggy",
        "merchantRaw": "Swiggy",
        "amount": 175,
        "type": "EXPENSE"
      },
      {
        "rawText": "1060 Wifi (paid)",
        "merchantRaw": "Wifi",
        "amount": 1060,
        "type": "EXPENSE",
        "isExcluded": true,
        "note": "Marked paid in note; balance expression excludes it."
      },
      {
        "rawText": "1380 Movie ticket",
        "merchantRaw": "Movie ticket",
        "amount": 1380,
        "type": "EXPENSE",
        "isExcluded": true,
        "note": "Declared balance expression excludes it."
      },
      {
        "rawText": "854 man matters",
        "merchantRaw": "man matters",
        "amount": 854,
        "type": "EXPENSE"
      },
      {
        "rawText": "984 portronics",
        "merchantRaw": "portronics",
        "amount": 984,
        "type": "EXPENSE"
      },
      {
        "rawText": "141 swiggy",
        "merchantRaw": "swiggy",
        "amount": 141,
        "type": "EXPENSE"
      }
    ],
    "notes": [
      {
        "rawText": "Balance: 1770 + 854 + 984 +141 = 3,749 paid",
        "amount": 3749,
        "type": "META"
      }
    ]
  },
  {
    "label": "November 2024 month spendings",
    "month": "2024-11",
    "declaredTotal": 8589,
    "entries": [
      {
        "rawText": "650 daaru",
        "merchantRaw": "daaru",
        "amount": 650,
        "type": "EXPENSE"
      },
      {
        "rawText": "250 zomato",
        "merchantRaw": "zomato",
        "amount": 250,
        "type": "EXPENSE"
      },
      {
        "rawText": "650 daaru",
        "merchantRaw": "daaru",
        "amount": 650,
        "type": "EXPENSE"
      },
      {
        "rawText": "340 daaru",
        "merchantRaw": "daaru",
        "amount": 340,
        "type": "EXPENSE"
      },
      {
        "rawText": "680 daaru",
        "merchantRaw": "daaru",
        "amount": 680,
        "type": "EXPENSE"
      },
      {
        "rawText": "199 recharge",
        "merchantRaw": "recharge",
        "amount": 199,
        "type": "EXPENSE"
      },
      {
        "rawText": "650 daaru",
        "merchantRaw": "daaru",
        "amount": 650,
        "type": "EXPENSE"
      },
      {
        "rawText": "4500 bijli bill",
        "merchantRaw": "bijli bill",
        "amount": 4500,
        "type": "EXPENSE"
      },
      {
        "rawText": "176 zomato",
        "merchantRaw": "zomato",
        "amount": 176,
        "type": "EXPENSE"
      },
      {
        "rawText": "144 zomato",
        "merchantRaw": "zomato",
        "amount": 144,
        "type": "EXPENSE"
      },
      {
        "rawText": "509 recharge",
        "merchantRaw": "recharge",
        "amount": 509,
        "type": "EXPENSE"
      },
      {
        "rawText": "29 jio",
        "merchantRaw": "jio",
        "amount": 29,
        "type": "EXPENSE"
      },
      {
        "rawText": "1400 reaver awp",
        "merchantRaw": "reaver awp",
        "amount": 1400,
        "type": "EXPENSE"
      },
      {
        "rawText": "182 zomato",
        "merchantRaw": "zomato",
        "amount": 182,
        "type": "EXPENSE"
      },
      {
        "rawText": "230 zomato",
        "merchantRaw": "zomato",
        "amount": 230,
        "type": "EXPENSE"
      }
    ],
    "payments": [
      {
        "rawText": "Total: 10589 -2000 = 8,589",
        "amount": 2000,
        "note": "Payment/offset from total expression."
      },
      {
        "rawText": "11300 (Paid)",
        "amount": 11300
      }
    ],
    "notes": [
      {
        "rawText": "Old monk = 600 + 8598 = 9,198",
        "amount": 9198,
        "type": "META"
      },
      {
        "rawText": "Prelude to chaos vandal = 9198 + 2075 = 11,273",
        "amount": 11273,
        "type": "META"
      },
      {
        "rawText": "Remaining = 0",
        "amount": 0,
        "type": "META"
      }
    ]
  }
] satisfies AxisBankExtraMonthlySection[];
