import React from "react";
import { motion } from "framer-motion";
import { TypewriterProvider, useTypewriter } from "./context/TypewriterContext";
import { useParallax } from "./hooks/useParallax";
import { FloatingNav } from "./components/FloatingNav";
import { TypewriterOverlay } from "./components/TypewriterOverlay";
import { BackgroundGlow } from "./components/BackgroundGlow";
import { Hero } from "./sections/Hero";
import { Builds } from "./sections/Builds";
import { Usage } from "./sections/Usage";
import { Systemize } from "./sections/Systemize";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

function AppContent() {
  const { bgX, bgY, fgX, fgY } = useParallax();
  const { transition } = useTypewriter();

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#1A1A1A] selection:bg-[#D97757] selection:text-[#FDFDFB] font-sans relative overflow-x-hidden">
      
      {/* Absolute Overlays */}
      <FloatingNav />
      <TypewriterOverlay />
      <BackgroundGlow bgX={bgX} bgY={bgY} />

      {/* Main scrolling wrapper */}
      <motion.div
        animate={{
          scale: transition.active ? 0.94 : 1,
          filter: transition.active ? "blur(10px) grayscale(20%)" : "blur(0px) grayscale(0%)",
          opacity: transition.active ? 0.2 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
      >
        <main className="relative z-10">
          <Hero fgX={fgX} fgY={fgY} />
          <Builds />
          <Usage />
          <Systemize />
          <Contact />
        </main>
        <Footer />
      </motion.div>

    </div>
  );
}

export default function App() {
  return (
    <TypewriterProvider>
      <AppContent />
    </TypewriterProvider>
  );
}