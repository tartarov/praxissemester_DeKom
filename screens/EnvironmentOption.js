import React, { useState, useContext } from "react";
import { View, Switch, StyleSheet, Text, Button } from "react-native";
import { EnvContext } from "../context/EnvContext";

export default function EnvironmentOption() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { setMock } = useContext(EnvContext);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const proceedWithThisEnv = (isEnabled) => {
    setMock(isEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mock on?</Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.text2}>{isEnabled ? "on" : "off"}</Text>
      <Button
        onPress={() => proceedWithThisEnv(isEnabled)}
        title="Proceed"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  text: {
    fontSize: 28,
    margin: 20,
  },

  text2: {
    fontSize: 20,
    margin: 20,
  },

  switch: {
    margin: 20,
    transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }]
  },
});
