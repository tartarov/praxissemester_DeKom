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
              <Ionicons name="document" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Menü"
          component={Menu}
          options={{
            headerShown: false, //change HomeScreen to MenuScreen
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ScreenDoesNotExist"
          component={ScreenDoesNotExist}
          options={{
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
        <Tab.Screen
          name="ErteilungsScreen"
          component={ErteilungScreen}
          options={{
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
        <Tab.Screen
          name="ExportPDFTestScreen"
          component={ExportPDFTestScreen}
          options={{
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
        <Tab.Screen
          name="SignatureScreen"
          component={SignatureCaptures}
          options={{
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
        <Tab.Screen
          name="FragenScreen"
          component={FragenScreen}
          options={{
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
        <Tab.Screen
          name="StaatsangehoerigkeitsScreen"
          component={StaatsangehoerigkeitsScreen}
          options={{
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
         <Tab.Screen
          name="ZahlungsScreen"
          component={ZahlungsScreen}
          options={{
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default MainScreen;

const styles = StyleSheet.create({});
