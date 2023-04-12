import LottieView from "lottie-react-native";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ButtonGhost from "../../components/ButtonGhost";

export function ScreenDoesNotExist({ navigation }) {
  const [finish, setFinish] = useState(false);

  const handleFinish = () => {
    setFinish(true);
  };
  return (
    <View style={styles.animationContainer}>
      <LottieView
        loop={true}
        onAnimationFinish={() => handleFinish()}
        autoPlay
        //ref={animation}
        style={{
          width: 300,
          height: 300,
          backgroundColor: "#eee1",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/ScreenDoesNotExist.json")}
      />
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "light",
            color: "#223e4b",
            marginTop: 40,
          }}
        >
          Tut uns leid, wir arbeiten daran.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <ButtonGhost
          title="Back to home"
          label="Zurück zu Home"
          onPress={() => {
            navigation.navigate("Home"), setFinish(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
});
