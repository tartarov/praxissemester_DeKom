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
  Pressable,
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
import colorEnum from "../../components/DeKomColors.js";
import { Ionicons } from "@expo/vector-icons";

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
  const [showHelperText, setShowHelperText] = useState(false);

  const helper = () => {
    setShowHelperText(true);
  };

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

  const runAuth = async() =>{
    Aa2_Connector.sendCommand(
    '{"cmd": "RUN_AUTH", "tcTokenURL": "https://ref-ausweisident.eid-service.de/oic/authorize?scope=openid+FamilyNames+GivenNames+DateOfBirth+PlaceOfResidence&response_type=code&redirect_uri=https%3A%2F%2Fdekom.ddns.net%3A4222%2Fauth&state=123456&client_id=UF2RkWt7dI&acr_values=integrated", "developerMode": "false", "handleInterrupt": "false", "status": "true"}'
    );
    }

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
    let fromAa2 = JSON.parse(data);
    console.log("Got The Data! : " + fromAa2.msg);
    setidCardData(fromAa2);
  };
  console.log("after Received JSON");

/*  if(idCardData.msg ==="INSERT_CARD"){
    Aa2_Connector.sendCommand(
    // '{"cmd": "GET_READER", "name": "Simulator"}'
    '{"cmd": "SET_CARD", "name": "Simulator"}'
    // '{"cmd": "GET_READER_LIST"}'

    );
  }
  */

  if (idCardData.hasOwnProperty("url")) {
  console.log("Der Schlüssel 'url' ist vorhanden.");
  var urlValue = idCardData.url;
  getUserInfo(urlValue)
 
  }

  async function getUserInfo(url) {
    let response = await fetch(url)
    const userInfoJSON = await response.text();
    console.log("RESPONSE: " + userInfoJSON)
  }

  if(idCardData.msg === "ACCESS_RIGHTS"){
    Aa2_Connector.sendCommand(
  "{\"cmd\": \"ACCEPT\"}"
    )
  }

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
    // Aa2_Connector.disconnect()
  } else if (
    idCardData.result?.description === "A trusted channel could not be opened."
  ) {
    //closeHandler();
    Alert.alert(
      "Oh no, " + idCardData.result?.description,
      idCardData.result?.message
    );
  } else if (idCardData.error === "You must provide 6 digits") {
    //closeHandler();
    Alert.alert("Wrong Pin ", idCardData.error);
  }

  return (
    <DismissKeyboard>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colorEnum.primary,
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          <LogoText style={{ color: colorEnum.tertiary, fontSize: 40 }}>
            |DeKom.
          </LogoText>
          <CustomText
            style={{
              color: colorEnum.tertiary,
              fontSize: 11,
              marginBottom: 0,
            }}
          >
            All bueraucracies. One app.
          </CustomText>
          <View>
            <Pressable onPress={helper}>
              <Ionicons
                name="help-circle-outline"
                size={36}
                style={{
                  alignSelf: "center",
                  marginTop: 30,
                  color: colorEnum.quartiary,
                  marginHorizontal: 4,
                }}
              />
            </Pressable>
            {showHelperText && (
              <CustomText
                style={{
                  color: colorEnum.quartiary,
                  alignSelf: "center",
                  fontSize: 12,
                  marginTop: 20,
                  textAlign: "center",
                  marginHorizontal: 40,
                }}
              >
                Halte dein Personalausweis auf die Rückseite deines Handys, bis
                eine Aktion erscheint
              </CustomText>
            )}

        <Button
          title="Start Auth"
          label="Start Auth"
          onPress={() => {
            runAuth()
          }}
        />
            {(idCardData.msg === "INSERT_CARD" ||
              idCardData.msg === undefined) && <Nfc_tutorial />}
            {!(
              idCardData.msg === "INSERT_CARD" ||
              idCardData.msg === undefined ||
              idCardData.msg === "ENTER_PIN" ||
              idCardData.msg === "ENTER_PUK" ||
              idCardData.msg === "ENTER_CAN" ||
              idCardData.msg === "STATUS" ||
              idCardData.msg === "AUTH"
            ) && <Nfc_tutorial />}

            {(idCardData.msg === "ENTER_PIN" ||
              idCardData.msg === "ENTER_PUK" ||
              idCardData.msg === "ENTER_CAN") && <Processer />}

            {idCardData.msg === "STATUS" && <Correct />}

            {idCardData.msg === "AUTH" && <Correct />}
          </View>
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
                color: colorEnum.quartiary,
                fontSize: 17,
              }}
            >
              secured by
            </CustomText>
            <Image
              source={require("../../assets/images/AusweisApp2_Bildmarke_transparent.png")}
              style={{ height: 35, width: 180 }}
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
