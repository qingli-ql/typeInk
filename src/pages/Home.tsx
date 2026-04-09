import React from "react";
import { useParallax } from "../hooks/useParallax";
import { BackgroundGlow } from "../components/BackgroundGlow";
import { Hero } from "../sections/Hero";

export const Home = () => {
  const { bgX, bgY, fgX, fgY } = useParallax();

  return (
    <>
      <BackgroundGlow bgX={bgX} bgY={bgY} />
      <main className="relative z-10 w-full overflow-x-hidden min-h-[90vh]">
        <Hero fgX={fgX} fgY={fgY} />
      </main>
    </>
  );
};
