import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const msg = document.getElementById("msg");

  msg.innerHTML = "";

  try {

    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "panel.html";

  } catch (error) {

    msg.innerHTML = error.message;

  }

});
