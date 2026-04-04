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

// 1. Initialize Animations
AOS.init({ duration: 600, offset: 80, once: true });

// 2. Dynamic Year for Footer
document.getElementById("year").textContent = new Date().getFullYear();

// 3. Theme Toggle Logic
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = themeBtn.querySelector("i");

// Ensure dark mode is default based on your SCSS snippet style preferences
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

let currentTheme =
  localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeIcon.className = "ri-sun-line";
  } else {
    document.body.removeAttribute("data-theme");
    themeIcon.className = "fa-solid fa-moon";
  }
}

applyTheme(currentTheme);

themeBtn.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", currentTheme);
  applyTheme(currentTheme);
});

// 4. Mobile Menu Logic
const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");

mobileToggle.addEventListener("click", () => {
  mobileToggle.classList.toggle("is-open");
  mobileMenu.classList.toggle("is-open");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileToggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
  }
});


// For scroll progress
document.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = scrollTop / scrollHeight;

  document.documentElement.style.setProperty("--scroll-progress", progress);
});
