import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CustomCursor } from '@/components/custom-cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const title = 'ZarScape - Developer Portfolio';
const description = 'A professional developer portfolio to showcase projects, skills, and experience in a clean, modern, and visually appealing way.';
const url = 'https://zarscape.github.io';
const imageUrl = 'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/ZarScape/logo-with-background.png';

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: ['ZarScape', 'developer', 'portfolio', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'full-stack'],
  authors: [{ name: 'Muhammad Abuzar', url: url }],
  creator: 'Muhammad Abuzar',
  publisher: 'ZarScape',
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: 'ZarScape Portfolio',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'ZarScape Portfolio Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [imageUrl],
    creator: '@ZarScape',
  },
  metadataBase: new URL(url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }} className={cn(inter.variable, 'font-sans')} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased')}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
