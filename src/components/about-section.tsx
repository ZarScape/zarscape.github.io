import Image from 'next/image';
import { aboutData } from '@/lib/data';
import { Badge } from './ui/badge';
import { MapPin, Briefcase, Mail } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative h-64 w-64 group">
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
             <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
              {aboutData.name}
            </h1>
             <div className="flex flex-wrap justify-center gap-4">
               <Badge variant="outline" className="text-sm border-primary/50 text-primary bg-primary/10 flex items-center gap-2">
                 <MapPin className="h-4 w-4" />
                 {aboutData.details.location}
               </Badge>
                <Badge variant="outline" className="text-sm border-primary/50 text-primary bg-primary/10 flex items-center gap-2">
                 <Briefcase className="h-4 w-4" />
                 {aboutData.details.availability}
               </Badge>
               <a href={`mailto:${aboutData.details.email}`}>
                 <Badge variant="outline" className="text-sm border-primary/50 text-primary bg-primary/10 flex items-center gap-2 hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4" />
                  {aboutData.details.email}
                 </Badge>
               </a>
             </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">About Me</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {aboutData.aboutMe}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
