'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { ArrowRight, ArrowLeft, Zap, Shield, Code, Palette } from 'lucide-react';

export default function Hero() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-22 pb-20 flex flex-col items-center gradient-bg noise overflow-hidden"
    >
      {/* Geometric decorations */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 start-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 end-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Corner accents */}
      <div className="absolute top-0 end-0 w-[500px] h-[500px] opacity-20">
        <div className="absolute top-20 end-20 w-px h-40 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute top-20 end-20 h-px w-40 bg-gradient-to-l from-primary to-transparent" />
      </div>
      <div className="absolute bottom-0 start-0 w-[500px] h-[500px] opacity-20">
        <div className="absolute bottom-20 start-20 w-px h-40 bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute bottom-20 start-20 h-px w-40 bg-gradient-to-r from-primary to-transparent" />
      </div>

      {/* Floating icons */}
      <div className="absolute top-[20%] end-[15%] animate-float opacity-10">
        <Code size={48} className="text-primary" />
      </div>
      <div className="absolute bottom-[30%] start-[12%] animate-float-delayed opacity-10">
        <Shield size={40} className="text-primary" />
      </div>
      <div className="absolute top-[60%] end-[25%] animate-float opacity-10" style={{ animationDelay: '4s' }}>
        <Palette size={36} className="text-primary" />
      </div>
      <div className="absolute top-[35%] start-[20%] animate-float-delayed opacity-10" style={{ animationDelay: '1s' }}>
        <Zap size={32} className="text-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-light mb-8 animate-fade-in">
          <Zap size={14} className="text-primary" />
          <span className="text-sm font-medium text-primary">{t('hero.badge')}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
          <span className="text-white">{t('hero.headline')}</span>
          <br />
          <span className="gradient-text">{t('hero.headline2')}</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-light max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-200">
          {t('hero.subheadline')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-400">
          <button
            onClick={() => scrollTo('services')}
            className="btn-primary flex items-center gap-2 text-base"
          >
            <span>{t('hero.cta_services')}</span>
            <Arrow size={18} />
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="btn-outline flex items-center gap-2 text-base"
          >
            {t('hero.cta_quote')}
          </button>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in delay-600">
          {[
            { value: '50+', label: dir === 'rtl' ? 'مشروع مكتمل' : 'Projects Delivered' },
            { value: '4', label: dir === 'rtl' ? 'خدمات أساسية' : 'Core Services' },
            { value: '100%', label: dir === 'rtl' ? 'رضا العملاء' : 'Client Satisfaction' },
            { value: '24/7', label: dir === 'rtl' ? 'دعم فني' : 'Support Available' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-600">
        <div className="w-6 h-10 rounded-full border-2 border-gray/30 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
