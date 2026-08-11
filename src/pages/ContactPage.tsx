import { motion } from "framer-motion";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { Footer } from "../sections/Footer";
import { contactLinks, profile } from "../data/profile";

const focusAreas = [
  { label: "Building", value: "TypeInk", detail: "A personal space for publishing interactive work, experiments, and evolving ideas." },
  { label: "Shipping", value: "Interactive brand stories", detail: "Turning long-form narratives, visual systems, audio, and video into immersive web experiences." },
  { label: "Exploring", value: "Agentic workflows", detail: "Designing practical ways for AI agents to move from intent to a verified, useful outcome." },
  { label: "Refining", value: "Calm digital interfaces", detail: "Using motion and interaction with restraint so the experience stays clear and purposeful." },
];

export const ContactPage = () => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen" style={{ background: 'var(--color-surface)' }}>
      <div className="page-container pt-24 pb-24">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

          {/* Header */}
          <motion.div variants={antigravityFadeUp} className="mb-20">
            <p className="section-eyebrow">Current State</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Now
            </h1>
            <p className="text-body-lg mt-4 max-w-2xl">
              A live snapshot of what {profile.name} is building, exploring, and available to collaborate on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16">

            {/* Left: Now */}
            <motion.div variants={antigravityFadeUp}>
              <div className="flex items-center gap-3 mb-8">
                <span className="status-dot" />
                <span className="text-mono-xs" style={{ color: 'var(--color-muted)' }}>Updated August 2026</span>
              </div>

              <div className="flex flex-col gap-0">
                {focusAreas.map((item, i) => (
                  <div
                    key={i}
                    className="py-5"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    <div className="grid grid-cols-[120px_1fr] gap-4">
                      <span className="text-mono-xs pt-0.5" style={{ color: 'var(--color-muted)' }}>{item.label}</span>
                      <div>
                        <p className="font-sans font-medium mb-1" style={{ color: '#111', fontSize: '0.95rem' }}>{item.value}</p>
                        <p className="text-sm leading-relaxed" style={{ color: '#888' }}>{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 card" style={{ background: '#111', borderColor: '#333' }}>
                <p className="text-mono-xs mb-3" style={{ color: 'var(--color-accent)' }}>Philosophy of the moment</p>
                <p className="font-serif italic text-lg leading-relaxed" style={{ color: '#ddd' }}>
                  “Make the interaction expressive enough to feel alive, and clear enough to never get in the way.”
                </p>
              </div>
            </motion.div>

            {/* Right: Connect */}
            <motion.div variants={antigravityFadeUp}>
              <h2 className="section-title mb-8" style={{ fontSize: '1.75rem' }}>Connect</h2>

              <div className="flex flex-col gap-0 mb-8">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group py-5 flex items-center justify-between transition-colors duration-200"
                    style={{ borderBottom: '1px solid var(--color-border)', textDecoration: 'none', color: 'var(--color-ink)' }}
                  >
                    <div>
                      <p className="text-mono-xs mb-1" style={{ color: 'var(--color-muted)' }}>{link.label}</p>
                      <p className="font-sans group-hover:text-[var(--color-accent)] transition-colors">{link.handle}</p>
                    </div>
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" />
                    </svg>
                  </a>
                ))}
              </div>

              <div className="card mb-8 overflow-hidden" style={{ padding: 0 }}>
                <div className="grid grid-cols-[minmax(0,1fr)_120px] sm:grid-cols-[minmax(0,1fr)_160px] items-center gap-5 p-5">
                  <div>
                    <p className="text-mono-xs mb-2" style={{ color: 'var(--color-accent)' }}>WeChat</p>
                    <p className="font-sans font-medium mb-2" style={{ color: '#111' }}>{profile.wechatName}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#777' }}>
                      Scan the QR code to connect on WeChat.
                    </p>
                  </div>
                  <img
                    src={profile.wechatQrImage}
                    alt={`WeChat QR code for ${profile.wechatName}`}
                    className="w-full rounded-md border border-[#EAE5D9] bg-white"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <p className="text-mono-xs mb-3" style={{ color: 'var(--color-accent)' }}>Open to</p>
                <ul className="flex flex-col gap-2">
                  {["Interactive web and storytelling projects", "AI product and workflow experiments", "Design and engineering collaborations", "Interesting problems without obvious solutions"].map((item, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#666' }}>
                      <span style={{ color: 'var(--color-accent)', marginTop: '2px' }}>·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};
