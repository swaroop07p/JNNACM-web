import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
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

async function updateVisitorCount() {
  // ✅ ONLY RUN ON HOMEPAGE
  if (
    !window.location.pathname.includes("index.html") &&
    window.location.pathname !== "/"
  ) {
    displayCountOnly();
    return;
  }

  try {
    // 🔹 increment total
    await updateDoc(counterRef, {
      count: increment(1),
    });

    // 🔹 unique logic
    let isUnique = localStorage.getItem("visited");

    if (!isUnique) {
      await updateDoc(counterRef, {
        unique: increment(1),
      });

      localStorage.setItem("visited", "true");
    }

    displayCountOnly();
  } catch (error) {
    console.error(error);
  }
}

// 🔥 READ ONLY FUNCTION (USED EVERYWHERE)
async function displayCountOnly() {
  const docSnap = await getDoc(counterRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    document.getElementById("visitor-count").innerText = data.count;

    const uniqueEl = document.getElementById("unique-count");
    if (uniqueEl) {
      uniqueEl.innerText = data.unique;
    }
  }
}

updateVisitorCount();
