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
    setMock(isEnabled)
  }

  return (
    <View style={styles.container}>
      <Text>Mock on?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>{isEnabled ? "on" : "off"}</Text>
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
});
