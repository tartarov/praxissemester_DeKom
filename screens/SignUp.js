import React, { useRef } from "react";
import { Text, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../components/Button.js";
import TextInput from "../components/TextInput.js";

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

export default function SignUp() {
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { id: "", pin: "" },
      onSubmit: (values) => {
        alert(`Id: ${values.id}, Pin: ${values.pin}`);
        console.log();
      },
    });

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
        DeKom.
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

      <View
        style={{
        paddingHorizontal: 10,
        marginBottom: 36,
        flex: 1,
        width: "50%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
        }}
      >
        <TextInput
              style={{
                paddingRight: 10,
                //paddingVertical: 50
                }}
          //icon="user"
          placeholder="Geburtsname"
          autoCapitalize="none"
          autoCompleteType="cc-number"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("Geburtsname")}
          onBlur={handleBlur("Geburtsname")}
          error={errors.id}
          touched={touched.id}
          onSubmitEditing={() => pin.current?.focus()}
        />

        <TextInput
             style={{
              paddingRight: 10,
            //  paddingVertical: 50
              }}
          // icon="key"
          placeholder="Nachname"
          autoCompleteType="cc-number"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("Nachname")}
          onBlur={handleBlur("Nachname")}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 32,
          marginBottom: 36,
          width: "50%",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          // icon="key"
          placeholder="Alter"
          autoCompleteType="cc-number"
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("Alter")}
          onBlur={handleBlur("Alter")}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 32,
          marginBottom: 36,
          width: "50%",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          // icon="key"
          placeholder="Adresse"
          autoCompleteType="cc-number"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("Adresse")}
          onBlur={handleBlur("Adresse")}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 32,
          marginBottom: 36,
          width: "50%",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          // icon="key"
          placeholder="Hausnummer"
          autoCompleteType="cc-number"
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("Hausnummer")}
          onBlur={handleBlur("Hausnummer")}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>

      <View
        style={{
            paddingHorizontal: 10,
            marginBottom: 36,
            flex: 1,
            width: "50%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around"
        }}
      >
        <TextInput
             style={{
              paddingRight: 10,
              paddingVertical: 5,
             // paddingBottom: "50vw"
              }}
          // icon="key"
          placeholder="Bundesland"
          autoCompleteType="cc-number"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("Bundesland")}
          onBlur={handleBlur("Bundesland")}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />

        <TextInput
             style={{
              paddingRight: 10,
              paddingVertical: 5
              }}
          // icon="key"
          placeholder="Stadt"
          autoCompleteType="cc-number"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("Stadt")}
          onBlur={handleBlur("Stadt")}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 60,
          marginBottom: 36,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TextInput
               style={{
                paddingRight: 10,
                paddingVertical: 5
                }}
          // icon="key"
          placeholder="E-Mail"
          autoCompleteType="cc-number"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("E-Mail")}
          onBlur={handleBlur("E-Mail")}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />

        <TextInput
               style={{
                paddingRight: 10,
                paddingVertical: 5
                }}
          // icon="key"
          placeholder="Telefonnummer"
          autoCompleteType="cc-number"
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("Telefonnummer")}
          onBlur={handleBlur("Telefonnummer")}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>

      <Button label="Sign Up" onPress={handleSubmit} />
    </View>
  );
}
