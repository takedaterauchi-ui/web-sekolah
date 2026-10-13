export type DayOfWeek = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';

export type AcademicClass = 
  | 'X-1' | 'X-2' | 'X-3'
  | 'XI MIPA 1' | 'XI MIPA 2' | 'XI IPS 1'
  | 'XII MIPA 1' | 'XII MIPA 2' | 'XII IPS 1';

export interface ScheduleItem {
  id: string;
  day: DayOfWeek;
  classId: AcademicClass;
  period: number; // 1 to 8
  timeStart: string;
  timeEnd: string;
  subject: string;
  code: string;
  teacherId: string;
  teacherName: string;
  room: string;
  category: 'Wajib' | 'Peminatan' | 'Muatan Lokal' | 'Pengembangan Diri';
  colorTag?: string;
}

export type TeacherDepartment = 
  | 'Semua'
  | 'MIPA'
  | 'IPS & Humaniora'
  | 'Bahasa & Sastra'
  | 'TIK & Multimedia'
  | 'Bimbingan Konseling'
  | 'Pendidikan Agama & PJOK';

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  title: string;
  department: TeacherDepartment;
  subjects: string[];
  education: string;
  classesTaught: string[];
  email: string;
  phone: string;
  consultationHours: string;
  room: string;
  photoUrl: string;
  bio: string;
  achievements?: string[];
}

export type PpdbTrack = 
  | 'Zonasi'
  | 'Prestasi Akademik'
  | 'Prestasi Non-Akademik'
  | 'Afirmasi KIP'
  | 'Perpindahan Orang Tua';

export type RegistrationStatus = 
  | 'Menunggu Verifikasi'
  | 'Berkas Lengkap'
  | 'Lolos Seleksi Administrasi'
  | 'Diterima'
  | 'Tidak Memenuhi Syarat';

export interface StudentRegistration {
  id: string;
  registrationNumber: string; // e.g. PPDB-2026-0812
  submissionDate: string;
  track: PpdbTrack;
  status: RegistrationStatus;
  notes?: string;
  
  // Data Siswa
  fullName: string;
  nisn: string;
  nik: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthPlace: string;
  birthDate: string;
  religion: string;
  originSchool: string;
  phone: string;
  email: string;
  
  // Data Orang Tua
  parentName: string;
  parentPhone: string;
  parentJob: string;
  parentIncome: string;
  homeAddress: string;
  distanceKm: number; // For zonasi calculation
  
  // Nilai & Prestasi
  averageScore: number;
  achievementDescription?: string;
  
  // Dokumen Status
  documentsUploaded: {
    kk: boolean;
    akta: boolean;
    rapor: boolean;
    pasFoto: boolean;
    sertifikat?: boolean;
  };
}

export interface SchoolNews {
  id: string;
  title: string;
  category: 'Pengumuman' | 'Akademik' | 'Prestasi' | 'Kegiatan';
  date: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  readTime: string;
  author: string;
}
