import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider} from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { MainStackNavigator } from "./navigations/Stacknavigator";
import { AntragProvider } from "./context/AntragContext";
import { EnvProvider } from "./context/EnvContext";

///// <- ignores this Log because I dont have control over the deprecation of the removeListener. +++REMOVE IF DEPENDECY FIXED++++
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener('didUpdateDimensions', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`."]);
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['Animated.event'])
LogBox.ignoreLogs(['[Unhandled promise rejection: Error: Authentication is already in progress]'])
///// +++REMOVE IF DEPENDECY FIXED++++

const App = () => {
  return (
    <EnvProvider>
    <AuthProvider>
      <DataProvider>
        <AntragProvider>
        <NavigationContainer>
           <MainStackNavigator/>
        </NavigationContainer>
        </AntragProvider>
      </DataProvider>
    </AuthProvider>
    </EnvProvider>
  );
};

export default App;
