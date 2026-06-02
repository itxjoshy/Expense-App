import { UserData } from "./data.js";
export const openMenu = () => {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("open");
  console.log(UserData.history);
  renderMenu();
};

export const addHistory = (amount) => {
  const newItem = {
    id: UserData.history.length + 1,
    amount: Number(amount),
    percentages: {
      savings: Number(amount) * (UserData.allocationPercentages.savings / 100),
      investment:
        Number(amount) * (UserData.allocationPercentages.investment / 100),
      utilities:
        Number(amount) * (UserData.allocationPercentages.utilities / 100),
      flex: Number(amount) * (UserData.allocationPercentages.flex / 100),
    },
  };
  UserData.history.push(newItem);
};
export const renderMenu = () => {
  const menu = document.querySelector(".menu");
  menu.innerHTML = `
  <h2>History</h2>
  ${
    UserData.history.length === 0
      ? "<p>No history available</p>"
      : `
  <ul>
    ${UserData.history
      .map(
        (item) => `
    <li id="history-item" data-history="${item.id}">
    <div>
      ${item.id} - ₦${item.amount.toLocaleString()}
    </div>
    <div style="margin-top: 5px;">
      <small style="color: #555;">
        Savings: ₦${item.percentages.savings.toLocaleString()} <br />
        Investment: ₦${item.percentages.investment.toLocaleString()} <br />
        Utilities: ₦${item.percentages.utilities.toLocaleString()} <br />
        Flex: ₦${item.percentages.flex.toLocaleString()}
      </small>
    </div>
  </li>`,
      )
      .join("")}
  </ul>
  `
  }`;

  const getHistoryItem = (id) => {
    const item = UserData.history.find((item) => item.id == id);
    return item ? { ...item } : null;
  };

  document.querySelectorAll("#history-item").forEach((item) => {
    // make items focusable for keyboard interaction
    item.tabIndex = 0;
    item.addEventListener("click", (e) => {
      // avoid toggling when clicking interactive children
      if (e.target.closest("a, button, input")) return;
      const isExpanded = item.classList.contains("expanded");
      document
        .querySelectorAll("#history-item")
        .forEach((other) => other.classList.remove("expanded"));
      if (!isExpanded) item.classList.add("expanded");
      const { history } = item.dataset;
      const historyItem = getHistoryItem(history);
      historyItem ? console.log(historyItem) : console.log("Item not found");
    });
  });
};
