import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParallax } from "../hooks/useParallax";
import { useTypewriter } from "../context/TypewriterContext";
import { BackgroundGlow } from "../components/BackgroundGlow";
import { Hero } from "../sections/Hero";
import { Footer } from "../sections/Footer";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { IconArrow } from "../components/icons";

const navCards = [
  {
    path: "/builds",
    label: "Builds",
    title: "What I'm Building",
    desc: "Prototypes and products at the intersection of AI and interaction design.",
    accent: "#E6E0D8",
    prompt: "Loading generative artifacts...\nDisplaying visual prototypes.",
  },
  {
    path: "/usage",
    label: "Usage",
    title: "How I Use AI",
    desc: "The cognitive protocols and daily rituals that shape my AI-augmented workflow.",
    accent: "#D8E1E6",
    prompt: "Analyzing workflow methodology...\nExtracting insights.",
  },
  {
    path: "/notes",
    label: "Notes",
    title: "Learning & Systems",
    desc: "Field notes, build logs, and research—turning raw thought into reprodicible knowledge.",
    accent: "#E0E6D8",
    prompt: "Retrieving field notes and logs...\nOpening archive.",
  },
  {
    path: "/manifesto",
    label: "Manifesto",
    title: "Zero-UI & the Invisible Agent",
    desc: "A design philosophy for software that disappears—and machine intelligence that just works.",
    accent: "#E6D8DB",
    prompt: "Initializing manifesto parameters...\nReading philosophical anchors.",
  },
  {
    path: "/now",
    label: "Now",
    title: "Current State",
    desc: "What I'm building, thinking about, and obsessing over at this precise moment in time.",
    accent: "#E6E2D8",
    prompt: "Establishing connection to current state...\nReady.",
  },
];

export const Home = () => {
  const { bgX, bgY, fgX, fgY } = useParallax();
  const { triggerTypewriter } = useTypewriter();
  const navigate = useNavigate();

  const handleNav = (e: React.MouseEvent, path: string, prompt: string) => {
    triggerTypewriter(e, "external", prompt);
    setTimeout(() => navigate(path), 450);
  };

  return (
    <>
      <BackgroundGlow bgX={bgX} bgY={bgY} />
      <main className="relative z-10 w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero fgX={fgX} fgY={fgY} />

        {/* Navigation Cards Section */}
        <section className="section-spacing divider">
          <div className="page-container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              <motion.div variants={antigravityFadeUp} className="mb-12">
                <p className="section-eyebrow">Explore</p>
                <h2 className="section-title">Chapters</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {navCards.map((card) => (
                  <motion.a
                    key={card.path}
                    href={card.path}
                    variants={antigravityFadeUp}
                    onClick={(e) => handleNav(e, card.path, card.prompt)}
                    className="card group cursor-pointer flex flex-col gap-4 no-underline"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div
                      className="w-full h-24 rounded-md flex items-end p-3"
                      style={{ background: card.accent }}
                    >
                      <span className="text-mono-xs opacity-50">{card.label}</span>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <h3
                        className="font-sans font-semibold text-base group-hover:text-[var(--color-accent)] transition-colors"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed flex-1" style={{ color: '#777' }}>
                        {card.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-mono-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent)' }}>
                      Open <IconArrow />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};
