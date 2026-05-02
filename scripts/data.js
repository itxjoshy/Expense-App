export const UserData = {
  totalBalance: 0,

  allocationPercentages: {
    savings: 0,
    investment: 0,
    utilities: 0,
    flex: 0,
  },

  buckets: {
    savings: 0,
    investment: 0,
    utilities: 0,
    flex: 0,
  },

  history: [
    {
      id: null,
      type: "deposit" | "withdrawal" | "edit",
      category: "savings" | "investment" | "utilities" | "flex" | null,
      amount: 0,
      previousValue: 0,
      newValue: 0,
      timestamp: 0,
    },
  ],
};
