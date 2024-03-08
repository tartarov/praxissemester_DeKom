import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import colorEnum from "../DeKomColors";

function Correct() {
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: colorEnum.quartiary }}>
     <LottieView
      autoPlay
        style={{
          width: 200,
          height: 120,
          backgroundColor: colorEnum.quartiary,
          borderRadius: 20
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/checkmark.json")}
      />
    </View>
  );
}

export default Correct;
