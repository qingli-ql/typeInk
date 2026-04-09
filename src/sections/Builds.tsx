import React from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "../context/TypewriterContext";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { IconArrow } from "../components/icons";

export const Builds = () => {
  const { triggerTypewriter } = useTypewriter();

  const products = [
    { name: "Tone Studio", type: "Online Color Tool", desc: "An AI-native photo grading concept with semantic presets and intuitive visual controls.", color: "bg-[#E6E0D8]" },
    { name: "Cognitive Mirror", type: "Personal Agent", desc: "A localized SLM trained on my daily notes to act as a conversational sounding board.", color: "bg-[#D8E1E6]" },
    { name: "Agent Workflow Lab", type: "AI Workbench", desc: "Structured orchestration for complex tasks using reusable skills and evaluation loops.", color: "bg-[#E6D8DB]" },
    { name: "Ephemeral UI", type: "Interaction Prototype", desc: "Interfaces that generate themselves based on intent and dissolve when the task is done.", color: "bg-[#E0E6D8]" }
  ];

  return (
    <section id="builds" className="py-32 max-w-7xl mx-auto px-6 md:px-12 border-t border-[#EAE5D9]">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.h2 variants={antigravityFadeUp} className="font-serif text-3xl md:text-4xl mb-16">What I Build with AI</motion.h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {products.map((product, idx) => (
            <motion.div 
              key={idx} variants={antigravityFadeUp} 
              className="group cursor-pointer"
              onClick={(e) => triggerTypewriter(e, "external", `Opening documentation for ${product.name}...\nRendering interactive preview.`)}
            >
              <div className={`w-full aspect-[4/3] ${product.color} rounded-lg mb-6 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}>
                <span className="font-mono text-xs opacity-40 uppercase tracking-widest text-[#2C2925]">Visual Preview</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-sans text-xl font-medium text-[#111] group-hover:text-[#D97757] transition-colors">{product.name}</h3>
                  <p className="font-mono text-xs text-[#737373] uppercase tracking-wider mt-1">{product.type}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 text-[#D97757]">
                  <IconArrow />
                </div>
              </div>
              <p className="text-[#555] mt-4 text-sm leading-relaxed">{product.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
