import { Suspense, lazy, useEffect, useMemo } from 'react';
import Navbar from './components/layout/Navbar';
import AboutSection from './components/sections/AboutSection';
import ConnectSection from './components/sections/ConnectSection';
import ContactSection from './components/sections/ContactSection';
import ProjectsSection from './components/sections/ProjectsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import BackgroundGradientAnimation from './components/ui/BackgroundGradientAnimation';
import { LoaderOne } from './components/ui/unique-loader-components';
import { featuredProjects, heroGalleryImages, socials, testimonials } from './data';
import { usePerformanceProfile } from './lib/performance-profile';

const HeroSection = lazy(() => import('./components/sections/HeroSection'));

function useRevealOnScroll(disabled = false) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    if (disabled || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [disabled]);
}

function useImageProtection(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const preventImageAction = (event) => {
      if (event.target?.tagName === 'IMG') event.preventDefault();
    };

    document.addEventListener('contextmenu', preventImageAction, false);
    document.addEventListener('dragstart', preventImageAction, false);

    return () => {
      document.removeEventListener('contextmenu', preventImageAction, false);
      document.removeEventListener('dragstart', preventImageAction, false);
    };
  }, [enabled]);
}

export default function App() {
  const performanceProfile = usePerformanceProfile();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useRevealOnScroll(performanceProfile.reducedMotion);
  useImageProtection(!performanceProfile.coarsePointer);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02060a] text-white">
      <BackgroundGradientAnimation
        performanceProfile={performanceProfile}
        containerClassName="z-0 opacity-50"
      />
      <Navbar />
      <Suspense
        fallback={
          <div className="relative z-10 flex min-h-screen items-center justify-center bg-transparent">
            <LoaderOne />
          </div>
        }
      >
        <HeroSection images={heroGalleryImages} performanceProfile={performanceProfile} />
      </Suspense>
      <AboutSection />
      <ProjectsSection projects={featuredProjects} />
      <TestimonialsSection testimonials={testimonials} />
      <ConnectSection socials={socials} />
      <ContactSection currentYear={currentYear} />
    </main>
  );
}
