import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "../context/TypewriterContext";
import { IconAsterisk } from "./icons";
import { MechanicalKeyboard } from "./MechanicalKeyboard";

export const TypewriterOverlay = () => {
  const { transition, displayedText, activeKey } = useTypewriter();

  return (
    <AnimatePresence>
      {transition.active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-end bg-[#F2EFE9]/95 backdrop-blur-xl pb-0 md:pb-6"
        >
          <div className="w-full flex flex-col items-center relative h-full justify-end px-4 md:px-0">
            
            {/* The Paper Component */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 120, mass: 0.9 }}
              className="w-11/12 md:w-3/4 max-w-[640px] h-[58vh] md:h-[65vh] bg-[#FFFDFC] rounded-t-sm shadow-[0_-15px_40px_rgba(0,0,0,0.06),inset_0_-32px_32px_-16px_rgba(0,0,0,0.12)] relative z-10 flex flex-col justify-end pb-12 md:pb-16 px-8 md:px-14 overflow-hidden border-t border-l border-r border-[#EAE5D9]"
            >
              <IconAsterisk className="absolute top-8 right-8 w-5 h-5 text-[#D97757] opacity-20" />
              <motion.div 
                animate={{ y: activeKey ? 1 : 0 }} // 微弱的打字震动反馈
                transition={{ type: "spring", stiffness: 800, damping: 10 }}
                className="font-mono text-[15px] md:text-[18px] text-[#2C2925] leading-[2.2] flex flex-col justify-end whitespace-pre-wrap max-h-full font-medium pb-2"
                style={{ textShadow: "0px 0px 0.5px rgba(44,41,37,0.4)" }} // 墨水晕染浸透感
              >
                <div>
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-[10px] md:w-[12px] h-[18px] md:h-[22px] bg-[#2C2925] ml-[2px] align-middle opacity-80"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* The Typewriter Machine Body */}
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 22, stiffness: 90, mass: 1.1 }}
              className="w-[96%] md:w-11/12 max-w-[760px] bg-[#EBE7E0] rounded-[24px] md:rounded-[36px] shadow-[0_30px_60px_rgba(0,0,0,0.3),inset_0_4px_8px_rgba(255,255,255,0.9),inset_0_-6px_16px_rgba(0,0,0,0.08)] relative z-20 pb-12 pt-10 border border-[#DCD8CD]"
            >
              
              {/* Carriage & Roller Assembly */}
              <div className="absolute top-[-20px] md:top-[-24px] left-0 right-0 z-30 px-3 md:px-6">
                
                {/* Roller Drop Shadow hitting the paper */}
                <div className="absolute left-10 right-10 top-0 h-[40px] bg-black/30 blur-[15px] -z-10 translate-y-[-12px]" />
                
                {/* Main Cylinder */}
                <div className="relative h-10 md:h-12 w-full bg-[#1A1A1A] bg-[linear-gradient(to_bottom,#333_0%,#111_15%,#222_50%,#050505_100%)] rounded-full shadow-[0_12px_24px_rgba(0,0,0,0.5),inset_0_2px_1px_rgba(255,255,255,0.15)] flex items-center justify-between px-1 border border-[#000]">
                  
                  {/* Left Knob */}
                  <div className="w-6 md:w-8 h-10 md:h-12 bg-[linear-gradient(to_right,#E0E0E0_0%,#888_50%,#E0E0E0_100%)] -ml-4 md:-ml-6 rounded-[3px] border border-[#555] shadow-[0_0_10px_rgba(0,0,0,0.8)] relative overflow-hidden">
                     {/* Knurling ridges */}
                     <div className="absolute inset-x-0 inset-y-0 opacity-[0.35] bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,#000_2px,#000_3px)]" />
                  </div>

                  {/* Paper Guider Bar (Silver) */}
                  <div className="absolute top-[-8px] left-8 right-8 h-[6px] md:h-[8px] bg-[linear-gradient(to_bottom,#FFF_0%,#A0A0A0_40%,#666_100%)] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.6)] flex justify-center gap-32 md:gap-48 items-start">
                    {/* Paper clips */}
                    <div className="w-5 md:w-7 h-[14px] md:h-[18px] bg-[linear-gradient(to_bottom,#E0E0E0_0%,#888_100%)] rounded-b-[4px] shadow-[0_3px_5px_rgba(0,0,0,0.8)] border-x border-[#555]" />
                    <div className="w-5 md:w-7 h-[14px] md:h-[18px] bg-[linear-gradient(to_bottom,#E0E0E0_0%,#888_100%)] rounded-b-[4px] shadow-[0_3px_5px_rgba(0,0,0,0.8)] border-x border-[#555]" />
                  </div>

                  {/* Right Knob */}
                  <div className="w-6 md:w-8 h-10 md:h-12 bg-[linear-gradient(to_left,#E0E0E0_0%,#888_50%,#E0E0E0_100%)] -mr-4 md:-mr-6 rounded-[3px] border border-[#555] shadow-[0_0_10px_rgba(0,0,0,0.8)] relative overflow-hidden">
                     <div className="absolute inset-x-0 inset-y-0 opacity-[0.35] bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,#000_2px,#000_3px)]" />
                  </div>
                </div>
              </div>

              {/* Decorative machine branding accent */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <IconAsterisk className="w-6 h-6 md:w-7 md:h-7 text-[#D97757] opacity-60 drop-shadow-sm" />
                <div className="w-8 h-[2px] bg-[#D97757]/30 rounded-full mt-1" />
              </div>

              <div className="mt-14 md:mt-16 relative z-40">
                <MechanicalKeyboard activeKey={activeKey} />
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
