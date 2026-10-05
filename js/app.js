/**
 * Main Application Logic for Algoritma & Pemrograman Blog
 * Fitur:
 * - Load/Save Studi Kasus dari/ke LocalStorage
 * - Filter Kategori & Tingkat Kesulitan
 * - Pencarian Real-Time (Judul, Deskripsi, Kategori)
 * - Modal Detail Studi Kasus Lengkap
 * - Tambah / Hapus / Reset Studi Kasus
 * - Export / Import Data JSON
 * - Copy Code ke Clipboard
 * - Mode Gelap / Terang (Dark/Light Mode)
 * - Visualizer Interaktif Bubble Sort untuk demonstrasi langsung
 */

const STORAGE_KEY = "alpro_blog_case_studies";
const THEME_KEY = "alpro_blog_theme";

// State
let caseStudies = [];
let activeCategory = "Semua";
let activeDifficulty = "Semua";
let searchQuery = "";
let currentDetailId = null;

// Simulator State
let simArray = [64, 34, 25, 12, 22, 11, 90];
let isSorting = false;
let sortSpeed = 400;

// Inisialisasi saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadData();
  renderCategories();
  renderCards();
  initSimulator();
  setupEventListeners();
});

/* ===============================
   TEMA (DARK / LIGHT MODE)
================================= */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  setTheme(savedTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    if (theme === "dark") {
      themeIcon.className = "bi bi-sun-fill text-warning";
    } else {
      themeIcon.className = "bi bi-moon-stars-fill text-dark";
    }
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-bs-theme");
  setTheme(current === "dark" ? "light" : "dark");
}

/* ===============================
   PENYIMPANAN DATA (LOCALSTORAGE)
================================= */
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      caseStudies = JSON.parse(raw);
    } else {
      caseStudies = [...INITIAL_CASE_STUDIES];
      saveData();
    }
  } catch (e) {
    console.error("Gagal memuat data dari localStorage, menggunakan data default.", e);
    caseStudies = [...INITIAL_CASE_STUDIES];
  }
  updateStats();
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(caseStudies));
    updateStats();
  } catch (e) {
    console.error("Gagal menyimpan ke localStorage", e);
    showToast("Gagal menyimpan data ke browser!", "danger");
  }
}

function resetDefaultData() {
  if (confirm("Apakah Anda yakin ingin mengembalikan semua data studi kasus ke versi default?")) {
    caseStudies = [...INITIAL_CASE_STUDIES];
    saveData();
    renderCards();
    showToast("Data studi kasus berhasil dikembalikan ke default.", "success");
  }
}

/* ===============================
   RENDER STATISTIK & KATEGORI
================================= */
function updateStats() {
  const totalCountEl = document.getElementById("totalCaseCount");
  if (totalCountEl) totalCountEl.textContent = caseStudies.length;

  const categories = new Set(caseStudies.map(c => c.category));
  const categoryCountEl = document.getElementById("totalCategoryCount");
  if (categoryCountEl) categoryCountEl.textContent = categories.size;
}

function renderCategories() {
  const categoryContainer = document.getElementById("categoryFilters");
  if (!categoryContainer) return;

  const categories = ["Semua", ...new Set(caseStudies.map(c => c.category))];

  categoryContainer.innerHTML = categories.map(cat => `
    <button class="category-btn ${cat === activeCategory ? 'active' : ''}" onclick="filterCategory('${escapeHtml(cat)}')">
      ${escapeHtml(cat)}
    </button>
  `).join("");
}

function filterCategory(category) {
  activeCategory = category;
  renderCategories();
  renderCards();
}

function filterDifficulty(diff) {
  activeDifficulty = diff;
  renderCards();
}

/* ===============================
   RENDER KARTU STUDI KASUS
================================= */
function renderCards() {
  const container = document.getElementById("caseStudiesContainer");
  const emptyState = document.getElementById("emptyState");
  if (!container) return;

  // Filter logika
  const filtered = caseStudies.filter(item => {
    const matchCategory = activeCategory === "Semua" || item.category === activeCategory;
    const matchDifficulty = activeDifficulty === "Semua" || item.difficulty === activeDifficulty;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.problem.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    return matchCategory && matchDifficulty && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  }

  if (emptyState) emptyState.classList.add("d-none");

  container.innerHTML = filtered.map(item => {
    const diffClass = `badge-difficulty-${item.difficulty.toLowerCase()}`;
    const langBadge = (item.codeSnippet && item.codeSnippet.language) ? item.codeSnippet.language.toUpperCase() : "KODE";

    return `
      <div class="col-md-6 col-lg-4">
        <div class="case-card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1">
                ${escapeHtml(item.category)}
              </span>
              <span class="badge-pill ${diffClass}">
                ${escapeHtml(item.difficulty)}
              </span>
            </div>
            
            <h5 class="case-title">${escapeHtml(item.title)}</h5>
            <p class="case-description">${escapeHtml(item.summary)}</p>
            
            <div class="d-flex align-items-center justify-content-between text-muted small mt-auto pt-3 border-top">
              <span><i class="bi bi-code-slash me-1"></i>${langBadge}</span>
              <span><i class="bi bi-clock me-1"></i>${escapeHtml(item.timeComplexity || "O(1)")}</span>
            </div>

            <div class="d-flex gap-2 mt-3">
              <button class="btn btn-outline-primary btn-sm flex-grow-1" onclick="openDetailModal('${item.id}')">
                <i class="bi bi-book-half me-1"></i> Baca Solusi
              </button>
              <button class="btn btn-outline-danger btn-sm" title="Hapus Studi Kasus" onclick="deleteCase('${item.id}')">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* ===============================
   MODAL DETAIL STUDI KASUS
================================= */
function openDetailModal(id) {
  const item = caseStudies.find(c => c.id === id);
  if (!item) return;

  currentDetailId = id;
  document.getElementById("modalDetailTitle").textContent = item.title;
  document.getElementById("modalDetailCategory").textContent = item.category;
  
  const diffBadge = document.getElementById("modalDetailDifficulty");
  diffBadge.textContent = item.difficulty;
  diffBadge.className = `badge-pill badge-difficulty-${item.difficulty.toLowerCase()}`;

  document.getElementById("modalDetailProblem").textContent = item.problem;

  // Analisis poin-poin
  const analysisList = document.getElementById("modalDetailAnalysis");
  if (Array.isArray(item.analysis)) {
    analysisList.innerHTML = item.analysis.map(step => `<li class="mb-1">${escapeHtml(step)}</li>`).join("");
  } else {
    analysisList.innerHTML = `<li>${escapeHtml(item.analysis || "Analisis belum tersedia.")}</li>`;
  }

  // Pseudocode
  document.getElementById("modalDetailPseudocode").textContent = item.pseudocode || "// Pseudocode belum dicantumkan";

  // Kode Implementasi
  const codeEl = document.getElementById("modalDetailCode");
  const langLabel = document.getElementById("modalDetailLangLabel");
  const codeContent = item.codeSnippet?.code || "// Kode belum tersedia";
  const language = item.codeSnippet?.language || "cpp";

  codeEl.textContent = codeContent;
  langLabel.textContent = language.toUpperCase();

  // Kompleksitas
  document.getElementById("modalDetailTimeComp").textContent = item.timeComplexity || "-";
  document.getElementById("modalDetailSpaceComp").textContent = item.spaceComplexity || "-";

  const modal = new bootstrap.Modal(document.getElementById("detailModal"));
  modal.show();
}

function copyModalCode() {
  const codeText = document.getElementById("modalDetailCode").textContent;
  navigator.clipboard.writeText(codeText).then(() => {
    showToast("Kode berhasil disalin ke clipboard!", "success");
  }).catch(() => {
    showToast("Gagal menyalin kode.", "danger");
  });
}

/* ===============================
   TAMBAH / EDIT STUDI KASUS
================================= */
function saveNewCase(event) {
  event.preventDefault();

  const title = document.getElementById("inputTitle").value.trim();
  const category = document.getElementById("inputCategory").value.trim();
  const difficulty = document.getElementById("inputDifficulty").value;
  const summary = document.getElementById("inputSummary").value.trim();
  const problem = document.getElementById("inputProblem").value.trim();
  const analysisRaw = document.getElementById("inputAnalysis").value.trim();
  const pseudocode = document.getElementById("inputPseudocode").value.trim();
  const language = document.getElementById("inputLanguage").value;
  const code = document.getElementById("inputCode").value.trim();
  const timeComplexity = document.getElementById("inputTimeComp").value.trim() || "O(n)";
  const spaceComplexity = document.getElementById("inputSpaceComp").value.trim() || "O(1)";

  if (!title || !category || !problem || !code) {
    showToast("Mohon lengkapi judul, kategori, deskripsi masalah, dan kode!", "warning");
    return;
  }

  // Konversi analisis per baris menjadi array
  const analysis = analysisRaw.split("\n").filter(line => line.trim().length > 0);

  const newCase = {
    id: "cs-" + Date.now(),
    title,
    category,
    difficulty,
    author: "Mahasiswa Alpro",
    date: new Date().toISOString().split("T")[0],
    summary: summary || problem.substring(0, 120) + "...",
    problem,
    analysis: analysis.length > 0 ? analysis : ["Pahami masalah dan rancang algoritma yang sesuai."],
    pseudocode: pseudocode || "// Belum ada pseudocode",
    codeSnippet: {
      language,
      code
    },
    timeComplexity,
    spaceComplexity
  };

  caseStudies.unshift(newCase);
  saveData();
  renderCategories();
  renderCards();

  // Reset & tutup modal
  document.getElementById("formAddCase").reset();
  const modalEl = document.getElementById("addCaseModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  showToast("Studi kasus baru berhasil ditambahkan!", "success");
}

function deleteCase(id) {
  if (confirm("Apakah Anda yakin ingin menghapus studi kasus ini?")) {
    caseStudies = caseStudies.filter(c => c.id !== id);
    saveData();
    renderCategories();
    renderCards();
    showToast("Studi kasus berhasil dihapus.", "info");
  }
}

/* ===============================
   EXPORT & IMPORT DATA JSON
================================= */
function exportDataJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(caseStudies, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `studi_kasus_alpro_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Data studi kasus berhasil di-export ke JSON!", "success");
}

function importDataJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        caseStudies = imported;
        saveData();
        renderCategories();
        renderCards();
        showToast(`Berhasil mengimpor ${imported.length} studi kasus!`, "success");
      } else {
        showToast("Format JSON tidak valid (harus berupa array).", "danger");
      }
    } catch (err) {
      showToast("Gagal membaca file JSON!", "danger");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

/* ===============================
   SIMULATOR VISUALIZER BUBBLE SORT
================================= */
function initSimulator() {
  renderArrayBars();
}

function resetSimulatorArray() {
  if (isSorting) return;
  simArray = [64, 34, 25, 12, 22, 11, 90];
  renderArrayBars();
  document.getElementById("simStatus").textContent = "Status: Array direset ke kondisi awal.";
}

function randomizeSimulatorArray() {
  if (isSorting) return;
  simArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 85) + 15);
  renderArrayBars();
  document.getElementById("simStatus").textContent = "Status: Nilai array acak baru dibuat.";
}

function renderArrayBars(compareIdx1 = -1, compareIdx2 = -1, sortedIndices = []) {
  const container = document.getElementById("arrayBarsContainer");
  if (!container) return;

  container.innerHTML = simArray.map((val, idx) => {
    let classes = "array-bar";
    if (idx === compareIdx1 || idx === compareIdx2) {
      classes += " active-compare";
    }
    if (sortedIndices.includes(idx)) {
      classes += " sorted";
    }
    return `
      <div class="${classes}" style="height: ${val * 1.7}px;">
        ${val}
      </div>
    `;
  }).join("");
}

async function runBubbleSortSimulation() {
  if (isSorting) return;
  isSorting = true;
  const statusEl = document.getElementById("simStatus");
  statusEl.textContent = "Status: Simulasi Bubble Sort sedang berjalan...";

  const arr = [...simArray];
  const n = arr.length;
  const sortedIndices = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      renderArrayBars(j, j + 1, sortedIndices);
      statusEl.textContent = `Status: Membandingkan ${arr[j]} dan ${arr[j + 1]}...`;
      await sleep(sortSpeed);

      if (arr[j] > arr[j + 1]) {
        // Swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        simArray = [...arr];

        renderArrayBars(j, j + 1, sortedIndices);
        statusEl.textContent = `Status: ${arr[j + 1]} lebih kecil, lakukan penukaran (Swap)!`;
        await sleep(sortSpeed);
      }
    }
    sortedIndices.push(n - 1 - i);
  }
  sortedIndices.push(0);
  renderArrayBars(-1, -1, sortedIndices);
  statusEl.textContent = "Status: Array berhasil terurut sepenuhnya (Sorted)!";
  isSorting = false;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ===============================
   EVENT LISTENERS & HELPER
================================= */
function setupEventListeners() {
  // Search bar input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCards();
    });
  }

  // Difficulty filter select
  const diffSelect = document.getElementById("difficultySelect");
  if (diffSelect) {
    diffSelect.addEventListener("change", (e) => {
      filterDifficulty(e.target.value);
    });
  }

  // Form Tambah Studi Kasus
  const formAdd = document.getElementById("formAddCase");
  if (formAdd) {
    formAdd.addEventListener("submit", saveNewCase);
  }
}

function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const bgClass = type === "success" ? "bg-success text-white" :
                  type === "danger" ? "bg-danger text-white" :
                  type === "warning" ? "bg-warning text-dark" : "bg-primary text-white";

  const toastId = "toast-" + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-info-circle-fill me-2"></i> ${escapeHtml(message)}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML("beforeend", toastHtml);
  const toastEl = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();

  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}

function escapeHtml(text) {
  if (!text) return "";
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}
