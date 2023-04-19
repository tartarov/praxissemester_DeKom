import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

function NotificationButton({ onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "#3F4E4F" }}
      >
        <Ionicons name="notifications" size={15} color="#A27B5C" />
      </Pressable>
    </View>
  );
}

export default NotificationButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: 50,
    marginTop: 18,
  },
  buttonInnerContainer: {
    backgroundColor: "#3F4E4F",
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderColor: "#A27B5C",
    borderWidth: 1,
    borderRadius: 16,
    elevation: 6,
  },
  pressed: {
    opacity: 0.5,
  },
});
