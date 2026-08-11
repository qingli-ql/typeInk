import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { TypewriterContext } from "./typewriter";
import type { TransitionState } from "./typewriter";

export const TypewriterProvider = ({ children }: { children: ReactNode }) => {
  const [transition, setTransition] = useState<TransitionState>({ active: false, text: "", targetId: "" });
  const [displayedText, setDisplayedText] = useState("");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [typewriterEnabled, setTypewriterEnabled] = useState(true);

  const typeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyReleaseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completionCallbackRef = useRef<(() => void) | null>(null);

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
          completionTimeoutRef.current = setTimeout(() => {
            const onComplete = completionCallbackRef.current;
            completionCallbackRef.current = null;
            setTransition({ active: false, text: "", targetId: "" });
            onComplete?.();
          }, 800);
        }
      };

      typeNextChar();

      return () => {
        clearTimeout(typeTimeoutRef.current as ReturnType<typeof setTimeout>);
        clearTimeout(keyReleaseTimeoutRef.current as ReturnType<typeof setTimeout>);
        clearTimeout(completionTimeoutRef.current as ReturnType<typeof setTimeout>);
      };
    }
  }, [transition]);

  const triggerTypewriter = (e: React.MouseEvent | null, targetId: string, promptText: string, onComplete?: () => void) => {
    if (e) e.preventDefault();
    if (!typewriterEnabled) {
      onComplete?.();
      return;
    }
    completionCallbackRef.current = onComplete ?? null;
    setTransition({ active: true, text: promptText, targetId: targetId });
  };

  return (
    <TypewriterContext.Provider value={{ transition, displayedText, activeKey, typewriterEnabled, toggleTypewriter, triggerTypewriter }}>
      {children}
    </TypewriterContext.Provider>
  );
};
