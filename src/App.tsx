import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScheduleSection } from './components/ScheduleSection';
import { TeacherDirectory } from './components/TeacherDirectory';
import { PpdbSection } from './components/PpdbSection';
import { SchoolProfileSection } from './components/SchoolProfileSection';
import { NewsSection } from './components/NewsSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [ppdbInitialTab, setPpdbInitialTab] = useState<'daftar' | 'status' | 'alur' | 'admin'>('daftar');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTeacherFromSchedule = (teacherName: string) => {
    setTeacherSearchQuery(teacherName);
    scrollToSection('guru');
  };

  const handleOpenPpdbForm = () => {
    setPpdbInitialTab('daftar');
    scrollToSection('ppdb');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenPpdbForm={handleOpenPpdbForm}
      />

      {/* Main Content Area */}
      <main className="grow">
        {/* Hero Section */}
        <HeroSection
          onNavigate={scrollToSection}
          onOpenPpdb={handleOpenPpdbForm}
        />

        {/* Jadwal Pelajaran Interaktif */}
        <ScheduleSection
          onSelectTeacher={handleSelectTeacherFromSchedule}
        />

        {/* Informasi & Direktori Guru */}
        <TeacherDirectory
          initialSearch={teacherSearchQuery}
        />

        {/* Pendaftaran Siswa Baru Daring (PPDB Online Hub) */}
        <PpdbSection
          initialTab={ppdbInitialTab}
        />

        {/* Warta Berita & Pengumuman */}
        <NewsSection />

        {/* Profil Sekolah, Visi-Misi, & Fasilitas Unggulan */}
        <SchoolProfileSection />
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
