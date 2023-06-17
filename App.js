import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider} from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { MainStackNavigator } from "./navigations/Stacknavigator";
import { AntragProvider } from "./context/AntragContext";

///// <- ignores this Log because I dont have control over the deprecation of the removeListener. +++REMOVE IF DEPENDECY FIXED++++
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(['new NativeEventEmitter']);
///// +++REMOVE IF DEPENDECY FIXED++++

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
