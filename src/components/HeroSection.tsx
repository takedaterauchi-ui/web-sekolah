import React from 'react';
import { Calendar, Users, Award, BookOpen, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  onOpenPpdb: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenPpdb }) => {
  return (
    <section className="relative bg-slate-50 border-b border-slate-200 overflow-hidden">
      {/* Operational Utility Ribbon */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">NPSN: {SCHOOL_INFO.npsn}</span>
            <span aria-hidden="true">·</span>
            <span>{SCHOOL_INFO.accreditation}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{SCHOOL_INFO.curriculum}</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <span>PPDB Tahun Ajaran 2026/2027 Resmi Dibuka</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Two-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: School Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
                Pendidikan Unggul Berbasis Karakter & Teknologi
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight text-balance">
                Mencetak Generasi Cendekia, Berakhlak Mulia & Berwawasan Global
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Selamat datang di portal resmi {SCHOOL_INFO.name}. Kami memfasilitasi ekosistem belajar adaptif dengan fasilitas mutakhir, tenaga pendidik berkompeten, dan layanan digital terpadu untuk siswa serta wali murid.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPpdb}
                className="px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Daftar Siswa Baru Daring</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('jadwal')}
                className="px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Lihat Jadwal Pelajaran</span>
              </button>
              <button
                onClick={() => onNavigate('guru')}
                className="px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Direktori Tenaga Pendidik</span>
              </button>
            </div>

            {/* Quality Badges */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sistem Informasi Terintegrasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kurikulum Merdeka Mandiri</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pembinaan Olimpiade & Riset</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Campus Hero Image */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-full min-h-[320px] bg-slate-100">
              <img
                src={SCHOOL_INFO.campusImage}
                alt="Kampus Utama SMA Nusantara Bangsa"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Kampus Hijau & Nyaman</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    Gedung Utama & Laboratorium Sains Modern
                  </h3>
                  <p className="text-xs text-slate-200">
                    Jl. Graha Cendekia No. 45, Kebayoran Baru, Jakarta Selatan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof Row placed in full-width strip below hero split */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-700">
              <Award className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Kelulusan PTN</span>
            </div>
            <p className="text-3xl font-bold tracking-tight font-sans tabular-nums text-slate-900">96.4%</p>
            <p className="text-xs text-slate-600">Diterima di UI, ITB, UGM, Unair, dan kampus unggulan.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-700">
              <Users className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pendidik Profesional</span>
            </div>
            <p className="text-3xl font-bold tracking-tight font-sans tabular-nums text-slate-900">48 Guru</p>
            <p className="text-xs text-slate-600">100% tersertifikasi dan berijazah Magister/Doktor.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-700">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fasilitas Cerdas</span>
            </div>
            <p className="text-3xl font-bold tracking-tight font-sans tabular-nums text-slate-900">36 Kelas</p>
            <p className="text-xs text-slate-600">Dilengkapi panel interaktif dan koneksi gigabit.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-700">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Ekstrakurikuler</span>
            </div>
            <p className="text-3xl font-bold tracking-tight font-sans tabular-nums text-slate-900">18 Klub</p>
            <p className="text-xs text-slate-600">Dari robotika, olimpiade sains, hingga seni budaya.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
