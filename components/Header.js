import React from 'react';
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    SafeAreaView
  } from "react-native";
  import NotificationButton from './NotificationButton';

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
    screen: {
      color: "#223e4b",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#fce9e6",
    },
    buttonContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    headerContainer: {
      marginTop: 10,
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    logo: {
      fontWeight: "bold",
      fontSize: 38,
      marginLeft: 20,
      color: "#223e4b",
    }
})
