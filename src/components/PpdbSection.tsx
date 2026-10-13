import React, { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle2, Search, ArrowRight, ArrowLeft, 
  Upload, Printer, Download, UserCheck, ShieldAlert, 
  HelpCircle, Sparkles, AlertCircle, RefreshCw, Eye, Check, X
} from 'lucide-react';
import { StudentRegistration, PpdbTrack, RegistrationStatus } from '../types';
import { INITIAL_REGISTRATIONS, PPDB_TIMELINE, SCHOOL_INFO } from '../data/mockData';

interface PpdbSectionProps {
  initialTab?: 'daftar' | 'status' | 'alur' | 'admin';
}

export const PpdbSection: React.FC<PpdbSectionProps> = ({ initialTab = 'daftar' }) => {
  const [activeTab, setActiveTab] = useState<'daftar' | 'status' | 'alur' | 'admin'>(initialTab);

  // Sync tab when prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Registrations state with localStorage persistence
  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('sma_ppdb_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sma_ppdb_registrations', JSON.stringify(registrations));
    } catch (e) {
      console.error(e);
    }
  }, [registrations]);

  // Form Step State (1: Jalur, 2: Data Siswa, 3: Data Ortu, 4: Nilai & Berkas, 5: Selesai)
  const [formStep, setFormStep] = useState(1);
  const [newReg, setNewReg] = useState<Partial<StudentRegistration>>({
    track: 'Prestasi Akademik',
    gender: 'Laki-laki',
    religion: 'Islam',
    parentIncome: 'Rp 5.000.000 - Rp 10.000.000',
    distanceKm: 2.5,
    averageScore: 90.0,
    documentsUploaded: {
      kk: true,
      akta: true,
      rapor: true,
      pasFoto: true,
      sertifikat: false,
    },
  });

  // Successful submission result modal
  const [submittedRegistration, setSubmittedRegistration] = useState<StudentRegistration | null>(null);

  // Status search state
  const [searchRegNo, setSearchRegNo] = useState('');
  const [foundRegistration, setFoundRegistration] = useState<StudentRegistration | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Printable receipt modal
  const [receiptModalData, setReceiptModalData] = useState<StudentRegistration | null>(null);

  // Admin filter
  const [adminFilterTrack, setAdminFilterTrack] = useState<string>('Semua');

  // Submit new registration handler
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const generatedNumber = `PPDB-2026-${randomCode}`;
    
    const registrationRecord: StudentRegistration = {
      id: `reg-${Date.now()}`,
      registrationNumber: generatedNumber,
      submissionDate: '12 Oktober 2026',
      track: (newReg.track as PpdbTrack) || 'Prestasi Akademik',
      status: 'Menunggu Verifikasi',
      notes: 'Formulir berhasil diserahkan secara online. Menunggu verifikasi berkas oleh panitia PPDB.',
      fullName: newReg.fullName || 'Calon Siswa',
      nisn: newReg.nisn || '0098765432',
      nik: newReg.nik || '3174090000000001',
      gender: newReg.gender || 'Laki-laki',
      birthPlace: newReg.birthPlace || 'Jakarta',
      birthDate: newReg.birthDate || '2011-05-15',
      religion: newReg.religion || 'Islam',
      originSchool: newReg.originSchool || 'SMP Negeri 1 Jakarta',
      phone: newReg.phone || '0812-0000-0000',
      email: newReg.email || 'calon.siswa@gmail.com',
      parentName: newReg.parentName || 'Orang Tua / Wali',
      parentPhone: newReg.parentPhone || '0813-0000-0000',
      parentJob: newReg.parentJob || 'Karyawan Swasta',
      parentIncome: newReg.parentIncome || 'Rp 5.000.000 - Rp 10.000.000',
      homeAddress: newReg.homeAddress || 'Jl. Pendidikan No. 1, Jakarta',
      distanceKm: Number(newReg.distanceKm) || 2.5,
      averageScore: Number(newReg.averageScore) || 88.5,
      achievementDescription: newReg.achievementDescription || '',
      documentsUploaded: {
        kk: true,
        akta: true,
        rapor: true,
        pasFoto: true,
        sertifikat: Boolean(newReg.achievementDescription),
      },
    };

    setRegistrations([registrationRecord, ...registrations]);
    setSubmittedRegistration(registrationRecord);
    setFormStep(1);
    // Reset form
    setNewReg({
      track: 'Prestasi Akademik',
      gender: 'Laki-laki',
      religion: 'Islam',
      parentIncome: 'Rp 5.000.000 - Rp 10.000.000',
      distanceKm: 2.5,
      averageScore: 90.0,
      documentsUploaded: { kk: true, akta: true, rapor: true, pasFoto: true },
    });
  };

  // Search status handler
  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    const query = searchRegNo.trim().toLowerCase();
    const result = registrations.find(
      (r) =>
        r.registrationNumber.toLowerCase() === query ||
        r.nisn.toLowerCase() === query
    );
    setFoundRegistration(result || null);
  };

  // Admin status update handler
  const handleUpdateStatus = (id: string, newStatus: RegistrationStatus) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              notes:
                newStatus === 'Diterima'
                  ? 'Selamat! Anda dinyatakan LULUS dan diterima di SMA Nusantara Bangsa. Silakan unduh bukti untuk daftar ulang.'
                  : newStatus === 'Lolos Seleksi Administrasi'
                  ? 'Berkas administrasi dinyatakan LENGKAP dan VALID. Jadwal wawancara akan diumumkan.'
                  : newStatus === 'Berkas Lengkap'
                  ? 'Seluruh kelengkapan dokumen telah diverifikasi oleh tim panitia.'
                  : r.notes,
            }
          : r
      )
    );
  };

  return (
    <section id="ppdb" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-6 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
                Penerimaan Peserta Didik Baru (PPDB) 2026/2027
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mt-1">
                Pendaftaran Siswa Baru Daring
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Portal resmi pendaftaran terpadu, pengecekan kelulusan, dan verifikasi berkas PPDB SMA Nusantara Bangsa.
              </p>
            </div>

            {/* Navigation tabs inside PPDB hub */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('daftar')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'daftar'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Formulir Pendaftaran
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'status'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cek Status Kelulusan
              </button>
              <button
                onClick={() => setActiveTab('alur')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'alur'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Alur & Kuota
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Panel Panitia ({registrations.length})
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Formulir Pendaftaran Online (Wizard Form) */}
        {activeTab === 'daftar' && (
          <div className="mt-8 max-w-3xl mx-auto">
            
            {/* Steps Progress Indicator */}
            <div className="mb-8">
              <div className="grid grid-cols-4 text-center text-xs font-medium">
                <div className={`${formStep >= 1 ? 'text-emerald-800 font-bold' : 'text-slate-400'}`}>
                  1. Pilih Jalur
                </div>
                <div className={`${formStep >= 2 ? 'text-emerald-800 font-bold' : 'text-slate-400'}`}>
                  2. Data Siswa
                </div>
                <div className={`${formStep >= 3 ? 'text-emerald-800 font-bold' : 'text-slate-400'}`}>
                  3. Orang Tua & Zonasi
                </div>
                <div className={`${formStep >= 4 ? 'text-emerald-800 font-bold' : 'text-slate-400'}`}>
                  4. Rapor & Berkas
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-700 transition-all duration-300"
                  style={{ width: `${(formStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <form onSubmit={formStep === 4 ? handleSubmitRegistration : (e) => { e.preventDefault(); setFormStep(formStep + 1); }}>
                
                {/* STEP 1: Pilih Jalur Pendaftaran */}
                {formStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        Langkah 1: Tentukan Jalur Seleksi PPDB
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Pilih salah satu jalur pendaftaran yang sesuai dengan kriteria dan berkas yang Anda miliki.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        {
                          id: 'Prestasi Akademik',
                          title: 'Jalur Prestasi Akademik',
                          quota: 'Kuota 25%',
                          desc: 'Berdasarkan nilai rata-rata rapor SMP semester 1-5 dan sertifikat olimpiade sains/matematika.',
                        },
                        {
                          id: 'Zonasi',
                          title: 'Jalur Zonasi Domisili',
                          quota: 'Kuota 50%',
                          desc: 'Berdasarkan jarak radius domisili tempat tinggal resmi KK calon siswa terhadap SMA Nusantara Bangsa.',
                        },
                        {
                          id: 'Prestasi Non-Akademik',
                          title: 'Prestasi Olahraga & Seni',
                          quota: 'Kuota 10%',
                          desc: 'Bagi siswa berprestasi di bidang seni, olahraga, pramuka, dan kejuaraan tingkat kota/provinsi/nasional.',
                        },
                        {
                          id: 'Afirmasi KIP',
                          title: 'Jalur Afirmasi KIP / KJP',
                          quota: 'Kuota 15%',
                          desc: 'Bagi calon peserta didik dari keluarga pemegang Kartu Indonesia Pintar atau program bantuan sosial pemerintah.',
                        },
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setNewReg({ ...newReg, track: item.id as PpdbTrack })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            newReg.track === item.id
                              ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{item.title}</span>
                            <span className="text-[11px] font-semibold text-emerald-700">{item.quota}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Lanjut ke Data Calon Siswa</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Data Calon Siswa */}
                {formStep === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        Langkah 2: Identitas Calon Peserta Didik
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Pastikan Nomor Induk Siswa Nasional (NISN) dan identitas sesuai dengan Ijazah/Rapor SMP.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          NISN (10 Digit) *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={10}
                          placeholder="Contoh: 0098765432"
                          value={newReg.nisn || ''}
                          onChange={(e) => setNewReg({ ...newReg, nisn: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          NIK Calon Siswa (16 Digit) *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={16}
                          placeholder="Nomor NIK sesuai Kartu Keluarga"
                          value={newReg.nik || ''}
                          onChange={(e) => setNewReg({ ...newReg, nik: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nama Lengkap Siswa *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Sesuai akta kelahiran"
                          value={newReg.fullName || ''}
                          onChange={(e) => setNewReg({ ...newReg, fullName: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Jenis Kelamin *
                        </label>
                        <select
                          value={newReg.gender || 'Laki-laki'}
                          onChange={(e) => setNewReg({ ...newReg, gender: e.target.value as any })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Asal Sekolah SMP/MTs *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: SMPN 115 Jakarta"
                          value={newReg.originSchool || ''}
                          onChange={(e) => setNewReg({ ...newReg, originSchool: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Tempat Lahir *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Kota lahir"
                          value={newReg.birthPlace || ''}
                          onChange={(e) => setNewReg({ ...newReg, birthPlace: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Tanggal Lahir *
                        </label>
                        <input
                          type="date"
                          required
                          value={newReg.birthDate || ''}
                          onChange={(e) => setNewReg({ ...newReg, birthDate: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nomor HP / WhatsApp Aktif *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0812-xxxx-xxxx"
                          value={newReg.phone || ''}
                          onChange={(e) => setNewReg({ ...newReg, phone: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Alamat Email Aktif *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="nama@email.com"
                          value={newReg.email || ''}
                          onChange={(e) => setNewReg({ ...newReg, email: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newReg.fullName || !newReg.nisn) {
                            alert('Silakan lengkapi NISN dan Nama Lengkap calon siswa');
                            return;
                          }
                          setFormStep(3);
                        }}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Lanjut ke Data Orang Tua</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Data Orang Tua & Zonasi */}
                {formStep === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        Langkah 3: Data Orang Tua & Lokasi Domisili
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Informasi domisili digunakan untuk perhitungan jalur zonasi dan komunikasi resmi pihak sekolah.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nama Lengkap Ayah / Ibu / Wali *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nama lengkap orang tua"
                          value={newReg.parentName || ''}
                          onChange={(e) => setNewReg({ ...newReg, parentName: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nomor HP Orang Tua *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0813-xxxx-xxxx"
                          value={newReg.parentPhone || ''}
                          onChange={(e) => setNewReg({ ...newReg, parentPhone: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Pekerjaan Orang Tua *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Pegawai Negeri / Swasta / Wiraswasta"
                          value={newReg.parentJob || ''}
                          onChange={(e) => setNewReg({ ...newReg, parentJob: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Rentang Penghasilan Bulanan
                        </label>
                        <select
                          value={newReg.parentIncome || 'Rp 5.000.000 - Rp 10.000.000'}
                          onChange={(e) => setNewReg({ ...newReg, parentIncome: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        >
                          <option value="< Rp 3.000.000">&lt; Rp 3.000.000</option>
                          <option value="Rp 3.000.000 - Rp 5.000.000">Rp 3.000.000 - Rp 5.000.000</option>
                          <option value="Rp 5.000.000 - Rp 10.000.000">Rp 5.000.000 - Rp 10.000.000</option>
                          <option value="Rp 10.000.000 - Rp 20.000.000">Rp 10.000.000 - Rp 20.000.000</option>
                          <option value="> Rp 20.000.000">&gt; Rp 20.000.000</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Perkiraan Jarak ke Sekolah (km)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="e.g. 1.8"
                          value={newReg.distanceKm || ''}
                          onChange={(e) => setNewReg({ ...newReg, distanceKm: parseFloat(e.target.value) || 0 })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Alamat Domisili Sesuai Kartu Keluarga *
                        </label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota..."
                          value={newReg.homeAddress || ''}
                          onChange={(e) => setNewReg({ ...newReg, homeAddress: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newReg.parentName || !newReg.homeAddress) {
                            alert('Silakan isi Nama Orang Tua dan Alamat Domisili');
                            return;
                          }
                          setFormStep(4);
                        }}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Lanjut ke Nilai & Berkas</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Nilai Rapor & Unggah Dokumen Berkas */}
                {formStep === 4 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        Langkah 4: Nilai Akademik & Berkas Pendukung
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Masukkan rata-rata nilai rapor semester 1 s/d 5 dan konfirmasi kelengkapan berkas digital.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Rata-Rata Nilai Rapor SMP (Sem 1-5) *
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="60"
                            max="100"
                            required
                            placeholder="Contoh: 91.5"
                            value={newReg.averageScore || ''}
                            onChange={(e) => setNewReg({ ...newReg, averageScore: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums font-bold text-emerald-800"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Prestasi / Kejuaraan (Opsional)
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: Juara 1 OSN Matematika Kota / DBL Basket"
                            value={newReg.achievementDescription || ''}
                            onChange={(e) => setNewReg({ ...newReg, achievementDescription: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                          />
                        </div>
                      </div>

                      {/* Document upload checklist simulator */}
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-slate-800 mb-2">
                          Status Berkas Digital (Format PDF / JPG maks. 2MB)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {[
                            { id: 'kk', label: 'Kartu Keluarga Asli (KK)' },
                            { id: 'akta', label: 'Akta Kelahiran Siswa' },
                            { id: 'rapor', label: 'Buku Rapor SMP (Legalisir Sem 1-5)' },
                            { id: 'pasFoto', label: 'Pas Foto Berwarna 3x4 (Background Merah/Biru)' },
                          ].map((doc) => (
                            <div
                              key={doc.id}
                              className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Upload className="w-3.5 h-3.5 text-emerald-700" />
                                <span className="font-medium text-slate-800">{doc.label}</span>
                              </div>
                              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Siap Unggah
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Integrity disclaimer */}
                      <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>Pernyataan Keabsahan Data:</span>
                        </div>
                        <p className="text-amber-800 text-[11px] leading-relaxed">
                          Dengan menekan tombol Kirim, saya menyatakan dengan sungguh-sungguh bahwa seluruh data dan dokumen yang diserahkan adalah benar. Apabila di kemudian hari ditemukan pemalsuan, saya bersedia menerima sanksi pembatalan kelulusan.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setFormStep(3)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali</span>
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Check className="w-4 h-4" />
                        <span>Kirim Pendaftaran Daring Sekarang</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Cek Status Pendaftaran */}
        {activeTab === 'status' && (
          <div className="mt-8 max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="text-center space-y-2 mb-6">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Cek Status & Verifikasi Pendaftaran PPDB
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Ketikkan Nomor Registrasi (contoh: <span className="font-mono font-semibold text-emerald-800">PPDB-2026-0812</span>) atau NISN 10 digit calon siswa.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleCheckStatus} className="flex gap-2">
                <div className="relative grow">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Masukkan Nomor Registrasi / NISN..."
                    value={searchRegNo}
                    onChange={(e) => setSearchRegNo(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  Periksa Status
                </button>
              </form>

              {/* Sample quick tokens to test */}
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <span>Coba nomor sampel:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchRegNo('PPDB-2026-0812');
                  }}
                  className="text-emerald-700 hover:underline font-mono"
                >
                  PPDB-2026-0812
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchRegNo('PPDB-2026-0845');
                  }}
                  className="text-emerald-700 hover:underline font-mono"
                >
                  PPDB-2026-0845
                </button>
              </div>
            </div>

            {/* Search Result Display */}
            {searchPerformed && (
              <div>
                {foundRegistration ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                    
                    {/* Header Result */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                      <div>
                        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                          Data Terverifikasi
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 font-serif">
                          {foundRegistration.fullName}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono">
                          No. Registrasi: {foundRegistration.registrationNumber} · NISN: {foundRegistration.nisn}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          foundRegistration.status === 'Diterima'
                            ? 'bg-emerald-100 text-emerald-900'
                            : foundRegistration.status === 'Lolos Seleksi Administrasi'
                            ? 'bg-blue-100 text-blue-900'
                            : foundRegistration.status === 'Berkas Lengkap'
                            ? 'bg-teal-100 text-teal-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {foundRegistration.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Timeline */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-800">Alur Verifikasi Calon Siswa:</span>
                      <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                          1. Terdaftar
                        </div>
                        <div className={`p-2 rounded-lg border ${
                          ['Berkas Lengkap', 'Lolos Seleksi Administrasi', 'Diterima'].includes(foundRegistration.status)
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}>
                          2. Verifikasi Dokumen
                        </div>
                        <div className={`p-2 rounded-lg border ${
                          ['Lolos Seleksi Administrasi', 'Diterima'].includes(foundRegistration.status)
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}>
                          3. Perangkingan
                        </div>
                        <div className={`p-2 rounded-lg border ${
                          foundRegistration.status === 'Diterima'
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}>
                          4. Hasil Akhir
                        </div>
                      </div>
                    </div>

                    {/* Detail Grid */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 block">Jalur Pendaftaran:</span>
                        <span className="font-semibold text-slate-900">{foundRegistration.track}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Asal Sekolah:</span>
                        <span className="font-semibold text-slate-900">{foundRegistration.originSchool}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Rata-rata Rapor:</span>
                        <span className="font-semibold text-slate-900 font-mono">{foundRegistration.averageScore}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Jarak Domisili:</span>
                        <span className="font-semibold text-slate-900 font-mono">{foundRegistration.distanceKm} km</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-slate-200">
                        <span className="text-slate-400 block">Catatan Panitia:</span>
                        <span className="text-slate-800 font-medium">{foundRegistration.notes}</span>
                      </div>
                    </div>

                    {/* Action: Cetak Bukti Registrasi */}
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setReceiptModalData(foundRegistration)}
                        className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Cetak Bukti Pendaftaran Resmi</span>
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <h4 className="text-sm font-semibold text-slate-800">
                      Nomor Registrasi Tidak Ditemukan
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Pastikan Anda memasukkan nomor pendaftaran atau NISN yang benar saat melakukan pengisian formulir.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Alur, Kuota & Jadwal */}
        {activeTab === 'alur' && (
          <div className="mt-8 space-y-10">
            {/* Kuota Jalur Cards */}
            <div>
              <div className="text-center max-w-xl mx-auto space-y-1 mb-6">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Alokasi Kuota Jalur PPDB 2026/2027
                </h3>
                <p className="text-xs text-slate-600">
                  Daya tampung total: 360 Siswa Baru (10 Rombongan Belajar)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Jalur Zonasi', percent: '50%', seats: '180 Kursi', desc: 'Berdasarkan radius tempat tinggal resmi.' },
                  { title: 'Jalur Prestasi', percent: '25%', seats: '90 Kursi', desc: 'Nilai rapor semester 1-5 dan kejuaraan resmi.' },
                  { title: 'Jalur Afirmasi KIP', percent: '15%', seats: '54 Kursi', desc: 'Bagi keluarga penerima bantuan sosial.' },
                  { title: 'Jalur Perpindahan', percent: '10%', seats: '36 Kursi', desc: 'Perpindahan tugas orang tua & anak guru.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                    <span className="text-xs font-semibold text-emerald-800">{item.title}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-sans text-slate-900">{item.percent}</span>
                      <span className="text-xs text-slate-500 font-mono">({item.seats})</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Schedule */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-6">
                Jadwal & Tahapan Seleksi Resmi
              </h3>
              <div className="space-y-4">
                {PPDB_TIMELINE.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{item.phase}</h4>
                      </div>
                      <p className="text-xs text-slate-600 pl-7">{item.desc}</p>
                    </div>

                    <div className="sm:text-right pl-7 sm:pl-0 shrink-0">
                      <span className="text-xs font-bold text-emerald-800 block">{item.date}</span>
                      <span className="text-[11px] text-slate-500">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements FAQ Accordion / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Syarat Berkas yang Wajib Disiapkan</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                  <li>Scan Asli Ijazah SMP / Surat Keterangan Lulus (SKL)</li>
                  <li>Scan Buku Rapor SMP semester 1 sampai dengan semester 5</li>
                  <li>Scan Kartu Keluarga (KK) terbit minimal 1 tahun sebelum tanggal pendaftaran</li>
                  <li>Scan Akta Kelahiran resmi dari Disdukcapil</li>
                  <li>Pas foto berwarna ukuran 3x4 (latar merah/biru)</li>
                  <li>Sertifikat / Piagam Kejuaraan (khusus Jalur Prestasi)</li>
                  <li>Kartu KIP/KJP atau bukti DTKS (khusus Jalur Afirmasi)</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  <span>Pertanyaan Umum (FAQ)</span>
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 block">Apakah pendaftaran ini dipungut biaya?</span>
                    <span className="text-slate-600">Seluruh rangkaian pendaftaran PPDB daring di SMA Nusantara Bangsa tidak dipungut biaya apapun (Gratis).</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Bolehkah mendaftar di 2 jalur sekaligus?</span>
                    <span className="text-slate-600">Sistem hanya mengizinkan 1 jalur seleksi aktif per peserta didik. Jika tidak lolos di jalur prestasi, Anda dapat mendaftar kembali pada gelombang zonasi.</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Bagaimana jika salah menginput data?</span>
                    <span className="text-slate-600">Hubungi layanan helpdesk panitia PPDB melalui WhatsApp atau datang langsung ke posko bantuan sekolah.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Panel Panitia PPDB (Admin Demo for full evaluation) */}
        {activeTab === 'admin' && (
          <div className="mt-8 space-y-6">
            <div className="p-4 bg-emerald-950 text-emerald-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-white text-sm">Mode Simulasi Panitia PPDB (Akses Petugas)</span>
                <p className="text-emerald-300 mt-0.5">
                  Anda dapat memverifikasi berkas pendaftar baru, mengubah status kelulusan, dan mencetak dokumen pendaftaran langsung.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    localStorage.removeItem('sma_ppdb_registrations');
                    setRegistrations(INITIAL_REGISTRATIONS);
                  }}
                  className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Data Awal</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
              <span className="font-semibold text-slate-500 whitespace-nowrap">Filter Jalur:</span>
              {['Semua', 'Zonasi', 'Prestasi Akademik', 'Prestasi Non-Akademik', 'Afirmasi KIP'].map((tr) => (
                <button
                  key={tr}
                  onClick={() => setAdminFilterTrack(tr)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer ${
                    adminFilterTrack === tr
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tr}
                </button>
              ))}
            </div>

            {/* Registrations List Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700 uppercase tracking-wider">
                    <th className="p-3">No. Registrasi</th>
                    <th className="p-3">Nama Calon Siswa</th>
                    <th className="p-3">Jalur Seleksi</th>
                    <th className="p-3">Asal Sekolah</th>
                    <th className="p-3">Rata-rata Rapor</th>
                    <th className="p-3">Status Saat Ini</th>
                    <th className="p-3 text-right">Tindakan Panitia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {registrations
                    .filter((r) => adminFilterTrack === 'Semua' || r.track === adminFilterTrack)
                    .map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-emerald-800">
                          {reg.registrationNumber}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{reg.fullName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">NISN: {reg.nisn}</div>
                        </td>
                        <td className="p-3 font-medium text-slate-700">{reg.track}</td>
                        <td className="p-3 text-slate-600">{reg.originSchool}</td>
                        <td className="p-3 font-mono font-semibold text-slate-900">{reg.averageScore}</td>
                        <td className="p-3">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            reg.status === 'Diterima'
                              ? 'bg-emerald-100 text-emerald-900'
                              : reg.status === 'Lolos Seleksi Administrasi'
                              ? 'bg-blue-100 text-blue-900'
                              : reg.status === 'Berkas Lengkap'
                              ? 'bg-teal-100 text-teal-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {reg.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setReceiptModalData(reg)}
                              title="Lihat Bukti Pendaftaran"
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <select
                              value={reg.status}
                              onChange={(e) => handleUpdateStatus(reg.id, e.target.value as RegistrationStatus)}
                              className="text-[11px] bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 font-medium cursor-pointer"
                            >
                              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                              <option value="Berkas Lengkap">Berkas Lengkap</option>
                              <option value="Lolos Seleksi Administrasi">Lolos Seleksi Administrasi</option>
                              <option value="Diterima">Diterima</option>
                              <option value="Tidak Memenuhi Syarat">Tidak Memenuhi Syarat</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* SUCCESS SUBMISSION MODAL */}
      {submittedRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Pendaftaran Berhasil Terkirim
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Selamat, Formulir PPDB Anda Telah Diterima!
              </h3>
              <p className="text-xs text-slate-600">
                Simpan Nomor Registrasi di bawah ini untuk memeriksa status seleksi dan mencetak bukti pendaftaran.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                Nomor Registrasi Resmi
              </span>
              <div className="text-2xl font-mono font-bold text-emerald-800">
                {submittedRegistration.registrationNumber}
              </div>
              <p className="text-xs text-slate-600">
                Nama: <span className="font-bold text-slate-800">{submittedRegistration.fullName}</span> (Jalur {submittedRegistration.track})
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  setReceiptModalData(submittedRegistration);
                  setSubmittedRegistration(null);
                }}
                className="grow py-2.5 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Bukti Pendaftaran</span>
              </button>
              <button
                onClick={() => setSubmittedRegistration(null)}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL RECEIPT MODAL (Cetak Bukti Pendaftaran Resmi) */}
      {receiptModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-emerald-700" />
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Tanda Bukti Pendaftaran PPDB Daring 2026/2027
                </h3>
              </div>
              <button
                onClick={() => setReceiptModalData(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Print Box */}
            <div className="p-6 bg-white border border-slate-300 rounded-lg text-slate-900 space-y-4 font-sans text-xs">
              
              {/* Kop Sekolah */}
              <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
                <h2 className="font-bold tracking-tight uppercase text-xs">
                  PANITIA PENERIMAAN PESERTA DIDIK BARU (PPDB) 2026/2027
                </h2>
                <h1 className="text-lg font-bold font-serif text-slate-900">
                  {SCHOOL_INFO.name.toUpperCase()}
                </h1>
                <p className="text-[11px] text-slate-600">
                  {SCHOOL_INFO.address} · Website: www.smanusantarabangsa.sch.id
                </p>
              </div>

              {/* Title */}
              <div className="text-center py-1">
                <h3 className="font-bold text-sm uppercase underline">
                  TANDA BUKTI PENDAFTARAN DARING
                </h3>
                <p className="font-mono text-emerald-800 font-bold text-base mt-1">
                  NO: {receiptModalData.registrationNumber}
                </p>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-2 gap-y-2 border-y border-slate-200 py-3">
                <div>
                  <span className="text-slate-500 block">Jalur Seleksi:</span>
                  <span className="font-bold text-slate-900">{receiptModalData.track}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tanggal Pendaftaran:</span>
                  <span className="font-semibold text-slate-900">{receiptModalData.submissionDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Nama Lengkap Siswa:</span>
                  <span className="font-bold text-slate-900">{receiptModalData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">NISN / NIK:</span>
                  <span className="font-mono text-slate-900">{receiptModalData.nisn} / {receiptModalData.nik}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Asal Sekolah:</span>
                  <span className="font-semibold text-slate-900">{receiptModalData.originSchool}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Rata-rata Nilai Rapor:</span>
                  <span className="font-mono font-bold text-emerald-800">{receiptModalData.averageScore}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Nama Orang Tua / Wali:</span>
                  <span className="font-semibold text-slate-900">{receiptModalData.parentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status Administrasi:</span>
                  <span className="font-bold text-emerald-800">{receiptModalData.status}</span>
                </div>
              </div>

              {/* Signature / QR Code Stamp simulation */}
              <div className="pt-4 grid grid-cols-2 items-center text-center">
                <div className="text-left space-y-1">
                  <div className="w-20 h-20 bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] text-slate-500 font-mono text-center p-1">
                    [QR VALIDASI RESMI KEMENDIKBUD]
                  </div>
                  <p className="text-[10px] text-slate-500">Dicetak pada: 12 Oktober 2026</p>
                </div>
                <div>
                  <p>Ketua Panitia PPDB 2026/2027</p>
                  <div className="h-14" />
                  <p className="font-bold underline">Dra. Hj. Ratna Juwita, M.Si.</p>
                  <p className="text-[10px] text-slate-600 font-mono">NIP. 198108152005012003</p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setReceiptModalData(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Cetak PDF Dokumen</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
