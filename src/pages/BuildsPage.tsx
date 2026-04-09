import { motion } from "framer-motion";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { Footer } from "../sections/Footer";

const projects = [
  {
    name: "Tone Studio",
    type: "Visual Tool",
    status: "In Progress",
    year: "2026",
    tags: ["AI", "Color", "Design"],
    desc: "An AI-native photo grading concept. Instead of sliders, you describe the mood—'melancholic dusk', 'brutalist concrete'—and a semantic preset engine does the rest. Tone Studio treats the edit as a conversation between intent and output.",
    detail: "Built with a local SLM pipeline for inference, a custom LUT rendering engine, and a bespoke UI inspired by early film editing consoles.",
    color: "#E6E0D8",
  },
  {
    name: "Cognitive Mirror",
    type: "Personal Agent",
    status: "Active",
    year: "2025",
    tags: ["SLM", "Memory", "Introspection"],
    desc: "A personal AI agent trained on 2+ years of daily notes, voice memos, and reading highlights. It surfaces forgotten ideas, identifies recurring cognitive patterns, and acts as a sounding board for half-formed thoughts.",
    detail: "Runs locally via Ollama. Uses a custom RAG architecture with a personal knowledge graph as its memory backbone. Zero cloud dependency.",
    color: "#D8E1E6",
  },
  {
    name: "Agent Workflow Lab",
    type: "AI Workbench",
    status: "Research",
    year: "2026",
    tags: ["Orchestration", "Agents", "Evaluation"],
    desc: "A structured environment for composing, testing, and evaluating multi-step AI agent workflows. Each 'skill' is a discrete, reusable module that can be chained into arbitrarily complex pipelines.",
    detail: "Implements an evaluation loop with automated scoring, human-in-the-loop override, and a trace inspector for debugging intermediate states.",
    color: "#E6D8DB",
  },
  {
    name: "Ephemeral UI",
    type: "Interaction Prototype",
    status: "Concept",
    year: "2025",
    tags: ["Zero-UI", "AI", "Interaction"],
    desc: "A research prototype exploring interfaces that generate themselves based on user intent and dissolve when the task is done. No persistent chrome. No navigation. Just the minimum surface area required to accomplish a goal.",
    detail: "Inspired by Alan Kay's notion of software as a medium. Implemented as a generative UI layer that interprets natural language and renders context-appropriate primitives.",
    color: "#E0E6D8",
  },
];

export const BuildsPage = () => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen pt-24">
      <div className="page-container">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={antigravityFadeUp} className="mb-20">
            <p className="section-eyebrow">Portfolio</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              What I Build with AI
            </h1>
            <p className="text-body-lg mt-4 max-w-2xl">
              These are not "AI wrappers." Each project explores a different dimension of what becomes possible when machine intelligence is woven into the creative process from the start.
            </p>
          </motion.div>

          <div className="flex flex-col gap-16">
            {projects.map((project, idx) => (
              <motion.article
                key={idx}
                variants={antigravityFadeUp}
                className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 divider pt-12"
              >
                {/* Left: Visual + Meta */}
                <div className="flex flex-col gap-6">
                  <div
                    className="w-full aspect-[4/3] rounded-lg flex items-end p-6"
                    style={{ background: project.color }}
                  >
                    <span className="text-mono-xs opacity-40">{project.name}</span>
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
                      <span style={{ color: project.status === 'Active' ? 'var(--color-accent)' : 'inherit' }}>
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
