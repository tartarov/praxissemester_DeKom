import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import colorEnum from "../DeKomColors";

function SomethingWentWrong() {
  return (
    <View style={{flex: 1, alignItems: "center", backgroundColor: "lightcoral", paddingTop:20 }}>
      <LottieView
        autoPlay
        style={{
          width: 80,
          height: 50,
          backgroundColor: "lightcoral",
          borderRadius: 20
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/somethingWentWrong.json")}
      />
    </View>
  );
}

export default SomethingWentWrong;