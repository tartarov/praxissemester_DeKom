import {
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";
import React from 'react'

function Paginator({ data, scrollX }) {
  console.log("data current State:" + data);
  console.log("data current scrollx:" + scrollX);
  const { width } = useWindowDimensions();

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
            outputRange: ["#3F4E4F", "#DCD7C9", "#3F4E4F"],
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
    borderWidth:2,
    borderColor: "balck"
  },
});
