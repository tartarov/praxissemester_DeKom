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
import FertigeAntragListeIntegrated from "../screens/FertigeAntragListeIntegrated";
import colorEnum from "../components/DeKomColors";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colorEnum.tertiary,
        drawerActiveTintColor: colorEnum.primary,
        drawerLabelStyle: {
          fontFamily: "Nexa-ExtraLight",
        }, unmountOnBlur: true,
        drawerInactiveTintColor: colorEnum.quartiary
      }}
      initialRouteName="Wallet"
    >
      <Drawer.Screen
        name="You"
        component={You}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={28} color= {colorEnum.quartiary} />
          ),
        }}
        listeners={({ navigation }) => ({
          press: () => navigation.navigate("You"),
        })}
      />
      <Drawer.Screen
        name="Wallet"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="albums-outline" size={28} color={colorEnum.quartiary} />
          ),
        }}
      />
      <Drawer.Screen
        name="Your Docs"
        component={FertigeAntragListe}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="folder-open-outline"
              size={28}
              color={colorEnum.quartiary}
            />
          ),
        }}
      />

<Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={28}
              color={colorEnum.quartiary}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
