import GlassmorphismProfileCard from '../ui/profile-card-1';

const logoFull =
  'https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/ZarScape/logo-with-background.png';

const profile = {
  avatarUrl: logoFull,
  name: 'Muhammad Abuzar',
  title: 'NodeJS Expert - ZarScape',
  bio: 'I build scalable Discord systems, backend automation, and modular web architecture with a focus on performance, reliability, and clean logic.'
};

export default function AboutSection() {
  return (
    <section id="about" className="reveal section-optimized px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-20">
        <div className="flex justify-center lg:justify-start">
          <GlassmorphismProfileCard {...profile} />
        </div>

        <div className="text-center lg:text-left">
          <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-cyan-400">About</h3>
          <h2 className="mb-8 text-4xl font-black leading-tight text-white md:text-6xl">
            Backend Logic,
            <br />
            Built To Scale.
          </h2>
          <div className="space-y-6 text-base font-light leading-relaxed text-cyan-50/62 md:space-y-8 md:text-lg">
            <p>
              I&apos;m <span className="font-black text-white">Muhammad Abuzar</span>, also known as
              <span className="font-black text-cyan-300"> ZarScape</span>. I specialize in Node.js systems,
              Discord ecosystems, and production-focused backend engineering.
            </p>
            <p>
              My work centers on turning complex requirements into maintainable architecture, stable APIs,
              and automation flows that stay fast under real traffic and long-term growth.
            </p>
            <p>
              I care about shipping systems that are not only functional, but structured cleanly enough to
              scale, debug, and extend without chaos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
