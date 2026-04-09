
import { motion, MotionValue } from "framer-motion";

interface Props {
  bgX: MotionValue<number>;
  bgY: MotionValue<number>;
}

export const BackgroundGlow = ({ bgX, bgY }: Props) => {
  return (
    <motion.div 
      className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#D97757]/8 to-transparent blur-[120px] mix-blend-multiply z-0"
      style={{ x: bgX, y: bgY, left: "50%", top: "50%", marginLeft: "-400px", marginTop: "-400px" }}
    />
  );
};
