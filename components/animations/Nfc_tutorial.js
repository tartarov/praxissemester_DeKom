import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import CustomText from "../Font";
import colorEnum from "../DeKomColors";

function Nfc_tutorial() {
  return (
    <View> 
    <View style={{justifyContent: "center", alignItems: "center", backgroundColor: colorEnum.primary }}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 400,
          backgroundColor: colorEnum.primary,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/Nfc_tutorial.json")}
      />
    </View>
    </View>
  );
}

export default Nfc_tutorial;
