import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider} from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { MainStackNavigator } from "./navigations/Stacknavigator";
const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <NavigationContainer>
           <MainStackNavigator/>
        </NavigationContainer>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
