export const UserData = localStorage.getItem("UserData")
  ? JSON.parse(localStorage.getItem("UserData"))
  : {
      totalBalance: 0,

      allocationPercentages: {
        savings: 30,
        investment: 40,
        utilities: 20,
        flex: 10,
      },

      buckets: {
        savings: 0,
        investment: 0,
        utilities: 0,
        flex: 0,
      },

      history: [],
    };
