
import { motion } from "framer-motion";
import { useTypewriter } from "../context/TypewriterContext";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { IconArrow } from "../components/icons";

export const Contact = () => {
  const { triggerTypewriter } = useTypewriter();

  return (
    <section id="now" className="py-32 bg-[#EFECE5] text-[#111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-16">

          <motion.div variants={antigravityFadeUp}>
            <h2 className="font-serif text-3xl mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#D97757] rounded-full animate-pulse" /> Now
            </h2>
            <div className="space-y-6 text-[#555] leading-relaxed">
              <p>
                <strong>Building: </strong> Currently focused on exploring the boundaries of Agentic Workflows and Zero-UI environments.
              </p>
              <p>
                <strong>Thinking about: </strong> How to make AI tooling feel less like a chatbox and more like a physical extension of the hand.
              </p>
            </div>
          </motion.div>

          <motion.div variants={antigravityFadeUp}>
            <h2 className="font-serif text-3xl mb-8">Connect</h2>
            <div className="flex flex-col gap-4 font-mono text-sm uppercase tracking-widest">
              <button 
                className="flex items-center justify-between border-b border-[#CCC] pb-4 hover:text-[#D97757] hover:border-[#D97757] transition-all w-full text-left"
                onClick={(e) => triggerTypewriter(e, "external", "Opening secure mail client...\nRouting to hello@domain.com")}
              >
                <span>Email</span> <IconArrow />
              </button>
              <button 
                className="flex items-center justify-between border-b border-[#CCC] pb-4 hover:text-[#D97757] hover:border-[#D97757] transition-all w-full text-left"
                onClick={(e) => triggerTypewriter(e, "external", "Connecting to GitHub repository...\nFetching public branches.")}
              >
                <span>GitHub</span> <IconArrow />
              </button>
              <button 
                className="flex items-center justify-between border-b border-[#CCC] pb-4 hover:text-[#D97757] hover:border-[#D97757] transition-all w-full text-left"
                onClick={(e) => triggerTypewriter(e, "external", "Establishing connection to social matrix...\nReady.")}
              >
                <span>Social</span> <IconArrow />
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
