import React, { useRef, useContext } from "react";
import { Text, View, TouchableWithoutFeedback, Keyboard } from "react-native"; //some imports not in use (yet)
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Buttons/Button.js";
import TextInput from "../../components/TextInput.js";
import { AuthContext } from "../../context/AuthContext";

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
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#A27B5C", fontSize: 40, fontWeight: "bold" }}>
          |DeKom.
        </Text>
        <Text
          style={{
            color: "#A27B5C",
            fontSize: 10,
            fontWeight: "light",
            marginBottom: 100,
          }}
        >
          All bueraucracies. One app.
        </Text>
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
          style={{ paddingHorizontal: 32, marginBottom: 36, width: "100%" }}
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
        <Button label="Authentifizieren" onPress={handleSubmit} />
      </View>
    </DismissKeyboard>
  );
}
