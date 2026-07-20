import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6fkTCMwlzaEm60ad-WUu8MVL7FW7q6CY",
  authDomain: "luckkingresult.firebaseapp.com",
  projectId: "luckkingresult",
  storageBucket: "luckkingresult.firebasestorage.app",
  messagingSenderId: "930339354163",
  appId: "1:930339354163:web:b59f3d25516ce81dd59546"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
