import React, { useRef, useState, useContext } from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { SignatureView } from "react-native-signature-capture-view";
import { FileWatcherEventKind } from "typescript";
import ButtonGhost from "../components/ButtonGhost";
import { AuthContext } from "../context/AuthContext";
import FormData from 'form-data'
import { atob } from "js-base64";
import LottieView from 'lottie-react-native';
let isVarifiedVar;
let form;

const SignatureCaptures = ({ navigation }) => {
  const signatureRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const { isVerified } = useContext(AuthContext);
  isVarifiedVar = isVerified

  const loader = () => {

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <LottieView
        autoPlay
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#eee1',
          speed: 3
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/loader2.json')}
      />
      </View>
    );
  
}

  const fetcher = async (stringBase) => {
    console.log("ich bin im fetcher")
    console.log("das form  ist hier: " + stringBase)
    setIsLoading(true);
    let respond = await fetch(
      "http://93.133.25.152:3000/user/save/signature",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          base: stringBase
      })

      });

      let responseJSON = await respond.json();
      console.log("RESPONSE: " + responseJSON)
      let responseStringy = JSON.stringify(responseJSON);
      let responseParsed = JSON.parse(responseStringy);
  
      let verified = await isVarifiedVar(responseParsed);
      if (verified == "verified") {
        if (responseParsed.body.value == true) {
          console.log("respond contains true => success... YUHU");
          Alert.alert("Gespeichert!", "Deine Signatur wurde gepeichert.");
        }
      }
      setIsLoading(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" style={{ paddingTop: 100 }} />
      <SafeAreaView style={{ flex: 1, paddingTop: 100 }}>
        <SignatureView
          style={{
            borderWidth: 2,
            height: 250,
          }}
          ref={signatureRef}
          // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
          onSave={(val) => {
            //  a base64 encoded image
            console.log("saved signature");
            var base64raw = val.replace("data:image/png;base64,", "");
            console.log(val);
            setText(val);
            fetcher(base64raw)
          }}
          onClear={() => {
            console.log("cleared signature");
            setText("");
            fetcher("")
          }}
        />
        <View
          style={{ flexDirection: "row", justifyContent: "center", height: 50 }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
            onPress={() => {
              signatureRef.current.clearSignature();
              Alert.alert("Gelöscht.", "Deine Signatur wurde gelöscht.");
            }}
          >
            <Text>Löschen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
            onPress={() => {
              signatureRef.current.saveSignature();
              Alert.alert("Gespeichert!", "Deine Signatur wurde gepeichert.");
            }}
          >
            <Text>Speichern</Text>
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
              navigation.navigate("Menü");
            }}
          />
        </View>

        <ScrollView style={{ flex: 1, margin: 20, paddingTop: 50 }}>
        {isLoading == true ? loader() :  <Text numberOfLines={10} ellipsizeMode="tail">
            {text}
        
          </Text>
        }
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignatureCaptures;
