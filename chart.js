import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

function changeMonth(){

const month=document.getElementById("monthSelect").value;

if(month=="july"){
location.href="july2026.html";
}

if(month=="june"){
location.href="june2026.html";
}

if(month=="may"){
location.href="may2026.html";
}

if(month=="april"){
location.href="april2026.html";
}

if(month=="march"){
location.href="march2026.html";
}

}

const chartBody = document.getElementById("chartBody");

async function loadChart() {

  chartBody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "chart"));

  snapshot.forEach((doc) => {

    const data = doc.data();

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
