import React, { useContext } from "react";
import { View, Text, Alert, StatusBar } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Buttons/Button";
import NotificationButton from "../../components/Buttons/NotificationButton";
import { Header } from "../../components/Header";

export default function Menu({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
<>
     <Header/>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyConent: "center",
          paddingTop: 100,
           backgroundColor: "#3F4E4F"
        }}
      >
       {/* <Text style={{ marginBottom: 20, fontSize: 20 }}> Menü </Text> */}
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

        <View style={{ marginTop: 50 }}>
          <Button
            title="signate"
            label="signieren"
            onPress={() => {
              navigation.navigate("SignatureScreen");
              Alert.alert(
                "Hey!",
                "Erstelle deine Signatur, ändere sie zu jeder Zeit!"
              );
            }}
          >
            {" "}
            signate{" "}
          </Button>
        </View>
      </View>
      </>
  );
}
