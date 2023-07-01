// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ErteilungScreen from "../screens/Antrag/ErteilungScreen";
import FragenScreen from "../screens/Antrag/FragenScreen";
import { ScreenDoesNotExist } from "../screens/Error404/ScreenDoesNotExist";
import SignatureCaptures from "../screens/Menü/SignatureScreen";
import ExportPDFTestScreen from "../screens/Antrag/ExportPDFTestScreen";
import StaatsangehoerigkeitsScreen from "../screens/Antrag/StaatsangehoerigkeitScreens";
import ZahlungsScreen from "../screens/Antrag/ZahlungsScreen";
import HomeScreen from "../screens/MainScreenFlow/HomeScreen";
import You from "../screens/You";
import Settings from "../screens/Settings";
import { useNavigation } from "@react-navigation/native";
import FertigeAntragListe from "../screens/FertigeAntragListe";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PagerView from "react-native-pager-view";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          marginHorizontal:20,
          marginBottom:20,
          borderRadius:100,
          backgroundColor: "#2C3639",
          position: "absolute",
        },
      }}

    >
      <Tab.Screen
        name="You"
        component={You}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
           // e.preventDefault();
            navigation.navigate("You");
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="person" color= {focused ? "#DCD7C9" : "#3F4E4F"} size={size} />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{ color: focused ? "#A27B5C" : "#DCD7C9", fontSize: 12 }}
            >
              You
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="home" color={focused ? "#DCD7C9" : "#3F4E4F"} size={size} />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{ color: focused ? "#A27B5C" : "#DCD7C9", fontSize: 12 }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="menu" color={focused ? "#DCD7C9" : "#3F4E4F"} size={size} />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{ color: focused ? "#A27B5C" : "#DCD7C9", fontSize: 12 }}
            >
              Settings
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ScreenDoesNotExist"
        component={ScreenDoesNotExist}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        }}
      />
      <Tab.Screen
        name="ErteilungsScreen"
        component={ErteilungScreen}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        }}
      />
      <Tab.Screen
        name="ExportPDFTestScreen"
        component={ExportPDFTestScreen}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        }}
      />
      <Tab.Screen
        name="SignatureScreen"
        component={SignatureCaptures}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        }}
      />
      <Tab.Screen
        name="FragenScreen"
        component={FragenScreen}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        }}
      />
      <Tab.Screen
        name="StaatsangehoerigkeitsScreen"
        component={StaatsangehoerigkeitsScreen}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        }}
      />
      <Tab.Screen
        name="ZahlungsScreen"
        component={ZahlungsScreen}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        }}
      />
      <Tab.Screen
        name="FertigeAntragListe"
        component={FertigeAntragListe}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
