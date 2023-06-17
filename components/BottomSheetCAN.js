import React, {
    Component,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useRef,
    useContext,
  } from "react";
  import { StyleSheet, View, Text, useWindowDimensions, NativeModules } from "react-native";
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
  import { Linking } from 'react-native';
  
  const BottomSheetCAN = forwardRef(({ activeHeight }, ref) => {
    const height = useWindowDimensions().height;
    const topAnimation = useSharedValue(height);
  
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
          console.log("values.Pin: " + values.can)
          const ourCan = values.can.toString()
          console.log("ourPin: " + ourCan)
          console.log("ourPin is the type of: " + typeof ourCan)
          Aa2_Connector.sendCommand("{\"cmd\": \"SET_CAN\", \"value\": \"" + ourCan  + "\"}")
          //login(values.pin, values.id);
        },
      });
  
    const can = useRef(null);
  
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
          Please enter your CAN{" "}
        </LogoText>
        <CustomText      style={{
            fontSize: 11,
            alignSelf: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            color: "#8B8000",
            textAlign: 'center'
          }}>
        ATTENTION: You have now entered the PIN incorrectly twice. To proceed, please enter your CAN first. You can find the 6-digit CAN on the bottom right of your ID card.
        </CustomText>
        <Text style={{
            fontSize: 11,
            alignSelf: "center",
            paddingVertical: 1,
            paddingHorizontal: 20,
            color: "#2C3639",
            textAlign: 'center'
          }} onPress={() => Linking.openURL('https://www.ausweisapp.bund.de/ausweisapp2/handbuch/1.14/de/Windows/whattodo-can.html')}>
        Can't find your CAN?
          </Text>
        <View
          style={{
            paddingHorizontal: 32,
            marginBottom: 0,
            width: "100%",
            paddingTop: 20,
          }}
        >
          <TextInputBlack
            style={{ color: "#3F4E4F" }}
            icon="v-card"
            placeholder="                   *    *    *    *    *    *"
            secureTextEntry
            autoCompleteType="password"
            keyboardType="number-pad"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            onChangeText={handleChange("can")}
            onBlur={handleBlur("can")}
            error={errors.can}
            touched={touched.can}
            ref={can}
            onSubmitEditing={() => handleSubmit()}
          ></TextInputBlack>
  
          <View style={{alignSelf: "center", marginTop:100}}>
          <Button
            label="Authentifizieren"
            onPress={handleSubmit}
          />
          </View>
  
        </View>
      </Animated.View>
    );
  });
  
  export default BottomSheetCAN;
  
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
  });
  