import React from "react";
import { StatusBar, Text, View, StyleSheet, SafeAreaView, Pressable } from "react-native";
import NotificationButton from "./Buttons/NotificationButton";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "./Font";

export function Header({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        <CustomText style={styles.logo}>|DeKom. </CustomText>
        <NotificationButton />
        <Pressable onPress={() => navigation.openDrawer()}>
          <Ionicons
            name="list-outline"
            size={34}
            style={{ paddingRight: 20, paddingTop: 8, color: "#A27B5C" }}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: "#2C3639",
    //  borderBottomLeftRadius: 20,
    //  borderBottomRightRadius: 20
    elevation: 7,
  },
  headerContainer: {
    marginTop: 5,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    //fontFamily: "Trebuchet MS",
    fontSize: 38,
    marginLeft: 20,
    color: "#A27B5C",
  },
});
