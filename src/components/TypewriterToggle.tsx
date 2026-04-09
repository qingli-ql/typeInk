import { motion } from "framer-motion";
import { useTypewriter } from "../context/TypewriterContext";

export const TypewriterToggle = () => {
  const { typewriterEnabled, toggleTypewriter } = useTypewriter();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      onClick={toggleTypewriter}
      className={`tw-toggle ${typewriterEnabled ? 'enabled' : 'disabled'}`}
      title={typewriterEnabled ? "Disable typewriter effect" : "Enable typewriter effect"}
    >
      <span
        className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
        style={{ background: typewriterEnabled ? 'var(--color-accent)' : '#aaa' }}
      />
      <span className="hidden sm:inline">
        {typewriterEnabled ? 'Typewriter On' : 'Typewriter Off'}
      </span>
    </motion.button>
  );
};
