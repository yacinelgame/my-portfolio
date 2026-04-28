'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import { ExternalLink, X, ChevronLeft, ChevronRight, Star, Palette } from 'lucide-react';

const dentalScreenshots = Array.from({ length: 8 }, (_, i) => ({
  src: `/dental-flow/screenshot-${i + 1}.png`,
  alt: `Dental Flow Screenshot ${i + 1}`,
}));

const photographeScreenshots = Array.from({ length: 9 }, (_, i) => ({
  src: `/photographe-ERP/screenshot-${i + 1}.png`,
  alt: `Photographe ERP Screenshot ${i + 1}`,
}));

// Design project galleries
const qcmasterViImages = [
  ...Array.from({ length: 5 }, (_, i) => ({
    src: `/qcmaster-visual-identity/img-${i + 1}.png`,
    alt: `QCMaster Visual Identity ${i + 1}`,
  })),
  { src: `/qcmaster-visual-identity/vid-1.mp4`, alt: `QCMaster Visual Identity Video` },
];

const dentalViImages = Array.from({ length: 5 }, (_, i) => ({
  src: `/dental-flow-visual-identity/img-${i + 1}.png`,
  alt: `Dental Flow Visual Identity ${i + 1}`,
}));

const aatuftingViImages = Array.from({ length: 9 }, (_, i) => ({
  src: `/aatufting-visual-identity/img-${i + 1}.png`,
  alt: `AATufting Visual Identity ${i + 1}`,
}));

const misskaImages = Array.from({ length: 4 }, (_, i) => ({
  src: `/misska-flowers-graphic-design/img-${i + 1}.png`,
  alt: `Misska Flowers Graphic Design ${i + 1}`,
}));

const cuteYarnImages = Array.from({ length: 2 }, (_, i) => ({
  src: `/cute-yarn-graphic-design/img-${i + 1}.png`,
  alt: `Cute Yarn Graphic Design ${i + 1}`,
}));

const gateauMelinaImages = Array.from({ length: 4 }, (_, i) => ({
  src: `/gateau-melina-graphic-design/img-${i + 1}.png`,
  alt: `Gâteau Melina Graphic Design ${i + 1}`,
}));

const designProjects = [
  {
    titleKey: 'portfolio.qcmaster_vi_title',
    descKey: 'portfolio.qcmaster_vi_desc',
    category: 'Visual Identity',
    gallery: qcmasterViImages,
    accent: 'from-violet-500/80 to-indigo-600/80',
  },
  {
    titleKey: 'portfolio.dental_vi_title',
    descKey: 'portfolio.dental_vi_desc',
    category: 'Visual Identity',
    gallery: dentalViImages,
    accent: 'from-cyan-500/80 to-blue-600/80',
  },
  {
    titleKey: 'portfolio.aatufting_vi_title',
    descKey: 'portfolio.aatufting_vi_desc',
    category: 'Visual Identity',
    gallery: aatuftingViImages,
    accent: 'from-amber-500/80 to-orange-600/80',
  },
  {
    titleKey: 'portfolio.misska_title',
    descKey: 'portfolio.misska_desc',
    category: 'Graphic Design',
    gallery: misskaImages,
    accent: 'from-pink-500/80 to-rose-600/80',
  },
  {
    titleKey: 'portfolio.cute_yarn_title',
    descKey: 'portfolio.cute_yarn_desc',
    category: 'Graphic Design',
    gallery: cuteYarnImages,
    accent: 'from-emerald-500/80 to-teal-600/80',
  },
  {
    titleKey: 'portfolio.gateau_melina_title',
    descKey: 'portfolio.gateau_melina_desc',
    category: 'Graphic Design',
    gallery: gateauMelinaImages,
    accent: 'from-fuchsia-500/80 to-purple-600/80',
  },
];

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
            </div>
          </div>
        </div>

        {/* ────────── Design & Branding Section ────────── */}
        <div className="reveal mt-24 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Palette size={18} className="text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{t('portfolio.design_section_title')}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('portfolio.design_section_title')}</h3>
          <p className="text-gray-light text-base max-w-2xl mb-10">{t('portfolio.design_section_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
          {designProjects.map((project, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(project.gallery, 0)}
              className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-primary/30 cursor-pointer transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Cover Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <Image
                  src={project.gallery[0].src}
                  alt={t(project.titleKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${project.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />

                {/* Image count badge */}
                <div className="absolute top-3 end-3 glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white/80 text-xs font-medium">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  {project.gallery.length}
                </div>

                {/* Category badge */}
                <div className="absolute top-3 start-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white text-dark rounded-full px-5 py-2.5 text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                    {t('portfolio.view_gallery') || 'View Gallery'}
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h4 className="text-lg font-bold text-white mb-1.5 group-hover:text-primary transition-colors duration-300">
                  {t(project.titleKey)}
                </h4>
                <p className="text-gray-light text-sm leading-relaxed line-clamp-2">
                  {t(project.descKey)}
                </p>
              </div>
            </div>
          ))}
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

          {activeGallery[lightboxIdx].src.endsWith('.mp4') ? (
            <video
              src={activeGallery[lightboxIdx].src}
              controls
              autoPlay
              className="max-w-[90vw] max-h-[85vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Image
              src={activeGallery[lightboxIdx].src}
              alt={activeGallery[lightboxIdx].alt}
              width={1200}
              height={800}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm glass px-4 py-2 rounded-full">
            {lightboxIdx + 1} / {activeGallery.length}
          </div>
        </div>
      )}
    </section>
  );
}
