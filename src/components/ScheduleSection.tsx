import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, MapPin, User, Search, Printer, 
  BookOpen, ChevronRight, Download, CheckCircle, Info, X
} from 'lucide-react';
import { ScheduleItem, DayOfWeek, AcademicClass } from '../types';
import { INITIAL_SCHEDULE, SCHOOL_INFO } from '../data/mockData';

interface ScheduleSectionProps {
  onSelectTeacher?: (teacherName: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onSelectTeacher }) => {
  const [selectedClass, setSelectedClass] = useState<AcademicClass>('X-1');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [viewMode, setViewMode] = useState<'card' | 'matrix'>('card');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const days: DayOfWeek[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const classesList: AcademicClass[] = [
    'X-1', 'X-2', 'XI MIPA 1', 'XI MIPA 2', 'XI IPS 1', 'XII MIPA 1', 'XII IPS 1'
  ];

  // Filtering schedule items
  const filteredSchedule = useMemo(() => {
    return INITIAL_SCHEDULE.filter((item) => {
      const matchClass = item.classId === selectedClass;
      const matchDay = selectedDay === 'Semua' || item.day === selectedDay;
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch = 
        searchQuery.trim() === '' ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.room.toLowerCase().includes(searchQuery.toLowerCase());

      return matchClass && matchDay && matchCategory && matchSearch;
    });
  }, [selectedClass, selectedDay, selectedCategory, searchQuery]);

  // Group by day for structured view
  const scheduleByDay = useMemo(() => {
    const grouped: Record<DayOfWeek, ScheduleItem[]> = {
      Senin: [],
      Selasa: [],
      Rabu: [],
      Kamis: [],
      Jumat: [],
      Sabtu: [],
    };
    filteredSchedule.forEach((item) => {
      if (grouped[item.day]) {
        grouped[item.day].push(item);
      }
    });
    // Sort by period within day
    Object.keys(grouped).forEach((dayKey) => {
      grouped[dayKey as DayOfWeek].sort((a, b) => a.period - b.period);
    });
    return grouped;
  }, [filteredSchedule]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="jadwal" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              Sistem Informasi Akademik
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mt-1">
              Jadwal Pelajaran Interaktif
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Jadwal kegiatan belajar mengajar Semester Ganjil TA 2026/2027 berbasis Kurikulum Merdeka.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak Jadwal Kelas {selectedClass}</span>
            </button>
          </div>
        </div>

        {/* Controls Bar: Class Selection, Day Tabs, Search */}
        <div className="mt-6 space-y-4">
          
          {/* Class Picker */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap shrink-0 mr-1">
              Pilih Kelas:
            </span>
            {classesList.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedClass === cls
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Kelas {cls}
              </button>
            ))}
          </div>

          {/* Filter Row: Day Selection & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
            
            {/* Day Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-lg shrink-0">
              <button
                onClick={() => setSelectedDay('Semua')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDay === 'Semua'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Hari
              </button>
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedDay === day
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Right side: Search & View Mode */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 grow lg:justify-end">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                <option value="Semua">Semua Kategori Mapel</option>
                <option value="Wajib">Mapel Wajib</option>
                <option value="Peminatan">Mapel Peminatan</option>
                <option value="Pengembangan Diri">Pengembangan Diri / P5</option>
                <option value="Muatan Lokal">Muatan Lokal</option>
              </select>

              {/* Search Box */}
              <div className="relative grow sm:grow-0 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari mapel, guru, atau ruang..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    viewMode === 'card' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Detail
                </button>
                <button
                  onClick={() => setViewMode('matrix')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    viewMode === 'matrix' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Matriks
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Schedule Display */}
        <div className="mt-8">
          {filteredSchedule.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-slate-800">
                Tidak ada jadwal ditemukan
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Silakan sesuaikan filter hari, kelas, atau kata kunci pencarian Anda untuk menampilkan mata pelajaran.
              </p>
              <button
                onClick={() => {
                  setSelectedDay('Semua');
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : viewMode === 'card' ? (
            /* Card View Grouped by Day */
            <div className="space-y-8">
              {days.map((day) => {
                const dayItems = scheduleByDay[day];
                if (selectedDay !== 'Semua' && selectedDay !== day) return null;
                if (!dayItems || dayItems.length === 0) return null;

                return (
                  <div key={day} className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                        <h3 className="font-serif text-lg font-bold text-slate-900">
                          {day}
                        </h3>
                        <span className="text-xs text-slate-500">
                          ({dayItems.length} Sesi Pembelajaran)
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        Kelas {selectedClass}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dayItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                        >
                          <div>
                            {/* Card Header: Jam & Kategori */}
                            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                                <span className="tabular-nums font-semibold">
                                  {item.timeStart} - {item.timeEnd}
                                </span>
                              </div>
                              <span className="text-[11px] font-medium text-slate-600">
                                {item.category}
                              </span>
                            </div>

                            {/* Subject Title */}
                            <div className="pt-2">
                              <span className="text-[11px] font-mono text-slate-600 block">
                                {item.code}
                              </span>
                              <h4 className="text-base font-semibold text-slate-900 leading-snug">
                                {item.subject}
                              </h4>
                            </div>
                          </div>

                          {/* Room and Teacher Info */}
                          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{item.room}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate font-medium text-slate-800">
                                  {item.teacherName}
                                </span>
                              </div>
                              {onSelectTeacher && (
                                <button
                                  onClick={() => onSelectTeacher(item.teacherName)}
                                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0 ml-1 cursor-pointer"
                                >
                                  Profil
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Matrix / Timetable Table View */
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                    <th className="p-3 w-16 text-center">Jam Ke</th>
                    <th className="p-3 w-28">Waktu</th>
                    <th className="p-3 w-24">Hari</th>
                    <th className="p-3">Mata Pelajaran</th>
                    <th className="p-3">Guru Pengampu</th>
                    <th className="p-3">Ruang Belajar</th>
                    <th className="p-3">Kategori</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredSchedule.map((item, idx) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-slate-50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="p-3 text-center font-bold text-emerald-800">
                        {item.period}
                      </td>
                      <td className="p-3 font-mono tabular-nums text-slate-700 font-medium">
                        {item.timeStart} - {item.timeEnd}
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        {item.day}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{item.subject}</div>
                        <div className="text-[11px] text-slate-600 font-mono">{item.code}</div>
                      </td>
                      <td className="p-3 text-slate-800 font-medium">
                        {item.teacherName}
                      </td>
                      <td className="p-3 text-slate-700">
                        {item.room}
                      </td>
                      <td className="p-3 text-slate-600">
                        {item.category}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box on Academic Hours */}
        <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Catatan Jam Operasional Sekolah:</span>
              <p className="text-emerald-800 mt-0.5">
                Upacara bendera dilaksanakan setiap Senin pukul 07.00 WIB. Istirahat pagi: 09.15 - 09.30 WIB; Istirahat siang & ibadah: 12.00 - 12.45 WIB.
              </p>
            </div>
          </div>
          <span className="font-mono text-emerald-800 font-medium whitespace-nowrap shrink-0">
            Tahun Ajaran 2026/2027
          </span>
        </div>

      </div>

      {/* Print View Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-emerald-700" />
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Pratinjau Cetak Jadwal Pelajaran - Kelas {selectedClass}
                </h3>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Document Area */}
            <div id="printable-schedule" className="p-6 bg-white border border-slate-300 rounded-lg text-slate-900 space-y-4 font-sans">
              
              {/* Kop Surat Sekolah */}
              <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
                <h2 className="text-lg font-bold tracking-tight uppercase">
                  PEMERINTAH PROVINSI DKI JAKARTA · DINAS PENDIDIKAN
                </h2>
                <h1 className="text-xl font-bold font-serif tracking-tight text-slate-900">
                  {SCHOOL_INFO.name.toUpperCase()}
                </h1>
                <p className="text-xs text-slate-600">
                  {SCHOOL_INFO.address} · Telp: {SCHOOL_INFO.phone} · Web: www.smanusantarabangsa.sch.id
                </p>
              </div>

              {/* Title Document */}
              <div className="text-center py-2">
                <h3 className="text-sm font-bold uppercase underline">
                  JADWAL KEGIATAN BELAJAR MENGAJAR TAHUN AJARAN 2026/2027
                </h3>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  KELAS: {selectedClass} · SEMESTER: GANJIL
                </p>
              </div>

              {/* Timetable Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 font-bold">
                      <th className="border border-slate-300 p-2 text-center w-12">No</th>
                      <th className="border border-slate-300 p-2 w-20">Hari</th>
                      <th className="border border-slate-300 p-2 w-28">Pukul (WIB)</th>
                      <th className="border border-slate-300 p-2">Mata Pelajaran</th>
                      <th className="border border-slate-300 p-2">Guru Pengampu</th>
                      <th className="border border-slate-300 p-2 w-28">Ruang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedule.map((item, index) => (
                      <tr key={item.id} className="border-b border-slate-200">
                        <td className="border border-slate-300 p-2 text-center">{index + 1}</td>
                        <td className="border border-slate-300 p-2 font-medium">{item.day}</td>
                        <td className="border border-slate-300 p-2 font-mono tabular-nums">{item.timeStart} - {item.timeEnd}</td>
                        <td className="border border-slate-300 p-2 font-semibold">{item.subject} ({item.code})</td>
                        <td className="border border-slate-300 p-2">{item.teacherName}</td>
                        <td className="border border-slate-300 p-2">{item.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature block */}
              <div className="pt-6 grid grid-cols-2 text-center text-xs">
                <div>
                  <p>Mengetahui,</p>
                  <p className="font-semibold">Kepala Sekolah</p>
                  <div className="h-16" />
                  <p className="font-bold underline">{SCHOOL_INFO.principal.name}</p>
                  <p className="text-[11px] text-slate-600 font-mono">NIP. {SCHOOL_INFO.principal.nip}</p>
                </div>
                <div>
                  <p>Jakarta, 12 Oktober 2026</p>
                  <p className="font-semibold">Wakil Kepala Sekolah Bidang Kurikulum</p>
                  <div className="h-16" />
                  <p className="font-bold underline">Dra. Hj. Ratna Juwita, M.Si.</p>
                  <p className="text-[11px] text-slate-600 font-mono">NIP. 198108152005012003</p>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Cetak PDF Sekarang</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
