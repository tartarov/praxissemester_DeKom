import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions
} from "react-native";
import DokumenteButton from "./Buttons/DokumentButton";


const { width } = Dimensions.get("screen");

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;
console.log("ITEM_HEIGHT --- " + (600/1.09) + "  " + (ITEM_HEIGHT*2.01) )

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
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingBottom: 0,
    paddingTop: 0,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderTopColor: "#2C3639",
    borderLeftColor: "#2C3639",
    borderRightColor: "#2C3639",
    borderBottomColor: "#DCD7C9",
    elevation: 7,
  },
  headerContainer: {
    //flex:1,
    height: ITEM_HEIGHT/11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ITEM_WIDTH/2.85,
  },
  logo: {
    //fontFamily: "Trebuchet MS",
    fontSize: 38,
    marginLeft: 20,
    color: "#A27B5C",
  },
});
