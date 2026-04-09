import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTypewriter } from "../context/TypewriterContext";

export const FloatingNav = () => {
  const { triggerTypewriter } = useTypewriter();
  const location = useLocation();

  const isHome = location.pathname === "/";

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
      <Link 
        to="/"
        onClick={(e) => {
          if (isHome) {
            e.preventDefault();
            triggerTypewriter(e, "top", "Scrolling paper back to origin...\nReady.");
          }
        }}
        className="flex items-center gap-2 group whitespace-nowrap"
      >
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D97757] rounded-full animate-pulse" />
        <span className="group-hover:text-[#D97757] transition-colors">J.Li</span>
      </Link>

      <div className="w-[1px] h-4 bg-[#4A4640]" />

      <Link 
        to="/manifesto" 
        className={`hover:text-[#D97757] transition-colors ${!isHome ? 'text-[#D97757]' : ''}`}
      >
        Manifesto
      </Link>
      
      {isHome && (
        <>
          <button onClick={(e) => triggerTypewriter(e, "builds", "Loading generative artifacts...\nDisplaying visual prototypes.")} className="hover:text-[#D97757] transition-colors">Builds</button>
          <button onClick={(e) => triggerTypewriter(e, "systemize", "Retrieving field notes and logs...\nOpening archive.")} className="hover:text-[#D97757] transition-colors">Notes</button>
        </>
      )}
    </motion.nav>
  );
};
