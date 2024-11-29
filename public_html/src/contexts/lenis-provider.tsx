import React, { createContext, useContext, ReactNode } from "react";

const LenisContext = createContext({ enabled: true });

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) => {
  return (
    <LenisContext.Provider value={{ enabled }}>
      {children}
    </LenisContext.Provider>
  );
};
