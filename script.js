/* ==============================
   Elements
============================== */
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const list = document.getElementById("list");
const card = document.getElementById("card");
const randomBtn = document.getElementById("randomBtn");

const btnOromo = document.getElementById("btnOromo");
const btnEnglish = document.getElementById("btnEnglish");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

let currentLang = "Oromo";
let words = [];
let currentIndex = -1;

/* ==============================
   Load Words JSON
============================== */
function loadWords() {
  const file = currentLang === "English" ? "English/English.json" : "Oromo/Oromo.json";
  fetch(file)
    .then(res => res.json())
    .then(data => {
      words = data;
      list.innerHTML = "";
      card.innerHTML = "";
    })
    .catch(err => console.error(err));
}

loadWords();

/* ==============================
   Language Buttons
============================== */
btnOromo.addEventListener("click", () => {
  if (currentLang === "Oromo") return;
  currentLang = "Oromo";
  btnOromo.classList.add("active");
  btnEnglish.classList.remove("active");
  loadWords();
});

btnEnglish.addEventListener("click", () => {
  if (currentLang === "English") return;
  currentLang = "English";
  btnEnglish.classList.add("active");
  btnOromo.classList.remove("active");
  loadWords();
});

/* ==============================
   Hamburger Toggle
============================== */
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

/* ==============================
   Search Function
============================== */
searchBtn.addEventListener("click", () => {
  list.innerHTML = "";
  card.innerHTML = "";
  const q = search.value.trim().toLowerCase();
  if (!q) return;

  let count = 0;
  words.forEach((w, i) => {
    if (w.word.toLowerCase().startsWith(q) && count < 10) {
      const li = document.createElement("li");
      li.textContent = w.word;
      li.onclick = () => openWord(i);
      list.appendChild(li);
      count++;
    }
  });
});

/* ==============================
   Open Word & Render Card
============================== */
function openWord(index) {
  currentIndex = index;
  list.innerHTML = "";
  renderCard();
}

function renderCard() {
  if (!words[currentIndex]) return;
  const w = words[currentIndex];
  const folder = currentLang === "English" ? "English" : "Oromo";

  fetch(`${folder}/${w.id}.html`)
    .then(r => r.text())
    .then(html => {
      card.innerHTML = `
        ${html}
        <div style="margin-top:20px; text-align:center;">
          <button id="prevBtn">⏮ Previous</button>
          <button id="nextBtn">Next ⏭</button>
        </div>
      `;
      document.getElementById("prevBtn").addEventListener("click", prevWord);
      document.getElementById("nextBtn").addEventListener("click", nextWord);
    })
    .catch(() => {
      card.innerHTML = `
        <h2>${w.word}</h2>
        <p>File not found.</p>
        <div style="margin-top:20px; text-align:center;">
          <button id="prevBtn">⏮ Previous</button>
          <button id="nextBtn">Next ⏭</button>
        </div>
      `;
      document.getElementById("prevBtn").addEventListener("click", prevWord);
      document.getElementById("nextBtn").addEventListener("click", nextWord);
    });
}

/* ==============================
   Previous / Next
============================== */
function prevWord() {
  if (currentIndex > 0) {
    currentIndex--;
    renderCard();
  }
}

function nextWord() {
  if (currentIndex < words.length - 1) {
    currentIndex++;
    renderCard();
  }
}

/* ==============================
   Random Word
============================== */
function randomWord() {
  if (words.length === 0) return;
  const rand = Math.floor(Math.random() * words.length);
  currentIndex = rand;
  renderCard();
}

randomBtn.addEventListener("click", randomWord);

/* =============== */

function playAudio() {
  document.getElementById("audio").play();
}