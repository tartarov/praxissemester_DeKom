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
import { Entypo as Icon } from "@expo/vector-icons";
import colorEnum from "./DeKomColors";
import Correct from "./animations/Correct.js";
import AntragContext from "../context/AntragContext";
import WeiterButton from "./Buttons/WeiterButton";

const AntragReady = forwardRef(({ activeHeight }, ref) => {
  const height = useWindowDimensions().height;
  const topAnimation = useSharedValue(height);
  const [enteredNumbers, setEnteredNumbers] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [showDigits, setShowDigits] = useState(false);

  const { caseID } = useContext(AntragContext);

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
      <LogoText
        style={{
          fontSize: 12,
          alignSelf: "center",
          padding: 20,
          color: colorEnum.primary,
        }}
      >
        CaseID erhalten:  {caseID}.
        Verfolge den Status von diesem Antrag in deiner Liste beantragter Anträge.
      </LogoText>
      <View
        style={{
          //alignSelf: "center",
          color: colorEnum.quartiary,
          borderRadius: 40,
        }}
      >
        <WeiterButton onPress={close}>schließen</WeiterButton>
        <Correct />
      </View>
    </Animated.View>
  );
});

export default AntragReady;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorEnum.quartiary,
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
