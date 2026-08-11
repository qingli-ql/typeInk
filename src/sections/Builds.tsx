
import { motion } from "framer-motion";
import { useTypewriter } from "../context/typewriter";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { IconArrow } from "../components/icons";
import { ProjectCover } from "../components/ProjectCover";
import { projects } from "../data/projects";

export const Builds = () => {
  const { triggerTypewriter } = useTypewriter();

  return (
    <section id="builds" className="py-32 max-w-7xl mx-auto px-6 md:px-12 border-t border-[#EAE5D9]">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.h2 variants={antigravityFadeUp} className="font-serif text-3xl md:text-4xl mb-16">Selected Work</motion.h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((product) => (
            <motion.a
              key={product.slug} variants={antigravityFadeUp} 
              href={product.url}
              className="group cursor-pointer block"
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                triggerTypewriter(
                  event,
                  "external",
                  `Opening ${product.name}...\nRendering interactive preview.`,
                  () => window.location.assign(product.url),
                );
              }}
            >
              <div className="w-full aspect-[4/3] rounded-lg mb-6 overflow-hidden bg-[#F4F1EA]">
                <ProjectCover project={product} className="transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-sans text-xl font-medium text-[#111] group-hover:text-[#D97757] transition-colors">{product.name}</h3>
                  <p className="font-mono text-xs text-[#737373] uppercase tracking-wider mt-1">{product.homeType}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 text-[#D97757]">
                  <IconArrow />
                </div>
              </div>
              <p className="text-[#555] mt-4 text-sm leading-relaxed">{product.desc}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
