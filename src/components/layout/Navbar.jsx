import React from 'react';
import { Button, buttonVariants } from '../ui/button';
import { MenuToggleIcon } from '../ui/menu-toggle-icon';
import { useScroll } from '../ui/use-scroll';
import { cn } from '../../lib/utils';

const logoLow =
  'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/ZarScape/logo-with-background-low-quality.png';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Connect', href: '#connect' },
  { label: 'Contact', href: '#contact' }
];

function Wordmark() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <img
        src={logoLow}
        alt="ZarScape Logo"
        className="h-9 w-9 rounded-full border border-white/15 object-cover shadow-lg shadow-cyan-400/20 md:h-10 md:w-10"
        decoding="async"
        fetchPriority="high"
      />
      <div>
        <div className="text-sm font-semibold tracking-[0.22em] text-white">ZarScape</div>
      </div>
    </a>
  );
}

function GitHubMark({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed left-1/2 top-0 z-50 w-full max-w-6xl -translate-x-1/2 border-b border-transparent px-3 pt-3 md:px-4',
        scrolled && !open && 'md:pt-4',
        open && 'pt-0'
      )}
    >
      <div
        className={cn(
          'mx-auto w-full rounded-[1.6rem] border border-white/10 bg-black/35 backdrop-blur-2xl transition-all duration-300 ease-out',
          scrolled && !open && 'shadow-[0_18px_60px_rgba(0,0,0,0.38)] md:rounded-2xl',
          open && 'rounded-none border-x-0 border-t-0'
        )}
      >
        <nav
          className={cn(
            'flex h-16 w-full items-center justify-between px-4 md:h-14 md:px-5',
            scrolled && !open && 'md:h-12 md:px-4'
          )}
        >
          <Wordmark />

          <div className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <a key={link.label} className={buttonVariants({ variant: 'ghost' })} href={link.href}>
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="nav-github-button h-9 gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#041018] shadow-[0_10px_24px_rgba(34,211,238,0.2)] hover:bg-cyan-200"
            >
              <a href="https://github.com/ZarScape" target="_blank" rel="noreferrer">
                <GitHubMark className="size-4" />
                GitHub
              </a>
            </Button>
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full md:hidden"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </nav>

        <div
          className={cn(
            'fixed inset-x-0 top-16 bottom-0 z-50 border-y border-white/10 bg-[#07131a]/95 backdrop-blur-2xl md:hidden',
            open ? 'block' : 'hidden'
          )}
        >
          <div
            data-slot={open ? 'open' : 'closed'}
            className="flex h-full w-full flex-col justify-between gap-y-2 p-4 data-[slot=closed]:zoom-out-95 data-[slot=open]:zoom-in-95"
          >
            <div className="grid gap-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  className={buttonVariants({ variant: 'ghost', className: 'justify-start text-base' })}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full gap-2">
                <a href="https://github.com/ZarScape" target="_blank" rel="noreferrer">
                  <GitHubMark className="size-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild className="w-full">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
