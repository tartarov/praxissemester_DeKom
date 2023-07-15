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
  NativeModules,
  TouchableOpacity,
  Vibration
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
import Processer from "./animations/Processer";

const BottomSheet = forwardRef(({ activeHeight }, ref) => {
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

  const handlePinChange = (value) => {
    console.log("value: " + value)
    setEnteredNumbers(value);
    handleChange("pin")(value);
  };

  const { login } = useContext(AuthContext);

  const animationStyle = useAnimatedStyle(() => {
    const top = topAnimation.value;
    return {
      top,
    };
  });

  const expand = useCallback(() => {
    Vibration.vibrate(1000)
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

  const LoginSchema = Yup.object().shape({
    pin: Yup.string()

      .required("Required"),
  });

  const { handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { pin: enteredNumbers },
      onSubmit: (values) => {
        console.log("values.Pin: " + enteredNumbers);
        const ourPin = enteredNumbers.toString();
        // Aa2_Connector.getPinFromRn(ourPin);
        Aa2_Connector.sendCommand(
          '{"cmd": "SET_PIN", "value": "' + ourPin + '"}'
        );
      
      },
    });

    const sendToAa2 = (value) => {
      const ourPin = value.toString();
      Aa2_Connector.sendCommand(
        '{"cmd": "SET_PIN", "value": "' + ourPin + '"}'
      );
      close()
    };

    const sendToLogin = () => {
      login(enteredNumbers);
    //  Aa2_Connector.disconnect();
    }
    
  const pin = useRef(null);

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
          color: "#2C3639",
        }}
      >
        {" "}
        Please enter your PIN{" "}
      </LogoText>
      <CustomText
        style={{
          fontSize: 11,
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
          color: "#2C3639",
          textAlign: "center",
        }}
      >
        You will find the 6-digit transport pin in your PIN letter, which was
        delivered at the time you received your ID card.
      </CustomText>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "bold",
          textDecorationLine: "underline",
          alignSelf: "center",
          paddingVertical: 1,
          paddingHorizontal: 20,
          color: "#2C3639",
          textAlign: "center",
        }}
        onPress={() =>
          Linking.openURL("https://www.pin-ruecksetzbrief-bestellen.de/")
        }
      >
        Forgotten or lost your PIN?
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
          marginTop: 15,
        }}
      >
        <TextInputBlack
          style={[
            { color: enteredNumbers.length === 10 ? "green" : "#3F4E4F" },
            { fontSize: 18 },
          ]}
          letterSpacing={37}
          icon="key"
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
          onChangeText={handlePinChange}
          onBlur={handleBlur("pin")}
          error={errors.pin}
          touched={isTouched}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        ></TextInputBlack>

        <View style={styles.numberPad}>
          {numberPad.map((button) => (
            <TouchableOpacity
              key={button.value}
              style={[
                styles.numberPadButton,
                { backgroundColor: enteredNumbers.length === 6 ? "#A0AAA0" : "#2C3639" },
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

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCD7C9",
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
    color: "#DCD7C9",
  },
  backspaceButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: -40,
    marginBottom: 10,
    backgroundColor: "#DCD7C9",
    justifyContent: "center",
    alignItems: "center",
  },
  backspaceButtonText: {
    fontSize: 22,
    color: "#2C3639",
  },
});
