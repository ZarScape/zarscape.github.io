export default function ConnectSection({ socials }) {
  const visibleSocials = socials.filter((social) => social.name !== 'Email');

  return (
    <section id="connect" className="reveal section-optimized px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:mb-20">
          <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-cyan-400">Network Hub</h3>
          <h2 className="text-4xl font-black text-white md:text-6xl">Connect with Me</h2>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4 md:gap-6">
          {visibleSocials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="connect-card social-icon relative flex w-[160px] flex-col items-center gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl md:w-[180px] md:p-8"
            >
              {social.status ? (
                <span className="absolute right-4 top-4 rounded-full bg-cyan-300 px-2 py-0.5 text-[7px] font-black uppercase tracking-tighter text-black">
                  {social.status}
                </span>
              ) : null}
              <div className={`icon-container ${social.name.toLowerCase()}-icon`}>
                <div
                  className="connect-icon text-cyan-100"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: social.icon }}
                />
              </div>
              <div className="icon-label text-xs font-black uppercase tracking-widest text-white md:text-sm">
                {social.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
