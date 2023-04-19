
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthHandler from "../screens/LoginAndRegister/AuthHandler";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="AuthFlow">
    <Stack.Screen
      name="AuthFlow"
      component={AuthHandler}
      options={{ headerShown: false }}
    ></Stack.Screen>
  </Stack.Navigator>
  );
}

export { MainStackNavigator };