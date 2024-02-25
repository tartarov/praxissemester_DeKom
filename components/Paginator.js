import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import colorEnum from "./DeKomColors";

function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();
  console.log("data in dem paginator: " + JSON.stringify(data))

  let numberOfDots = 0;

  // Überprüfen, ob data eine Zahl ist
  if (typeof data === 'number') {
    numberOfDots = data;
  } else if (Array.isArray(data)) {
    numberOfDots = data.length;
  }

  const dots = Array.from({ length: numberOfDots }, (_, i) => i); // Array von 0 bis numberOfDots-1

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", height: 30 }}>
        {dots.map((i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 10, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const color = scrollX.interpolate({
            inputRange,
            outputRange: [colorEnum.secondary, colorEnum.quartiary, colorEnum.secondary],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                { width: dotWidth, opacity, backgroundColor: color },
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>
    </View>
  );
}

export default Paginator;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "blue",
    marginHorizontal: 8,
    borderWidth: 1.5,
    borderColor: colorEnum.secondary,
  },
});