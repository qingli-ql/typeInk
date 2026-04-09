import { motion } from "framer-motion";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { Footer } from "../sections/Footer";

const categories = [
  {
    label: "Field Notes",
    color: "var(--color-accent)",
    entries: [
      {
        title: "Prompt Engineering as Interface Design",
        date: "Apr 2026",
        preview: "The way you structure a prompt is not dissimilar to the way a good UI structures information hierarchy. Both are about reducing cognitive load at the point of decision.",
        readTime: "8 min",
      },
      {
        title: "The Psychology of Latency in LLMs",
        date: "Mar 2026",
        preview: "We've been conditioned by decades of near-instant UI feedback. When a model takes 3 seconds to respond, it feels broken—even when the output is better.",
        readTime: "5 min",
      },
      {
        title: "On Hallucination as Signal",
        date: "Feb 2026",
        preview: "What if a model's confident incorrectness tells us something important about the gaps in our own knowledge representations?",
        readTime: "6 min",
      },
    ],
  },
  {
    label: "Build Logs",
    color: "#5F9EA0",
    entries: [
      {
        title: "V0.1: Writing a Custom MCP Server",
        date: "Apr 2026",
        preview: "I needed a way to expose my local knowledge graph to Claude as a tool. Building a minimal MCP server from scratch was less scary than it sounds.",
        readTime: "12 min",
      },
      {
        title: "Refactoring Tone Studio's State Logic",
        date: "Mar 2026",
        preview: "Moving from global state to a context-based architecture taught me something about how AI tools should think about memory—transiently and at different scopes.",
        readTime: "10 min",
      },
    ],
  },
  {
    label: "Research Notes",
    color: "#8B9E8B",
    entries: [
      {
        title: "Evaluating Small Models for Personal Use",
        date: "Mar 2026",
        preview: "A systematic comparison of 7B-13B parameter models for daily workflow tasks. The winner wasn't the most capable—it was the most predictably aligned.",
        readTime: "15 min",
      },
      {
        title: "Zero-UI Conceptual Frameworks",
        date: "Feb 2026",
        preview: "Synthesizing existing literature on invisible interfaces, ambient computing, and agent-native UI patterns. The design vocabulary barely exists yet.",
        readTime: "9 min",
      },
      {
        title: "Memory Architectures for Personal AI",
        date: "Jan 2026",
        preview: "A survey of RAG, vector search, and graph-based approaches for building AI systems that remember context across months—not just tokens.",
        readTime: "11 min",
      },
    ],
  },
];

export const SystemizePage = () => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen" style={{ background: 'var(--color-paper)' }}>
      <div className="page-container pt-24 pb-12">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={antigravityFadeUp} className="mb-20">
            <p className="section-eyebrow">Knowledge Archive</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Learning & Systemizing
            </h1>
            <p className="text-body-lg mt-4 max-w-xl">
              Turning raw experience into reproducible patterns. These are my working notes, build logs, and research synthesized into shareable form.
            </p>
          </motion.div>

          <div className="flex flex-col gap-20">
            {categories.map((cat, catIdx) => (
              <motion.section key={catIdx} variants={antigravityFadeUp}>
                <div className="flex items-center gap-3 mb-10">
                  <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  <h2 className="text-mono-xs" style={{ color: 'var(--color-ink)' }}>{cat.label}</h2>
                </div>
                <div className="flex flex-col">
                  {cat.entries.map((entry, i) => (
                    <article
                      key={i}
                      className="group py-8 cursor-pointer divider"
                      style={{ borderBottom: '1px solid var(--color-border)' }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-mono-xs" style={{ color: 'var(--color-muted)' }}>{entry.date}</span>
                            <span className="text-mono-xs" style={{ color: 'var(--color-muted)' }}>·</span>
                            <span className="text-mono-xs" style={{ color: 'var(--color-muted)' }}>{entry.readTime} read</span>
                          </div>
                          <h3
                            className="font-sans text-lg md:text-xl font-medium mb-3 transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                            style={{ color: '#111' }}
                          >
                            {entry.title}
                          </h3>
                          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#777' }}>
                            {entry.preview}
                          </p>
                        </div>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: cat.color }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};
