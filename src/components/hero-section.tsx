'use client';

import Image from 'next/image';
import Link from 'next/link';
import { aboutData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Typewriter } from './typewriter';

export function HeroSection() {
  const heroSocials = aboutData.socials.filter(s => ['Fiverr', 'GitHub', 'Instagram'].includes(s.name));
  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] flex items-center justify-center text-white overflow-hidden"
    >
      <div
        className="absolute inset-[-10px] bg-cover bg-center bg-no-repeat blur-md scale-110"
        style={{ backgroundImage: `url(${aboutData.heroBackground.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative h-48 w-48 md:h-64 md:w-64 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Image
                src={aboutData.profilePicture.imageUrl}
                alt={aboutData.name}
                width={256}
                height={256}
                priority
                className="relative rounded-3xl object-cover border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="md:col-span-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
              {aboutData.name}
            </h1>
            <Typewriter texts={aboutData.titles} className="text-xl md:text-2xl text-foreground/80 mb-6" />
            <p className="max-w-2xl mx-auto md:mx-0 text-base md:text-lg text-muted-foreground mb-8">
              {aboutData.bio}
            </p>
            <div className="flex justify-center md:justify-start items-center gap-4 flex-wrap">
              {heroSocials.map((social) => (
                <Button key={social.name} variant="outline" size="icon" asChild className="border-white/20 bg-white/10 hover:bg-white/20">
                  <Link href={social.url} target="_blank" aria-label={social.name}>
                    <social.icon className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
