import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import Menu from "./Menu";
import Antragmenue from "./AntragListe";
import ErteilungScreen from "./Antrag/ErteilungScreen";
import FragenScreen from "./Antrag/FragenScreen";
import { ScreenDoesNotExist } from "./ScreenDoesNotExist";
import SignatureCaptures from "./SignatureScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExportPDFTestScreen from "./ExportPDFTestScreen";
import StaatsangehoerigkeitsScreen from "./Antrag/StaatsangehoerigkeitScreens";
import ZahlungsScreen from "./Antrag/ZahlungsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainScreen() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ swipeEnabled: true }}
      >
        <Tab.Screen
          name="Dokumente"
          component={Antragmenue}
          options={{
            headerShown: false, //change HomeScreen to DokumenteScreen
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document" color="#223e4b" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color="#223e4b" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Menü"
          component={Menu}
          options={{
            headerShown: false, //change HomeScreen to MenuScreen
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color="#223e4b" size={size} />
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
      </Tab.Navigator>
    </>
  );
}

export default MainScreen;

const styles = StyleSheet.create({});
