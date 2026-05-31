import { UserData } from "./data.js";
import { allocateFunds } from "../calcAmount.js";
import { addHistory, renderMenu } from "./history.js";
import { renderWithdrawModal } from "./widthdrawals.js";
const bucket = UserData.buckets;
const addBtn = document.getElementById("submit-btn");

addBtn.addEventListener("click", () => {
  const amountIn = document.getElementById("amount").value;
  document.getElementById("amount").value = "";
  allocateFunds(amountIn);
  addHistory(amountIn);
  renderMenu();
  renderTable();
});

export function renderTable() {
  const tableBody = document.querySelector(".finance-table tbody");
  const totalBalance = document.getElementById("total-balance");
  tableBody.innerHTML = "";
  for (const [key, value] of Object.entries(bucket)) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td style = "text-transform: capitalize;">${key}</td>
    <td >₦${value.toLocaleString()}</td>
    <td><button class="action-btn" id="withdraw-button" data-key = "${key}">Withdraw</button></td>
  `;

    row.querySelector("#withdraw-button").addEventListener("click", () => {
      const key = row.querySelector("#withdraw-button").dataset.key;
      const available = bucket[key];
      renderWithdrawModal(key, available);
    });

    tableBody.appendChild(row);
  }
  totalBalance.innerHTML = `₦${UserData.totalBalance.toLocaleString()}`;
}
