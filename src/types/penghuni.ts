enum JenisKelamin {
  LakiLaki = "Laki-laki",
  Perempuan = "Perempuan",
}

enum Status {
  Diterima = "Diterima",
  MenungguAlokasiKamar = "Menunggu Alokasi Kamar",
  MenungguPembayaran = "Menunggu Pembayaran",
  MenungguPembuatanKontrak = "Menunggu Pembuatan Kontrak",
  BelumDireview = "Belum Direview",
}

// Interface
export interface Penghuni {
  data: {
    id: number;
    email: string;
    nama: string;
    nim: string;
    jenis_kelamin: JenisKelamin;
    nomor_telepon: string;
  
    // nama dan hubungan kontak darurat
    kontak_darurat: string;
    nama_kontak_darurat: string;
    hubungan_kontak_darurat: string;
  
    alasan: string;
    status: Status;
  
    createdAt: Date;
    updatedAt: Date;
  }
}

export interface PenghuniList {
    nomor_kamar: number;
    id: number;
    nama: string;
    jenis_kelamin: string;
    nomor_telepon: string;
    kontak_darurat: string;
}

export interface PenghuniPageProps {
    data: PenghuniList[];
    page: number;
    totalPage: number;
}
