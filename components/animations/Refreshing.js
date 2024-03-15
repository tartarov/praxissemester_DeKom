import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import colorEnum from "../DeKomColors";

function Refreshing() {
  return (
    <View style={{ flex: 1, alignItems:"center" ,backgroundColor: colorEnum.primary, paddingRight:16,marginLeft:20,marginBottom:20 }}>
     <LottieView
      autoPlay
        style={{
          width: 10,
          height: 75,
          backgroundColor: colorEnum.primary,
          borderRadius: 20
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/refreshing.json")}
      />
    </View>
  );
}

export default Refreshing;
