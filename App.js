import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";


//const {Navigator, Screen } = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
    return(
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    )
};

export default App;
