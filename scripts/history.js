import { UserData } from "./data.js";
const menu = document.querySelector(".menu");

export const openMenu = () => {
  menu.classList.toggle("open");
  console.log(UserData.history);
  renderMenu();
};

export const addHistory = (amount) => {
  const newItem = {
    id: UserData.history.length + 1,
    amount: Number(amount),
  };
  UserData.history.push(newItem);
};
export const renderMenu = () => {
  menu.innerHTML = `
  <h2>History</h2>
  ${
    UserData.history.length === 0
      ? "<p>No history available</p>"
      : `
  <ul>
    ${UserData.history.map((item) => `<li id="history-item" data-history="${item.id}">${item.id} - ₦${item.amount.toLocaleString()}</li>`).join("")}
  </ul>
  `
  }`;

  const getHistoryItem = (id) => {
    const item = UserData.history.find((item) => item.id == id);
    return item ? { ...item } : null;
  };

  document.querySelectorAll("#history-item").forEach((item) => {
    item.addEventListener("click", () => {
      const { history } = item.dataset;
      const historyItem = getHistoryItem(history);
      if (historyItem) {
        console.log(historyItem);
      } else {
        console.log("Item not found");
      }
    });
  });
};
