import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import Menu from "../Menü/Menu";
import Antragmenue from "./AntragListe";
import ErteilungScreen from "../Antrag/ErteilungScreen";
import FragenScreen from "../Antrag/FragenScreen";
import { ScreenDoesNotExist } from "../ScreenDoesNotExist";
import SignatureCaptures from "../Menü/SignatureScreen";
import ExportPDFTestScreen from "../Antrag/ExportPDFTestScreen";
import StaatsangehoerigkeitsScreen from "../Antrag/StaatsangehoerigkeitScreens";
import ZahlungsScreen from "../Antrag/ZahlungsScreen";

const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          swipeEnabled: true,
          headerShown: true,
        }}
      >
        <Drawer.Screen name="Dokumente" component={Antragmenue} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Menü" component={Menu} />
        <Drawer.Screen
          name="ScreenDoesNotExist"
          component={ScreenDoesNotExist}
        />
        <Drawer.Screen name="ErteilungsScreen" component={ErteilungScreen} />
        <Drawer.Screen
          name="ExportPDFTestScreen"
          component={ExportPDFTestScreen}
        />
        <Drawer.Screen name="SignatureScreen" component={SignatureCaptures} />
        <Drawer.Screen name="FragenScreen" component={FragenScreen} />
        <Drawer.Screen
          name="StaatsangehoerigkeitsScreen"
          component={StaatsangehoerigkeitsScreen}
        />
        <Drawer.Screen name="ZahlungsScreen" component={ZahlungsScreen} />
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNav;

const styles = StyleSheet.create({});
