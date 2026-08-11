import { motion } from "framer-motion";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { Footer } from "../sections/Footer";
import { projects } from "../data/projects";
import { ProjectCover } from "../components/ProjectCover";
import { useTypewriter } from "../context/typewriter";

export const BuildsPage = () => {
  const { triggerTypewriter } = useTypewriter();

  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen pt-24">
      <div className="page-container">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={antigravityFadeUp} className="mb-20">
            <p className="section-eyebrow">Portfolio</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Selected Work
            </h1>
            <p className="text-body-lg mt-4 max-w-2xl">
              Three focused experiments across interactive storytelling and calm, useful intelligent tools.
            </p>
          </motion.div>

          <div className="flex flex-col gap-16">
            {projects.map((project) => (
              <motion.article
                key={project.slug}
                id={project.slug}
                variants={antigravityFadeUp}
                className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 divider pt-12"
              >
                {/* Left: Visual + Meta */}
                <div className="flex flex-col gap-6">
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#F4F1EA]">
                    <ProjectCover project={project} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 text-mono-xs" style={{ color: 'var(--color-muted)' }}>
                      <span>{project.year}</span>
                      <span>·</span>
                      <span style={{ color: project.status === 'Active' || project.status === 'Live' ? 'var(--color-accent)' : 'inherit' }}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Description */}
                <div className="flex flex-col gap-5 justify-center">
                  <div>
                    <p className="text-mono-xs mb-1" style={{ color: 'var(--color-muted)' }}>{project.type}</p>
                    <h2 className="font-sans text-2xl md:text-3xl font-semibold" style={{ color: '#111' }}>
                      {project.name}
                    </h2>
                  </div>
                  <p className="text-body-lg">
                    {project.desc}
                  </p>
                  <div className="card" style={{ borderLeft: '3px solid var(--color-accent)', borderRadius: '4px', padding: '1rem 1.25rem' }}>
                    <p className="text-mono-xs mb-1" style={{ color: 'var(--color-accent)' }}>Technical Note</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{project.detail}</p>
                  </div>
                  {project.slug === 'cmb-new-show' && (
                    <a
                      href={project.url}
                      onClick={(event) => triggerTypewriter(
                        event,
                        "external",
                        `Opening ${project.name}...\nRendering interactive preview.`,
                        () => window.location.assign(project.url),
                      )}
                      className="font-mono text-sm border-b border-[#2C2925] text-[#2C2925] pb-1 w-fit hover:pr-4 hover:text-[#D97757] hover:border-[#D97757] transition-all duration-300"
                    >
                      Open interactive story ↗
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};
