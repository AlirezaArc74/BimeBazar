"use client";

import { createContext, useContext, useState } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [addressInfo, setAddressInfo] = useState(null);

  return (
    <ClientContext.Provider value={{ addressInfo, setAddressInfo }}>
      {children}
    </ClientContext.Provider>
  );
};
