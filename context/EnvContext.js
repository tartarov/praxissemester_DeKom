import React, { createContext, useEffect, useReducer, useState } from "react";
import { Alert } from "react-native";

export const EnvContext = createContext();

export const EnvProvider = ({ children }) => {
    

    return (
        <EnvContext.Provider
          value={{
          }}
        >
          {children}
        </EnvContext.Provider>
      );
}