import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

export interface TransitionState {
  active: boolean;
  text: string;
  targetId: string;
}

export interface TypewriterContextProps {
  transition: TransitionState;
  displayedText: string;
  activeKey: string | null;
  typewriterEnabled: boolean;
  toggleTypewriter: () => void;
  triggerTypewriter: (e: React.MouseEvent | null, targetId: string, promptText: string) => void;
}

const TypewriterContext = createContext<TypewriterContextProps | undefined>(undefined);

export const TypewriterProvider = ({ children }: { children: ReactNode }) => {
  const [transition, setTransition] = useState<TransitionState>({ active: false, text: "", targetId: "" });
  const [displayedText, setDisplayedText] = useState("");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [typewriterEnabled, setTypewriterEnabled] = useState(true);

  const typeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyReleaseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleTypewriter = () => setTypewriterEnabled(prev => !prev);

  useEffect(() => {
    if (transition.active) {
      setDisplayedText("");
      let i = 0;

      const typeNextChar = () => {
        if (i < transition.text.length) {
          const charToType = transition.text.charAt(i);
          setDisplayedText((prev) => prev + charToType);

          setActiveKey(charToType.toLowerCase());
          clearTimeout(keyReleaseTimeoutRef.current as ReturnType<typeof setTimeout>);
          keyReleaseTimeoutRef.current = setTimeout(() => setActiveKey(null), 50);

          i++;

          let nextDelay = Math.random() * 60 + 30;
          if (charToType === '.' || charToType === ':' || charToType === '!') nextDelay += 150;
          if (charToType === ' ') nextDelay += 30;
          if (charToType === '\n') nextDelay += 300;

          typeTimeoutRef.current = setTimeout(typeNextChar, nextDelay);
        } else {
          setTimeout(() => {
            setTransition({ active: false, text: "", targetId: "" });
          }, 800);
        }
      };

      typeNextChar();

      return () => {
        clearTimeout(typeTimeoutRef.current as ReturnType<typeof setTimeout>);
        clearTimeout(keyReleaseTimeoutRef.current as ReturnType<typeof setTimeout>);
      };
    }
  }, [transition]);

  const triggerTypewriter = (e: React.MouseEvent | null, targetId: string, promptText: string) => {
    if (e) e.preventDefault();
    if (!typewriterEnabled) return; // skip if disabled
    setTransition({ active: true, text: promptText, targetId: targetId });
  };

  return (
    <TypewriterContext.Provider value={{ transition, displayedText, activeKey, typewriterEnabled, toggleTypewriter, triggerTypewriter }}>
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
