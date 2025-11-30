import { aboutData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ConnectSection() {
  return (
    <section id="connect" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Connect With Me</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find me on these platforms.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-2xl mx-auto">
          {aboutData.socials.map((social) => (
            <Button
              key={social.name}
              variant="outline"
              size="lg"
              asChild
              className="border-white/10 bg-black/30 hover:bg-black/50 hover:text-white rounded-full"
            >
              <Link href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-5 w-5 mr-2 text-primary" />
                <span>{social.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
