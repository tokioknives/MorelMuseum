// auth.js
// Handles sign up, log in, log out using Firebase Authentication.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your project's config (safe to be public).
const firebaseConfig = {
  apiKey: "AIzaSyB1fpHzcCrXdrzCHscTi9KzqxBWgmNhPZk",
  authDomain: "morel-museum.firebaseapp.com",
  projectId: "morel-museum",
  storageBucket: "morel-museum.firebasestorage.app",
  messagingSenderId: "665977723858",
  appId: "1:665977723858:web:bb0c9f8c31728985a0c60b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ---- Grab the page elements ----
const authWrap = document.getElementById("auth-wrap");
const memberPanel = document.getElementById("member-panel");
const memberEmail = document.getElementById("member-email");

const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const message = document.getElementById("auth-message");
const logoutBtn = document.getElementById("logout-btn");

// ---- Tab switching ----
tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("active");
  tabSignup.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  setMessage("");
});

tabSignup.addEventListener("click", () => {
  tabSignup.classList.add("active");
  tabLogin.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  setMessage("");
});

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = "auth-message" + (type ? " " + type : "");
}

function friendlyError(err) {
  const code = err.code || "";
  if (code.includes("email-already-in-use")) return "That email already has an account. Try logging in instead.";
  if (code.includes("invalid-email")) return "That doesn't look like a valid email.";
  if (code.includes("weak-password")) return "Password needs to be at least 6 characters.";
  if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
    return "Email or password is incorrect.";
  }
  return "Something went wrong: " + err.message;
}

// ---- Sign up ----
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  setMessage("Creating your account...");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    setMessage("Account created! You're logged in.", "success");
  } catch (err) {
    setMessage(friendlyError(err), "error");
  }
});

// ---- Log in ----
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  setMessage("Logging in...");
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    setMessage(friendlyError(err), "error");
  }
});

// ---- Log out ----
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// ---- React to login state changing ----
onAuthStateChanged(auth, (user) => {
  if (user) {
    authWrap.classList.add("hidden");
    memberPanel.classList.remove("hidden");
    memberEmail.textContent = user.email;
  } else {
    authWrap.classList.remove("hidden");
    memberPanel.classList.add("hidden");
  }
});
