import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParallax } from "../hooks/useParallax";
import { useTypewriter } from "../context/TypewriterContext";
import { BackgroundGlow } from "../components/BackgroundGlow";
import { Hero } from "../sections/Hero";
import { Builds } from "../sections/Builds";
import { Contact } from "../sections/Contact";
import { Footer } from "../sections/Footer";
import { antigravityFadeUp } from "../utils/animations";
import { IconArrow } from "../components/icons";

export const Home = () => {
  const { bgX, bgY, fgX, fgY } = useParallax();
  const { triggerTypewriter } = useTypewriter();
  const navigate = useNavigate();

  const handleNav = (e: React.MouseEvent, path: string, prompt: string) => {
    triggerTypewriter(e, "external", prompt);
    setTimeout(() => navigate(path), 450);
  };

  return (
    <>
      <BackgroundGlow bgX={bgX} bgY={bgY} />
      <main className="relative z-10 w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero fgX={fgX} fgY={fgY} />

        {/* Builds Preview Section */}
        <div className="relative">
          <Builds />
          <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 -mt-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={antigravityFadeUp}
            >
              <button
                onClick={(e) => handleNav(e, "/builds", "Loading generative artifacts...\\nDisplaying all builds.")}
                className="flex items-center gap-3 font-mono text-sm border-b border-[#2C2925] text-[#2C2925] pb-1 w-fit hover:pr-4 hover:text-[#D97757] hover:border-[#D97757] transition-all duration-300 cursor-pointer"
              >
                View all builds <IconArrow />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Now / Contact Section */}
        <Contact />

        <Footer />
      </main>
    </>
  );
};
