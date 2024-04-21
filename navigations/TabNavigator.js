// ./navigation/TabNavigator.js

import React, { useRef, useCallback, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, useWindowDimensions } from "react-native";
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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import FertigeAntragListe from "../screens/FertigeAntragListe";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Antragmenue from "../components/AntragListeDrawer";
import ScanMe from "../screens/ScanMe";
import AntragSignatureCaptures from "../screens/Antrag/AntragSignatureScreen";
import colorEnum from "../components/DeKomColors";
import FormBlocks from "../screens/Antrag/FormBlocks";
import MeinePersoenlichenDaten from "../screens/Menü/MeinePersoenlichenDaten";
import Privatsphaere from "../screens/Menü/Privatsphaere";

const Tab =
  Platform.OS === "ios"
    ? createMaterialTopTabNavigator()
    : createBottomTabNavigator();

const getNavigationOptions = () => {
  if (Platform.OS === "ios") {
    //Props for the ios navigator
    return {
      labeled: false,
      initialRouteName: "Settings",
      activeColor: "red",
      inactiveColor: "white",
    };
  }
  //Props for any other OS navigator
  return {
    initialRouteName: "Home",
    tabBarOptions: { activeTintColor: "red" },
  };
};

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const [expanded, isExpanded] = useState(false);
  const { height } = useWindowDimensions();
  const AntragListeRef = useRef(null);

  const openAntragListe = useCallback(() => {
    AntragListeRef.current.expand();
    isExpanded(true);
  }, []);

  const closeHandler = useCallback(() => {
    AntragListeRef.current.close();
    isExpanded(false);
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        animationEnabled={true}
        tabBarPosition="top"
        screenOptions={{
          swipeEnabled: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            marginHorizontal: 20,
            marginBottom: 10,
            borderRadius: 100,
            backgroundColor: colorEnum.primary,
            position: "absolute",
          },
        }}
      >
        <Tab.Screen
          name="Anträge"
          component={HomeScreen} //CURRENT SCREEN
          listeners={{
            tabPress: () => {
              setTimeout(() => {
                openAntragListe();
              }, 250);
            },
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  backgroundColor: colorEnum.tertiary,
                  borderRadius: 40,
                  paddingHorizontal: 5,
                  paddingRight: 0,
                  elevation: 9,
                  height: 60,
                  width: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="add-outline"
                  color={focused ? colorEnum.quartiary : colorEnum.primary}
                  size={50}
                />
              </View>
            ),
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{
                  color: focused ? colorEnum.tertiary : colorEnum.quartiary,
                  fontSize: 12,
                }}
              >
                Anträge
              </Text>
            ),
          }}
        />

        <Tab.Screen
          name="You"
          component={You}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              // e.preventDefault();
              //  navigation.navigate("You");
            },
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name="person"
                color={focused ? colorEnum.quartiary : colorEnum.secondary}
                size={size}
              />
            ),
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{
                  color: focused ? colorEnum.tertiary : colorEnum.quartiary,
                  fontSize: 12,
                }}
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
              <Ionicons
                name="home"
                color={focused ? colorEnum.quartiary : colorEnum.secondary}
                size={size}
              />
            ),
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{
                  color: focused ? colorEnum.tertiary : colorEnum.quartiary,
                  fontSize: 12,
                }}
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
              <Ionicons
                name="menu"
                color={focused ? colorEnum.quartiary : colorEnum.secondary}
                size={size}
              />
            ),
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{
                  color: focused ? colorEnum.tertiary : colorEnum.quartiary,
                  fontSize: 12,
                }}
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
            tabBarButton: () => null,
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
          name="MeinePersoenlichenDaten"
          component={MeinePersoenlichenDaten}
          options={{
            headerShown: false,
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
        <Tab.Screen
          name="Privatsphaere"
          component={Privatsphaere}
          options={{
            headerShown: false,
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
        <Tab.Screen
          name="FormBlockScreen"
          component={FormBlocks}
          options={{
            headerShown: false,
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
        <Tab.Screen
          name="ScanMe"
          component={ScanMe}
          options={{
            headerShown: false,
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
      </Tab.Navigator>
      <Antragmenue
        activeHeight={height * 0.77}
        ref={AntragListeRef}
        navigation={navigation}
      />
    </>
  );
};

export default React.memo(BottomTabNavigator);
