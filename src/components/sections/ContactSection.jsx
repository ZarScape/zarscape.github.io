import ContactForm from '../shared/ContactForm';
import { FooterSection } from '../ui/footer-section';

export default function ContactSection({ currentYear }) {
  return (
    <footer id="contact" className="reveal section-optimized px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <div className="flex h-full items-center justify-center">
            <div className="flex w-full max-w-xl flex-col justify-center p-4 text-center md:p-8 lg:min-h-full lg:p-10 lg:text-left">
              <h2 className="mb-8 text-5xl font-black leading-[0.92] text-white md:text-7xl xl:text-[5.25rem]">
                Ready to
                <br />
                <span className="text-gradient">Work?</span>
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-cyan-100/46 md:text-lg lg:mx-0">
                Available for collaborations, specialized Discord builds, and enterprise-grade full-stack tools.
              </p>
              <div className="flex justify-center lg:justify-start">
                <a
                  href="https://discord.gg/6YVmxA4Qsf"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta-secondary inline-flex rounded-full border border-cyan-300/18 bg-cyan-400/[0.08] px-7 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-md"
                >
                  Discord Server
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl md:rounded-[3rem] md:p-16">
            <h4 className="text-gradient mb-10 text-center text-2xl font-black text-white md:mb-12 md:text-3xl">
              Inquiry Protocol
            </h4>
            <ContactForm />
          </div>
        </div>

        <FooterSection currentYear={currentYear} />
      </div>
    </footer>
  );
}
