// ===== Oromo Words Script =====
let words = []; // global variable

// Load Oromo words from JSON
fetch("Oromo/Oromo.json")
  .then(res => res.json())
  .then(data => {
    words = data; // [{id:1, word:"muka"}, ...]
  })
  .catch(err => console.error("Failed to load Oromo words:", err));

/* Search function override (optional if needed) */
function searchWordsOromo(query) {
  const list = document.getElementById("list");
  list.innerHTML = "";
  let count = 0;
  const q = query.trim().toLowerCase();
  if (!q) return;

  words.forEach((w, i) => {
    if (w.word.toLowerCase().startsWith(q) && count < 10) {
      const li = document.createElement("li");
      li.textContent = w.word;
      li.onclick = () => openWordOromo(i);
      list.appendChild(li);
      count++;
    }
  });
}

function openWordOromo(index) {
  const card = document.getElementById("card");
  const w = words[index];
  fetch(`Oromo/${w.id}.html`)
    .then(r => r.text())
    .then(html => {
      card.innerHTML = `
        ${html}
        <div style="margin-top:20px; text-align:center;">
          <button onclick="prevWord()">⏮ Previous</button>
          <button onclick="nextWord()">Next ⏭</button>
        </div>
      `;
    })
    .catch(() => {
      card.innerHTML = `
        <h2>${w.word}</h2>
        <p>File not found.</p>
        <div style="margin-top:20px; text-align:center;">
          <button onclick="prevWord()">⏮ Previous</button>
          <button onclick="nextWord()">Next ⏭</button>
        </div>
      `;
    });
}