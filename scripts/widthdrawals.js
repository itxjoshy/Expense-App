import { UserData } from "./data.js";
import { renderTable } from "./table.js";

let withdrawModalState = null;

function closeWithdrawModal() {
  document.getElementById("withdraw-modal-backdrop").classList.remove("open");
}

function withdrawModalUpdate() {
  const amount =
    parseFloat(document.getElementById("withdraw-modal-amount").value) || 0;
  const { available } = withdrawModalState;
  const valid = amount > 0 && amount <= available;
  document.getElementById("withdraw-modal-error").textContent =
    amount > available ? "Exceeds available balance." : "";
  document.getElementById("withdraw-modal-confirm").disabled = !valid;
  document.getElementById("withdraw-modal-remaining").textContent =
    `₦${Math.max(0, available - amount).toLocaleString()}`;
}

function confirmWithdrawModal() {
  const amount = parseFloat(
    document.getElementById("withdraw-modal-amount").value,
  );
  UserData.buckets[withdrawModalState.category] -= amount;
  // your withdraw logic here
  closeWithdrawModal();
  renderTable();
}

export const renderWithdrawModal = (category, available) => {
  document.querySelector(".withdraw-panel").innerHTML = `
    <div class="withdraw-modal-backdrop" id="withdraw-modal-backdrop">
      <div class="withdraw-modal">
        <div class="withdraw-modal-header">
          <div class="withdraw-modal-icon">↑</div>
          <button class="action-btn" id="withdraw-modal-close">✕</button>
        </div>
        <div class="withdraw-modal-body">
          <p class="withdraw-modal-title" id="withdraw-modal-title"></p>
          <p class="withdraw-modal-available">Available: <strong id="withdraw-modal-available"></strong></p>
        </div>
        <div class="withdraw-modal-field">
          <label class="withdraw-modal-label" for="withdraw-modal-amount">Amount (₦)</label>
          <input class="withdraw-modal-input" id="withdraw-modal-amount" type="number" placeholder="0.00" />
          <p class="withdraw-modal-error" id="withdraw-modal-error"></p>
        </div>
        <div class="withdraw-modal-remaining">
          <span>Remaining after withdrawal</span>
          <strong id="withdraw-modal-remaining"></strong>
        </div>
        <div class="withdraw-modal-footer">
          <button class="withdraw-modal-cancel" id="withdraw-modal-cancel">Cancel</button>
          <button class="withdraw-modal-confirm" id="withdraw-modal-confirm" disabled>Withdraw</button>
        </div>
      </div>
    </div>
  `;

  withdrawModalState = { category, available };
  document.getElementById("withdraw-modal-title").textContent =
    `Withdraw from ${category}`;
  document.getElementById("withdraw-modal-available").textContent =
    `₦${available.toLocaleString()}`;
  document.getElementById("withdraw-modal-remaining").textContent =
    `₦${available.toLocaleString()}`;
  document.getElementById("withdraw-modal-amount").value = "";
  document.getElementById("withdraw-modal-error").textContent = "";
  document.getElementById("withdraw-modal-confirm").disabled = true;
  document.getElementById("withdraw-modal-backdrop").classList.add("open");

  document
    .getElementById("withdraw-modal-close")
    .addEventListener("click", closeWithdrawModal);
  document
    .getElementById("withdraw-modal-cancel")
    .addEventListener("click", closeWithdrawModal);
  document
    .getElementById("withdraw-modal-amount")
    .addEventListener("input", withdrawModalUpdate);
  document
    .getElementById("withdraw-modal-confirm")
    .addEventListener("click", confirmWithdrawModal);
};
