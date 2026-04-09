import React from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "../context/TypewriterContext";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";

export const Systemize = () => {
  const { triggerTypewriter } = useTypewriter();

  const sections = [
    { category: "Field Notes", items: ["Prompt Engineering as Interface Design", "The Psychology of Latency in LLMs"] },
    { category: "Build Logs", items: ["V0.1: Writing a custom MCP server", "Refactoring Tone Studio's state logic"] },
    { category: "Research", items: ["Evaluating Small Models for Personal Use", "Zero-UI conceptual frameworks"] }
  ];

  return (
    <section id="systemize" className="py-32 max-w-7xl mx-auto px-6 md:px-12 border-t border-[#EAE5D9]">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={antigravityFadeUp} className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl">How I Learn & Systemize</h2>
          <p className="text-[#737373] mt-4">Turning raw thoughts into reproducible logic.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <motion.div key={idx} variants={antigravityFadeUp} className="bg-[#FFFDFC] p-8 border border-[#EAE5D9] rounded-xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-shadow duration-500">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#111] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97757]" />
                {section.category}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li 
                    key={i} 
                    className="text-sm text-[#555] hover:text-[#D97757] cursor-pointer transition-colors leading-relaxed"
                    onClick={(e) => triggerTypewriter(e, "external", `Retrieving log entry...\nSubject: ${item}`)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
