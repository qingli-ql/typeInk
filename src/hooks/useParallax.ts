import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export const useParallax = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const fgX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const fgY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  return { bgX, bgY, fgX, fgY };
};
