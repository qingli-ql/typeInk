import React from "react";
import { motion, MotionValue } from "framer-motion";
import { useTypewriter } from "../context/TypewriterContext";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { VisualAmbientSystem } from "../components/VisualAmbientSystem";
import { IconArrow } from "../components/icons";

interface Props {
  fgX: MotionValue<number>;
  fgY: MotionValue<number>;
}

export const Hero = ({ fgX, fgY }: Props) => {
  const { triggerTypewriter } = useTypewriter();

  return (
    <section id="top" className="min-h-screen max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 flex items-center relative overflow-hidden xl:overflow-visible">
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-12 w-full">
        
        {/* Left Column: Text & Call to Action */}
        <motion.div 
          style={{ x: fgX, y: fgY }}
          initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 flex flex-col justify-center"
        >
          <motion.p variants={antigravityFadeUp} className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#737373] mb-8">
            AI in My Life
          </motion.p>
          <motion.h1 variants={antigravityFadeUp} className="font-serif text-5xl md:text-7xl xl:text-[85px] leading-[1.1] tracking-tight text-[#111] mb-8">
            AI is my cognitive <br className="hidden md:block" />
            <i className="text-[#D97757]">exoskeleton.</i>
          </motion.h1>
          <motion.div variants={antigravityFadeUp} className="max-w-xl mt-4 md:mt-8">
            <p className="text-xl md:text-2xl text-[#555] leading-relaxed">
              I am an AI developer and designer. I don't just "talk" about AI; I live inside it. My work focuses on bridging the gap between raw machine intelligence and intuitive, human-centered systems.
            </p>
            <button
              onClick={(e) => triggerTypewriter(e, "builds", "Initializing manifesto parameters...\nLet's see what we built.")}
              className="mt-12 flex items-center gap-3 font-mono text-sm border-b border-[#2C2925] text-[#2C2925] pb-1 w-fit hover:pr-4 hover:text-[#D97757] hover:border-[#D97757] transition-all duration-300 cursor-pointer"
            >
              View what I build <IconArrow />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual System */}
        <div className="hidden xl:flex items-center justify-end">
          <VisualAmbientSystem />
        </div>

      </div>
    </section>
  );
};
