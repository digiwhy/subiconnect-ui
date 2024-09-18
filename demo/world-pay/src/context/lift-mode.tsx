'use client';

import React from 'react';

interface LiftModeContextType {
  liftMode: boolean;
  setLiftMode: (value: boolean) => void;
}

export const LiftModeContext = React.createContext<LiftModeContextType>({
  liftMode: false,
  setLiftMode: () => {},
});

export const useLiftMode = (): LiftModeContextType => {
  const context = React.useContext(LiftModeContext);
  if (!context) {
    throw new Error('useLiftMode must be used within a LiftModeProvider');
  }

  return context;
};

export const LiftModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [liftMode, setLiftMode] = React.useState(false);

  return (
    <LiftModeContext.Provider value={{ liftMode, setLiftMode }}>
      {children}
    </LiftModeContext.Provider>
  );
};
