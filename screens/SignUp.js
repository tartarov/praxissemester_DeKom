import React, { useRef } from "react";
import { Text, View, useState } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../components/Button.js";
import TextInput from "../components/TextInput.js";
import DropDown from "../components/DropDown.js";

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

const styles = {
  app: {
    marginTop: 30,
    flex: 6, // the number of columns you want to devide the screen into
    width: "90%",
    marginHorizontal: "auto",
  },
  row: {
    flexDirection: "row"
  },
  "1col": {
    marginHorizontal: 10,
    marginBottom: 10,
    height: 50,
    flex: 1
  },

  "5col": {
    marginHorizontal: 10,
    marginBottom: 10,
    flex: 5
  },
};

const Col = ({ numRows, children }) => {
  return (
    <View style={styles[`${numRows}col`]}>{children}</View>
  )
}

const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)

let gender = [{
  id: 1,
  name: 'M'
},
{
  id: 2,
  name: 'W'
},
{ id: 3, name: 'X' }
]

const Home = () => {

const [selectedItem, setSelectedItem] = useState(null)

  const onSelect = (item) => { setSelectedItem(item) };

}

export default function Login() {
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { id: "", pin: "" },
      onSubmit: (values) => {
        alert(`Id: ${values.id}, Pin: ${values.pin}`);
        console.log();
      },
    });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ marginTop: 50, color: "#223e4b", fontSize: 40, fontWeight: "bold" }}>
        DeKom.
      </Text>

      <Text
        style={{
          color: "#223e4b",
          fontSize: 10,
          fontWeight: "light",
          marginBottom: 10,
        }}
      >
        All bueraucracies. One app.
      </Text>

      <View style={styles.app}>
        <Row>
          <Col numRows={1}>
            <TextInput
              placeholder="ggfs. Titel"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('titel')}
              onBlur={handleBlur('titel')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
          <Col numRows={1}>
            <TextInput
              placeholder="Geschlecht"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('geschlecht')}
              onBlur={handleBlur('geschlecht')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        <Row>
          <Col numRows={1}>
            <TextInput
              placeholder="Vorname"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('vorname')}
              onBlur={handleBlur('vorname')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
          <Col numRows={1}>
            <TextInput
              placeholder="ggfs. Zweitname"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('zweitname')}
              onBlur={handleBlur('zweitname')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        <Row>
          <Col numRows={1}>
            <TextInput
              placeholder="Nachname"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('nachname')}
              onBlur={handleBlur('nachname')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
          <Col numRows={1}>
            <TextInput
              placeholder="Geburtsdatum"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('geburtsdatum')}
              onBlur={handleBlur('geburtsdatum')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        <Row>
          <Col numRows={5}>
            <TextInput
              placeholder="Straße"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('straße')}
              onBlur={handleBlur('straße')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
          <Col numRows={1}>
            <TextInput
              placeholder="Hausnummer"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('hausnummer')}
              onBlur={handleBlur('hausnummer')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        <Row>
          <Col numRows={1}>
            <TextInput
              placeholder="Stadt"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('stadt')}
              onBlur={handleBlur('stadt')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
          <Col numRows={1}>
            <TextInput
              placeholder="Postleitzahl"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('postleitzahl')}
              onBlur={handleBlur('postleitzahl')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        <Row>
          <Col numRows={1}>
            <TextInput
              placeholder="Bundesland"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('bundesland')}
              onBlur={handleBlur('bundesland')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        <Row>
          <Col numRows={1}>
            <TextInput
              placeholder="Vorwahl"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('vorwahl')}
              onBlur={handleBlur('vorwahl')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
          <Col numRows={5}>
            <TextInput
              placeholder="Telefonnummer"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('telefonnummer')}
              onBlur={handleBlur('telefonnummer')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>

        <Row>
          <Col numRows={1}>
            <TextInput
              placeholder="E-Mail"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
      </View>

      <DropDown
        value={selectedItem}
        data={gender}
        onSelect={onSelect}
      />

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>

        <Button
          label="Sign Up"
          onPress={handleSubmit} />
      </View>
    </View>
  );
}
