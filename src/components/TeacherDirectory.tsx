import React, { useState, useMemo } from 'react';
import { 
  Users, Search, Mail, Phone, Clock, GraduationCap, 
  MapPin, Award, BookOpen, MessageSquare, Check, X, Send
} from 'lucide-react';
import { Teacher, TeacherDepartment } from '../types';
import { INITIAL_TEACHERS } from '../data/mockData';

interface TeacherDirectoryProps {
  initialSearch?: string;
}

export const TeacherDirectory: React.FC<TeacherDirectoryProps> = ({ initialSearch = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState<TeacherDepartment>('Semua');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  // Consultation form states
  const [consultName, setConsultName] = useState('');
  const [consultClass, setConsultClass] = useState('');
  const [consultEmail, setConsultEmail] = useState('');
  const [consultMsg, setConsultMsg] = useState('');
  const [consultSuccess, setConsultSuccess] = useState(false);

  const departments: TeacherDepartment[] = [
    'Semua',
    'MIPA',
    'IPS & Humaniora',
    'Bahasa & Sastra',
    'TIK & Multimedia',
    'Bimbingan Konseling',
    'Pendidikan Agama & PJOK'
  ];

  const filteredTeachers = useMemo(() => {
    return INITIAL_TEACHERS.filter((teacher) => {
      const matchDept = selectedDept === 'Semua' || teacher.department === selectedDept;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        teacher.name.toLowerCase().includes(q) ||
        teacher.nip.includes(q) ||
        teacher.subjects.some((s) => s.toLowerCase().includes(q)) ||
        teacher.title.toLowerCase().includes(q);

      return matchDept && matchSearch;
    });
  }, [selectedDept, searchQuery]);

  const handleSendConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultMsg) return;
    setConsultSuccess(true);
    setTimeout(() => {
      setConsultSuccess(false);
      setConsultName('');
      setConsultClass('');
      setConsultEmail('');
      setConsultMsg('');
      setSelectedTeacher(null);
    }, 2500);
  };

  return (
    <section id="guru" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              Profil Tenaga Pendidik
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mt-1">
              Direktori Guru & Tenaga Kependidikan
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Didukung oleh 48 tenaga pendidik profesional, berdedikasi tinggi, dan tersertifikasi nasional.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-slate-900">{filteredTeachers.length}</span> dari {INITIAL_TEACHERS.length} guru
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-6 space-y-4">
          
          {/* Department Filter Tabs (Functional buttons as permitted in design guidelines) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama guru, NIP, atau mata pelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 shadow-2xs placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Teacher Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Profile Strip */}
                <div className="p-5 flex items-start gap-4">
                  {/* Photo with Fallback Container */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Resilient fallback container without broken icon
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-emerald-800 text-white font-bold text-sm -z-10">
                      {teacher.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div className="min-w-0 space-y-1">
                    <span className="text-[11px] font-semibold tracking-wide text-emerald-800 uppercase block">
                      {teacher.department}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug truncate">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {teacher.title}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400">
                      NIP. {teacher.nip}
                    </p>
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="px-5 pb-4 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400">Mata Pelajaran: </span>
                      <span className="font-medium text-slate-800">
                        {teacher.subjects.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400">Pendidikan: </span>
                      <span className="font-medium text-slate-800">
                        {teacher.education}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <div>
                      <span className="text-slate-400">Konsultasi: </span>
                      <span className="font-medium text-slate-800">
                        {teacher.consultationHours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {teacher.room}
                </span>
                <button
                  onClick={() => setSelectedTeacher(teacher)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                >
                  Detail & Konsultasi →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 p-8">
            <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-800">
              Tidak ada data guru yang cocok
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Coba kata kunci pencarian lain atau pilih kategori bidang studi yang berbeda.
            </p>
          </div>
        )}

      </div>

      {/* Teacher Detail & Consultation Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={selectedTeacher.photoUrl}
                    alt={selectedTeacher.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-emerald-800">
                    {selectedTeacher.department}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedTeacher.title} · NIP. {selectedTeacher.nip}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeacher(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              
              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Biografi Singkat
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedTeacher.bio}
                </p>
              </div>

              {/* Achievements if any */}
              {selectedTeacher.achievements && selectedTeacher.achievements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Prestasi & Penghargaan
                  </h4>
                  <ul className="space-y-1">
                    {selectedTeacher.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-700">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Teaching Classes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Kelas Binaan
                  </h4>
                  <p className="font-medium text-slate-800">
                    {selectedTeacher.classesTaught.join(', ')}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Lokasi Ruangan
                  </h4>
                  <p className="font-medium text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {selectedTeacher.room}
                  </p>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="truncate">{selectedTeacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Jadwal Konsultasi: {selectedTeacher.consultationHours}</span>
                </div>
              </div>

              {/* Interactive Consultation Form */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Kirim Pesan / Permohonan Konsultasi</span>
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Wali murid atau siswa dapat mengajukan permohonan konsultasi akademik maupun bimbingan belajar langsung ke guru bersangkutan.
                </p>

                {consultSuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-xs sm:text-sm">Pesan Berhasil Terkirim!</p>
                      <p className="text-xs text-emerald-700">
                        Guru akan membalas ke email/kontak Anda sesuai jam kerja sekolah.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendConsultation} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Nama Siswa / Wali Murid
                        </label>
                        <input
                          type="text"
                          required
                          value={consultName}
                          onChange={(e) => setConsultName(e.target.value)}
                          placeholder="e.g. Budi Santoso (Wali Murid)"
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Kelas / Kontak Email
                        </label>
                        <input
                          type="text"
                          required
                          value={consultEmail}
                          onChange={(e) => setConsultEmail(e.target.value)}
                          placeholder="e.g. Kelas X-1 / budi@gmail.com"
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Topik / Pesan Konsultasi
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={consultMsg}
                        onChange={(e) => setConsultMsg(e.target.value)}
                        placeholder="Tuliskan topik yang ingin dikonsultasikan (misal: perkembangan belajar, bimbingan olimpiade, dsb)..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 resize-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedTeacher(null)}
                        className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Permohonan</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
