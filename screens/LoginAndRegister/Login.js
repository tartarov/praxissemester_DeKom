import React, {
  useRef,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Vibration,
  useWindowDimensions,
  Alert,
} from "react-native"; //some imports not in use (yet)
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Buttons/Button.js";
import TextInput from "../../components/TextInput.js";
import { AuthContext } from "../../context/AuthContext";
import CustomText from "../../components/Font.js";
import LogoText from "../../components/LogoFont.js";
import { NativeEventEmitter, NativeModules } from "react-native";
import Nfc_tutorial from "../../components/animations/Nfc_tutorial.js";
import Correct from "../../components/animations/Correct.js";
import Processer from "../../components/animations/Processer.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SomethingWentWrong from "../../components/animations/SomethingWentWrong.js";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "../../components/BottomSheet.js";
import BottomSheetPUK from "../../components/BottomSheetPUK.js";
import BottomSheetCAN from "../../components/BottomSheetCAN.js";

const LoginSchema = Yup.object().shape({
  id: Yup.string()
    .min(8, "Too Short!")
    .max(8, "Too Long!")
    .required("Required"),
  pin: Yup.string()
    .min(6, "Too Short!")
    .max(6, "Too Long!")
    .required("Required"),
});

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [idCardData, setidCardData] = useState("");

  const { height } = useWindowDimensions();

  const bottomSheetRef = useRef(null);
  const bottomSheetPukRef = useRef(null);
  const bottomSheetCanRef = useRef(null);

  const openPinInput = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);

  const openPukInput = useCallback(() => {
    bottomSheetPukRef.current.expand();
  }, []);

  const openCanInput = useCallback(() => {
    bottomSheetCanRef.current.expand();
  }, []);

  const processLogin = useCallback(() => {
    bottomSheetRef.current.sendToLogin();
  }, []);

  const closeHandler = useCallback(() => {
    bottomSheetRef.current.close();
    bottomSheetPukRef.current.close();
    bottomSheetCanRef.current.close();
  }, []);

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { id: "", pin: "" },
      onSubmit: (values) => {
        fetchData({ navigation });
        login(values.pin, values.id);
      },
    });

  const fetchData = async () => {};

  const pin = useRef(null);

  // ...

  const { Aa2_Connector } = NativeModules;
  const eventEmitter = new NativeEventEmitter(Aa2_Connector);

  useEffect(() => {
    eventEmitter.addListener("pJson", (data) => {
      console.log("Received pJson: " + data);
      gotTheData(data);
    });
    return () => {
      eventEmitter.removeAllListeners("pJson");
    };
  }, []);

  const gotTheData = async (data) => {
    console.log("Got The Data! : " + JSON.parse(data));
    let fromAa2 = JSON.parse(data);
    console.log("Got The Data! : " + fromAa2.msg);
    setidCardData(fromAa2);
  };
  console.log("after Received JSON");
  console.log(height * 0.5);
  //console.log(JSON.stringify(idCardData));
  console.log(idCardData.result?.description);

  if (idCardData.msg === "ENTER_PIN") {
    openPinInput();
  } else if (idCardData.msg === "ENTER_PUK") {
    //openCanInput();
    // openPinInput();
    openPukInput();
  } else if (idCardData.msg === "ENTER_CAN") {
    openCanInput();
    // openPukInput();
  } else if (idCardData.msg === "READER") {
    //closeHandler();
  } else if (
    idCardData.result?.description ===
    "An internal error has occurred during processing."
  ) {
    //closeHandler();
    Alert.alert(
      "Oh no, " + idCardData.result?.description,
      idCardData.result?.message
    );
    processLogin();
  } else if (
    idCardData.result?.description === "A trusted channel could not be opened."
  ) {
    //closeHandler();
    Alert.alert(
      "Oh no, " + idCardData.result?.description,
      idCardData.result?.message
    );
  }

  return (
    <DismissKeyboard>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#2C3639",
            alignItems: "center",
            paddingTop: 50,
            justifyContent: "center",
          }}
        >
          <LogoText style={{ color: "#A27B5C", fontSize: 40 }}>
            |DeKom.
          </LogoText>
          <CustomText
            style={{
              color: "#A27B5C",
              fontSize: 11,
              marginBottom: 0,
            }}
          >
            All bueraucracies. One app.
          </CustomText>
          <View>
            <CustomText
              style={{
                color: "#DCD7C9",
                alignSelf: "center",
                fontSize: 12,
                marginTop: 80,
                textAlign: "center",
              }}
            >
              Halte dein Personalausweis auf die Rückseite deines handys bis
              eine Aktion erscheint
            </CustomText>

            {(idCardData === "" ||
              idCardData === "READER" ||
              idCardData === "INSERT_CARD") && <Nfc_tutorial />}

            {(idCardData === "ENTER_PIN" ||
              idCardData === "ENTER_PUK" ||
              idCardData === "ENTER_CAN") && <Processer />}

            {idCardData === "STATUS" && <SomethingWentWrong />}

            {idCardData === "AUTH" && <Correct />}
          </View>
          {/*  <View
            style={{ paddingHorizontal: 32, marginBottom: 36, width: "100%" }}
          >
        }   <TextInput
              style={{ color: "#DCD7C9" }}
              icon="user"
              placeholder="Enter your ID"
              autoCapitalize="none"
              autoCompleteType="cc-number"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              onChangeText={handleChange("id")}
              onBlur={handleBlur("id")}
              error={errors.id}
              touched={touched.id}
              onSubmitEditing={() => pin.current?.focus()}
            />
          </View>
          <View
            style={{ paddingHorizontal: 32, marginBottom: 0, width: "100%" }}
          >
            <TextInput
              style={{ color: "#DCD7C9" }}
              icon="key"
              placeholder="Enter your PIN"
              secureTextEntry
              autoCompleteType="password"
              keyboardType="number-pad"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange("pin")}
              onBlur={handleBlur("pin")}
              error={errors.pin}
              touched={touched.pin}
              ref={pin}
              onSubmitEditing={() => handleSubmit()}
            />
          </View> /*}
          {/*} <Image source={require('../../assets/images/AusweisApp2_Bildmarke_Symbol.png')} style={{height:60, width: 60, margin: 20}}/> */}
          <View
            style={{
              felx: 1,
              paddingHorizontal: 40,
              flexDirection: "row",
              marginVertical: 100,
            }}
          >
            <CustomText
              style={{
                height: 30,
                marginTop: 5,
                color: "#DCD7C9",
                fontSize: 17,
              }}
            >
              secured by
            </CustomText>
            <Image
              source={require("../../assets/images/AusweisApp2_Bildmarke_transparent.png")}
              style={{ height: 30, width: 180 }}
            />
          </View>
        </View>

        <BottomSheet activeHeight={height * 0.2} ref={bottomSheetRef} />
        <BottomSheetPUK activeHeight={height * 0.2} ref={bottomSheetPukRef} />
        <BottomSheetCAN
          activeHeight={height * 0.2}
          ref={bottomSheetCanRef}
        ></BottomSheetCAN>
      </GestureHandlerRootView>
    </DismissKeyboard>
  );
}
