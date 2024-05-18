import React, {
  Component,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useContext,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  NativeModules,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,

  withSpring,
} from "react-native-reanimated";
import LogoText from "./LogoFont";
import TextInputBlack from "./TextInputBlack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import Button from "./Buttons/Button.js";
import CustomText from "./Font";
import { Linking } from "react-native";
import { Entypo as Icon } from '@expo/vector-icons';
import colorEnum from "./DeKomColors";

const BottomSheetCAN = forwardRef(({ activeHeight }, ref) => {
  const height = useWindowDimensions().height;
  const topAnimation = useSharedValue(height);
  const [enteredNumbers, setEnteredNumbers] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [showDigits, setShowDigits] = useState(false);

  const numberPad = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "0" },
  ];

  const handleNumberPress = (number) => {
    setEnteredNumbers(enteredNumbers + number);
    console.log(enteredNumbers.length);
    if (enteredNumbers.length === 5) {
      setIsTouched(true);
    }
  };

  const handleBackspace = () => {
    setEnteredNumbers(enteredNumbers.slice(0, -1));
    if (enteredNumbers.length <= 6) {
      setIsTouched(false);
    }
  };

  const { login } = useContext(AuthContext);


  const animationStyle = useAnimatedStyle(() => {
    const top = topAnimation.value;
    return {
      top,
    };
  });

  const expand = useCallback(() => {
    "worklet";
    topAnimation.value = withSpring(activeHeight, {
      damping: 100,
      stiffness: 400,
    });
  }, []);

  const close = useCallback(() => {
    "worklet";
    topAnimation.value = withSpring(height, {
      damping: 100,
      stiffness: 400,
    });
  });

  useImperativeHandle(
    ref,
    () => ({
      expand,
      close,
      sendToLogin
    }),
    [expand, close, sendToLogin]
  );

  const { Aa2_Connector } = NativeModules;

  const sendToLogin = () => {
    login(enteredNumbers);
  //  Aa2_Connector.disconnect();
  }

  const sendToAa2 = (value) => {
    const ourCan = value.toString();
    Aa2_Connector.sendCommand(
      '{"cmd": "SET_CAN", "value": "' + ourCan + '"}'
    );
    close()
  };

  const LoginSchema = Yup.object().shape({
    can: Yup.string()
      .min(6, "Too Short!")
      .max(6, "Too Long!")
      .required("Required"),
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { can: "" },
      onSubmit: (values) => {
        console.log("values.Pin: " + values.can);
        const ourCan = values.can.toString();
        console.log("ourPin: " + ourCan);
        console.log("ourPin is the type of: " + typeof ourCan);
        Aa2_Connector.sendCommand(
          '{"cmd": "SET_CAN", "value": "' + ourCan + '"}'
        );
        //login(values.pin, values.id);
      },
    });

  const can = useRef(null);

  const toggleShowDigits = () => {
    setShowDigits(!showDigits);
  };

  return (
    <Animated.View style={[styles.container, animationStyle]}>
      <LogoText
        style={{
          fontSize: 30,
          alignSelf: "center",
          paddingTop: 40,
          color: colorEnum.primary,
        }}
      >
        {" "}
        Please enter your CAN{" "}
      </LogoText>
      <CustomText
        style={{
          fontSize: 11,
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
          color: "#d16302",
          textAlign: "center",
        }}
      >
        ATTENTION: You have now entered the PIN incorrectly twice. To proceed,
        please enter your CAN first. You can find the 6-digit CAN on the bottom
        right of your ID card.
      </CustomText>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "bold",
          textDecorationLine: "underline",
          alignSelf: "center",
          paddingVertical: 1,
          paddingHorizontal: 20,
          color: colorEnum.primary,
          textAlign: "center",
        }}
        onPress={() =>
          Linking.openURL(
            "https://www.ausweisapp.bund.de/ausweisapp2/handbuch/1.14/de/Windows/whattodo-can.html"
          )
        }
      >
        Can't find your CAN?
      </Text>

      <TouchableOpacity
            style={{   alignSelf: "center", marginTop:20}}
            onPress={toggleShowDigits}
          >
            <Text style={styles.toggleButtonText}>
              {showDigits ?   <Icon
                name={"eye"}
                size={18}
              /> : <Icon
              name={"eye-with-line"}
              size={18}
            />} 
            </Text>
          </TouchableOpacity>

      <View
        style={{
          paddingHorizontal: 32,
          marginBottom: 0,
          width: "100%",
          paddingTop: 15,
        }}
      >
        <TextInputBlack
          style={[
            { color: enteredNumbers.length === 10 ? "green" : colorEnum.secondary},
            { fontSize: 18 },
          ]}
          letterSpacing={37}
          icon="v-card"
          placeholder="______"
          secureTextEntry = {!showDigits}
          autoCompleteType="password"
          keyboardType="number-pad"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          editable={false}
          value={enteredNumbers}
          onChangeText={handleChange("can")}
          onBlur={handleBlur("can")}
          error={errors.can}
          touched={isTouched}
          ref={can}
          onSubmitEditing={() => handleSubmit()}
        ></TextInputBlack>

        <View style={styles.numberPad}>
          {numberPad.map((button) => (
            <TouchableOpacity
              key={button.value}
              style={[
                styles.numberPadButton,
                { backgroundColor: enteredNumbers.length === 6 ? "#A0AAA0" : colorEnum.primary },
              ]}
              onPress={() => handleNumberPress(button.value)}
              disabled={enteredNumbers.length === 6}
            >
              <Text style={styles.numberPadButtonText}>{button.value}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.backspaceButton}
            onPress={handleBackspace}
          >

            <Icon name={"erase"} style={styles.backspaceButtonText} size={16}/>
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: "center", marginTop: 50 }}>
          <Button label="Authentifizieren" onPress={() => sendToAa2(enteredNumbers)} />
        </View>
      </View>
    </Animated.View>
  );
});

export default BottomSheetCAN;

const styles = StyleSheet.create({
  container: {
    backgroundColor:colorEnum.quartiary,
    position: "absolute",
    top: 500,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  numberPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
    marginLeft: 40,
    marginRight: 0,
  },
  numberPadButton: {
    width: 50,
    height: 37,
    borderRadius: 40,
    marginRight: 50,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  numberPadButtonText: {
    fontSize: 22,
    color: colorEnum.quartiary,
  },
  backspaceButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: -40,
    marginBottom: 10,
    backgroundColor: colorEnum.quartiary,
    justifyContent: "center",
    alignItems: "center",
  },
  backspaceButtonText: {
    fontSize: 22,
    color: colorEnum.primary,
  },
});
