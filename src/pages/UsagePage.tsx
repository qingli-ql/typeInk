import { motion } from "framer-motion";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { Footer } from "../sections/Footer";

const protocols = [
  {
    category: "01 · Thinking",
    title: "AI as a Cognitive Expander",
    icon: "◈",
    items: [
      { action: "Morning synthesis", detail: "Each morning, a local agent digests overnight notes and surfaces 3 high-priority questions I should be exploring." },
      { action: "Socratic sparring", detail: "Before committing to a design decision or technical argument, I run it through a structured adversarial prompt that challenges its assumptions." },
      { action: "Blind spot audits", detail: "Weekly sessions where I give the agent my recent writing and ask it: 'What am I not seeing? What would a contrarian say?'" },
    ],
  },
  {
    category: "02 · Creating",
    title: "AI as a Creative Partner",
    icon: "◉",
    items: [
      { action: "Intent-first ideation", detail: "I describe an outcome, not a spec. The model generates 5 radically different structural approaches, and I cherry-pick the DNA from each." },
      { action: "Code as conversation", detail: "I rarely write greenfield code solo. I describe the problem, let AI scaffold the skeleton, then deeply refactor the logic myself." },
      { action: "Visual language translation", detail: "I describe aesthetic references in natural language ('Bauhaus meets brutalist terminal') and iterate through generated moodboards before touching Figma." },
    ],
  },
  {
    category: "03 · Organizing",
    title: "AI as a Knowledge Curator",
    icon: "◇",
    items: [
      { action: "Semantic indexing", detail: "Every note is embedded and stored in a local vector database. The agent can retrieve any concept across years of writing in milliseconds." },
      { action: "Connection surfacing", detail: "Periodically, the system generates a graph of concept clusters—ideas I've written about in different contexts that share deep structural similarity." },
      { action: "Decay prevention", detail: "A reviewing agent flags notes older than 30 days that haven't been referenced and asks: is this still relevant? What did we learn?" },
    ],
  },
  {
    category: "04 · Refining",
    title: "AI as a Quality Loop",
    icon: "◎",
    items: [
      { action: "Automated ablation", detail: "Before shipping, I run each component through a structured 'remove one assumption at a time' loop. AI generates the test, I evaluate the result." },
      { action: "Readability testing", detail: "Prose is run through a Flesch-Kincaid benchmark agent that suggests targeted edits to improve clarity without losing voice." },
      { action: "Regression detection", detail: "Commit hooks run a lightweight semantic diff that flags when a change shifts the *meaning* of a module, not just its syntax." },
    ],
  },
];

export const UsagePage = () => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen" style={{ background: 'var(--color-dark)', color: '#FDFDFB' }}>
      <div className="page-container pt-24 pb-24">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={antigravityFadeUp} className="mb-20">
            <p className="section-eyebrow" style={{ color: 'var(--color-accent)' }}>Cognitive Protocols</p>
            <h1 className="section-title" style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              How I Use AI<br /><i style={{ color: 'var(--color-accent)' }}>Every Single Day.</i>
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: '#999' }}>
              This is not a list of tools. It's a set of cognitive protocols—repeatable patterns for thinking, creating, organizing, and refining—that I've developed by living inside AI systems full-time.
            </p>
          </motion.div>

          <div className="flex flex-col gap-20">
            {protocols.map((proto, idx) => (
              <motion.section key={idx} variants={antigravityFadeUp}>
                <div className="flex items-start gap-4 mb-10 pb-4" style={{ borderBottom: '1px solid #333' }}>
                  <span className="text-3xl" style={{ color: 'var(--color-accent)' }}>{proto.icon}</span>
                  <div>
                    <p className="text-mono-xs mb-1" style={{ color: '#666' }}>{proto.category}</p>
                    <h2 className="text-xl md:text-2xl font-sans font-semibold" style={{ color: '#eee' }}>{proto.title}</h2>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  {proto.items.map((item, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-8">
                      <span className="text-mono-xs pt-1" style={{ color: 'var(--color-accent)' }}>→ {item.action}</span>
                      <p className="leading-relaxed" style={{ color: '#aaa', fontSize: '0.95rem' }}>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </div>
      <div style={{ background: '#161412' }}>
        <Footer />
      </div>
    </main>
  );
};
