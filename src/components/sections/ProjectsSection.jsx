import { ProjectCard } from '../ui/project-card';

export default function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="reveal section-optimized px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 text-center lg:mb-24 lg:flex-row lg:items-end lg:text-left">
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-cyan-400">Portfolio</h3>
            <h2 className="text-4xl font-black text-white md:text-6xl">Featured Projects</h2>
          </div>
          <a
            href="https://github.com/ZarScape"
            target="_blank"
            rel="noreferrer"
            className="border-b border-white/15 pb-2 text-xs font-black uppercase tracking-widest text-cyan-300 transition-all hover:border-cyan-300 hover:text-white"
          >
            GitHub Portfolio -&gt;
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              imgSrc={project.image}
              link={project.link}
              linkText="Open Project"
            >
              <div className="mb-6 flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={`${project.title}-${tag}`}
                    className="project-tag-chip inline-flex items-center rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ProjectCard>
          ))}
        </div>
      </div>
    </section>
  );
}
