import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: School Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                {SCHOOL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Lembaga pendidikan menengah atas yang berkomitmen pada keunggulan nalar akademik, penguasaan sains teknologi, serta integritas moral generasi penerus bangsa.
            </p>
            <div className="pt-2 flex flex-wrap gap-y-1 gap-x-3 text-xs text-slate-400">
              <span>NPSN: {SCHOOL_INFO.npsn}</span>
              <span aria-hidden="true">·</span>
              <span>{SCHOOL_INFO.accreditation}</span>
              <span aria-hidden="true">·</span>
              <span>{SCHOOL_INFO.curriculum}</span>
            </div>
          </div>

          {/* Col 2: Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jadwal')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Jadwal Pelajaran Interaktif
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guru')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Direktori Guru & Tenaga Kependidikan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ppdb')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  PPDB Online & Cek Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profil')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Profil & Fasilitas Sekolah
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Operational */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Sekretariat & Hubungi Kami
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Telepon: {SCHOOL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Email PPDB: {SCHOOL_INFO.ppdbEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{SCHOOL_INFO.operationalHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 {SCHOOL_INFO.name}. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-3">
            <span>Portal Resmi Sekolah & Sistem PPDB Daring</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
