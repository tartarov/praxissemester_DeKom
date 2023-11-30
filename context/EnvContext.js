import React, { createContext, useState } from "react";
import { Alert } from "react-native";

export const EnvContext = createContext();
console.log("mock drinnen")
export const EnvProvider = ({ children }) => {
    const [mock, setMock] = useState(null);
    console.log(mock)

    return (
        <EnvContext.Provider
          value={{
            setMock,
            mock,
          }}
        >
          {children}
        </EnvContext.Provider>
      );
}

