import React from "react";
import { StatusBar, Text, View, StyleSheet, SafeAreaView } from "react-native";
import NotificationButton from "./Buttons/NotificationButton";
import WeiterButton from "./Buttons/WeiterButton";
import colorEnum from "./DeKomColors";

export function HeaderAntrag({ weiterButtonOnPress }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
      <Text style={styles.logo}>|DeKom. </Text>
        <WeiterButton
          onPress={weiterButtonOnPress}
        >
          zurück
        </WeiterButton>
        <WeiterButton
          onPress={() => {
            handleSubmit();
          }}
        >
          weiter
        </WeiterButton>
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
    backgroundColor: colorEnum.primary,
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
    color: colorEnum.tertiary,
  },
});
