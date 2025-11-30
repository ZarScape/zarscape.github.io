'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SkillsSection } from '@/components/skills-section';
import { Footer } from '@/components/footer';
import { ConnectSection } from './connect-section';
import { LoadingScreen } from './loading-screen';
import { AboutSection } from './about-section';

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const message = `
███████╗ █████╗ ██████╗ ███████╗ ██████╗ █████╗ ██████╗ ███████╗
╚══███╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝
  ███╔╝ ███████║██████╔╝███████╗██║     ███████║██████╔╝█████╗  
 ███╔╝  ██╔══██║██╔══██╗╚════██║██║     ██╔══██║██╔═══╝ ██╔══╝  
███████╗██║  ██║██║  ██║███████║╚██████╗██║  ██║██║     ███████╗
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚══════╝
    `;
    console.log(`%c${message}`, 'color: hsl(var(--accent))');

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading-active');
    } else {
      document.body.classList.remove('loading-active');
    }
  }, [isLoading]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-fixed bg-center blur-md"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/ZarScape/background-image.png')",
        }}
      />
      <div className="absolute inset-0 w-full h-full animated-gradient z-0" />
      <div className="absolute inset-0 w-full h-full animated-gradient animation-delay-2000 z-[1]" />
      <div className="absolute inset-0 w-full h-full animated-gradient animation-delay-4000 z-[2]" />
      
      {isLoading && <LoadingScreen />}

      <div className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ConnectSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
