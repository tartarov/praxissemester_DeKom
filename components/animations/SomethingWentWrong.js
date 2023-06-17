import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

function SomethingWentWrong() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#2C3639' }}>
      <LottieView
        autoPlay
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#eee1",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/something_went_wrong.json")}
      />
    </View>
  );
}

export default SomethingWentWrong;