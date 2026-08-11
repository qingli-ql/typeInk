
import { motion, MotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "../context/typewriter";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { VisualAmbientSystem } from "../components/VisualAmbientSystem";
import { IconArrow } from "../components/icons";
import { profile } from "../data/profile";

interface Props {
  fgX: MotionValue<number>;
  fgY: MotionValue<number>;
}

export const Hero = ({ fgX, fgY }: Props) => {
  const { triggerTypewriter } = useTypewriter();
  const navigate = useNavigate();

  const openBuilds = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerTypewriter(event, "builds", "Loading selected work...", () => navigate('/builds'));
  };

  return (
    <section id="top" className="min-h-[92vh] max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 flex items-center relative overflow-hidden xl:overflow-visible">
      <div className="grid w-full grid-cols-1 gap-16 xl:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.7fr)] xl:items-center">
        <motion.div 
          style={{ x: fgX, y: fgY }}
          initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 max-w-4xl"
        >
          <motion.p variants={antigravityFadeUp} className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[#777]">
            {profile.name} · AI developer &amp; designer
          </motion.p>

          <motion.h1 variants={antigravityFadeUp} className="font-serif text-5xl md:text-7xl xl:text-[76px] leading-[1.05] tracking-[-0.025em] text-[#111] mb-10">
            I build useful things
            <br className="hidden sm:block" /> with AI.
          </motion.h1>

          <motion.div variants={antigravityFadeUp} className="max-w-2xl">
            <p className="text-lg md:text-xl text-[#555] leading-relaxed">
              I design and ship interactive web experiences and AI-assisted workflows—from an early idea to a working product people can actually use.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-8">
              <button
                onClick={openBuilds}
                className="flex items-center gap-3 font-mono text-sm border-b border-[#2C2925] text-[#2C2925] pb-1 w-fit hover:pr-4 hover:text-[#D97757] hover:border-[#D97757] transition-all duration-300 cursor-pointer"
              >
                View selected work <IconArrow />
              </button>
              <a
                href="/now"
                className="font-mono text-sm text-[#777] hover:text-[#D97757] transition-colors"
              >
                Contact / Now
              </a>
            </div>
          </motion.div>

          <motion.div variants={antigravityFadeUp} className="mt-20 flex items-center gap-3 text-sm text-[#888]">
            <span className="h-2 w-2 rounded-full bg-[#D97757]" />
            Currently building TypeInk and interactive stories.
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          className="hidden xl:flex items-center justify-end"
          aria-label="Live TypeInk build activity"
        >
          <VisualAmbientSystem />
        </motion.div>
      </div>
    </section>
  );
};
