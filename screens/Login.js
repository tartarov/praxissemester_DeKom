import React, { useRef, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native"; //some imports not in use (yet)
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button.js";
import TextInput from "../components/TextInput.js";
import { AuthContext } from "../context/AuthContext";

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

export default function Login({ navigation }) {
  let respTestdb;
  let dataTestdb;
  let resultTestdb;
  let objTestdb;

  let respDekomdb;
  let dataDekomdb;
  let resultDekomdb;
  let objDekomdb;


  const { login, isSignedUp } = useContext(AuthContext);

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { id: "", pin: "" },
      onSubmit: (values) => {
        fetchData({ navigation });
       // isSignedUp();
        login(values.pin, values.id);
      },
    });

  const fetchData = async () => {
   /* respTestdb = await fetch(
      "http://10.1.111.32:3000/testdb.userdaten?pin=" +
        values.pin +
        "&id=" +
        values.id
    ).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error
      });;
    dataTestdb = await respTestdb.json();
    resultTestdb = JSON.stringify(dataTestdb);
    objTestdb = JSON.parse(resultTestdb);
    console.log( objTestdb.body.value.some((item) => item.PIN === values.pin));
    if (
      objTestdb.body.value.some((item) => item.PIN === values.pin) &&
      objTestdb.body.value.some((item2) => item2.ID === values.id)
    ) {
      alert("You are authorized!" + "\n" + "Welcome to deKom!");
  
      respDekomdb = await fetch(
        "http://10.1.111.32:3000/dekomdb.dekom_user?userId=" + values.id, //192.168.178.24 home or 10.1.111.32 w
        {
          method: 'POST',
          credentials: "same-origin",
        }
      ).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error
        });
        /*
      dataDekomdb = await respDekomdb.json();
      resultDekomdb = JSON.stringify(dataDekomdb);
      objDekomdb = await JSON.parse(resultDekomdb);
      console.log("objDekomdb.body.value: " + objDekomdb.body.value);
    
      if (objDekomdb.body.value != true && objDekomdb.body.value != false) {
        navigation.navigate("SignUp");
      } else if (objDekomdb.body.value == false) {
        navigation.navigate("Login");
      } else if (objDekomdb.body.value == true) {
        navigation.navigate("MainScreen");
      }

      NOTE: HIER ÜBERPRÜFEN; OB USER ZUM SIGN-UP MUSS ODER NICHT?
      NOTE: SERVER STOPPT NACH DEM 5 GET-REQUEST ZU ANTWORTEN.
      
*/ /*
    } else {
      alert("ID or PIN incorrect. Please try again.");
    } */
  };

  const pin = useRef(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#223e4b", fontSize: 40, fontWeight: "bold" }}>
        |DeKom.
      </Text>
      <Text
        style={{
          color: "#223e4b",
          fontSize: 10,
          fontWeight: "light",
          marginBottom: 100,
        }}
      >
        All bueraucracies. One app.
      </Text>
      <View style={{ paddingHorizontal: 32, marginBottom: 36, width: "100%" }}>
        <TextInput
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
      <View style={{ paddingHorizontal: 32, marginBottom: 36, width: "100%" }}>
        <TextInput
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
      <Button label="Login" onPress={handleSubmit} />
    </View>
  );
}
