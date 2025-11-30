'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  texts: string[];
  className?: string;
}

export function Typewriter({ texts, className }: TypewriterProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      const nextText = texts[(textIndex + 1) % texts.length];
      
      if (isDeleting) {
        // Find the common prefix between current and next text
        let commonPrefix = '';
        for (let i = 0; i < currentText.length && i < nextText.length; i++) {
          if (currentText[i] === nextText[i]) {
            commonPrefix += currentText[i];
          } else {
            break;
          }
        }

        // If we've deleted back to the common prefix, stop deleting and start typing
        if (displayedText === commonPrefix) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        } else {
          setTypingSpeed(75);
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }
      } else { // We are typing
        const targetText = texts[textIndex];
        if (displayedText.length < targetText.length) {
            setTypingSpeed(150);
            setDisplayedText(targetText.substring(0, displayedText.length + 1));
        } else {
            // Finished typing the current text, wait, then start deleting
            setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, texts, typingSpeed]);

  return (
    <h2 className={cn(className)}>
      {displayedText}
      <span className="animate-blink">|</span>
    </h2>
  );
}
