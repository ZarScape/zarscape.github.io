'use client';

import { Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full mt-20 liquid-glass-ui rounded-none border-t border-white/10">
      <div className="container flex items-center justify-center h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            &copy; {year} ZarScape Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
