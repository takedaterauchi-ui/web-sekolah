import React, { useState } from 'react';
import { Newspaper, Calendar, Clock, ChevronRight, X, User } from 'lucide-react';
import { SchoolNews } from '../types';
import { SCHOOL_NEWS } from '../data/mockData';

export const NewsSection: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<SchoolNews | null>(null);

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Kabar Sekolah & Informasi
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Warta & Pengumuman Resmi
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Informasi terkini kegiatan akademik, pembinaan kesiswaan, dan prestasi siswa SMA Nusantara Bangsa.
          </p>
        </div>

        {/* 3-Tier Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHOOL_NEWS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
              onClick={() => setSelectedNews(item)}
            >
              <div>
                {/* Image if present */}
                {item.imageUrl && (
                  <div className="aspect-16/9 bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="p-5 space-y-2.5">
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-emerald-800">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Oleh {item.author}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Baca Selengkapnya →
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-800">{selectedNews.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedNews.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedNews.readTime}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {selectedNews.title}
                </h3>
                <p className="text-xs text-slate-500">Penulis: {selectedNews.author}</p>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedNews.imageUrl && (
              <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100 border border-slate-200">
                <img
                  src={selectedNews.imageUrl}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="font-medium text-slate-800">
                {selectedNews.excerpt}
              </p>
              <p>
                {selectedNews.content}
              </p>
              <p>
                Untuk informasi lebih lanjut terkait pengumuman ini, para siswa dan wali murid dapat menghubungi bagian Tata Usaha Sekolah atau melalui surel resmi di info@smanusantarabangsa.sch.id.
              </p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
