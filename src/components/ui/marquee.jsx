import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const fontSizeClasses = {
  sm: 'text-5xl sm:text-6xl md:text-7xl',
  md: 'text-6xl sm:text-7xl md:text-8xl',
  lg: 'text-7xl sm:text-8xl md:text-9xl',
  xl: 'text-8xl sm:text-9xl md:text-[10rem]',
  '2xl': 'text-9xl sm:text-[10rem] md:text-[11rem]',
  '3xl': 'text-[10rem] sm:text-[11rem] md:text-[12rem]'
};

export const Marquee = React.forwardRef(function Marquee(
  { className, text, repeat = 4, duration = 20, fontSize = 'lg', ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('relative w-full overflow-hidden py-10 md:py-14', className)}
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
      {...props}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
          duration
        }}
      >
        {[...Array(repeat)].map((_, index) => (
          <div key={index} className="mx-4 flex items-center">
            <span
              className={cn(
                fontSizeClasses[fontSize],
                'px-4 font-semibold uppercase tracking-[0.14em] text-cyan-100/70'
              )}
              style={{ textShadow: '0 0 22px rgba(34, 211, 238, 0.06)' }}
            >
              {text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
});
