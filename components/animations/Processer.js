import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import colorEnum from "../DeKomColors";

function Processer() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: colorEnum.primary }}>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 200,
          marginVertical:90,
          backgroundColor: colorEnum.primary,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/processing.json")}
      />
    </View>
  );
}

export default Processer;