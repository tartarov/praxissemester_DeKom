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
import colorEnum from "./DeKomColors";
import Correct from "./animations/Correct.js";
import AntragContext from "../context/AntragContext";
import WeiterButton from "./Buttons/WeiterButton";
import SomethingWentWrong from "./animations/SomethingWentWrong";

const AntragReady = forwardRef(({ activeHeight }, ref) => {
  const height = useWindowDimensions().height;
  const topAnimation = useSharedValue(height);
  const [enteredNumbers, setEnteredNumbers] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [showDigits, setShowDigits] = useState(false);

  const { caseID, failMessage } = useContext(AntragContext);

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
    <Animated.View style={[styles.container, animationStyle, { backgroundColor: failMessage? "lightcoral" : colorEnum.quartiary, borderRadius:10}]}>
      {failMessage?
      <>
       <LogoText
       style={{
         fontSize: 24,
         alignSelf: "center",
         paddingTop: 40,
         color: colorEnum.primary,
       }}
     >
       {" "}
      Oh, oh. Absenden fehlgeschlagen.{" "}
     </LogoText> 
       <LogoText
       style={{
         fontSize: 12,
         alignSelf: "center",
         padding: 20,
         color: colorEnum.primary,
       }}
     >
       Etwas ist schiefgelaufen. Error Code:{" "}
       <Text style={{ fontWeight: "200" }}>{[failMessage.status, ". Ursache: " , failMessage.error]}</Text>.
        Fülle das Formular bitte nochmal aus und achte dabei auf die Vollständigkeit deiner Daten.
     </LogoText>
     </> 
     :
     <>
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
        CaseID erhalten: {" "}
        <Text style={{ fontWeight: "bold" }}>{caseID}</Text>.
        Verfolge den Status von diesem Antrag in deiner Liste beantragter Anträge.
      </LogoText>
      </>
}
      <View
        style={{
          //alignSelf: "center",
          color: colorEnum.quartiary,
          borderRadius: 40,
        }}
      >
        <View style={{alignItems: "center"}}>
        <WeiterButton onPress={close}>schließen</WeiterButton>
        </View>
        {failMessage? <SomethingWentWrong/> : <Correct /> }
     
      </View>
    </Animated.View>
  );
});

export default AntragReady;

const styles = StyleSheet.create({
  container: {
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
