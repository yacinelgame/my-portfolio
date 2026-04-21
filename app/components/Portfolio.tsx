'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import { ExternalLink, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const dentalScreenshots = Array.from({ length: 8 }, (_, i) => ({
  src: `/dental-flow/screenshot-${i + 1}.png`,
  alt: `Dental Flow Screenshot ${i + 1}`,
}));

export default function Portfolio() {
  const { t, dir } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => setLightboxIdx((p) => (p + 1) % dentalScreenshots.length);
  const prevImage = () => setLightboxIdx((p) => (p - 1 + dentalScreenshots.length) % dentalScreenshots.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

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
              <div className="relative h-64 md:h-auto bg-gradient-to-br from-primary/10 to-dark-tertiary overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-3xl font-black gradient-text">QC</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{t('portfolio.qcmaster_title')}</h3>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 start-4 w-2 h-2 rounded-full bg-primary/40" />
                <div className="absolute top-4 start-10 w-2 h-2 rounded-full bg-primary/20" />
                <div className="absolute bottom-8 end-8 w-16 h-16 rounded-full border border-primary/10" />
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

        {/* Dental Flow Gallery */}
        <div className="reveal mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <span className="text-lg font-bold gradient-text">DF</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('portfolio.dental_title')}</h3>
              <p className="text-sm text-gray-light">{t('portfolio.dental_desc')}</p>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {dentalScreenshots.map((img, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-xl overflow-hidden cursor-pointer block w-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-sm text-white font-medium">Dental Flow — Screen {idx + 1}</span>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
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
            src={dentalScreenshots[lightboxIdx].src}
            alt={dentalScreenshots[lightboxIdx].alt}
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm glass px-4 py-2 rounded-full">
            {lightboxIdx + 1} / {dentalScreenshots.length}
          </div>
        </div>
      )}
    </section>
  );
}
