'use client';

import { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold">ZarScape Portfolio</span>
        </div>
        <Progress value={progress} className="w-64 h-2" />
        <p className="text-sm text-muted-foreground">Loading assets...</p>
      </div>
    </div>
  );
}
