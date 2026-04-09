import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTypewriter } from "../context/TypewriterContext";

export const FloatingNav = () => {
  const { triggerTypewriter } = useTypewriter();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (e: React.MouseEvent, path: string, promptText: string) => {
    e.preventDefault();
    triggerTypewriter(e, "external", promptText);
    
    // Simulate UI delay giving the typewriter overlay time to enter the screen
    // Then dispatch route change synchronously beneath it.
    setTimeout(() => {
      navigate(path);
    }, 450); 
  };

  const currentPath = location.pathname;

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: [0, -6, 0], opacity: 1 }}
      transition={{
        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        opacity: { delay: 0.5, duration: 0.8, ease: "easeOut" }
      }}
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-4 md:gap-7 px-5 md:px-8 py-3.5 bg-[#2C2925]/90 backdrop-blur-md border border-[#423E38] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] text-[#FDFDFB] font-mono text-[9px] md:text-[11px] uppercase tracking-widest whitespace-nowrap"
    >
      <Link 
        to="/"
        className="flex items-center gap-2 group mr-2"
      >
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D97757] rounded-full animate-pulse" />
        <span className={`group-hover:text-[#D97757] transition-colors ${currentPath === '/' ? 'text-[#D97757]' : ''}`}>J.Li</span>
      </Link>

      <div className="w-[1px] h-3 md:h-4 bg-[#4A4640] hidden sm:block" />

      <a href="/builds" onClick={(e) => handleNav(e, "/builds", "Loading generative artifacts...\nDisplaying visual prototypes.")} className={`hover:text-[#D97757] transition-colors cursor-pointer ${currentPath === '/builds' ? 'text-[#D97757]' : ''}`}>Builds</a>
      <a href="/usage" onClick={(e) => handleNav(e, "/usage", "Analyzing workflow methodology...\nExtracting insights.")} className={`hover:text-[#D97757] transition-colors cursor-pointer hidden sm:block ${currentPath === '/usage' ? 'text-[#D97757]' : ''}`}>Usage</a>
      <a href="/notes" onClick={(e) => handleNav(e, "/notes", "Retrieving field notes and logs...\nOpening archive.")} className={`hover:text-[#D97757] transition-colors cursor-pointer ${currentPath.includes('/notes') ? 'text-[#D97757]' : ''}`}>Notes</a>
      <a href="/manifesto" onClick={(e) => handleNav(e, "/manifesto", "Initializing manifesto parameters...\nReading philosophical anchors.")} className={`hover:text-[#D97757] transition-colors cursor-pointer hidden sm:block ${currentPath === '/manifesto' ? 'text-[#D97757]' : ''}`}>Manifesto</a>
      <a href="/now" onClick={(e) => handleNav(e, "/now", "Establishing connection to current state...\nReady.")} className={`hover:text-[#D97757] transition-colors cursor-pointer ${currentPath === '/now' ? 'text-[#D97757]' : ''}`}>Now</a>
    </motion.nav>
  );
};
