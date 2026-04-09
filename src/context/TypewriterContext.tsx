import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

export interface TransitionState {
  active: boolean;
  text: string;
  targetId: string;
}

export interface TypewriterContextProps {
  transition: TransitionState;
  displayedText: string;
  activeKey: string | null;
  triggerTypewriter: (e: React.MouseEvent | null, targetId: string, promptText: string) => void;
}

const TypewriterContext = createContext<TypewriterContextProps | undefined>(undefined);

export const TypewriterProvider = ({ children }: { children: ReactNode }) => {
  const [transition, setTransition] = useState<TransitionState>({ active: false, text: "", targetId: "" });
  const [displayedText, setDisplayedText] = useState("");
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const typeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const keyReleaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (transition.active) {
      setDisplayedText("");
      let i = 0;

      const typeNextChar = () => {
        if (i < transition.text.length) {
          const charToType = transition.text.charAt(i);
          setDisplayedText((prev) => prev + charToType);

          setActiveKey(charToType.toLowerCase());
          clearTimeout(keyReleaseTimeoutRef.current as any);
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
                const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
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
        clearTimeout(typeTimeoutRef.current as any);
        clearTimeout(keyReleaseTimeoutRef.current as any);
      };
    }
  }, [transition]);

  const triggerTypewriter = (e: React.MouseEvent | null, targetId: string, promptText: string) => {
    if (e) e.preventDefault();
    setTransition({ active: true, text: promptText, targetId: targetId });
  };

  return (
    <TypewriterContext.Provider value={{ transition, displayedText, activeKey, triggerTypewriter }}>
      {children}
    </TypewriterContext.Provider>
  );
};

export const useTypewriter = () => {
  const context = useContext(TypewriterContext);
  if (!context) {
    throw new Error("useTypewriter must be used within a TypewriterProvider");
  }
  return context;
};
