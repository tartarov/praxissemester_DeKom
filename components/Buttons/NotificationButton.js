import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import colorEnum from "../DeKomColors";

function NotificationButton({ onPress }) {
  return (
    <View>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: colorEnum.secondary }}
      >
        <Ionicons name="notifications-circle-outline"  size={34}
            style={{  color: colorEnum.tertiary }} />
      </Pressable>
    </View>
  );
}

export default NotificationButton;

const styles = StyleSheet.create({
 
  pressed: {
    opacity: 0.5,
  },
});
