import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../components/Button.js";
import TextInput from "../components/TextInput.js";
import DropDown from "../components/DropDown.js";

const SignUpSchema = Yup.object().shape({
  titel: Yup.string()
    .min(1, "Too Short!")
    .matches(/^[aA-zZ\s]+[\u00C0-\u017Fa-zA-Z']+$/, "Only alphabets are allowed for this field "),
  vorname: Yup.string()
    .min(1, "Too Short!")
    .matches(/^[aA-zZ\s]+[\u00C0-\u017Fa-zA-Z']+$/, "Only alphabets are allowed for this field ")
    .required("Required"),
  zweitname: Yup.string()
  .min(1, "Too Short!")
  .matches(/^[aA-zZ\s]+[\u00C0-\u017Fa-zA-Z']+$/, "Only alphabets are allowed for this field "),
  nachname: Yup.string()
  .min(1, "Too Short!")
    .matches(/^[aA-zZ\s]+[\u00C0-\u017Fa-zA-Z']+$/, "Only alphabets are allowed for this field ")
    .required("Required"),
  geburtsdatum: Yup.date()
    .required("Required"),
  straße: Yup.string()
  .min(1, "Too Short!")
    .matches(/^[aA-zZ\s]+[\u00C0-\u017Fa-zA-Z']+$/, "Only alphabets are allowed for this field ")
    .required("Required"),
  hausnummer: Yup.string()
  .min(1, "Too Short!")
    .required("Required"),
  stadt: Yup.string()
  .min(1, "Too Short!")
    .matches(/^[aA-zZ\s]+[\u00C0-\u017Fa-zA-Z']+$/, "Only alphabets are allowed for this field ")
    .required("Required"),
  postleitzahl: Yup.string()
    .required("Required")
    .matches(/^\d+$/, 'Only numbers')
    .min(1, 'Too short!')
    .max(5, 'Too Long!'),
  vorwahl: Yup.string()
    .matches(/[+]+[\d]+[\d]/, "Wrong Format")
    .max(3, 'Too Long!'),
  telefonnummer: Yup.string()
    .min(1, "Too short!")
    .max(11, "Too long!")
    .required("Required")
    .matches(/^\d+$/, 'Only numbers'),
  email: Yup.string()
    .matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, "No Email Format")
    .required("Required"),
});

const styles = {
  contianer: {
    marginTop: 30,
    width: '90%'
  },
  app: {
    flex: 5, // the number of columns you want to devide the screen into
    width: "100%",
    marginHorizontal: "auto",
  },
  row: {
    flexDirection: "row"
  },
  "1col": {
    marginHorizontal: 10,
    marginBottom: 30,
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
  name: 'männlich'
},
{
  id: 2,
  name: 'weiblich'
},
{ id: 3, name: 'divers' }
]

let bundeslaender = [{
  id: 1,
  name: 'Baden Württemberg'
},
{
  id: 2,
  name: 'Bayern'
},
{ id: 3, 
  name: 'Berlin' },
{
    id: 4,
    name: 'Brandenburg'
},
{
  id: 5,
  name: 'Bremen'
},
{
  id: 6,
  name: 'Hamburg'
},
{
  id: 7,
  name: 'Hessen'
},
{
  id: 8,
  name: 'Mecklenburg-Vorpommern'
},
{
  id: 9,
  name: 'Niedersachsen'
},
{
  id: 10,
  name: 'Nordrhein Westfalen'
},
{
  id: 11,
  name: 'Rheinland-Pfalz'
},
{
  id: 12,
  name: 'Saarland'
},
{
  id: 13,
  name: 'Sachsen'
},
{
  id: 14,
  name: 'Sachsen-Anhalt'
},
{
  id: 15,
  name: 'Schleswig-Holstein'
},
{
  id: 16,
  name: 'Thüringen'
},
]

export default function SignUp() {

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      titel: '', vorname: '', nachname: '', zweitname: '',
      geburtsdatum: '', straße: '', hausnummer: '', stadt: '',
      postleitzahl: '', vorwahl: '', telefonnummer: '', email: ''
    },
    onSubmit: values => {
      alert(`Titel: ${values.titel}, Vorname: ${values.vorname}, Zweitname: ${values.zweitname} Nachname: ${values.nachname},
      Geburtsdatum: ${values.geburtsdatum}, Straße: ${values.straße}, Hausnummer: ${values.hausnummer},
      Stadt: ${values.stadt}, Postleitzahl: ${values.postleitzahl}, Vorwahl: ${values.vorwahl}, Telefonnummer: ${values.telefonnummer},
      Email: ${values.email}`)
    }
  });

  
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedBundesland, setSelectedBundesland] = useState(null)
  const onSelect = (item) => { setSelectedItem(item) };
  const onSelectBundesland = (item) => { setSelectedBundesland(item)};

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

      <View style = {styles.contianer}>
      <View style={[styles.app, {zIndex: 20}]}>
        <Row>
          <Col numRows={1}>
            <TextInput
              placeholder="ggfs. Titel"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="sentences"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('titel')}
              onBlur={handleBlur('titel')}
              error={errors.titel}
              touched={touched.titel}
              onSubmitEditing={() => vorname.current?.focus()}
            />
          </Col>
            <Col numRows={1}>
            <DropDown
              dropDownName= {'Geschlecht'}
              value={selectedItem}
              data={gender}
              onSelect={onSelect}
            />
            </Col>
        </Row>  
        </View>
        <View style = {[styles.app, {zIndex: 0, marginTop: 60}]}>
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
              error={errors.vorname}
              touched={touched.vorname}
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
              error={errors.zweitname}
              touched={touched.zweitname}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        </View>
        <View style = {[styles.app, {zIndex: 0, marginTop: 60}]}>
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
              error={errors.nachname}
              touched={touched.nachname}
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
              error={errors.geburtsdatum}
              touched={touched.geburtsdatum}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        </View>
        <View style = {[styles.app, {zIndex: 0, marginTop: 60}]}>
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
              error={errors.straße}
              touched={touched.straße}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
          <Col numRows={1}>
            <TextInput
              placeholder="Nr"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('hausnummer')}
              onBlur={handleBlur('hausnummer')}
              error={errors.hausnummer}
              touched={touched.hausnummer}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        </View>
        <View style = {[styles.app, {zIndex: 0, marginTop: 60}]}>
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
              error={errors.stadt}
              touched={touched.stadt}
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
              error={errors.postleitzahl}
              touched={touched.postleitzahl}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        </View>
        <View style = {[styles.app, {zIndex: 20, marginTop: 60}]}>
        <Row>
          <Col numRows={1}>
            <DropDown
              dropDownName= {'Bundesland'}
              value={selectedBundesland}
              data={bundeslaender}
              onSelect={onSelectBundesland}
            />
          </Col>
        </Row>
        </View>
        <View style = {[styles.app, {zIndex: 0, marginTop: 60}]}>
        <Row>
          <Col numRows={1}>
            <TextInput
              value="+49"
              placeholder="Vorwahl"
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={handleChange('vorwahl')}
              onBlur={handleBlur('vorwahl')}
              error={errors.vorwahl}
              touched={touched.vorwahl}
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
              error={errors.telefonnummer}
              touched={touched.telefonnummer}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        </View>
        <View style = {[styles.app, {zIndex: 0, marginTop: 60}]}>
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
              error={errors.email}
              touched={touched.email}
              onSubmitEditing={() => handleSubmit()}
            />
          </Col>
        </Row>
        </View>
      </View>

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>

        <Button
          label="Sign Up"
          onPress={handleSubmit} />
      </View>
    </View>
  );
}
