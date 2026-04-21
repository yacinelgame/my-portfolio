'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { useEffect, useRef } from 'react';
import {
  Code, Monitor, Smartphone, Server,
  Palette, Frame, PenTool, Layers,
  Network, Cloud, HardDrive, Headphones,
  Camera, ShieldCheck, Bell, Eye,
  CheckCircle,
} from 'lucide-react';

const pixelServices = [
  {
    key: 'software',
    icon: Code,
    features_icons: [Monitor, Code, Smartphone, Server],
  },
  {
    key: 'design',
    icon: Palette,
    features_icons: [Frame, PenTool, Layers, Palette],
  },
];

const logicServices = [
  {
    key: 'networking',
    icon: Network,
    features_icons: [Network, HardDrive, Cloud, Headphones],
  },
  {
    key: 'security',
    icon: Camera,
    features_icons: [Camera, ShieldCheck, Bell, Eye],
  },
];

function ServiceCard({
  serviceKey,
  icon: Icon,
  side,
  tFn,
}: {
  serviceKey: string;
  icon: React.ComponentType<any>;
  side: 'pixel' | 'logic';
  tFn: (key: string) => any;
}) {
  const title = tFn(`services.${serviceKey}.title`);
  const desc = tFn(`services.${serviceKey}.desc`);
  const features: string[] = tFn(`services.${serviceKey}.features`) || [];

  return (
    <div
      className={`group relative rounded-2xl p-6 md:p-8 card-hover overflow-hidden ${side === 'pixel'
          ? 'bg-gradient-to-br from-dark-card to-dark-tertiary border border-primary/10 hover:border-primary/30'
          : 'bg-dark-card border border-dark-border hover:border-primary/20'
        }`}
    >
      {/* Accent line */}
      <div
        className={`absolute top-0 inset-x-0 h-[2px] transition-all duration-500 ${side === 'pixel'
            ? 'bg-gradient-to-r from-primary via-primary-light to-transparent group-hover:h-[3px]'
            : 'bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:h-[3px]'
          }`}
      />

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${side === 'pixel'
            ? 'bg-primary/15 text-primary'
            : 'bg-dark-tertiary text-gray-light group-hover:bg-primary/15 group-hover:text-primary'
          }`}
      >
        <Icon size={28} />
      </div>

      {/* Title & Desc */}
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-light text-sm leading-relaxed mb-6">{desc}</p>

      {/* Features */}
      <ul className="space-y-2.5">
        {features.map((feat: string, i: number) => (
          <li key={i} className="flex items-center gap-2.5 text-sm text-gray-light">
            <CheckCircle size={15} className="text-primary shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* BG accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20 reveal">
          <div className="section-divider mx-auto mb-5" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-gray-light text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Two-Column Layout: Pixel vs Logic */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* PIXEL SIDE */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <Palette size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">{t('services.pixel_title')}</h3>
                <p className="text-xs text-gray-light">{t('services.pixel_subtitle')}</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ms-4" />
            </div>

            <div className="space-y-6">
              {pixelServices.map((svc) => (
                <ServiceCard
                  key={svc.key}
                  serviceKey={svc.key}
                  icon={svc.icon}
                  side="pixel"
                  tFn={t}
                />
              ))}
            </div>
          </div>

          {/* LOGIC SIDE */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-dark-tertiary border border-dark-border flex items-center justify-center">
                <Server size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t('services.logic_title')}</h3>
                <p className="text-xs text-gray-light">{t('services.logic_subtitle')}</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-dark-border to-transparent ms-4" />
            </div>

            <div className="space-y-6">
              {logicServices.map((svc) => (
                <ServiceCard
                  key={svc.key}
                  serviceKey={svc.key}
                  icon={svc.icon}
                  side="logic"
                  tFn={t}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
