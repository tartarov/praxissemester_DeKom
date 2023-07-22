import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import colorEnum from "../DeKomColors";

function Correct() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colorEnum.primary }}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
          backgroundColor: colorEnum.primary,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/checkmark.json")}
      />
    </View>
  );
}

export default Correct;
