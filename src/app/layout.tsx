import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CustomCursor } from '@/components/custom-cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'ZarScape Portfolio',
  description: 'A professional developer portfolio to showcase projects and skills.',
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
