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

form.addEventListener("submit", (e) => {
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

  if (pwEl.value.length < 6) {
    setError(
      pwEl,
      document.getElementById("pw-error"),
      "Password must be at least 6 characters.",
    );
    valid = false;
  } else {
    setError(pwEl, document.getElementById("pw-error"), "");
  }

  if (valid) {
    submitBtn.textContent = "Signing in…";
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
