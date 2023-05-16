// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import BottomTabNavigator from "./TabNavigator";
import Menu from "../screens/Menü/Menu";
import Settings from "../screens/Settings";
import CustomDrawer from "../components/CustomDrawer";
import You from "../screens/You";
import FertigeAntragListe from "../screens/FertigeAntragListe";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#A27B5C",
        drawerActiveTintColor: "#DCD7C9",
        drawerLabelStyle: {
          fontFamily: "Nexa-ExtraLight",
        }, unmountOnBlur: true
        //drawerInactiveTintColor:'dark-grey'
      }}
      initialRouteName="Wallet"
    >
      <Drawer.Screen
        name="You"
        component={You}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="albums-outline" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Docs in process"
        component={FertigeAntragListe}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
