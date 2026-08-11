import { createContext, useContext } from "react";

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
  triggerTypewriter: (e: React.MouseEvent | null, targetId: string, promptText: string, onComplete?: () => void) => void;
}

export const TypewriterContext = createContext<TypewriterContextProps | undefined>(undefined);

export const useTypewriter = () => {
  const context = useContext(TypewriterContext);
  if (!context) {
    throw new Error("useTypewriter must be used within a TypewriterProvider");
  }
  return context;
};
