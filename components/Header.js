import React from "react";
import { StatusBar, Text, View, StyleSheet, SafeAreaView } from "react-native";
import NotificationButton from "./Buttons/NotificationButton";

export function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>|DeKom. </Text>
        <NotificationButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    paddingBottom:20,
    paddingTop:20,
    backgroundColor: "#2C3639",
  },
  headerContainer: {  
    marginTop: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    //fontFamily: "Trebuchet MS",
    fontWeight: "bold",
    fontSize: 38,
    marginLeft: 20,
    color: "#A27B5C",
  },
});
