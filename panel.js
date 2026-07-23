import { db, auth } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Login Check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "admin.html";
  }
});

// Save Result
window.save = async function () {

  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;

  const date = document.getElementById("date").value;

  const rdpr = document.getElementById("rdpr").value;
  const blpr = document.getElementById("blpr").value;
  const gdpr = document.getElementById("gdpr").value;
  const dnpr = document.getElementById("dnpr").value;

  const notice = document.getElementById("notice").value;

  try {

    // Today's Result
    await setDoc(doc(db, "today", "result"), {

      year,
      month,
      date,

      rdpr,
      blpr,
      gdpr,
      dnpr,

      notice,

      updated: new Date().toISOString()

    });

    // Monthly Chart
    await setDoc(doc(db, "chart", date), {

  year,
  month,
  date,

  rdpr,
  blpr,
  gdpr,
  dnpr

}, { merge: true });

    alert("✅ Result Saved Successfully");

  } catch (error) {

    alert("❌ " + error.message);

  }

};

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {

  await signOut(auth);

  window.location.href = "admin.html";

});
