import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

function changeMonth() {
    loadChart();
}

const chartBody = document.getElementById("chartBody");
const year = "2026";
const monthTitle = document.querySelector("#chartArea h3");

async function loadChart() {

  chartBody.innerHTML = "";
  
  const month = document.getElementById("monthSelect").value;

monthTitle.innerText =
  month.charAt(0).toUpperCase() + month.slice(1) + " " + year;

  const q = query(
  collection(db, "chart"),
  where("month", "==", month),
  where("year", "==", year)
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
      <td>${data.rdpr}</td>
      <td>${data.blpr}</td>
      <td>${data.gdpr}</td>
      <td>${data.dnpr}</td>
    </tr>
  `;

});
}

loadChart();

window.changeMonth = changeMonth;
