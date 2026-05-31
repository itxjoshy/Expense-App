//user data
import { UserData } from "./data.js";
import { renderTable } from "./table.js";
import { openSettingsPanel } from "./settings.js";
import { openMenu } from "./history.js";
const settingButton = document.getElementById("setting-button");
const menuButton = document.getElementById("menu-button");

settingButton.addEventListener("click", openSettingsPanel);

//show the percentage
export const renderAllocationPercentages = () => {
  const allocationSection = document.getElementById("js-allocation");
  allocationSection.innerHTML = `
    <div class="allocation">
      <div><p>Savings</p>${UserData.allocationPercentages.savings}%</div>
      <div><p>Investment</p>${UserData.allocationPercentages.investment}%</div>
      <div><p>Utilities</p>${UserData.allocationPercentages.utilities}%</div>
      <div><p>Flex</p>${UserData.allocationPercentages.flex}%</div>
    </div>
`;
};
renderAllocationPercentages();
//table
renderTable();
//menu
menuButton.addEventListener("click", () => {
  openMenu();
});
