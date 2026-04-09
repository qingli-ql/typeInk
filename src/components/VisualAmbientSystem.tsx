import React from "react";
import { motion } from "framer-motion";

export const VisualAmbientSystem = () => {
  const logs = [
    "> initializing cognitive matrix...",
    "> parsing user intent stream...",
    "> [sys] overriding manual heuristics",
    "> generating dynamic UI nodes",
    "> aligning with personal knowledge graph",
    "> local SLM temperature: 0.4",
    "> injecting semantic context",
    "> await intent_resolution",
    "> [sys] memory allocation verified",
    "> UI rendered successfully.",
    "> monitoring ambient environment...",
    "> building abstraction layers..."
  ];

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[380px] flex gap-8 pointer-events-none opacity-40">
      <div className="flex flex-col gap-8 justify-center font-mono text-[10px] uppercase tracking-widest text-[#2C2925]">
        <div>
          <div className="text-[#999] mb-1">Status</div>
          <div className="flex items-center gap-2 font-bold">
            <span className="w-1.5 h-1.5 bg-[#D97757] rounded-full animate-[pulse_1.5s_ease-in-out_Infinity]" />
            Online
          </div>
        </div>
        <div>
          <div className="text-[#999] mb-1">Latency</div>
          <div className="flex items-end gap-1 h-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-1 bg-[#D97757]" 
                animate={{ height: [3, Math.random() * 15 + 6, 3] }}
                transition={{ repeat: Infinity, duration: Math.random() * 1.2 + 0.6, ease: "easeInOut" }} 
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[#999] mb-1">Memory</div>
          <div>alloc: 128mb</div>
          <div className="text-[#D97757]">heap: 42mb</div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] border-l border-[#D97757]/30 pl-6">
        <motion.div
          animate={{ y: [0, -420] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="flex flex-col gap-5 font-mono text-xs text-[#2C2925]"
        >
          {[...logs, ...logs, ...logs, ...logs].map((log, i) => (
            <div key={i} className="leading-relaxed opacity-80">
              {log.includes('[sys]') ? <span className="text-[#D97757] font-bold">{log}</span> : log}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
