import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const ProjectCard = React.forwardRef(function ProjectCard(
  { className, imgSrc, title, description, link, linkText = 'View Project', children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#08131b]/78 text-white shadow-sm backdrop-blur-xl transition-all duration-500 ease-in-out hover:-translate-y-2 hover:border-cyan-300/28 hover:shadow-[0_22px_60px_rgba(0,0,0,0.28)]',
        className
      )}
      {...props}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02060a] via-[#02060a]/20 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {children}

        <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-200">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/58 md:text-base">{description}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/button mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-all duration-300 hover:text-white"
          onClick={(event) => event.stopPropagation()}
        >
          {linkText}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
        </a>
      </div>
    </div>
  );
});

export { ProjectCard };
