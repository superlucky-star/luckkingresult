import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  getDocs
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

// Chart Update
const chartBody = document.getElementById("chartBody");

if (chartBody) {

  getDocs(collection(db, "chart")).then((snapshot) => {

    snapshot.forEach((doc) => {

      const data = doc.data();

      if (Number(data.date) > 17) {

        chartBody.innerHTML += `
<tr>
<td>${data.date}</td>
<td>${data.rdpr}</td>
<td>${data.blpr}</td>
<td>${data.gdpr}</td>
<td>${data.dnpr}</td>
</tr>
`;

      }

    });

  });

}

window.searchResult = async function () {

  const date = document.getElementById("searchDate").value;
  const output = document.getElementById("searchOutput");

  if (!date) {
    output.innerHTML = "⚠️ Date enter karo";
    return;
  }

  const resultRef = doc(db, "chart", date);
  const resultSnap = await getDoc(resultRef);

  if (resultSnap.exists()) {

    const data = resultSnap.data();

    output.innerHTML = `
      <h3>Result Found</h3>
      <p>📅 Date : ${data.date}</p>
      <p>RUDRAPUR : ${data.rdpr}</p>
      <p>BILASPUR : ${data.blpr}</p>
      <p>GADARPUR : ${data.gdpr}</p>
      <p>DINESHPUR : ${data.dnpr}</p>
    `;

  } else {

    output.innerHTML = "❌ Result Not Found";

  }

}
