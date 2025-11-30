'use client';

import Link from 'next/link';
import { Code2, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-lg">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold">ZarScape Portfolio</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/#" className="transition-colors hover:text-primary text-foreground/80">
              Home
            </Link>
            <Link href="/#about" className="transition-colors hover:text-primary text-foreground/80">
              About
            </Link>
            <Link href="/#projects" className="transition-colors hover:text-primary text-foreground/80">
              Projects
            </Link>
            <Link href="/#skills" className="transition-colors hover:text-primary text-foreground/80">
              Skills
            </Link>
            <Link href="/#connect" className="transition-colors hover:text-primary text-foreground/80">
              Connect
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background/80 backdrop-blur-lg border-l-border">
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile Navigation</SheetTitle>
                <SheetDescription>
                  A list of links to navigate the portfolio website.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-6">
                 <Link
                  href="/#"
                  className="transition-colors hover:text-primary text-foreground/80"
                  onClick={closeSheet}
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className="transition-colors hover:text-primary text-foreground/80"
                  onClick={closeSheet}
                >
                  About
                </Link>
                <Link
                  href="/#projects"
                  className="transition-colors hover:text-primary text-foreground/80"
                  onClick={closeSheet}
                >
                  Projects
                </Link>
                <Link
                  href="/#skills"
                  className="transition-colors hover:text-primary text-foreground/80"
                  onClick={closeSheet}
                >
                  Skills
                </Link>
                <Link
                  href="/#connect"
                  className="transition-colors hover:text-primary text-foreground/80"
                  onClick={closeSheet}
                >
                  Connect
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
