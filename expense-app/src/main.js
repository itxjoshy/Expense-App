import "./style.css";

//user data
import { UserData } from "./scripts/data.js";
import { renderTable } from "./scripts/table.js";
import { allocateFunds } from "./scripts/calcAmount.js";
import { addHistory, renderMenu } from "./scripts/history.js";
import { openSettingsPanel } from "./scripts/settings.js";
import { openMenu } from "./scripts/history.js";
import { watchAuth, signIn, logout } from "./scripts/auth.js";

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
console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
//show login
const showLogin = () => {
  document.body.innerHTML = `
     <div class="card">
      <div class="logo">
        <svg viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>

      <h1>Welcome back</h1>
      <p class="subtitle">Sign in to your account to continue.</p>

      <form id="login-form" novalidate>
        <div class="field">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            autocomplete="email"
          />
          <span class="error-msg" id="email-error"></span>
        </div>

        <div class="field">
          <div class="field-header">
            <label for="password">Password</label>
            <a href="#" class="forgot">Forgot password?</a>
          </div>
          <div class="password-wrap">
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-pw"
              id="toggle-pw"
              aria-label="Toggle password visibility"
            >
              <svg id="eye-icon" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          <span class="error-msg" id="pw-error"></span>
        </div>

        <button class="btn-primary" type="submit" id="submit-btn">
          Sign in
        </button>
      </form>
    </div>
  `;

  const form = document.getElementById("login-form");
  const emailEl = document.getElementById("email");
  const pwEl = document.getElementById("password");
  const toggleBtn = document.getElementById("toggle-pw");
  const eyeIcon = document.getElementById("eye-icon");
  const submitBtn = document.getElementById("submit-btn");

  const eyeOpen = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
  const eyeClosed = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;

  toggleBtn.addEventListener("click", () => {
    const isPassword = pwEl.type === "password";
    pwEl.type = isPassword ? "text" : "password";
    eyeIcon.innerHTML = isPassword ? eyeClosed : eyeOpen;
  });

  const setError = (el, errEl, msg) => {
    if (msg) {
      el.classList.add("error");
      errEl.textContent = msg;
    } else {
      el.classList.remove("error");
      errEl.textContent = "";
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;

    if (
      !emailEl.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)
    ) {
      setError(
        emailEl,
        document.getElementById("email-error"),
        "Enter a valid email address.",
      );
      valid = false;
    } else {
      setError(emailEl, document.getElementById("email-error"), "");
    }

    if (valid) {
      submitBtn.textContent = "Signing in…";
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await signIn(email, password);
      } catch (err) {
        document.getElementById("pw-error").textContent =
          "Invalid email or password";
      }

      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = "Sign in";
        submitBtn.disabled = false;
      }, 2000);
    }
  });

  emailEl.addEventListener("input", () =>
    setError(emailEl, document.getElementById("email-error"), ""),
  );
  pwEl.addEventListener("input", () =>
    setError(pwEl, document.getElementById("pw-error"), ""),
  );
};
// Show the app
const showApp = (user) => {
  document.body.innerHTML = `
   <div class="menu"></div>
   <button id="user-button">
    <div class="acct_center"></div>
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  </button>
    <button id="menu-button" class="menu-button">Menu</button>
    <main>
      <h1>Expense Tracker</h1>
      <div class="input">
        <input type="number" id="amount" placeholder="Amount" required />
        <button id="submit-btn" type="submit">Add Expense</button>
        <button id="setting-button">set</button>
      </div>
      <section class="allocation-section" id="js-allocation"></section>
    </main>
    <div id="settings-panel" class="settings-panel"></div>
    <div id="withdraw-panel" class="withdraw-panel"></div>
    <div class="container">
      <table class="finance-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount (₦)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody></tbody>

        <tfoot>
          <tr>
            <td colspan="2"><strong>Total Balance</strong></td>
            <td id="total-balance" colspan="2"><strong>₦50,000</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
    `;
  const addBtn = document.getElementById("submit-btn");
  const settingButton = document.getElementById("setting-button");
  const menuButton = document.getElementById("menu-button");
  renderAllocationPercentages();
  //table
  renderTable();
  //menu
  menuButton.addEventListener("click", () => {
    openMenu();
  });

  settingButton.addEventListener("click", openSettingsPanel);
  addBtn.addEventListener("click", () => {
    const amountIn = document.getElementById("amount").value;

    const addAmt = () => {
      const amountIn = document.getElementById("amount").value;
      allocateFunds(amountIn);
      addHistory(amountIn);
      renderMenu();
      renderTable();
    };

    amountIn ? addAmt() : console.log("No amount entered");

    document.getElementById("amount").value = "";
  });

  //acct btn
  const userButton = document.getElementById("user-button");

  const acctCenter = document.querySelector(".acct_center");
  userButton.addEventListener("click", () => {
    acctCenter.innerHTML = `
      <div class="acct_info">
        <h3>User Account</h3>
        <p><em>signed in as: </br> </em> ${user.email}</p>
        <button id="logout-button">Logout</button>
      </div>
    `;
    document.getElementById("logout-button").addEventListener("click", () => {
      logout();
    });
    acctCenter.classList.toggle("open");
  });
};

watchAuth((user) => {
  if (user) {
    document.body.classList.remove("open");
    showApp(user);
  } else {
    document.body.classList.add("open");
    showLogin();
  }
});
