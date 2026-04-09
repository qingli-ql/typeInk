export const antigravityFadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)", rotateX: -5 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { type: "spring", damping: 22, stiffness: 80, mass: 0.8 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};
