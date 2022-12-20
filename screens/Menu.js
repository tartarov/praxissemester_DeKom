import React, { useContext } from "react";
import { View, Text, StatusBar } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

export default function Menu() {
  const { logout } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#223e4b", fontSize: 40, fontWeight: "bold" }}>
        |DeKom.
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyConent: "center",
         // marginTop: StatusBar.currentHeight * 2,
        }}
      >
        <Text style={{ marginBottom: 20, fontSize: 20 }}> Menü </Text>
        <Button
          title="logout"
          label="LOGOUT"
          onPress={() => {
            logout();
          }}
        >
          {" "}
          logout{" "}
        </Button>
      </View>
    </View>
  );
}
