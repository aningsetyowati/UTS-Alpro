/**
 * Data Awal Studi Kasus Algoritma dan Pemrograman
 * Berisi kumpulan studi kasus komprehensif dengan masalah, analisis, pseudocode, dan kode implementasi.
 */

const INITIAL_CASE_STUDIES = [
  {
    id: "cs-01",
    title: "Pencarian Data Mahasiswa Menggunakan Binary Search",
    category: "Searching",
    difficulty: "Menengah",
    author: "Tim Alpro",
    date: "2026-10-01",
    summary: "Implementasi algoritma Binary Search untuk mencari data NIM mahasiswa pada daftar yang telah terurut secara efisien dalam waktu O(log n).",
    problem: "Sistem akademik universitas menyimpan 10.000 data NIM mahasiswa yang sudah terurut dari yang terkecil hingga terbesar. Jika menggunakan Linear Search, sistem membutuhkan hingga 10.000 iterasi pada kasus terburuk. Kita diminta merancang algoritma pencarian cepat agar data mahasiswa dapat ditemukan dalam maksimal 14 langkah perbandingan.",
    analysis: [
      "Syarat mutlak Binary Search: data masukan (array) harus dalam kondisi terurut (sorted).",
      "Gunakan teknik Divide and Conquer dengan dua penunjuk indeks: 'low' (awal) dan 'high' (akhir).",
      "Hitung posisi tengah: mid = Math.floor((low + high) / 2).",
      "Bandingkan elemen tengah dengan NIM yang dicari (target):",
      "- Jika array[mid] == target: data ditemukan, kembalikan indeks mid.",
      "- Jika target < array[mid]: abaikan separuh kanan, set high = mid - 1.",
      "- Jika target > array[mid]: abaikan separuh kiri, set low = mid + 1.",
      "Ulangi proses selama low <= high. Jika keluar dari perulangan, artinya data tidak ditemukan."
    ],
    pseudocode: `ALGORITMA BinarySearch(A: array of Integer, n: Integer, target: Integer) -> Integer
DEKLARASI:
    low, high, mid : Integer
DESKRIPSI:
    low <- 0
    high <- n - 1
    
    SELAMA low <= high LAKUKAN
        mid <- (low + high) DIV 2
        JIKA A[mid] = target MAKA
            KEMBALIKAN mid   { Nilai ditemukan }
        SELAIN_ITU JIKA target < A[mid] MAKA
            high <- mid - 1  { Geser ke kiri }
        SELAIN_ITU
            low <- mid + 1   { Geser ke kanan }
        AKHIR_JIKA
    AKHIR_SELAMA
    
    KEMBALIKAN -1            { Nilai tidak ditemukan }
AKHIR_ALGORITMA`,
    codeSnippet: {
      language: "cpp",
      code: `#include <iostream>
#include <vector>
using namespace std;

// Fungsi Binary Search
int binarySearch(const vector<int>& nimList, int target) {
    int low = 0;
    int high = nimList.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Menghindari integer overflow

        if (nimList[mid] == target) {
            return mid; // Ditemukan
        } else if (target < nimList[mid]) {
            high = mid - 1; // Cari di bagian kiri
        } else {
            low = mid + 1;  // Cari di bagian kanan
        }
    }
    return -1; // Tidak ditemukan
}

int main() {
    // Data NIM sudah terurut
    vector<int> daftarNIM = {10101, 10105, 10120, 10134, 10150, 10188, 10200};
    int cari = 10134;

    int hasil = binarySearch(daftarNIM, cari);

    if (hasil != -1) {
        cout << "Mahasiswa dengan NIM " << cari << " ditemukan pada indeks: " << hasil << endl;
    } else {
        cout << "NIM tidak terdaftar!" << endl;
    }

    return 0;
}`
    },
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)"
  },
  {
    id: "cs-02",
    title: "Pengurutan Data Transaksi Menggunakan Quick Sort",
    category: "Sorting",
    difficulty: "Menengah",
    author: "Tim Alpro",
    date: "2026-10-02",
    summary: "Mengurutkan ribuan data nominal transaksi kasir dari yang terkecil ke terbesar secara cepat dengan algoritma partisi Quick Sort.",
    problem: "Aplikasi kasir minimarket mencatat transaksi harian pelanggan. Manajer toko ingin laporan keuangan yang menampilkan transaksi terurut berdasarkan nominal belanja dari terkecil ke terbesar untuk analisis data transaksi harian secara cepat.",
    analysis: [
      "Quick Sort adalah algoritma sorting berbasis Divide and Conquer yang paling populer dalam pemrograman industri.",
      "Pilih salah satu elemen sebagai 'pivot' (bisa elemen pertama, terakhir, atau tengah).",
      "Lakukan partisi: atur ulang array sedemikian rupa sehingga semua elemen yang lebih kecil dari pivot berada di sisi kiri, dan elemen yang lebih besar berada di sisi kanan.",
      "Secara rekursif panggil Quick Sort pada sub-array kiri dan sub-array kanan pivot.",
      "Keunggulan: performa rata-rata O(n log n) dan pengurutan dilakukan in-place (hemat memori)."
    ],
    pseudocode: `ALGORITMA Partition(A, low, high) -> Integer
    pivot <- A[high]
    i <- low - 1
    UNTUK j <- low SAMPAI high - 1 LAKUKAN
        JIKA A[j] <= pivot MAKA
            i <- i + 1
            TUKAR(A[i], A[j])
        AKHIR_JIKA
    AKHIR_UNTUK
    TUKAR(A[i + 1], A[high])
    KEMBALIKAN i + 1
AKHIR_ALGORITMA

ALGORITMA QuickSort(A, low, high)
    JIKA low < high MAKA
        pi <- Partition(A, low, high)
        QuickSort(A, low, pi - 1)
        QuickSort(A, pi + 1, high)
    AKHIR_JIKA
AKHIR_ALGORITMA`,
    codeSnippet: {
      language: "python",
      code: `def quick_sort(arr):
    # Basis rekursi
    if len(arr) <= 1:
        return arr
    
    # Pilih pivot (elemen tengah)
    pivot = arr[len(arr) // 2]
    
    # Partisi array
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # Rekursi dan gabungkan
    return quick_sort(left) + middle + quick_sort(right)

# Studi Kasus Data Transaksi (dalam Ribuan Rupiah)
transaksi = [75000, 15000, 120000, 45000, 9000, 350000, 20000]

print("Sebelum diurutkan:", transaksi)
hasil_urut = quick_sort(transaksi)
print("Setelah diurutkan:", hasil_urut)`
    },
    timeComplexity: "O(n log n) rata-rata, O(n²) terburuk",
    spaceComplexity: "O(log n)"
  },
  {
    id: "cs-03",
    title: "Simulasi Antrean Pasien Klinik dengan Queue (FIFO)",
    category: "Struktur Data",
    difficulty: "Mudah",
    author: "Tim Alpro",
    date: "2026-10-03",
    summary: "Membangun sistem antrean loket klinik dengan prinsip First-In First-Out (Enqueue, Dequeue, Peek) menggunakan Queue.",
    problem: "Klinik kesehatan memerlukan aplikasi komputer untuk memanggil pasien berdasarkan urutan kedatangan. Pasien yang mendaftar lebih awal harus dilayani terlebih dahulu, dan petugas loket dapat memanggil pasien berikutnya atau melihat siapa yang sedang antre di posisi terdepan.",
    analysis: [
      "Struktur data yang paling tepat adalah Queue (Antrean) dengan prinsip FIFO (First-In, First-Out).",
      "Operasi utama yang dibutuhkan:",
      "1. enqueue(item): menambahkan pasien baru ke belakang antrean (rear).",
      "2. dequeue(): melayani/mengeluarkan pasien di depan antrean (front).",
      "3. peek()/front(): melihat identitas pasien terdepan tanpa mengeluarkannya.",
      "4. isEmpty(): memeriksa apakah antrean masih kosong atau ada pasien."
    ],
    pseudocode: `STRUKTUR Queue:
    items : List of String
    
    FUNGSI Enqueue(namaPasien)
        TAMBAHKAN namaPasien ke akhir items
    AKHIR_FUNGSI
    
    FUNGSI Dequeue() -> String
        JIKA IsEmpty() MAKA
            CETAK "Antrean kosong!"
            KEMBALIKAN null
        SELAIN_ITU
            KEMBALIKAN items.removeFirst()
        AKHIR_JIKA
    AKHIR_FUNGSI`,
    codeSnippet: {
      language: "javascript",
      code: `class QueueKlinik {
    constructor() {
        this.items = [];
    }

    // Menambah pasien ke antrean
    enqueue(namaPasien) {
        this.items.push(namaPasien);
        console.log(\`Pasien \${namaPasien} berhasil masuk antrean.\`);
    }

    // Memanggil pasien terdepan
    dequeue() {
        if (this.isEmpty()) {
            return "Antrean kosong, tidak ada pasien!";
        }
        return this.items.shift();
    }

    // Melihat siapa yang sedang di urutan depan
    peek() {
        return this.isEmpty() ? "Tidak ada pasien" : this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    totalAntrean() {
        return this.items.length;
    }
}

// Simulasi Penggunaan
const loket = new QueueKlinik();
loket.enqueue("Budi Santoso");
loket.enqueue("Siti Aminah");
loket.enqueue("Ahmad Dahlan");

console.log("Giliran pertama:", loket.peek());
console.log("Dipanggil:", loket.dequeue());
console.log("Sisa antrean:", loket.totalAntrean());`
    },
    timeComplexity: "O(1) Enqueue & Peek, O(n) Dequeue (Array standar)",
    spaceComplexity: "O(n)"
  },
  {
    id: "cs-04",
    title: "Pemeriksaan Pasangan Tanda Kurung Valid (Balanced Parentheses)",
    category: "Struktur Data",
    difficulty: "Menengah",
    author: "Tim Alpro",
    date: "2026-10-03",
    summary: "Menguji validitas pasangan kurung seperti (), {}, [] pada ekspresi kode atau rumus matematika menggunakan struktur Stack (LIFO).",
    problem: "Dalam compiler atau kalkulator ilmiah, kesalahan tanda kurung (syntax error) seperti '({[)]}' atau '((2+3)*5' sering terjadi. Diperlukan algoritma untuk memvalidasi apakah tanda kurung yang dibuka ditutup oleh tanda kurung yang bersesuaian dalam urutan yang benar.",
    analysis: [
      "Gunakan struktur data Stack dengan prinsip LIFO (Last-In First-Out).",
      "Iterasi setiap karakter dalam string:",
      "- Jika karakter adalah kurung buka '(', '{', '[', masukkan (PUSH) ke dalam Stack.",
      "- Jika karakter adalah kurung tutup ')', '}', ']', periksa Stack:",
      "  * Jika Stack kosong, ekspresi tidak valid (kurung tutup tanpa kurung buka).",
      "  * Ambil elemen teratas Stack (POP), periksa apakah tipe kurung cocok (misal '(' cocok dengan ')'). Jika tidak cocok, tidak valid.",
      "Setelah semua karakter diproses, jika Stack kosong, maka ekspresi VALID. Jika masih ada isi, berarti ada kurung buka yang tidak ditutup."
    ],
    pseudocode: `ALGORITMA IsBalancedParentheses(s: String) -> Boolean
DEKLARASI:
    stk: Stack of Character
DESKRIPSI:
    UNTUK SETIAP char DALAM s LAKUKAN
        JIKA char ADALAH '(', '{', ATAU '[' MAKA
            stk.Push(char)
        SELAIN_ITU JIKA char ADALAH ')', '}', ATAU ']' MAKA
            JIKA stk.IsEmpty() MAKA KEMBALIKAN False
            top <- stk.Pop()
            JIKA TIDAK Cocok(top, char) MAKA
                KEMBALIKAN False
            AKHIR_JIKA
        AKHIR_JIKA
    AKHIR_UNTUK
    
    KEMBALIKAN stk.IsEmpty()
AKHIR_ALGORITMA`,
    codeSnippet: {
      language: "cpp",
      code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValidExpression(const string& s) {
    stack<char> st;

    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else if (c == ')' || c == '}' || c == ']') {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();

            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    return st.empty();
}

int main() {
    string ekspresi1 = "{[()()]}";
    string ekspresi2 = "{[(])}";

    cout << ekspresi1 << " -> " << (isValidExpression(ekspresi1) ? "VALID" : "TIDAK VALID") << endl;
    cout << ekspresi2 << " -> " << (isValidExpression(ekspresi2) ? "VALID" : "TIDAK VALID") << endl;

    return 0;
}`
    },
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)"
  },
  {
    id: "cs-05",
    title: "Optimasi Deret Fibonacci: Rekursi vs Dynamic Programming",
    category: "Rekursi & DP",
    difficulty: "Sulit",
    author: "Tim Alpro",
    date: "2026-10-04",
    summary: "Memecahkan masalah komputasi lambat Fibonacci rekursif O(2^n) menggunakan pendekatan Dynamic Programming Bottom-Up O(n).",
    problem: "Ketika menghitung nilai deret Fibonacci ke-50 menggunakan rumus rekursi standar F(n) = F(n-1) + F(n-2), komputer mengalami freeze/lag luar biasa karena terjadi jutaan pemanggilan fungsi yang berulang (overlapping subproblems). Kita butuh solusi optimal.",
    analysis: [
      "Masalah Fibonacci rekursif naif memiliki pohon panggilan eksponensial O(2^n).",
      "Dynamic Programming mengatasi ini dengan menyimpan hasil sub-masalah yang sudah pernah dihitung.",
      "Dua pendekatan DP:",
      "1. Top-Down dengan Memoization: menyimpan hasil ke tabel hash/array cache saat fungsi rekursi dipanggil.",
      "2. Bottom-Up Tabulation: menghitung dari basis terkecil F(0) = 0, F(1) = 1, lalu menjumlahkan ke atas secara berulang hingga F(n).",
      "Pendekatan Bottom-Up bahkan bisa dioptimasi hingga hanya butuh dua variabel memori sehingga O(1) space."
    ],
    pseudocode: `ALGORITMA FibonacciDP(n: Integer) -> Integer
DEKLARASI:
    prev2, prev1, current, i : Integer
DESKRIPSI:
    JIKA n <= 1 MAKA KEMBALIKAN n
    
    prev2 <- 0
    prev1 <- 1
    
    UNTUK i <- 2 SAMPAI n LAKUKAN
        current <- prev1 + prev2
        prev2 <- prev1
        prev1 <- current
    AKHIR_UNTUK
    
    KEMBALIKAN current
AKHIR_ALGORITMA`,
    codeSnippet: {
      language: "python",
      code: `# Solusi Naif (Sangat Lambat untuk n > 35)
def fib_rekursif(n):
    if n <= 1:
        return n
    return fib_rekursif(n - 1) + fib_rekursif(n - 2)

# Solusi Dynamic Programming (Sangat Cepat O(n))
def fib_dp(n):
    if n <= 1:
        return n
    
    prev2 = 0
    prev1 = 1
    
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
        
    return prev1

# Uji Coba
import time

n = 40
print(f"Menghitung Fibonacci({n}) dengan DP...")
start = time.time()
print("Hasil DP:", fib_dp(n))
print(f"Waktu DP: {time.time() - start:.6f} detik")`
    },
    timeComplexity: "O(n) DP vs O(2^n) Rekursif",
    spaceComplexity: "O(1) Ruang Teroptimasi"
  },
  {
    id: "cs-06",
    title: "Algoritma Greedy: Pecahan Uang Kembalian Minimum",
    category: "Algoritma Greedy",
    difficulty: "Mudah",
    author: "Tim Alpro",
    date: "2026-10-04",
    summary: "Menghitung kombinasi pecahan keping mata uang kasir dengan jumlah keping paling sedikit menggunakan prinsip Greedy.",
    problem: "Sebuah mesin kasir otomatis perlu memberikan kembalian sejumlah nominal tertentu kepada pelanggan. Mesin harus memberikan pecahan uang (misal Rp 100.000, 50.000, 20.000, 10.000, 5.000, 2.000, 1.000) dengan total lembar/koin sesedikit mungkin.",
    analysis: [
      "Prinsip Algoritma Greedy: 'Ambil pilihan terbaik saat ini tanpa memikirkan konsekuensi jangka panjang'.",
      "Pada sistem mata uang standar (canonical coin system seperti Rupiah atau Dolar AS), pendekatan Greedy menghasilkan solusi yang optimal secara global.",
      "Langkah-langkah Greedy Coin Change:",
      "1. Urutkan daftar pecahan uang dari nilai terbesar ke terkecil.",
      "2. Selama sisa kembalian >= nilai pecahan terbesar yang tersedia:",
      "   - Gunakan pecahan tersebut sebanyak mungkin (kembalian // pecahan).",
      "   - Kurangi sisa kembalian dengan total pecahan yang telah diambil.",
      "3. Lanjutkan ke pecahan berikutnya hingga sisa kembalian bernilai 0."
    ],
    pseudocode: `ALGORITMA HitungKembalian(nominal: Integer, pecahan: Array) -> Map
DEKLARASI:
    hasil : Dictionary
    sisa, i : Integer
DESKRIPSI:
    sisa <- nominal
    UNTUK SETIAP coin DALAM pecahan LAKUKAN
        JIKA sisa >= coin MAKA
            lembar <- sisa DIV coin
            hasil[coin] <- lembar
            sisa <- sisa MOD coin
        AKHIR_JIKA
    AKHIR_UNTUK
    KEMBALIKAN hasil
AKHIR_ALGORITMA`,
    codeSnippet: {
      language: "cpp",
      code: `#include <iostream>
#include <vector>
using namespace std;

void hitungPecahanKembalian(int kembalian) {
    // Pecahan uang Rupiah standar
    vector<int> pecahan = {100000, 50000, 20000, 10000, 5000, 2000, 1000};
    
    cout << "Rincian Kembalian untuk Rp " << kembalian << ":" << endl;
    
    for (int uang : pecahan) {
        if (kembalian >= uang) {
            int jumlah = kembalian / uang;
            kembalian %= uang;
            cout << "- Rp " << uang << " x " << jumlah << " lembar" << endl;
        }
    }
    
    if (kembalian > 0) {
        cout << "Sisa yang tidak ada pecahannya: Rp " << kembalian << endl;
    }
}

int main() {
    int totalBelanja = 63000;
    int uangBayar = 100000;
    int kembalian = uangBayar - totalBelanja;

    cout << "Total Belanja: Rp " << totalBelanja << endl;
    cout << "Uang Pembeli: Rp " << uangBayar << endl;
    hitungPecahanKembalian(kembalian);

    return 0;
}`
    },
    timeComplexity: "O(k) dengan k = jumlah varian pecahan uang",
    spaceComplexity: "O(1)"
  }
];
