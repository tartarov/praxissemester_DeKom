import React, { useRef, useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Alert,
  Image,
} from "react-native";
import {SignatureView} from "react-native-signature-capture-view"
import ButtonGhost from "../../components/Buttons/ButtonGhost";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/animations/Loader";
import CustomText from "../../components/Font";
import { DataContext } from "../../context/DataContext";
import { Header } from "../../components/Header";
let isVarifiedVar;

const SignatureCaptures = ({ navigation }) => {
  const signatureRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isVerified } = useContext(AuthContext);
  const { userData, fetchData } = useContext(DataContext);
  const [trigerred, setIsTriggered] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    `data:image/png;base64,${userData.body.signature}`
  );
  isVarifiedVar = isVerified;

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
    setImageUrl(`data:image/png;base64,${userData.body.signature}`);
  }, [trigerred]);

  const fetcher = async (stringBase) => {
    setIsLoading(true);
    let respond = await fetch(
      "http://192.168.178.24:3000/user/save/signature",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          base: stringBase,
        }),
      }
    );

    const responseJSON = await respond.json();

    const verificationStatus = await isVarifiedVar(responseJSON);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      console.log("respond contains true => success... YUHU");
      Alert.alert("Gespeichert!", "Deine Änderungen wurden gespeichert.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header navigation={navigation} />
      <SafeAreaView
        style={{ flex: 1, paddingTop: 10, backgroundColor: "#2C3639" }}
      >
        <SignatureView
          style={{
            borderWidth: 2,
            //  borderRadius: 5,
            //  borderColor:'#DCD7C9',
            height: 250,
          }}
          ref={signatureRef}
          // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
          onSave={(val) => {
            //  a base64 encoded image
            console.log("saved signature");
            var base64raw = val.replace("data:image/png;base64,", "");
            Alert.alert(
              "Sicher?",
              "Bist du sicher, dass du diese Signatur speichern willst?",
              [
                {
                  text: "Ja, speichere ",
                  onPress: () => {
                    setIsTriggered(true);
                    fetcher(base64raw)
                  },
                },
                {
                  text: "Nein, nochmal",
                },
              ]
            );
          }}
          onClear={() => {
            console.log("cleared signature");
            Alert.alert(
              "Sicher?",
              "Bist du sicher, dass du diese Signatur löschen willst?",
              [
                {
                  text: "Ja, lösche ",
                  onPress: () => {
                    setIsTriggered(true);
                    fetcher("")
                  },
                },
                {
                  text: "Nein, behalte",
                },
              ]
            );
          }}
        />
        <CustomText
          style={{
            fontSize: 10,
            alignItems: "center",
            paddingTop: 15,
            paddingLeft: 30,
            color: "#DCD7C9",
          }}
        >
          Ich stimme den rechtlichen Bedingungen und Vereinbarungen zu.
        </CustomText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: 50,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#DCD7C9",
              marginTop: 20,
              marginLeft: 30,
              marginRight: 30,
            }}
            onPress={() => {
              signatureRef.current.clearSignature();
            }}
          >
            <CustomText style={{ color: "#DCD7C9" }}>Löschen</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#DCD7C9",
              marginTop: 20,
              marginLeft: 30,
              marginRight: 30,
            }}
            onPress={() => {
              setIsTriggered(true);
              signatureRef.current.saveSignature();
              Alert.alert("Gespeichert!", "Deine Signatur wurde gepeichert.");
            }}
          >
            <CustomText style={{ color: "#DCD7C9" }}>Speichern</CustomText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            paddingTop: 50,
          }}
        >
          <ButtonGhost
            title="Back"
            label="zurück"
            onPress={() => {
              setIsTriggered(true);
              navigation.navigate("Settings");
            }}
          />
        </View>

        <ScrollView style={{ flex: 1, margin: 20, paddingTop: 50 }}>
          <CustomText
            style={{
              color: "#DCD7C9",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginLeft: 128,
              paddingBottom: 10,
              fontSize: 12,
            }}
          >
            Saved Signature:
          </CustomText>
          {isLoading == true ? (
            <Loader />
          ) : (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: 200,
                height: 150,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                flex: 1,
                marginLeft: 85,
              }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignatureCaptures;
