'use client';

import { skills } from '@/lib/data';
import React from 'react';

export function SkillsSection() {
  const allSkills = skills.flatMap(category => category.children ?? []);

  return (
    <section id="skills" className="relative w-full py-16 md:py-24 lg:py-32">
       <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">My Skillset</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A collection of technologies and tools I work with.
            </p>
          </div>
        </div>
        
        <div 
          className="w-full flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll">
            {allSkills.map((skill, index) => (
              <li key={index} className="flex-shrink-0 flex flex-col items-center justify-center w-36 h-36 gap-2 p-4 rounded-lg">
                <skill.icon className="h-12 w-12" />
                <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
              </li>
            ))}
          </ul>
           <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll" aria-hidden="true">
            {allSkills.map((skill, index) => (
              <li key={index} className="flex-shrink-0 flex flex-col items-center justify-center w-36 h-36 gap-2 p-4 rounded-lg">
                <skill.icon className="h-12 w-12" />
                <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
