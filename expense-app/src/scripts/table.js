import { UserData } from "./data.js";

import { renderWithdrawModal } from "./widthdrawals.js";
const bucket = UserData.buckets;

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
