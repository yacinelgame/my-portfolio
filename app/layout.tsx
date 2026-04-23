import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pixel & Logic — Bridging Digital Logic with Physical Security',
  description:
    'Full-service digital agency specializing in software development, UI/UX design, IT networking, and security systems. End-to-end solutions from pixel-perfect design to robust infrastructure.',
  keywords: [
    'Pixel and Logic',
    'software development',
    'UI/UX design',
    'IT networking',
    'CCTV installation',
    'Tauri',
    'Rust',
    'web development',
    'security systems',
  ],
  openGraph: {
    title: 'Pixel & Logic — Full-Service Digital Agency',
    description: 'End-to-end solutions from pixel-perfect design to robust infrastructure.',
    type: 'website',
    url: 'https://pixelandlogic.vercel.app',
    siteName: 'Pixel & Logic',
    images: [
      {
        url: 'https://pixelandlogic.vercel.app/logo.png',
        width: 6750,
        height: 6750,
      },
    ],
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
