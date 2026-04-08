import Testimonial from '../ui/testimonial';
import { Marquee } from '../ui/marquee';

export default function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="reveal section-optimized px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center lg:mb-20">
          <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-cyan-400">Testimonials</h3>
          <h2 className="text-4xl font-black text-white md:text-6xl">What Clients Say</h2>
        </div>

        <Testimonial cards={testimonials} />
      </div>

      <div className="mt-14 md:mt-20">
        <Marquee
          text="Development - Backend - Automation - APIs - NodeJS - Systems"
          repeat={5}
          duration={22}
          fontSize="md"
        />
      </div>
    </section>
  );
}
