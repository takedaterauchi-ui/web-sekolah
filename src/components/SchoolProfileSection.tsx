import React from 'react';
import { Target, Compass, Award, Shield, CheckCircle2, Building, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

export const SchoolProfileSection: React.FC = () => {
  return (
    <section id="profil" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Sambutan Kepala Sekolah (Editorial Style with Principal Portrait) */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Principal Photo */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-200">
                <img
                  src={SCHOOL_INFO.principal.image}
                  alt={SCHOOL_INFO.principal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 text-center sm:text-left space-y-0.5">
                <h4 className="font-serif font-bold text-base text-slate-900">
                  {SCHOOL_INFO.principal.name}
                </h4>
                <p className="text-xs text-emerald-800 font-semibold">
                  {SCHOOL_INFO.principal.title}
                </p>
                <p className="text-[11px] font-mono text-slate-500">
                  NIP. {SCHOOL_INFO.principal.nip}
                </p>
              </div>
            </div>

            {/* Principal Speech & Quote */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Sambutan Kepala Sekolah
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Membangun Generasi Emas yang Cerdas Berpikir dan Luhur Budi Pekerti
              </h3>

              <blockquote className="text-base sm:text-lg font-serif italic text-slate-700 leading-relaxed py-2 border-y border-slate-200">
                "{SCHOOL_INFO.principal.quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Di era transformasi digital dan revolusi industri yang bergerak cepat, SMA Nusantara Bangsa senantiasa beradaptasi tanpa meninggalkan nilai-nilai luhur kearifan lokal. Kami berkomitmen menyelenggarakan pembelajaran berdiferensiasi yang memerdekakan potensi setiap murid, didukung oleh sarana pembelajaran mutakhir dan budaya riset yang kokoh.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Akreditasi A Unggul BAN-S/M</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Sekolah Penggerak Angkatan I</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Eco-School Nasional 2025</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Visi, Misi & Budaya Sekolah */}
        <div>
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Fondasi Pendidikan
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Visi & Misi SMA Nusantara Bangsa
            </h2>
            <p className="text-sm text-slate-600">
              Arah pandang dan komitmen strategis dalam membentuk pribadi pelajar berprofil Pancasila.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-emerald-950 text-white space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  Visi Sekolah
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-2 leading-snug">
                  "Menjadi Pusat Keunggulan Pendidikan Menengah yang Menghasilkan Insan Berakhlak Mulia, Unggul dalam IPTEK, Berjiwa Pemimpin, dan Berwawasan Global."
                </h3>
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed pt-2 border-t border-emerald-900">
                Ditetapkan melalui Keputusan Dewan Pendidik dan Komite Sekolah sebagai rujukan pengembangan kurikulum 2024-2029.
              </p>
            </div>

            {/* Misi */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-800">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                  Misi Strategis
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                  Komitmen Pelaksanaan Program
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Menanamkan nilai-nilai keimanan, ketakwaan, dan etika budi pekerti dalam keseharian warga sekolah.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Menyelenggarakan proses pembelajaran berbasis nalar kritis, riset sains, dan kecakapan literasi digital masa depan.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Memfasilitasi bakat kepemimpinan, kewirausahaan, seni, dan keolahragaan melalui pembinaan ekstrakurikuler terpadu.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <span>Menumbuhkan kesadaran ekologis dan kepedulian sosial terhadap kelestarian lingkungan hidup dan sesama.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fasilitas Unggulan Sekolah */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Sarana & Prasarana Modern
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Fasilitas Penunjang Akademik & Riset
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Dirancang untuk menghadirkan pengalaman belajar yang mendalam, kolaboratif, dan menyenangkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Facility Card 1: Science Lab with real generated image */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={SCHOOL_INFO.scienceLabImage}
                  alt="Laboratorium Sains Terpadu"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                  Sains & Bioteknologi
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Laboratorium Sains & Bioteknologi Terpadu
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dilengkapi mikroskop digital binokuler, laminar air flow, ruang asam kimia terstandar, dan sensor pengukuran modern untuk praktikum biologi, fisika, dan kimia terapan.
                </p>
              </div>
            </div>

            {/* Facility Card 2: Robotics & Tech Club with real generated image */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={SCHOOL_INFO.roboticsImage}
                  alt="Pusat Inovasi Robotika & TIK"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                  Teknologi & Komputasi
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Pusat Riset Robotika, IoT & Artificial Intelligence
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ruang kerja inovasi siswa dengan perangkat workstation programming, printer 3D manufaktur cepat, microcontroller Arduino/Raspberry Pi, dan arena pengujian robot otonom.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
