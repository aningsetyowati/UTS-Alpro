# AlproHub - Blog & Repositori Studi Kasus Algoritma dan Pemrograman

Repositori web modern berbasis **HTML5**, **Bootstrap 5 (CSS)**, dan **JavaScript** untuk menyimpan, mengelola, serta mendokumentasikan studi kasus Algoritma dan Pemrograman.

---

## 🌟 Fitur Utama

1. **Koleksi Studi Kasus Terstruktur**:
   - Setiap studi kasus dilengkapi dengan **Deskripsi Masalah**, **Analisis & Logika Solusi**, **Pseudocode**, **Implementasi Kode Program**, serta analisis **Kompleksitas Waktu & Ruang** ($O(n)$, $O(\log n)$, dll).
   - Sudah terisi 6 studi kasus algoritma populer:
     - *Binary Search* (Searching)
     - *Quick Sort* (Sorting)
     - *Antrean Loket Pasien dengan Queue* (Struktur Data)
     - *Validasi Tanda Kurung dengan Stack* (Struktur Data)
     - *Deret Fibonacci: Rekursi vs Dynamic Programming* (Rekursi & DP)
     - *Pecahan Uang Kembalian Kasir* (Algoritma Greedy)

2. **Penyimpanan Lokal Otomatis (LocalStorage)**:
   - Data studi kasus yang ditambahkan tersimpan langsung di browser tanpa perlu setup database server.
   - Tetap tersimpan meskipun halaman di-refresh.

3. **Manajemen Studi Kasus Lengkap (CRUD)**:
   - Form modal untuk menambahkan studi kasus baru.
   - Hapus studi kasus yang tidak diperlukan.
   - Fitur **Reset ke Data Awal** jika ingin mengembalikan contoh bawaan.

4. **Pencarian & Multi-Filter Real-Time**:
   - Pencarian instan berdasarkan judul, ringkasan, atau kata kunci.
   - Filter pill berdasarkan kategori algoritma (Searching, Sorting, Struktur Data, dll).
   - Filter dropdown berdasarkan tingkat kesulitan (*Mudah*, *Menengah*, *Sulit*).

5. **Visualizer / Simulator Bubble Sort Interaktif**:
   - Animasi grafis batang secara real-time yang memperlihatkan proses perbandingan dan penukaran (*swap*) data.
   - Dilengkapi tombol *Acak Nilai Baru*, *Mulai Urutkan*, dan *Reset*.

6. **Fitur Ekspor & Impor Data (JSON)**:
   - Cadangkan seluruh data studi kasus ke file `.json`.
   - Bagikan atau pulihkan data kapan saja.

7. **Desain Modern & Mode Gelap (Dark/Light Mode)**:
   - Mendukung peralihan tema Dark Mode dan Light Mode.
   - Menggunakan Bootstrap 5, Bootstrap Icons, dan font Inter + Fira Code.
   - Tombol *Salin Kode (Copy to Clipboard)* dengan notifikasi toast.

---

## 📁 Struktur Berkas

```text
c:\UTS-Alpro\
├── Index.Html          # Berkas HTML utama & antarmuka aplikasi
├── css\
│   └── style.css       # Custom styling, dark/light theme, styling card & visualizer
├── js\
│   ├── data.js         # Dataset studi kasus awal (algoritma klasik & aplikatif)
│   └── app.js          # Logika aplikasi, pencarian, filter, modal, LocalStorage & visualizer
└── README.md           # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

1. Buka folder `c:\UTS-Alpro` pada File Explorer Windows.
2. Klik ganda pada berkas **`Index.Html`**, atau klik kanan lalu pilih **Open with > Google Chrome / Microsoft Edge / Firefox**.
3. Website akan langsung terbuka dan siap digunakan tanpa perlu instalasi tools tambahan!
