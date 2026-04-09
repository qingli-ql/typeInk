import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { TypewriterProvider, useTypewriter } from "./context/TypewriterContext";
import { FloatingNav } from "./components/FloatingNav";
import { TypewriterOverlay } from "./components/TypewriterOverlay";
import { TypewriterToggle } from "./components/TypewriterToggle";

import { Home } from "./pages/Home";
import { Manifesto } from "./pages/Manifesto";
import { BuildsPage } from "./pages/BuildsPage";
import { UsagePage } from "./pages/UsagePage";
import { SystemizePage } from "./pages/SystemizePage";
import { ContactPage } from "./pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { transition } = useTypewriter();

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <TypewriterToggle />
      <FloatingNav />
      <TypewriterOverlay />
      
      <motion.div
        animate={{
          scale: transition.active ? 0.94 : 1,
          filter: transition.active ? "blur(10px) grayscale(20%)" : "blur(0px) grayscale(0%)",
          opacity: transition.active ? 0.2 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col min-h-screen w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <TypewriterProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/usage" element={<UsagePage />} />
            <Route path="/notes" element={<SystemizePage />} />
            <Route path="/now" element={<ContactPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TypewriterProvider>
  );
}