import { createDrawerNavigator } from '@react-navigation/drawer';
import SignatureScreen from '../Menü/SignatureScreen'
import React from "react";
import Menu from '../Menü/Menu';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Menu" component={Menu} />
    </Drawer.Navigator>
  );
}

export default DrawerNav