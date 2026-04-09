import React from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "../context/TypewriterContext";

export const FloatingNav = () => {
  const { triggerTypewriter } = useTypewriter();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: [0, -6, 0], opacity: 1 }}
      transition={{
        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        opacity: { delay: 0.5, duration: 0.8, ease: "easeOut" }
      }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-5 md:gap-8 px-6 md:px-8 py-3.5 bg-[#2C2925]/90 backdrop-blur-md border border-[#423E38] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] text-[#FDFDFB] font-mono text-[11px] md:text-xs uppercase tracking-widest"
    >
      <motion.button 
        whileHover={{ y: -2, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}
        onClick={(e) => triggerTypewriter(e, "top", "Scrolling paper back to origin...\nReady.")}
        className="flex items-center gap-2 group whitespace-nowrap"
      >
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D97757] rounded-full animate-pulse" />
        <span className="group-hover:text-[#D97757] transition-colors">J.Li</span>
      </motion.button>

      <div className="w-[1px] h-4 bg-[#4A4640]" />

      <motion.button whileHover={{ y: -2, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} onClick={(e) => triggerTypewriter(e, "builds", "Loading generative artifacts...\nDisplaying visual prototypes.")} className="hover:text-[#D97757] transition-colors">Builds</motion.button>
      <motion.button whileHover={{ y: -2, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} onClick={(e) => triggerTypewriter(e, "usage", "Analyzing workflow methodology...\nExtracting insights.")} className="hover:text-[#D97757] transition-colors">Usage</motion.button>
      <motion.button whileHover={{ y: -2, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} onClick={(e) => triggerTypewriter(e, "systemize", "Retrieving field notes and logs...\nOpening archive.")} className="hover:text-[#D97757] transition-colors">Notes</motion.button>
    </motion.nav>
  );
};
