import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import MainScreen from './screens/MainScreen';


//const {Navigator, Screen } = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
    return(
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
        <Stack.Screen name='MainScreen' component={MainScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    )
};

export default App;
