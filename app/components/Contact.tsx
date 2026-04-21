'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import {
  Phone, Mail, MapPin, Send, CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function Contact() {
  const { t, dir } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const serviceOptions: string[] = t('contact.service_options') || [];

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* BG */}
      <div className="absolute bottom-0 end-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-divider mx-auto mb-5" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t('contact.title')}</h2>
          <p className="text-gray-light text-lg max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8 reveal">
            {/* Phone */}
            <div className="group flex items-start gap-4 p-5 rounded-xl bg-dark-card border border-dark-border hover:border-primary/20 transition-all duration-300 card-hover">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <Phone size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-light mb-1">{t('contact.phone_label')}</p>
                <a href="tel:+213657255044" className="text-lg font-bold text-white hover:text-primary transition-colors" dir="ltr">
                  +213 657 255 044
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="group flex items-start gap-4 p-5 rounded-xl bg-dark-card border border-dark-border hover:border-primary/20 transition-all duration-300 card-hover">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <Mail size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-light mb-1">{t('contact.email_label')}</p>
                <a href="mailto:pixelndlogic@gmail.com" className="text-base font-semibold text-white hover:text-primary transition-colors">
                  pixelndlogic@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-5 rounded-xl bg-dark-card border border-dark-border">
              <p className="text-sm text-gray-light mb-4">{t('contact.follow')}</p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/aytdevnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-dark-tertiary border border-dark-border flex items-center justify-center text-gray-light hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
                >
                  <FacebookIcon size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-dark-tertiary border border-dark-border flex items-center justify-center text-gray-light hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
                >
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 reveal" style={{ transitionDelay: '0.15s' }}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-dark-card border border-dark-border p-8 md:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-light mb-2">{t('contact.name')}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-tertiary border border-dark-border text-white placeholder-gray focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    placeholder={t('contact.name')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-light mb-2">{t('contact.email')}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-tertiary border border-dark-border text-white placeholder-gray focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    placeholder={t('contact.email')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">{t('contact.service')}</label>
                <select
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-tertiary border border-dark-border text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300 appearance-none"
                >
                  <option value="" disabled className="text-gray">{t('contact.select_service')}</option>
                  {serviceOptions.map((opt: string, i: number) => (
                    <option key={i} value={opt} className="bg-dark-tertiary">{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">{t('contact.message')}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-tertiary border border-dark-border text-white placeholder-gray focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none"
                  placeholder={t('contact.message')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${status === 'sent'
                  ? 'bg-green-600'
                  : 'btn-primary'
                  }`}
              >
                {status === 'idle' && (
                  <>
                    <span>{t('contact.send')}</span>
                    <Send size={18} />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <span>{t('contact.sending')}</span>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <span>{t('contact.sent')}</span>
                    <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
