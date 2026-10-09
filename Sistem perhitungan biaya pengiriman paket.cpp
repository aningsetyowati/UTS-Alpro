#include <iostream>
#include <string>
#include <iomanip>
#include <cmath>
#include <algorithm>
#include <cctype>

using namespace std;

int main() {
    // variabel input
    string nomor_paket;
    double Berat_aktual,panjang,lebar,tinggi,nilai_barang;
    char zona_tujuan,Pilihan_asuransi;
    int jenis_pelayanan;

// Input Data Pengguna

cout << "masukkan nilai Barang (Rp): ";
cin >> nilai_barang;
cout << "Masukkan Nomor Paket: ";
cin >> nomor_paket;
cout << "Masukkan Berat Aktual (kg): ";
cin >> Berat_aktual;
cout << "Masukkan_dimensi P x L x T (cm): ";
cin >> panjang >> lebar >> tinggi; 
cout << "Masukkan Zona_Tujuan (A/B/C): ";
cin >> zona_tujuan;
cout << "jenis Pelayanan (1. Reguler, 2. Prioritas ): ";
cin >> jenis_pelayanan;
cout << "Apakah ingin menggunakan asuransi? (Y/N): ";
cin >> Pilihan_asuransi;

// perhitungan Berat Volumetrik dan Berat Tagihan
double berat_volumetrik = (panjang * lebar * tinggi) / 5000;

// Berat tagihan adalah nilai terbesar yang dbulatkan ke atas

double berat_maksimal = max(Berat_aktual, berat_volumetrik);
double berat_tagihan = ceil(berat_maksimal);

//  Menentukan Tarif per Kg Berdasarkan Zona Tujuan
double tarifperKg = 0;
zona_tujuan = toupper(zona_tujuan);
if (zona_tujuan == 'A') {
    tarifperKg = 8000;
} else if (zona_tujuan == 'B') {
    tarifperKg = 12000;
} else if (zona_tujuan == 'C') {
    tarifperKg = 18000;
} else {
    cout << "Zona tujuan tidak valid!" << endl;
    return 1; // keluar dari program jika zona tidak valid
}


double biaya_dasar = berat_tagihan * tarifperKg;

// Menghitung biaya tambahan berdasarkan jenis pelayanan
double biaya_tambahan = 0;
if (jenis_pelayanan == 2) {
    biaya_tambahan = 0.40 * biaya_dasar;
}

// Menghitung biaya asuransi jika dipilih
double biaya_asuransi = 0;
if (toupper(Pilihan_asuransi) == 'Y') {
    biaya_asuransi = 0.01 * nilai_barang;
    if (biaya_asuransi < 5000) {
        biaya_asuransi = 5000; // minimum Rp 5.000 
    }
}
// Menghitung total biaya

double total_biaya = biaya_dasar + biaya_tambahan + biaya_asuransi;

return 0;
}