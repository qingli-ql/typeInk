import React from "react";
import { motion } from "framer-motion";

export const MechanicalKeyboard = ({ activeKey }: { activeKey: string | null }) => {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3 w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5 md:gap-2" style={{ marginLeft: rowIndex * 20 }}>
          {row.map((key) => {
            const isActive = activeKey === key;
            return (
              <motion.div
                key={key}
                animate={isActive ? { y: 4, scale: 0.96 } : { y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 600, damping: 18 }}
                className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-mono text-sm md:text-[17px] uppercase font-bold tracking-widest transition-colors duration-75
                  ${isActive
                    ? "bg-[#D97757] text-[#FFF] shadow-[inset_0_3px_5px_rgba(0,0,0,0.3),0_0px_0_1px_rgba(217,119,87,1)] border-transparent"
                    : "bg-[#FFFDFB] text-[#5A5550] border border-[#EAE5D9] shadow-[0_4px_0_#D97757,0_6px_8px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(0,0,0,0.03)] hover:text-[#D97757]"
                  }
                `}
              >
                <span className="translate-y-[-1px]">{key}</span>
              </motion.div>
            );
          })}
        </div>
      ))}
      <div className="flex justify-center w-full mt-2">
        <motion.div 
          animate={activeKey === ' ' ? { y: 4, scale: 0.98 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 18 }}
          className={`flex items-center justify-center w-56 md:w-72 h-10 md:h-12 rounded-[12px] transition-colors duration-75
            ${activeKey === ' '
              ? "bg-[#D97757] shadow-[inset_0_3px_5px_rgba(0,0,0,0.3),0_0px_0_1px_rgba(217,119,87,1)] border-transparent"
              : "bg-[#FFFDFB] border border-[#EAE5D9] shadow-[0_4px_0_#D97757,0_6px_8px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(0,0,0,0.03)]"
            }
          `}
        />
      </div>
    </div>
  );
};
