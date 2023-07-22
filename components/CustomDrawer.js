import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loader from "./animations/Loader";
import { DataContext } from "../context/DataContext";
import CustomText from "./Font";
import { useNavigation } from "@react-navigation/native";
import colorEnum from "./DeKomColors";

function CustomDrawer( props ) {
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const { data, getWalletData } = useContext(DataContext);
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    getWalletData();
    setIsLoading(false);
  }, []);

  if (data.length) {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ backgroundColor: colorEnum.secondary }}
        >
          <View
            style={{
              backgroundColor: colorEnum.primary,
              elevation: 8,
              alignItems: "center",
              marginTop: -4,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
               <Pressable onPress={()=>{navigation.navigate("Settings")}}>
            {/* <Image source={require('../assets/images/pngwing.com.png')} style={{height:80, width: 80, margin: 20}} />  */}
            {data[0].document.vorname == "Tim" ? (
              <Image
                source={require("../assets/images/TimA.jpeg")}
                style={{
                  height: 130,
                  width: 120,
                  margin: 0,
                  marginLeft: 0,
                  marginTop: 35,
                  marginBottom: 20,
                  borderRadius: 100,
                }}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={100}
                style={{
                  marginTop: 30,
                  marginBottom: 70,
                  color: colorEnum.primary,
                  marginRight: 10,
                  marginLeft: 30,
                }}
              />
            )}
         
              <CustomText
                style={{
                  color: colorEnum.quartiary,
                  paddingBottom: 2,
                  fontSize: 10,
                }}
              >
                Willkommen,
              </CustomText>
              <CustomText
                style={{
                  color: colorEnum.quartiary,
                  paddingBottom: 20,
                  fontSize: 20,
                }}
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  data[0].document.vorname + " " + data[0].document.name
                )}
              </CustomText>
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colorEnum.secondary,
              paddingTop: 10,
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
            borderTopColor: colorEnum.primary,
            backgroundColor: colorEnum.secondary,
          }}
        >
          <Pressable onPress={() => {}} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="bandage-outline" size={28} color={colorEnum.tertiary} />
              <CustomText style={{ fontSize: 14, marginLeft: 25, color: colorEnum.quartiary  }}>
                Support
              </CustomText>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              logout();
            }}
            style={{ paddingVertical: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="exit-outline" size={28} color={colorEnum.tertiary} />
              <CustomText style={{ fontSize: 22, marginLeft: 25, color:colorEnum.quartiary }}>Log out</CustomText>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}

export default CustomDrawer;
