import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

function DokumenteButton({icon, isExpanded}) {
    const color = isExpanded ? "#DCD7C9" : "#2C3639";
  return (
    <View style={styles.buttonInnerContainer}>
        <Ionicons name= { icon } size={28} color={color}/>
    </View>
  );
}

export default DokumenteButton;

const styles = StyleSheet.create({
  buttonInnerContainer: {
    marginLeft: 48,
    paddingLeft: 3
  },
  pressed: {
    opacity: 0.5,
  },
});
