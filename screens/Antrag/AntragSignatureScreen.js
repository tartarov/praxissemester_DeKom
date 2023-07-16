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
import SignatureScreen from "react-native-signature-canvas";
import ButtonGhost from "../../components/Buttons/ButtonGhost";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/animations/Loader";
import CustomText from "../../components/Font";
import { DataContext } from "../../context/DataContext";
import { Header } from "../../components/Header";
import WeiterButton from "../../components/Buttons/WeiterButton";
import Button from "../../components/Buttons/Button";

let isVarifiedVar;

const AntragSignatureCaptures = ({ route, navigation }) => {
  const signatureRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isVerified } = useContext(AuthContext);
  const { userData, fetchData } = useContext(DataContext);
  const [trigerred, setIsTriggered] = useState(false);
  const [signature, setSign] = useState(null);
  const [antragData, setAntragData] = useState(
    route.params?.antragData || null
  );
  isVarifiedVar = isVerified;
  var base64raw;

  // let antragData = route.params?.antragData || null;

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [trigerred]);

  const Sign = ({ text, onOK }) => {
    const ref = useRef();

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
      console.log(signature);
      setSign(signature);
      if (signature) {
        base64raw = signature.replace("data:image/png;base64,", "");
        Alert.alert(
          "Sicher?",
          "Bist du sicher, dass du diese Signatur speichern willst?",
          [
            {
              text: "Ja, anwenden ",
              onPress: () => {
                setAntragData((prevData) => ({ ...prevData, signatur: base64raw }));
              },
            },
            {
              text: "Nein, nochmal",
            },
          ]
        );
      }
      //  onOK(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
      console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
      console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
      // ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
      console.log(data);
    };

    const handleConfirm = () => {
      console.log("end");
      ref.current.readSignature();
    };

    return (
      <>
        <SignatureScreen
          ref={ref}
          onEnd={handleEnd}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onGetData={handleData}
          autoClear={true}
        />
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Button label="Bestätigen" onPress={handleConfirm}></Button>
        </View>
        {signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        ) : null}
      </>
    );
  };

  return (
    <>
      <Header />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#2C3639", //2C3639
          paddingLeft: 80,
          paddingBottom: 10,
        }}
      >
        <WeiterButton
          onPress={() => {
            navigation.navigate("FragenScreen", { antragData });
          }}
        >
          zurück
        </WeiterButton>
        <WeiterButton
          onPress={() => {
            console.log(JSON.stringify(antragData));
            navigation.navigate("ZahlungsScreen", { antragData });
          }}
        >
          weiter
        </WeiterButton>
      </View>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 10, backgroundColor: "#2C3639" }}
      >
        <Sign />
        {/*  <SignatureView 
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
        /> */}
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

        {/*    <ScrollView style={{ flex: 1, margin: 20, paddingTop: 50 }}>
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
            </ScrollView> */}
      </SafeAreaView>
    </>
  );
};

export default AntragSignatureCaptures;
