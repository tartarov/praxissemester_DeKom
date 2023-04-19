import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loader from "./animations/Loader";
import { DataContext } from "../context/DataContext";


 function CustomDrawer(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const { data, getWalletData } = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true)
    getWalletData()
    setIsLoading(false);
    }, []);


if(data.length){
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#3F4E4F" }}
      >
        <View
          style={{
            backgroundColor: "#2C3639",
            elevation: 8,
            alignItems: "center",
            marginTop:-4
          }}
        >
          {/* <Image source={require('../assets/images/pngwing.com.png')} style={{height:80, width: 80, margin: 20}} />  */}
          <Ionicons
            name="person-circle-outline"
            size={122}
            style={{ margin: 10 }}
          />
          <Text
            style={{
              color: "#DCD7C9",
              paddingBottom: 20,
              fontSize: 20,
            }}
          > 
         {isLoading ? <Loader /> :  data[0].document.vorname + " " + data[0].document.name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#3F4E4F",
            paddingTop: 5,
            marginBottom: 270,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#DCD7C9",
          backgroundColor: "#3F4E4F",
        }}
      >
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="bandage-outline" size={28} />
            <Text style={{ fontSize: 22, marginLeft: 25 }}>Support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {logout()}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={28} />
            <Text style={{ fontSize: 22, marginLeft: 25 }}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
      }
}

export default CustomDrawer;
