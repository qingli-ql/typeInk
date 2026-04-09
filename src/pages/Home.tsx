import React from "react";
import { useParallax } from "../hooks/useParallax";
import { BackgroundGlow } from "../components/BackgroundGlow";
import { Hero } from "../sections/Hero";
import { Builds } from "../sections/Builds";
import { Usage } from "../sections/Usage";
import { Systemize } from "../sections/Systemize";
import { Contact } from "../sections/Contact";
import { Footer } from "../sections/Footer";

export const Home = () => {
  const { bgX, bgY, fgX, fgY } = useParallax();

  return (
    <>
      <BackgroundGlow bgX={bgX} bgY={bgY} />
      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero fgX={fgX} fgY={fgY} />
        <Builds />
        <Usage />
        <Systemize />
        <Contact />
      </main>
      <Footer />
    </>
  );
};
