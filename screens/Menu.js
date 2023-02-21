import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import NotificationButton from "../components/NotificationButton";

export default function Menu({navigation}) {
  const { logout } = useContext(AuthContext);

  return (
  
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
      
      }}
    >
        <View style={{ marginBottom: 180, marginLeft:20, marginTop:50}}>
        <NotificationButton />
    </View>
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
          label="abmelden"
          onPress={() => {
            logout();
          }}
        >
          {" "}
          logout{" "}
        </Button>

        <View style={{ marginTop: 20 }}>
        <Button
          title="signate"
          label="signieren"
            onPress={() => {navigation.navigate("SignatureScreen"); Alert.alert("Hey!","Erstelle deine Signatur, ändere sie zu jeder Zeit!")
          }}
        >
          {" "}
          signate{" "}
        </Button>
        </View>
      </View>
    </View>
  );
}
