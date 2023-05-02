import React, { useRef, useContext } from "react";
import { Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image } from "react-native"; //some imports not in use (yet)
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Buttons/Button.js";
import TextInput from "../../components/TextInput.js";
import { AuthContext } from "../../context/AuthContext";
import CustomText from "../../components/Font.js";
import LogoText from "../../components/LogoFont.js";

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

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: "#2C3639",
          alignItems: "center",
          paddingTop:150
         // justifyContent: "center",
        }}
      >
        <LogoText style={{ color: "#A27B5C", fontSize: 40}}>
          |DeKom.
        </LogoText>
        <CustomText
          style={{
            color: "#A27B5C",
            fontSize: 10,
            marginBottom: 200,
          }}
        >
          All bueraucracies. One app.
        </CustomText>
        <View
          style={{ paddingHorizontal: 32, marginBottom: 36, width: "100%" }}
        >
          <TextInput
            style={{ color: "#DCD7C9"}}
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
            style={{ color: "#DCD7C9"}}
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
        <View style={{felx:1, paddingHorizontal:40, marginBottom:70}}>
        <Image source={require('../../assets/images/AusweisApp2_Bildmarke_transparent.png')} style={{height:30, width: 180, marginVertical:20}}/>
        </View>
        <Button label="Authentifizieren" onPress={handleSubmit} />
      </View>
    </DismissKeyboard>
  );
}
