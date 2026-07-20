import { db, auth } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Login check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "admin.html";
  }
});

window.save = async function () {

  const rdpr = document.getElementById("rdpr").value;
  const blpr = document.getElementById("blpr").value;
  const gdpr = document.getElementById("gdpr").value;
  const dnpr = document.getElementById("dnpr").value;
  const date = document.getElementById("date").value;
  const notice = document.getElementById("notice").value;

  try {

    await setDoc(doc(db, "today", "result"), {
      date,
      rdpr,
      blpr,
      gdpr,
      dnpr,
      notice,
      updated: new Date().toISOString()
    });

    await setDoc(doc(db, "chart", date), {
      date,
      rdpr,
      blpr,
      gdpr,
      dnpr
    });

    alert("✅ Result Saved Successfully");

  } catch (error) {

    alert("❌ " + error.message);

  }

}

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {

  await signOut(auth);

  window.location.href = "admin.html";

});
