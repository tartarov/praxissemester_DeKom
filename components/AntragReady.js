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
    KeyboardAvoidingView,
    TouchableOpacity,
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
  import Correct from "../components/animations/Correct.js";
  
  const AntragReady = forwardRef(({ activeHeight }, ref) => {
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
      }),
      [expand, close]
    );
  
    const { Aa2_Connector } = NativeModules;
  
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
          Antrag abgesendet!{" "}
        </LogoText>
        <View style={{ 
            //alignSelf: "center",
            color: colorEnum.quartiary,
            borderRadius: 40,
            }}>
        <Correct />
        </View>
      </Animated.View>
    );
  });
  
  export default AntragReady;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor:colorEnum.quartiary,
      position: "absolute",
      top:500,
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
  