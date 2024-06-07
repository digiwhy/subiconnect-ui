'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

interface LiftModeContextType {
  liftMode: boolean;
  setLiftMode: (value: boolean) => void;
}

export const LiftModeContext = createContext<LiftModeContextType>({
  liftMode: false,
  setLiftMode: () => {}
});

export const useLiftMode = (): LiftModeContextType => {
  const context = useContext(LiftModeContext);
  if (!context) {
    throw new Error('useLiftMode must be used within a LiftModeProvider');
  }

  return context;
};

export const LiftModeProvider = ({ children }: { children: ReactNode }) => {
  const [liftMode, setLiftMode] = useState(false);

  return (
    <LiftModeContext.Provider value={{ liftMode, setLiftMode }}>
      {children}
    </LiftModeContext.Provider>
  );
};
