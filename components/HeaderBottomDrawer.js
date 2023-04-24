import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import DokumenteButton from "./Buttons/DokumentButton";

export function HeaderBottomdrawer({ isExpanded }) {
  const backgroundColor = isExpanded ? "#2C3639" : "#DCD7C9";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <StatusBar />
      <View style={styles.headerContainer}>
        <DokumenteButton
          icon={isExpanded ? "chevron-down-circle" : "chevron-up-circle"}
          isExpanded={isExpanded}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 0,
    paddingTop: 0,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderTopColor: "#A27B5C",
    borderLeftColor: "#A27B5C",
    borderRightColor: "#A27B5C",
    borderBottomColor: "#DCD7C9",
    elevation: 7,
  },
  headerContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 140,
  },
  logo: {
    //fontFamily: "Trebuchet MS",
    fontSize: 38,
    marginLeft: 20,
    color: "#A27B5C",
  },
});
