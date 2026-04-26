'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import { ExternalLink, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const dentalScreenshots = Array.from({ length: 8 }, (_, i) => ({
  src: `/dental-flow/screenshot-${i + 1}.png`,
  alt: `Dental Flow Screenshot ${i + 1}`,
}));

const photographeScreenshots = Array.from({ length: 9 }, (_, i) => ({
  src: `/photographe-ERP/screenshot-${i + 1}.png`,
  alt: `Photographe ERP Screenshot ${i + 1}`,
}));

export default function Portfolio() {
  const { t, dir } = useLanguage();
  const [activeGallery, setActiveGallery] = useState<{ src: string, alt: string }[] | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const openLightbox = (gallery: { src: string, alt: string }[], idx: number = 0) => {
    setActiveGallery(gallery);
    setLightboxIdx(idx);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveGallery(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (!activeGallery) return;
    setLightboxIdx((p) => (p + 1) % activeGallery.length);
  };
  const prevImage = () => {
    if (!activeGallery) return;
    setLightboxIdx((p) => (p - 1 + activeGallery.length) % activeGallery.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeGallery) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeGallery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal')?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 md:py-32 bg-dark-secondary/50">
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-divider mx-auto mb-5" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t('portfolio.title')}</h2>
          <p className="text-gray-light text-lg max-w-2xl mx-auto">{t('portfolio.subtitle')}</p>
        </div>

        {/* Featured: QCMaster */}
        <div className="reveal mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Star size={18} className="text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{t('portfolio.featured')}</span>
          </div>

          <div className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-primary/30 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Preview */}
              <div className="relative h-64 md:h-auto overflow-hidden bg-dark-tertiary">
                <Image
                  src="/qcmaster/screenshot-1.png"
                  alt="QCMaster Preview"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4 w-fit">
                  Medical Education Platform
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('portfolio.qcmaster_title')}</h3>
                <p className="text-gray-light leading-relaxed mb-6">{t('portfolio.qcmaster_desc')}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg text-xs bg-dark-tertiary text-gray-light border border-dark-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://qcmaster.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 w-fit text-sm"
                >
                  <span>{t('portfolio.visit_project')}</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dental Flow Project */}
        <div className="reveal mb-16">
          <div className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-primary/30 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">

              {/* Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4 w-fit">
                  Desktop Application
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('portfolio.dental_title')}</h3>
                <p className="text-gray-light leading-relaxed mb-6">{t('portfolio.dental_desc')}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Tauri', 'Rust', 'React', 'Tailwind CSS', 'SQLite'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg text-xs bg-dark-tertiary text-gray-light border border-dark-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openLightbox(dentalScreenshots, 0)}
                  className="btn-outline inline-flex items-center gap-2 w-fit text-sm"
                >
                  <span>{t('portfolio.view_gallery') || 'View Gallery'}</span>
                  <ExternalLink size={16} className="rotate-180" />
                </button>
              </div>

              {/* Preview (Stacked Images) */}
              <div
                className="relative h-80 md:h-auto bg-dark-tertiary overflow-hidden cursor-pointer group/preview order-1 md:order-2"
                onClick={() => openLightbox(dentalScreenshots, 0)}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full max-w-sm">
                    {/* Background stacked images */}
                    <div className="absolute inset-0 bg-dark border border-dark-border rounded-xl transform rotate-6 translate-x-4 opacity-50 group-hover/preview:rotate-12 group-hover/preview:translate-x-6 transition-all duration-500" />
                    <div className="absolute inset-0 bg-dark border border-dark-border rounded-xl transform -rotate-3 -translate-x-2 opacity-70 group-hover/preview:-rotate-6 group-hover/preview:-translate-x-4 transition-all duration-500" />

                    {/* Front image */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden border border-dark-border shadow-2xl group-hover/preview:-translate-y-2 group-hover/preview:shadow-primary/20 transition-all duration-500">
                      <Image
                        src={dentalScreenshots[0].src}
                        alt="Dental Flow Preview"
                        fill
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-dark/60 flex flex-col items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary text-white rounded-full p-4 mb-2 transform scale-75 group-hover/preview:scale-100 transition-transform duration-300">
                          <span className="font-bold text-lg">+{dentalScreenshots.length}</span>
                        </div>
                        <span className="text-white text-sm font-medium">Click to open gallery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Healthy Smile Project */}
        <div className="reveal mb-16">
          <div className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-primary/30 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Preview */}
              <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden bg-dark-tertiary">
                <Image
                  src="/healthy-smile/screenshot-1.png"
                  alt="Healthy Smile Preview"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4 w-fit">
                  Dental Clinic Landing Page
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('portfolio.healthy_smile_title')}</h3>
                <p className="text-gray-light leading-relaxed mb-6">{t('portfolio.healthy_smile_desc')}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Next.js', 'Tailwind CSS', 'React'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg text-xs bg-dark-tertiary text-gray-light border border-dark-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://healthysmiledz.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 w-fit text-sm"
                >
                  <span>{t('portfolio.visit_project')}</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Photographe ERP Project */}
        <div className="reveal mb-16">
          <div className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-primary/30 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">

              {/* Preview (Stacked Images) */}
              <div
                className="relative h-80 md:h-auto bg-dark-tertiary overflow-hidden cursor-pointer group/preview"
                onClick={() => openLightbox(photographeScreenshots, 0)}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full max-w-sm">
                    {/* Background stacked images */}
                    <div className="absolute inset-0 bg-dark border border-dark-border rounded-xl transform rotate-6 translate-x-4 opacity-50 group-hover/preview:rotate-12 group-hover/preview:translate-x-6 transition-all duration-500" />
                    <div className="absolute inset-0 bg-dark border border-dark-border rounded-xl transform -rotate-3 -translate-x-2 opacity-70 group-hover/preview:-rotate-6 group-hover/preview:-translate-x-4 transition-all duration-500" />

                    {/* Front image */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden border border-dark-border shadow-2xl group-hover/preview:-translate-y-2 group-hover/preview:shadow-primary/20 transition-all duration-500">
                      <Image
                        src={photographeScreenshots[0].src}
                        alt="Photographe ERP Preview"
                        fill
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-dark/60 flex flex-col items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary text-white rounded-full p-4 mb-2 transform scale-75 group-hover/preview:scale-100 transition-transform duration-300">
                          <span className="font-bold text-lg">+{photographeScreenshots.length}</span>
                        </div>
                        <span className="text-white text-sm font-medium">Click to open gallery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4 w-fit">
                  Web Application
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('portfolio.photographe_title')}</h3>
                <p className="text-gray-light leading-relaxed mb-6">{t('portfolio.photographe_desc')}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Next.js', 'Tailwind CSS', 'Supabase', 'JWT', 'Next Auth'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg text-xs bg-dark-tertiary text-gray-light border border-dark-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openLightbox(photographeScreenshots, 0)}
                  className="btn-outline inline-flex items-center gap-2 w-fit text-sm"
                >
                  <span>{t('portfolio.view_gallery') || 'View Gallery'}</span>
                  <ExternalLink size={16} className="rotate-180" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeGallery && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 end-6 text-white/70 hover:text-white p-2 transition-colors z-10"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute start-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 glass rounded-full transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute end-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 glass rounded-full transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>

          <Image
            src={activeGallery[lightboxIdx].src}
            alt={activeGallery[lightboxIdx].alt}
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm glass px-4 py-2 rounded-full">
            {lightboxIdx + 1} / {activeGallery.length}
          </div>
        </div>
      )}
    </section>
  );
}
