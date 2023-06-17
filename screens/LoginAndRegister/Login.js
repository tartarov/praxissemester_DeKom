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
  KeyboardAvoidingView,
  Image,
  Vibration,
  useWindowDimensions,
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
  const [idCardData, setidCardData] = useState({});

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
      eventEmitter.removeListener("pJson");
    };
  }, []);

  const gotTheData = async (data) => {
    console.log("Got The Data! : " + JSON.parse(data));
    let fromAa2 = JSON.parse(data);
    console.log("Got The Data! : " + fromAa2.msg);
    setidCardData(fromAa2.msg);
  };
  console.log("after Received JSON");
  console.log(height * 0.5);
  console.log(JSON.stringify(idCardData));
  console.log(typeof idCardData);

  if (idCardData === "ENTER_PIN") {
    openPinInput();
  } else if (idCardData === "ENTER_PUK") {
    openPukInput();
  } else if (idCardData === "ENTER_CAN") {
    openCanInput();
  } else if (idCardData === "READER") {
    closeHandler();
  }

  return (
    <DismissKeyboard>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#2C3639",
            alignItems: "center",
            paddingTop: 150,
            // justifyContent: "center",
          }}
        >
          <LogoText style={{ color: "#A27B5C", fontSize: 40 }}>
            |DeKom.
          </LogoText>
          <CustomText
            style={{
              color: "#A27B5C",
              fontSize: 10,
              marginBottom: 0,
            }}
          >
            All bueraucracies. One app.
          </CustomText>
          {idCardData.length ? <Correct /> : <Nfc_tutorial />}
          <View
            style={{ paddingHorizontal: 32, marginBottom: 36, width: "100%" }}
          >
            <TextInput
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
          </View>
          {/*} <Image source={require('../../assets/images/AusweisApp2_Bildmarke_Symbol.png')} style={{height:60, width: 60, margin: 20}}/> */}
          <View style={{ felx: 1, paddingHorizontal: 40, marginBottom: 70 }}>
            <Image
              source={require("../../assets/images/AusweisApp2_Bildmarke_transparent.png")}
              style={{ height: 30, width: 180, marginVertical: 20 }}
            />
          </View>
          <Button
            label="Authentifizieren"
            onPress={() => {
              openPinInput();
            }}
          />
        </View>

        <BottomSheet activeHeight={height * 0.5} ref={bottomSheetRef} />
        <BottomSheetPUK activeHeight={height * 0.5} ref={bottomSheetPukRef} />
        <BottomSheetCAN
          activeHeight={height * 0.5}
          ref={bottomSheetCanRef}
        ></BottomSheetCAN>
      </GestureHandlerRootView>
    </DismissKeyboard>
  );
}
