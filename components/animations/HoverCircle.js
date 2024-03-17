import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import colorEnum from "../DeKomColors";

function HoverCircle() {
  return (
    <View style={{ flex: 1, alignItems:"center" , backgroundColor: "transparent", bottom:10, right:12 }}>
     <LottieView
      autoPlay
        style={{
          width: 50,
          height: 55,
          backgroundColor: "transparent",
          borderRadius: 20
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/hoverCircle.json")}
      />
    </View>
  );
}

export default HoverCircle;
