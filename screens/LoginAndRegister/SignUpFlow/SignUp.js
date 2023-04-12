import React, { useRef, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import validationColor from "../../../components/TextInput";
import Button from "../../../components/Buttons/Button.js";
import TextInput from "../../../components/TextInput.js";
import DropDown from "../../../components/DropDown.js";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from "../../../context/AuthContext";
import SignUpAdress from "./SignUpAdress";
import { useNavigation } from "@react-navigation/native";

const nameRegex = /^[a-zA-Z\s]+[\u00C0-\u017Fa-zA-Z']+$/;

const SignUpSchema = Yup.object().shape({
  titel: Yup.string()
    .min(1, "Too Short!")
    .matches(nameRegex, "Only alphabets are allowed for this field"),
  vorname: Yup.string()
    .min(1, "Too Short!")
    .matches(nameRegex, "Only alphabets are allowed for this field"),
  zweitname: Yup.string()
    .min(1, "Too Short!")
    .matches(nameRegex, "Only alphabets are allowed for this field"),
  nachname: Yup.string()
    .min(1, "Too Short!")
    .matches(nameRegex, "Only alphabets are allowed for this field"),
  behoerde: Yup.string()
    .min(1, "Too Short!")
    .matches(nameRegex, "Only alphabets are allowed for this field"),
  geburtsort: Yup.string()
    .min(1, "Too Short!")
    .matches(nameRegex, "Only alphabets are allowed for this field"),
  augenfarbe: Yup.string()
    .min(1, "Too Short!")
    .matches(nameRegex, "Only alphabets are allowed for this field"),
  groesse: Yup.string()
    .matches(/^\d+$/, "Only numbers")
    .min(1, "Too short!")
    .max(3, "Too long!"),
  staatsangehoerigkeit: Yup.string()
    .min(1, "Too Short!")
    .matches(nameRegex, "Only alphabets are allowed for this field"),
});

const styles = {
  contianer: {
    marginTop: 30,
    width: "90%",
  },
  app: {
    flex: 5, // the number of columns you want to devide the screen into
    width: "100%",
    marginHorizontal: "auto",
  },
  row: {
    flexDirection: "row",
  },
  "1col": {
    marginHorizontal: 10,
    marginBottom: 30,
    height: 50,
    flex: 1,
  },

  "5col": {
    marginHorizontal: 10,
    marginBottom: 10,
    flex: 5,
  },
  text: {
    paddingTop: 16,
  },
  dateText: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderColor: validationColor,
    padding: 14,
  },
};

const Col = ({ numRows, children }) => {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
};

const Row = ({ children }) => <View style={styles.row}>{children}</View>;

let gender = [
  {
    id: 1,
    name: "männlich",
  },
  {
    id: 2,
    name: "weiblich",
  },
  { id: 3, name: "divers" },
];

let dateValue = "Geburtsdatum";
let dateTextColor = "rgba(34, 62, 75, 0.7)";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function navigateUs() {
  const navigation = useNavigation();
  return navigation.navigate("SignUpAdress"); // navigation.navigate("MainScreen");
}

export default function SignUp({ navigation }) {
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: SignUpSchema,
      initialValues: {
        titel: "",
        vorname: "",
        nachname: "",
        zweitname: "",
        geburtsdatum: "",
        behoerde: "",
        geburtsort: "",
        augenfarbe: "",
        groesse: "",
        geschlecht: "",
        staatsangehoerigkeit: "",
      },
      onSubmit: (values) => {
        console.log("Unser Values sieht so aus: " + JSON.stringify(values));
        console.log(`Titel: ${values.titel}, Vorname: ${
          values.vorname
        }, Zweitname: ${values.zweitname} Nachname: ${values.nachname},
      Geschlecht: ${Object.values(selectedItem)[1]},Geburtsdatum: ${
          day + " " + month + " " + year
        }`);
        values.geschlecht = Object.values(selectedItem)[1];
        values.geburtsdatum = day + " " + month + " " + year;
        console.log("GEBURTSDATUM: " + values.geburtsdatum);
        navigation.navigate("SignUpAdress", { values });
      },
    });

  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = (item) => {
    setSelectedItem(item);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    dateValue = date;
    hideDatePicker();
    geburtsort.current?.focus();
  };

  let month = dateValue.toString().substring(4, 7);
  let day = dateValue.toString().substring(8, 10);
  let year = dateValue.toString().substring(11, 15);

  const checkString = (datevalue) => {
    if (datevalue == "Geburtsdatum") {
      return dateValue;
    } else return day + " " + month + " " + year;
  };

  const changeDateTextColor = (dateValue) => {
    if (dateValue == "Geburtsdatum") {
      return dateTextColor;
    } else return (dateTextColor = "black");
  };

  const vorname = useRef(null);
  const nachname = useRef(null);
  const zweitname = useRef(null);
  const behoerde = useRef(null);
  const geburtsort = useRef(null);
  const augenfarbe = useRef(null);
  const groesse = useRef(null);
  const staatsangehoerigkeit = useRef(null);

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            marginTop: 50,
            color: "#223e4b",
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
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

        <View style={styles.contianer}>
          <View style={[styles.app, { zIndex: 20 }]}>
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
                  onChangeText={handleChange("titel")}
                  onBlur={handleBlur("titel")}
                  error={errors.titel}
                  touched={touched.titel}
                  onSubmitEditing={() => vorname.current?.focus()}
                />
              </Col>
              <Col numRows={1}>
                <DropDown
                  dropDownName={"Geschlecht"}
                  value={selectedItem}
                  data={gender}
                  onSelect={onSelect}
                />
              </Col>
            </Row>
          </View>
          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
            <Row>
              <Col numRows={1}>
                <TextInput
                  ref={vorname}
                  placeholder="Vorname"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("vorname")}
                  onBlur={handleBlur("vorname")}
                  error={errors.vorname}
                  touched={touched.vorname}
                  onSubmitEditing={() => nachname.current?.focus()}
                />
              </Col>
              <Col numRows={1}>
                <TextInput
                  ref={nachname}
                  placeholder="Nachname"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("nachname")}
                  onBlur={handleBlur("nachname")}
                  error={errors.nachname}
                  touched={touched.nachname}
                  onSubmitEditing={() => zweitname.current?.focus()}
                />
              </Col>
            </Row>
          </View>
          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
            <Row>
              <Col numRows={1}>
                <TextInput
                  ref={zweitname}
                  placeholder="ggfs. Zweitname"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("zweitname")}
                  onBlur={handleBlur("zweitname")}
                  error={errors.zweitname}
                  touched={touched.zweitname}
                  onSubmitEditing={() => behoerde.current?.focus()}
                />
              </Col>
              <Col numRows={1}>
                <TextInput
                  ref={behoerde}
                  placeholder="Behörde"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("behoerde")}
                  onBlur={handleBlur("behoerde")}
                  error={errors.behoerde}
                  touched={touched.behoerde}
                  onSubmitEditing={() => showDatePicker()}
                />
              </Col>
            </Row>
          </View>
          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
            <Row>
              <Col numRows={1}>
                <Text
                  style={[
                    styles.dateText,
                    { color: changeDateTextColor(dateValue) },
                  ]}
                  onPress={showDatePicker}
                >
                  {checkString(dateValue)}
                </Text>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </Col>
              <Col numRows={1}>
                <TextInput
                  ref={geburtsort}
                  placeholder="Geburtsort"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("geburtsort")}
                  onBlur={handleBlur("geburtsort")}
                  error={errors.geburtsort}
                  touched={touched.geburtsort}
                  onSubmitEditing={() => augenfarbe.current?.focus()}
                />
              </Col>
            </Row>
          </View>
          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
            <Row>
              <Col numRows={1}>
                <TextInput
                  ref={augenfarbe}
                  placeholder="Augenfarbe"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("augenfarbe")}
                  onBlur={handleBlur("augenfarbe")}
                  error={errors.augenfarbe}
                  touched={touched.augenfarbe}
                  onSubmitEditing={() => groesse.current?.focus()}
                />
              </Col>
              <Col numRows={1}>
                <Text style={styles.text}>"Farbe" / "Farbe+Farbe"</Text>
              </Col>
            </Row>
          </View>
          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
            <Row>
              <Col numRows={1}>
                <TextInput
                  ref={groesse}
                  placeholder="Größe"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("groesse")}
                  onBlur={handleBlur("groesse")}
                  error={errors.groesse}
                  touched={touched.groesse}
                  onSubmitEditing={() => handleSubmit()}
                />
              </Col>
              <Col numRows={1}>
                <Text style={styles.text}>in cm</Text>
              </Col>
            </Row>
          </View>

          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
            <Row>
              <Col numRows={1}>
                <TextInput
                  ref={staatsangehoerigkeit}
                  placeholder="Staatsangehörigkeit"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("staatsangehoerigkeit")}
                  onBlur={handleBlur("staatsangehoerigkeit")}
                  error={errors.staatsangehoerigkeit}
                  touched={touched.staatsangehoerigkeit}
                  onSubmitEditing={() => handleSubmit()}
                />
              </Col>
            </Row>
          </View>
        </View>
        <View>
          <Text style={[styles.text, { marginTop: 50 }]}>
            Alle notwendigen Daten können Sie 1zu1 aus Ihrem Personalausweis
            entnehmen.
          </Text>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <Button label="Weiter" onPress={handleSubmit} />
        </View>
      </View>
    </DismissKeyboard>
  );
}
