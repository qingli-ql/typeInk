import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// --- Icons ---
const IconArrow = () => (
  <svg viewBox= "0 0 24 24" fill = "none" stroke = "currentColor" strokeWidth = "1.5" className = "w-4 h-4" >
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap = "square" />
      </svg>
);

const IconLink = () => (
  <svg viewBox= "0 0 24 24" fill = "none" stroke = "currentColor" strokeWidth = "1.5" className = "w-4 h-4" >
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap = "round" strokeLinejoin = "round" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap = "round" strokeLinejoin = "round" />
        </svg>
);

const IconAsterisk = ({ className }) => (
  <svg viewBox= "0 0 24 24" stroke = "currentColor" strokeWidth = "2.5" strokeLinecap = "round" className = { className } >
    <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" />
      </svg>
);

// --- Retro Mechanical Keyboard Component (Physics Upgraded) ---
const MechanicalKeyboard = ({ activeKey }) => {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  return (
    <div className= "flex flex-col items-center gap-2 md:gap-2.5 w-full" >
    {
      rows.map((row, rowIndex) => (
        <div key= { rowIndex } className = "flex justify-center gap-1.5 md:gap-2" style = {{ marginLeft: rowIndex * 24 }} >
    {
      row.map((key) => {
        const isActive = activeKey === key;
        return (
          <motion.div
                key= { key }
        // Spring physics for keypress
        animate = { isActive? { y: 3, scale: 0.96 } : { y: 0, scale: 1 }
      }
                transition = {{ type: "spring", stiffness: 500, damping: 15 }}
  className = {`relative flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full border-[1.5px]
                  ${isActive
      ? "bg-[#D97757] border-[#D97757] text-[#FFF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
      : "bg-[#FAF8F5] border-[#D97757]/80 text-[#3A3530] shadow-[0_3px_0_#D97757]"
    }
                `}
              >
  <span className="font-mono text-sm md:text-base uppercase font-bold tracking-widest translate-y-[-1px]" > { key } </span>
    </motion.div>
            );
          })}
</div>
      ))}
<div className="flex justify-center w-full mt-1.5 md:mt-2" >
  <motion.div 
           animate={ activeKey === ' ' ? { y: 3, scale: 0.98 } : { y: 0, scale: 1 } }
transition = {{ type: "spring", stiffness: 500, damping: 15 }}
className = {`flex items-center justify-center w-56 md:w-72 h-9 md:h-11 rounded-[10px] border-[1.5px]
             ${activeKey === ' '
    ? "bg-[#D97757] border-[#D97757] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
    : "bg-[#FAF8F5] border-[#D97757]/80 shadow-[0_3px_0_#D97757]"
  }
           `}
         />
  </div>
  </div>
  );
};

// --- Antigravity Global Animation Variants ---
// Replaced linear ease-out with fluid spring physics
const antigravityFadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)", rotateX: -5 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { type: "spring", damping: 22, stiffness: 80, mass: 0.8 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

// --- Ambient System Log ---
const VisualAmbientSystem = () => {
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
    <div className= "absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[380px] flex gap-8 pointer-events-none opacity-40" >
    <div className="flex flex-col gap-8 justify-center font-mono text-[10px] uppercase tracking-widest text-[#2C2925]" >
      <div>
      <div className="text-[#999] mb-1" > Status </div>
        < div className = "flex items-center gap-2 font-bold" >
          <span className="w-1.5 h-1.5 bg-[#D97757] rounded-full animate-[pulse_1.5s_ease-in-out_Infinity]" />
            Online
            </div>
            </div>
            < div >
            <div className="text-[#999] mb-1" > Latency </div>
              < div className = "flex items-end gap-1 h-6" >
              {
                Array.from({ length: 7 }).map((_, i) => (
                  <motion.div 
                  key= { i } 
                  className = "w-1 bg-[#D97757]" 
                  animate = {{ height: [3, Math.random() * 15 + 6, 3] }}
  transition = {{ repeat: Infinity, duration: Math.random() * 1.2 + 0.6, ease: "easeInOut" }
} 
                />
             ))}
</div>
  </div>
  < div >
  <div className="text-[#999] mb-1" > Memory </div>
    < div > alloc: 128mb </div>
      < div className = "text-[#D97757]" > heap: 42mb </div>
        </div>
        </div>

        < div className = "flex-1 overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] border-l border-[#D97757]/30 pl-6" >
          <motion.div
          animate={ { y: [0, -420] } }
transition = {{ repeat: Infinity, duration: 28, ease: "linear" }}
className = "flex flex-col gap-5 font-mono text-xs text-[#2C2925]"
  >
{
  [...logs, ...logs, ...logs, ...logs].map((log, i) => (
    <div key= { i } className = "leading-relaxed opacity-80" >
    { log.includes('[sys]') ? <span className="text-[#D97757] font-bold"> { log } </span> : log }
    </div>
  ))
}
  </motion.div>
  </div>
  </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [transition, setTransition] = useState({ active: false, text: "", targetId: "" });
  const [displayedText, setDisplayedText] = useState("");
  const [activeKey, setActiveKey] = useState(null);

  const typeTimeoutRef = useRef(null);
  const keyReleaseTimeoutRef = useRef(null);

  // Magnetic Parallax Engine for Antigravity Feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to avoid jittering when moving mouse
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate from center of screen for parallax effect
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Derived transforms for different parallax layers (Background vs Foreground)
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const fgX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const fgY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);


  // Highly Realistic Mechanical Typewriter Logic
  useEffect(() => {
    if (transition.active) {
      setDisplayedText("");
      let i = 0;

      const typeNextChar = () => {
        if (i < transition.text.length) {
          const charToType = transition.text.charAt(i);
          setDisplayedText((prev) => prev + charToType);

          setActiveKey(charToType.toLowerCase());
          clearTimeout(keyReleaseTimeoutRef.current);
          keyReleaseTimeoutRef.current = setTimeout(() => setActiveKey(null), 50);

          i++;

          let nextDelay = Math.random() * 60 + 30;

          if (charToType === '.' || charToType === ':' || charToType === '!') nextDelay += 150;
          if (charToType === ' ') nextDelay += 30;
          if (charToType === '\n') nextDelay += 300;

          typeTimeoutRef.current = setTimeout(typeNextChar, nextDelay);
        } else {
          setTimeout(() => {
            if (transition.targetId && transition.targetId !== 'external') {
              const el = document.getElementById(transition.targetId);
              if (el) {
                const yOffset = -40;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              } else if (transition.targetId === "top") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }
            setTransition({ active: false, text: "", targetId: "" });
          }, 800);
        }
      };

      typeNextChar();

      return () => {
        clearTimeout(typeTimeoutRef.current);
        clearTimeout(keyReleaseTimeoutRef.current);
      };
    }
  }, [transition]);

  const triggerTypewriter = (e, targetId, promptText) => {
    if (e) e.preventDefault();
    setTransition({ active: true, text: promptText, targetId: targetId });
  };

  return (
    <div className= "min-h-screen bg-[#FDFDFB] text-[#1A1A1A] selection:bg-[#D97757] selection:text-[#FDFDFB] font-sans relative overflow-x-hidden" >

    {/* 1. ANTIGRAVITY FLOATING COMMAND PILL */ }
    < motion.nav
  initial = {{ y: 100, opacity: 0 }
}
animate = {{ y: [0, -6, 0], opacity: 1 }} // Continuous Antigravity Floating
transition = {{
  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  opacity: { delay: 0.5, duration: 0.8, ease: "easeOut" }
}}
className = "fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-5 md:gap-8 px-6 md:px-8 py-3.5 bg-[#2C2925]/90 backdrop-blur-md border border-[#423E38] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] text-[#FDFDFB] font-mono text-[11px] md:text-xs uppercase tracking-widest"
  >
  <motion.button 
          whileHover={ { y: -2, scale: 1.05 } } transition = {{ type: "spring", stiffness: 400 }}
onClick = {(e) => triggerTypewriter(e, "top", "Scrolling paper back to origin...\nReady.")}
className = "flex items-center gap-2 group whitespace-nowrap"
  >
  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D97757] rounded-full animate-pulse" />
    <span className="group-hover:text-[#D97757] transition-colors" > J.Li </span>
      </motion.button>

      < div className = "w-[1px] h-4 bg-[#4A4640]" />

        <motion.button whileHover={ { y: -2, scale: 1.05 } } transition = {{ type: "spring", stiffness: 400 }} onClick = {(e) => triggerTypewriter(e, "builds", "Loading generative artifacts...\nDisplaying visual prototypes.")} className = "hover:text-[#D97757] transition-colors" > Builds </motion.button>
          < motion.button whileHover = {{ y: -2, scale: 1.05 }} transition = {{ type: "spring", stiffness: 400 }} onClick = {(e) => triggerTypewriter(e, "usage", "Analyzing workflow methodology...\nExtracting insights.")} className = "hover:text-[#D97757] transition-colors" > Usage </motion.button>
            < motion.button whileHover = {{ y: -2, scale: 1.05 }} transition = {{ type: "spring", stiffness: 400 }} onClick = {(e) => triggerTypewriter(e, "systemize", "Retrieving field notes and logs...\nOpening archive.")} className = "hover:text-[#D97757] transition-colors" > Notes </motion.button>
              </motion.nav>


{/* 2. THE PAPER & TYPEWRITER OVERLAY (Spring Physics) */ }
<AnimatePresence>
  {
    transition.active && (
      <motion.div
            initial={ { opacity: 0 } }
animate = {{ opacity: 1 }}
exit = {{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
transition = {{ duration: 0.5, ease: "easeOut" }}
className = "fixed inset-0 z-[100] flex flex-col items-center justify-end bg-[#F2EFE9]/95 backdrop-blur-xl pb-0 md:pb-10"
  >
  <div className="w-full max-w-3xl flex flex-col items-center relative h-full justify-end px-4 md:px-0" >

    <motion.div
                initial={ { y: "100%", opacity: 0 } }
animate = {{ y: "0%", opacity: 1 }}
// Spring loaded paper feed
transition = {{ type: "spring", damping: 25, stiffness: 120, mass: 0.8 }}
className = "w-11/12 md:w-3/4 h-[48vh] md:h-[55vh] bg-[#FFFDFC] rounded-t-sm shadow-[0_-5px_20px_rgba(0,0,0,0.03),inset_0_0_60px_rgba(210,200,180,0.15)] relative z-10 flex flex-col justify-end pb-12 md:pb-16 px-8 md:px-14 overflow-hidden border-t border-l border-r border-[#EAE5D9]"
  >
  <IconAsterisk className="absolute top-8 right-8 w-5 h-5 text-[#D97757] opacity-20" />
    <div 
                  className="font-mono text-[14px] md:text-[16px] text-[#2C2925] leading-[1.9] flex flex-col justify-end whitespace-pre-wrap max-h-full font-medium"
style = {{ textShadow: "0px 0px 0.5px rgba(44,41,37,0.3)" }}
                >
  <div>
  { displayedText }
  < motion.span
animate = {{ opacity: [1, 0] }} transition = {{ repeat: Infinity, duration: 0.8, ease: "linear" }}
className = "inline-block w-[10px] md:w-[12px] h-[18px] md:h-[22px] bg-[#2C2925] ml-[2px] align-middle opacity-80"
  />
  </div>
  </div>
  </motion.div>

  < motion.div
initial = {{ y: 200, opacity: 0 }}
animate = {{ y: 0, opacity: 1 }}
// Heavy machinery spring physics
transition = {{ type: "spring", damping: 22, stiffness: 90, mass: 1.2 }}
className = "w-full bg-[#F4F1EA] rounded-t-[32px] md:rounded-b-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.25),inset_0_4px_0_rgba(255,255,255,0.9)] relative z-20 pt-8 pb-12 px-2 md:px-6 border border-[#EAE5DA]"
  >
  <div className="absolute top-[-16px] md:top-[-20px] left-4 right-4 md:left-8 md:right-8 h-8 md:h-10 bg-[linear-gradient(to_bottom,#1A1A1A_0%,#333_20%,#111_60%,#000_100%)] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-between z-30" >
    <div className="w-5 md:w-6 h-10 md:h-12 bg-[linear-gradient(to_right,#333,#111)] -ml-3 md:-ml-4 rounded-[4px] border border-[#000] shadow-md" />
      <div className="w-5 md:w-6 h-10 md:h-12 bg-[linear-gradient(to_left,#333,#111)] -mr-3 md:-mr-4 rounded-[4px] border border-[#000] shadow-md" />
        </div>
        < div className = "absolute top-[-4px] md:top-[-6px] left-12 right-12 h-1.5 md:h-2 bg-[linear-gradient(to_bottom,#FFF_0%,#B0B0B0_50%,#7A7A7A_100%)] z-40 flex justify-center gap-32 md:gap-48 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)]" >
          <div className="w-5 md:w-6 h-7 md:h-8 bg-[linear-gradient(to_right,#111_0%,#3A3A3A_40%,#111_100%)] rounded-[4px] -mt-3 md:-mt-3.5 border border-[#000] shadow-[0_3px_5px_rgba(0,0,0,0.5)]" />
            <div className="w-5 md:w-6 h-7 md:h-8 bg-[linear-gradient(to_right,#111_0%,#3A3A3A_40%,#111_100%)] rounded-[4px] -mt-3 md:-mt-3.5 border border-[#000] shadow-[0_3px_5px_rgba(0,0,0,0.5)]" />
              </div>
              < div className = "absolute top-6 left-1/2 -translate-x-1/2" >
                <IconAsterisk className="w-7 h-7 md:w-9 md:h-9 text-[#D97757] opacity-80" />
                  </div>
                  < div className = "mt-14 md:mt-16" >
                    <MechanicalKeyboard activeKey={ activeKey } />
                      </div>
                      </motion.div>
                      </div>
                      </motion.div>
        )}
</AnimatePresence>

{/* 3. AMBIENT BACKGROUND GLOW (Now moves opposite to mouse like a distant light) */ }
<motion.div 
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#D97757]/8 to-transparent blur-[120px] mix-blend-multiply z-0"
style = {{ x: bgX, y: bgY, left: "50%", top: "50%", marginLeft: "-400px", marginTop: "-400px" }}
      />

{/* 4. MAIN SCROLLING WRAPPER */ }
<motion.div
        animate={
  {
    scale: transition.active ? 0.94 : 1,
      filter: transition.active ? "blur(10px) grayscale(20%)" : "blur(0px) grayscale(0%)",
        opacity: transition.active ? 0.2 : 1,
        }
}
transition = {{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
className = "flex flex-col"
  >
  <main className="relative z-10" >

    {/* --- SECTION 1: HERO (With Antigravity Parallax) --- */ }
    <section id="top" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-10 relative overflow-visible">

      <div className="hidden xl:block">
        <VisualAmbientSystem />
        </div>

{/* Foreground elements shift with mouse to create floating sensation */ }
<motion.div 
               style={ { x: fgX, y: fgY } }
initial = "hidden" animate = "visible" variants = { staggerContainer } className = "relative z-10"
  >
  <motion.p variants={ antigravityFadeUp } className = "font-mono text-xs uppercase tracking-[0.3em] text-[#737373] mb-8" >
    AI in My Life
      </motion.p>
      <motion.h1 variants={antigravityFadeUp} className="font-serif text-5xl md:text-7xl xl:text-[96px] leading-[1.05] tracking-tight text-[#111] mb-8">
        AI is my cognitive <br className="hidden md:block" />
        <i className="text-[#D97757]">exoskeleton.</i>
      </motion.h1>
      <motion.div variants={antigravityFadeUp} className="max-w-xl xl:max-w-3xl mt-8">
              <p className="text-xl md:text-2xl text-[#555] leading-relaxed" >
                I am an AI developer and designer.I don't just "talk" about AI; I live inside it. My work focuses on bridging the gap between raw machine intelligence and intuitive, human-centered systems.
                  </p>
                  < button
onClick = {(e) => triggerTypewriter(e, "builds", "Initializing manifesto parameters...\nLet's see what we built.")}
className = "mt-12 flex items-center gap-3 font-mono text-sm border-b border-[#2C2925] text-[#2C2925] pb-1 w-fit hover:pr-4 hover:text-[#D97757] hover:border-[#D97757] transition-all duration-300 cursor-pointer"
  >
  View what I build < IconArrow />
    </button>
    </motion.div>
    </motion.div>
    </section>

{/* --- SECTION 2: BUILDS --- */}
<section id="builds" className="py-32 max-w-7xl mx-auto px-6 md:px-12 border-t border-[#EAE5D9]">
  <motion.div initial="hidden" whileInView = "visible" viewport = {{ once: true, margin: "-100px" }} variants = { staggerContainer } >
    <motion.h2 variants={ antigravityFadeUp } className = "font-serif text-3xl md:text-4xl mb-16" > What I Build with AI </motion.h2>
    < div className = "grid md:grid-cols-2 gap-x-8 gap-y-16" >
    {
      [
      { name: "Tone Studio", type: "Online Color Tool", desc: "An AI-native photo grading concept with semantic presets and intuitive visual controls.", color: "bg-[#E6E0D8]" },
      { name: "Cognitive Mirror", type: "Personal Agent", desc: "A localized SLM trained on my daily notes to act as a conversational sounding board.", color: "bg-[#D8E1E6]" },
      { name: "Agent Workflow Lab", type: "AI Workbench", desc: "Structured orchestration for complex tasks using reusable skills and evaluation loops.", color: "bg-[#E6D8DB]" },
      { name: "Ephemeral UI", type: "Interaction Prototype", desc: "Interfaces that generate themselves based on intent and dissolve when the task is done.", color: "bg-[#E0E6D8]" }
      ].map((product, idx) => (
        <motion.div 
                    key= { idx } variants = { antigravityFadeUp } 
                    className = "group cursor-pointer"
                    onClick = {(e) => triggerTypewriter(e, "external", `Opening documentation for ${product.name}...\nRendering interactive preview.`)}
      >
      <div className={ `w-full aspect-[4/3] ${product.color} rounded-lg mb-6 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]` }>
        <span className="font-mono text-xs opacity-40 uppercase tracking-widest text-[#2C2925]" > Visual Preview </span>
          </div>
          < div className = "flex justify-between items-start" >
            <div>
            <h3 className="font-sans text-xl font-medium text-[#111] group-hover:text-[#D97757] transition-colors" > { product.name } </h3>
              < p className = "font-mono text-xs text-[#737373] uppercase tracking-wider mt-1" > { product.type } </p>
                </div>
                < div className = "opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 text-[#D97757]" >
                  <IconArrow />
                  </div>
                  </div>
                  < p className = "text-[#555] mt-4 text-sm leading-relaxed" > { product.desc } </p>
                    </motion.div>
                ))}
</div>
  </motion.div>
  </section>

{/* --- SECTION 3: USAGE --- */}
<section id="usage" className="py-32 bg-[#1C1A18] text-[#FDFDFB]">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <motion.div initial="hidden" whileInView = "visible" viewport = {{ once: true }} variants = { staggerContainer } >
      <motion.h2 variants={ antigravityFadeUp } className = "font-serif text-3xl md:text-4xl mb-16 text-white" > How I Use AI </motion.h2>
        < div className = "grid md:grid-cols-2 gap-x-12 gap-y-12 border-t border-[#333] pt-12" >
        {
          [
          { title: "Think with AI", desc: "Expanding the boundaries of initial ideation and challenging my cognitive blind spots." },
          { title: "Create with AI", desc: "Bridging the gap between raw intent and polished execution in code and design." },
          { title: "Organize with AI", desc: "Structuring chaotic daily inputs into a queryable, semantic personal knowledge graph." },
          { title: "Refine with AI", desc: "Iterating existing systems through rigorous automated feedback and ablation loops." }
          ].map((item, idx) => (
            <motion.div 
                      key= { idx } variants = { antigravityFadeUp } 
                      className = "border-b border-[#333] pb-8 cursor-pointer group"
                      onClick = {(e) => triggerTypewriter(e, "external", `Loading cognitive protocol: ${item.title}...\nExecuting.`)}
          >
          <div className="flex justify-between items-center mb-3 text-[#D97757]" >
            <h3 className="font-mono text-sm uppercase tracking-widest" > { item.title } </h3>
              < span className = "opacity-0 group-hover:opacity-100 transition-opacity" > <IconLink /></span >
                </div>
                < p className = "text-[#999] leading-relaxed text-lg font-serif italic" > "{item.desc}" </p>
                  </motion.div>
                  ))}
</div>
  </motion.div>
  </div>
  </section>

{/* --- SECTION 4: SYSTEMIZE --- */}
<section id="systemize" className="py-32 max-w-7xl mx-auto px-6 md:px-12 border-t border-[#EAE5D9]">
  <motion.div initial="hidden" whileInView = "visible" viewport = {{ once: true }} variants = { staggerContainer } >
    <motion.div variants={ antigravityFadeUp } className = "mb-16" >
      <h2 className="font-serif text-3xl md:text-4xl" > How I Learn & Systemize </h2>
        < p className = "text-[#737373] mt-4" > Turning raw thoughts into reproducible logic.</p>
          </motion.div>
          < div className = "grid md:grid-cols-3 gap-8" >
          {
            [
            { category: "Field Notes", items: ["Prompt Engineering as Interface Design", "The Psychology of Latency in LLMs"] },
            { category: "Build Logs", items: ["V0.1: Writing a custom MCP server", "Refactoring Tone Studio's state logic"] },
            { category: "Research", items: ["Evaluating Small Models for Personal Use", "Zero-UI conceptual frameworks"] }
            ].map((section, idx) => (
              <motion.div key= { idx } variants = { antigravityFadeUp } className = "bg-[#FFFDFC] p-8 border border-[#EAE5D9] rounded-xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-shadow duration-500" >
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#111] mb-6 flex items-center gap-2" >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97757]" />
            { section.category }
            </h3>
            < ul className = "space-y-4" >
            {
              section.items.map((item, i) => (
                <li 
                          key= { i } 
                          className = "text-sm text-[#555] hover:text-[#D97757] cursor-pointer transition-colors leading-relaxed"
                          onClick = {(e) => triggerTypewriter(e, "external", `Retrieving log entry...\nSubject: ${item}`)}
            >
            { item }
            </li>
            ))
          }
            </ul>
            </motion.div>
                ))}
</div>
  </motion.div>
  </section>

{/* --- SECTION 5: CONTACT / NOW --- */}
<section id="now" className="py-32 bg-[#EFECE5] text-[#111]">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <motion.div initial="hidden" whileInView = "visible" viewport = {{ once: true }} variants = { staggerContainer } className = "grid md:grid-cols-2 gap-16" >

      <motion.div variants={ antigravityFadeUp }>
        <h2 className="font-serif text-3xl mb-8 flex items-center gap-3" >
          <span className="w-2 h-2 bg-[#D97757] rounded-full animate-pulse" /> Now
            </h2>
            < div className = "space-y-6 text-[#555] leading-relaxed" >
              <p>
              <strong>Building: </strong> Currently focused on exploring the boundaries of Agentic Workflows and Zero-UI environments.
                </p>
                < p >
                <strong>Thinking about: </strong> How to make AI tooling feel less like a chatbox and more like a physical extension of the hand.
                  </p>
                  </div>
                  </motion.div>

                  < motion.div variants = { antigravityFadeUp } >
                    <h2 className="font-serif text-3xl mb-8" > Connect </h2>
                      < div className = "flex flex-col gap-4 font-mono text-sm uppercase tracking-widest" >
                        <button 
                      className="flex items-center justify-between border-b border-[#CCC] pb-4 hover:text-[#D97757] hover:border-[#D97757] transition-all w-full text-left"
onClick = {(e) => triggerTypewriter(e, "external", "Opening secure mail client...\nRouting to hello@domain.com")}
                    >
  <span>Email < /span> <IconArrow / >
  </button>
  < button
className = "flex items-center justify-between border-b border-[#CCC] pb-4 hover:text-[#D97757] hover:border-[#D97757] transition-all w-full text-left"
onClick = {(e) => triggerTypewriter(e, "external", "Connecting to GitHub repository...\nFetching public branches.")}
                    >
  <span>GitHub < /span> <IconArrow / >
  </button>
  < button
className = "flex items-center justify-between border-b border-[#CCC] pb-4 hover:text-[#D97757] hover:border-[#D97757] transition-all w-full text-left"
onClick = {(e) => triggerTypewriter(e, "external", "Establishing connection to social matrix...\nReady.")}
                    >
  <span>Social < /span> <IconArrow / >
  </button>
  </div>
  </motion.div>

  </motion.div>
  </div>
  </section>

  </main>

  <footer className="pt-8 pb-32 text-center bg-[#EFECE5] relative z-10 border-t border-[#EAE5D9]">
    <div className="max-w-7xl mx-auto flex justify-center items-center px-6 md:px-12 font-mono text-xs text-[#999] tracking-widest uppercase">
      <p>© 2026 / J.Li </p>
        </div>
        </footer>

        </motion.div>
        </div>
  );
}