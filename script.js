import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Today's Result
const resultRef = doc(db, "today", "result");

onSnapshot(resultRef, (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data();

    document.querySelectorAll(".number")[0].innerHTML = data.rdpr || "--";
    document.querySelectorAll(".number")[1].innerHTML = data.blpr || "--";
    document.querySelectorAll(".number")[2].innerHTML = data.gdpr || "--";
    document.querySelectorAll(".number")[3].innerHTML = data.dnpr || "--";

    const notice = document.querySelector(".notice marquee");
    if (notice && data.notice) {
      notice.innerHTML = data.notice;
    }
  }
});

window.loadHomeChart = async function () {

  const month = document.getElementById("monthSelect").value;
  const chartBody = document.getElementById("chartBody");
  const title = document.getElementById("chartTitle");

  chartBody.innerHTML = "";

  title.innerHTML = "🗓️ " +
    month.charAt(0).toUpperCase() + month.slice(1) +
    " 2026 Result Chart";

  const q = query(
    collection(db, "chart"),
    where("month", "==", month),
    where("year", "==", "2026")
  );

  const snapshot = await getDocs(q);

  const rows = [];

  snapshot.forEach((doc) => {
    rows.push(doc.data());
  });

  rows.sort((a, b) => Number(a.date) - Number(b.date));

  rows.forEach((data) => {
    chartBody.innerHTML += `
      <tr>
        <td>${data.date}</td>
        <td>${data.rdpr || "--"}</td>
        <td>${data.blpr || "--"}</td>
        <td>${data.gdpr || "--"}</td>
        <td>${data.dnpr || "--"}</td>
      </tr>
    `;
  });

};

loadHomeChart();
