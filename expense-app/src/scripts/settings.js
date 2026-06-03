import { UserData } from "./data.js";
import { renderAllocationPercentages } from "../main.js";
export const openSettingsPanel = () => {
  const settingsPanel = document.getElementById("settings-panel");

  settingsPanel.innerHTML = `
    <h2>Settings</h2>
    <div>
    <label for="savings">Savings Percentage:</label>
    <input type="number" id="savings" />
    </div>
    <div>
    <label for="investment">Investment Percentage:</label>
    <input type="number" id="investment" />
    </div>
    <div>
    <label for="utilities">Utilities Percentage:</label>
    <input type="number" id="utilities" />
    </div>
    <div>
    <label for="flex">Flexed Percentage:</label>
    <input type="number" id="flex" />
    </div>
    <div style="display: flex; gap: 10px;">
    <button id="save-settings">Save</button>
    <button id="default-settings">Default</button>
    </div>
  `;

  settingsPanel.querySelector("#savings").value =
    UserData.allocationPercentages.savings;
  settingsPanel.querySelector("#investment").value =
    UserData.allocationPercentages.investment;
  settingsPanel.querySelector("#utilities").value =
    UserData.allocationPercentages.utilities;
  settingsPanel.querySelector("#flex").value =
    UserData.allocationPercentages.flex;

  const updateNumber = () => {
    const savings =
      parseFloat(settingsPanel.querySelector("#savings").value) || 0;
    const investment =
      parseFloat(settingsPanel.querySelector("#investment").value) || 0;
    const utilities =
      parseFloat(settingsPanel.querySelector("#utilities").value) || 0;
    const flex = parseFloat(settingsPanel.querySelector("#flex").value) || 0;

    UserData.allocationPercentages.savings = savings;
    UserData.allocationPercentages.investment = investment;
    UserData.allocationPercentages.utilities = utilities;
    UserData.allocationPercentages.flex = flex;

    renderAllocationPercentages();
    // Close the settings panel
    settingsPanel.classList.remove("open");
  };

  const saveBtn = settingsPanel.querySelector("#save-settings");
  saveBtn.addEventListener("click", updateNumber);

  const defaultBtn = settingsPanel.querySelector("#default-settings");
  defaultBtn.addEventListener("click", () => {
    settingsPanel.querySelector("#savings").value = 30;
    settingsPanel.querySelector("#investment").value = 40;
    settingsPanel.querySelector("#utilities").value = 20;
    settingsPanel.querySelector("#flex").value = 10;
  });

  settingsPanel.classList.add("open");
};
