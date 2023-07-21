import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import React from "react";
import colorEnum from "./DeKomColors";

function PaginatorDark({ data, scrollX }) {
  console.log("data current State:" + data);
  console.log("data current scrollx:" + scrollX);
  const { width } = useWindowDimensions();

  if (data != null) {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", height: 30 }}>
          {data.map((_, i) => {
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
              outputRange: [colorEnum.primary,colorEnum.quartiary, colorEnum.primary],
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
}

export default PaginatorDark;

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
