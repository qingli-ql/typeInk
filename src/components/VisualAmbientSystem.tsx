
import { motion } from "framer-motion";

const latencyBars = [
  { peak: 13, duration: 1.1 },
  { peak: 19, duration: 1.5 },
  { peak: 10, duration: 0.9 },
  { peak: 17, duration: 1.3 },
  { peak: 21, duration: 1.7 },
  { peak: 12, duration: 1 },
  { peak: 16, duration: 1.4 },
];

export const VisualAmbientSystem = () => {
  const logs = [
    "> opening typeink workspace",
    "> loading project index",
    "> checking routes and links",
    "> rendering interactive preview",
    "> validating static assets",
    "> testing responsive layout",
    "> optimizing media delivery",
    "> checking accessibility labels",
    "> [build] all checks passed",
    "> preview ready on localhost",
    "> watching for changes...",
    "> waiting for the next idea"
  ];

  return (
    <div className="w-[400px] h-[340px] flex gap-6 pointer-events-none opacity-55">
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
            {latencyBars.map((bar, i) => (
              <motion.div 
                key={i} 
                className="w-1 bg-[#D97757]" 
                animate={{ height: [3, bar.peak, 3] }}
                transition={{ repeat: Infinity, duration: bar.duration, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] border-l border-[#D97757]/30 pl-6">
        <motion.div
          animate={{ y: [0, -380] }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
          className="flex flex-col gap-5 font-mono text-xs text-[#2C2925]"
        >
          {[...logs, ...logs, ...logs, ...logs].map((log, i) => (
            <div key={i} className="leading-relaxed opacity-80">
              {log.includes('[build]') ? <span className="text-[#D97757] font-bold">{log}</span> : log}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
