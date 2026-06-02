import { UserData } from "./data.js";

export function allocateFunds(amount) {
  UserData.totalBalance += Number(amount);
  UserData.buckets.savings +=
    Number(amount) * (UserData.allocationPercentages.savings / 100);
  UserData.buckets.investment +=
    Number(amount) * (UserData.allocationPercentages.investment / 100);
  UserData.buckets.utilities +=
    Number(amount) * (UserData.allocationPercentages.utilities / 100);
  UserData.buckets.flex +=
    Number(amount) * (UserData.allocationPercentages.flex / 100);
}
