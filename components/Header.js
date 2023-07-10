import React from "react";
import { StatusBar, Text, View, StyleSheet, SafeAreaView, Pressable, Image } from "react-native";
import NotificationButton from "./Buttons/NotificationButton";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "./Font";

export function Header({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
      <Image
              source={require("../assets/adaptive-icon.png")}
              style={styles.logo}
            />
       {/*} <CustomText style={styles.logo}>|DeKom. </CustomText> */}
       <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal:10,}}>
        <View style={{marginTop:15, paddingHorizontal:30}}>
        <NotificationButton />
        </View>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Ionicons
            name="ellipsis-vertical-circle-outline"
            size={34}
            style={{ paddingRight: 20, paddingTop: 15, color: "#A27B5C" }}
          />
        </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    paddingBottom: 15,
    paddingTop: 0,
    backgroundColor: "#2C3639",
    //  borderBottomLeftRadius: 20,
    //  borderBottomRightRadius: 20
    //elevation: 7,
  },
  headerContainer: {
    marginTop: 0,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    //fontFamily: "Trebuchet MS",
    marginLeft:20,
    height: 65,
    width: 65,
  },
});
