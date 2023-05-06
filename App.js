import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider} from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { MainStackNavigator } from "./navigations/Stacknavigator";
import { AntragProvider } from "./context/AntragContext";

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AntragProvider>
        <NavigationContainer>
           <MainStackNavigator/>
        </NavigationContainer>
        </AntragProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
