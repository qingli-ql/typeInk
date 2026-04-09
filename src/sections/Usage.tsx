import React from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "../context/TypewriterContext";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { IconLink } from "../components/icons";

export const Usage = () => {
  const { triggerTypewriter } = useTypewriter();

  const items = [
    { title: "Think with AI", desc: "Expanding the boundaries of initial ideation and challenging my cognitive blind spots." },
    { title: "Create with AI", desc: "Bridging the gap between raw intent and polished execution in code and design." },
    { title: "Organize with AI", desc: "Structuring chaotic daily inputs into a queryable, semantic personal knowledge graph." },
    { title: "Refine with AI", desc: "Iterating existing systems through rigorous automated feedback and ablation loops." }
  ];

  return (
    <section id="usage" className="py-32 bg-[#1C1A18] text-[#FDFDFB]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.h2 variants={antigravityFadeUp} className="font-serif text-3xl md:text-4xl mb-16 text-white">How I Use AI</motion.h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 border-t border-[#333] pt-12">
            {items.map((item, idx) => (
              <motion.div 
                key={idx} variants={antigravityFadeUp} 
                className="border-b border-[#333] pb-8 cursor-pointer group"
                onClick={(e) => triggerTypewriter(e, "external", `Loading cognitive protocol: ${item.title}...\nExecuting.`)}
              >
                <div className="flex justify-between items-center mb-3 text-[#D97757]">
                  <h3 className="font-mono text-sm uppercase tracking-widest">{item.title}</h3>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity"><IconLink /></span>
                </div>
                <p className="text-[#999] leading-relaxed text-lg font-serif italic">"{item.desc}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
