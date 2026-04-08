import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const logoLow =
  'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/ZarScape/logo-with-background-low-quality.png';
function GithubIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.2 11.39c.6.11.8-.26.8-.58v-2.03c-3.34.73-4.03-1.41-4.03-1.41-.55-1.39-1.34-1.76-1.34-1.76-1.08-.75.09-.73.09-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function InstagramIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.75 2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 1.5A4 4 0 1 0 16 12a4 4 0 0 0-4-4Z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM3 9.5h4v11H3Zm7 0h3.83V11h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4V15.67c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.91h-4Z" />
    </svg>
  );
}

function YoutubeIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.53 3.58 12 3.58 12 3.58s-7.53 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.87.5 9.4.5 9.4.5s7.53 0 9.4-.5a3 3 0 0 0 2.1-2.12A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.75 15.47V8.53L15.82 12l-6.07 3.47Z" />
    </svg>
  );
}

function DiscordIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.08.08 0 0 0-.08.04c-.21.38-.44.86-.61 1.25a18.3 18.3 0 0 0-5.48 0c-.17-.39-.41-.88-.62-1.25a.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03 13.5 13.5 0 0 0 1.23-1.99.08.08 0 0 0-.04-.11 13 13 0 0 1-1.87-.89.08.08 0 0 1-.01-.13l.37-.29a.07.07 0 0 1 .08-.01 17.4 17.4 0 0 0 12.06 0 .07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.89.08.08 0 0 0-.04.11c.35.7.77 1.36 1.22 1.99a.08.08 0 0 0 .08.03 19.9 19.9 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42-.02 1.33-.95 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}

const footerLinks = [
  {
    label: 'Navigate',
    links: [
      { title: 'About', href: '#about' },
      { title: 'Projects', href: '#projects' },
      { title: 'Reviews', href: '#testimonials' },
      { title: 'Connect', href: '#connect' }
    ]
  },
  {
    label: 'Contact',
    links: [
      { title: 'Discord Server', href: 'https://discord.gg/6YVmxA4Qsf' },
      { title: 'GitHub', href: 'https://github.com/ZarScape' },
      { title: 'Fiverr', href: 'https://www.fiverr.com/zarscape' },
      { title: 'YouTube', href: 'https://www.youtube.com/@ZarScape' }
    ]
  },
  {
    label: 'Resources',
    links: [
      { title: 'zar', href: 'https://discord.com/oauth2/authorize?client_id=1345820519827636295' },
      { title: 'Zar Browser', href: 'https://github.com/ZarScape/ZarBrowser' },
      { title: 'Discord.js Template', href: 'https://github.com/ZarScape/discord.js-v14-v2-template' },
      { title: 'Contact', href: '#contact' }
    ]
  },
  {
    label: 'Social Links',
    links: [
      { title: 'Discord', href: 'https://discord.gg/6YVmxA4Qsf', icon: DiscordIcon },
      { title: 'GitHub', href: 'https://github.com/ZarScape', icon: GithubIcon },
      { title: 'Instagram', href: 'https://www.instagram.com/ZarScape', icon: InstagramIcon },
      { title: 'LinkedIn', href: 'https://linkedin.com/in/ZarScape', icon: LinkedinIcon },
      { title: 'YouTube', href: 'https://www.youtube.com/@ZarScape', icon: YoutubeIcon }
    ]
  }
];

function AnimatedContainer({ className, delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FooterSection({ currentYear }) {
  return (
    <footer className="relative mx-auto mt-20 flex w-full max-w-7xl flex-col items-center justify-center rounded-t-[2.5rem] border border-white/10 border-b-0 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(103,232,249,0.10),transparent)] px-6 py-12 lg:py-16">
      <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/30 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="inline-flex items-center gap-3">
            <img
              src={logoLow}
              alt="ZarScape Logo"
              className="h-10 w-10 rounded-full border border-cyan-300/15 object-cover shadow-[0_0_24px_rgba(34,211,238,0.12)]"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="text-sm font-semibold tracking-[0.22em] text-white">ZarScape</p>
            </div>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/48 md:mt-0">
            Building scalable Discord systems, backend automation, and performance-focused web tools with clean architecture.
          </p>
          <p className="text-xs tracking-[0.08em] text-white/34">Copyright {currentYear} Muhammad Abuzar. All rights reserved.</p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.08}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300/80">{section.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/52">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-white"
                      >
                        {link.icon ? <link.icon className="size-4 text-cyan-300/70" /> : null}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}
