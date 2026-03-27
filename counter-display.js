import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4IjdT99WRqmXacG5HTOw8W5h-uz1fsA0",
  authDomain: "jnnacm-web.firebaseapp.com",
  projectId: "jnnacm-web",
  storageBucket: "jnnacm-web.firebasestorage.app",
  messagingSenderId: "711067975206",
  appId: "1:711067975206:web:3c1f2da7169ba35618b0e7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const counterRef = doc(db, "stats", "visitors");

async function displayCountOnly() {
  try {
    const docSnap = await getDoc(counterRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      document.getElementById("visitor-count").innerText = data.count;

      const uniqueEl = document.getElementById("unique-count");
      if (uniqueEl) {
        uniqueEl.innerText = data.unique;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

displayCountOnly();
