import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import CustomText from "../Font";

function Nfc_tutorial() {
  return (
    <View> 
    <View style={{justifyContent: "center", alignItems: "center", backgroundColor: '#2C3639' }}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 400,
          backgroundColor: "#2C3639",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/Nfc_tutorial.json")}
      />
    </View>
    </View>
  );
}

export default Nfc_tutorial;
