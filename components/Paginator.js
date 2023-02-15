import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";
import ModalTester from "../screens/GeertingsModal.js";
let ei
function Paginator({data, scrollX }) {
  console.log("data current State:" + data);
  console.log("data current scrollx:" + scrollX);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", height: 64 }}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 200, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const color = scrollX.interpolate({
            inputRange,
            outputRange: [ "#e94832", "#fce9e6", "#e94832"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity, backgroundColor: color }]}
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
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 6,
    borderRadius: 5,
    backgroundColor: "blue",
    marginHorizontal: 8,
  },
});
