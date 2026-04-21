'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage, LOCALE_LABELS } from '@/app/context/LanguageContext';
import { Locale } from '@/app/lib/translations';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const navLinks = ['home', 'services', 'portfolio', 'contact'] as const;

export default function Navbar() {
  const { locale, setLocale, t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [locale]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Pixel & Logic"
            width={44}
            height={44}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-lg font-bold tracking-tight hidden sm:block">
            <span className="gradient-text">Pixel</span>
            <span className="text-gray-light mx-1">&</span>
            <span className="text-white">Logic</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="px-4 py-2 text-sm font-medium text-gray-light hover:text-primary transition-colors duration-300 rounded-lg hover:bg-white/5"
            >
              {t(`nav.${link}`)}
            </button>
          ))}
        </div>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-light hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <Globe size={16} className="text-primary" />
              <span>{LOCALE_LABELS[locale]}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {langOpen && (
              <div className="absolute top-full mt-2 end-0 glass rounded-xl overflow-hidden min-w-[120px] shadow-xl shadow-black/30 animate-fade-in">
                {(Object.keys(LOCALE_LABELS) as Locale[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLocale(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-start transition-colors duration-200 ${
                      locale === lang
                        ? 'bg-primary/20 text-primary font-semibold'
                        : 'text-gray-light hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {LOCALE_LABELS[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-light hover:text-primary transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4 animate-slide-up shadow-2xl shadow-black/40">
          {navLinks.map((link, i) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`block w-full text-start px-4 py-3 text-base font-medium text-gray-light hover:text-primary hover:bg-white/5 rounded-xl transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {t(`nav.${link}`)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
