import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./SignUp";
import SignUpAdress from "./SignUpAdress";
import BottomTabNavigator from "../../../navigations/TabNavigator";

const Stack = createNativeStackNavigator();

export default function SignUpNav() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUpAdress"
        component={SignUpAdress}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="MainScreen"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
