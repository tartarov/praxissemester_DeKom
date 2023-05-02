import React, { useRef, useState, useContext } from "react";
import { Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../../components/Buttons/Button.js";
import TextInput from "../../../components/TextInput.js";
import DropDown from "../../../components/DropDown.js";
import { AuthContext } from "../../../context/AuthContext";
import CustomText from "../../../components/Font.js";
import { SelectList } from "react-native-dropdown-select-list";

const SignUpSchema = Yup.object().shape({
  straße: Yup.string()
    .min(1, "Too Short!")
    .matches(
      /^[aA-zZ]+[\u00C0-\u017Fa-zA-Z']+$/,
      "Only alphabets are allowed for this field "
    ),
  hausnummer: Yup.string().min(1, "Too Short!"),
  stadt: Yup.string()
    .min(1, "Too Short!")
    .matches(
      /^[aA-zZ\s]+[\u00C0-\u017Fa-zA-Z']+$/,
      "Only alphabets are allowed for this field "
    ),
  postleitzahl: Yup.string()
    .matches(/^\d+$/, "Only numbers")
    .min(1, "Too short!")
    .max(5, "Too Long!"),
  vorwahl: Yup.string()
    .matches(/[+]+[\d]+[\d]/, "Wrong Format")
    .max(3, "Too Long!"),
  telefonnummer: Yup.string()
    .min(1, "Too short!")
    .max(11, "Too long!")
    .matches(/^\d+$/, "Only numbers"),
  email: Yup.string().matches(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    "No Email Format"
  ),
});

const styles = {
  contianer: {
    marginTop: 30,
    width: "100%",
  },
  app: {
    flex: 1, // the number of columns you want to devide the screen into
    // width: "100%",
    // marginHorizontal: "auto",
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
};

const Col = ({ numRows, children }) => {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
};

const Row = ({ children }) => <View style={styles.row}>{children}</View>;

let bundeslaender = [
  {
    key: 1,
    value: "Baden Württemberg",
  },
  {
    key: 2,
    value: "Bayern",
  },
  { key: 3, value: "Berlin" },
  {
    key: 4,
    value: "Brandenburg",
  },
  {
    key: 5,
    value: "Bremen",
  },
  {
    key: 6,
    value: "Hamburg",
  },
  {
    key: 7,
    value: "Hessen",
  },
  {
    key: 8,
    value: "Mecklenburg-Vorpommern",
  },
  {
    key: 9,
    value: "Niedersachsen",
  },
  {
    key: 10,
    value: "Nordrhein Westfalen",
  },
  {
    key: 11,
    value: "Rheinland-Pfalz",
  },
  {
    key: 12,
    value: "Saarland",
  },
  {
    key: 13,
    value: "Sachsen",
  },
  {
    key: 14,
    value: "Sachsen-Anhalt",
  },
  {
    key: 15,
    value: "Schleswig-Holstein",
  },
  {
    key: 16,
    value: "Thüringen",
  },
];

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function SignUpAdress({ route, navigation }) {
  const { signup } = useContext(AuthContext);

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: SignUpSchema,
      initialValues: {
        straße: "",
        hausnummer: "",
        stadt: "",
        postleitzahl: "",
        vorwahl: "",
        telefonnummer: "",
        email: "",
        bundesland: "",
      },
      onSubmit: (values) => {
        console.log(`Straße: ${values.straße}, Hausnummer: ${values.hausnummer},
      Stadt: ${values.stadt}, Postleitzahl: ${values.postleitzahl}, Bundesland: ${selectedBundesland}
       Vorwahl: ${values.vorwahl}, Telefonnummer: ${values.telefonnummer},
      Email: ${values.email}`);
        values.bundesland = selectedBundesland;

        let userData = { ...route.params.values, ...values };
        console.log("UserData: " + JSON.stringify(userData));
        signup(userData);
        navigation.navigate("MainScreen");
      },
    });

  const [selectedBundesland, setSelectedBundesland] = useState(null);
  const onSelectBundesland = (item) => {
    setSelectedBundesland(item);
  };

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
        <CustomText
          style={{
            marginTop: 80,
            color: "#A27B5C",
            fontSize: 40,
          }}
        >
          DeKom.
        </CustomText>

        <CustomText
          style={{
            color: "#A27B5C",
            fontSize: 10,
            fontWeight: "light",
            marginBottom: 10,
          }}
        >
          All bueraucracies. One app.
        </CustomText>
        <View style={styles.contianer}>
          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
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
                  onChangeText={handleChange("straße")}
                  onBlur={handleBlur("straße")}
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
                  onChangeText={handleChange("hausnummer")}
                  onBlur={handleBlur("hausnummer")}
                  error={errors.hausnummer}
                  touched={touched.hausnummer}
                  onSubmitEditing={() => handleSubmit()}
                />
              </Col>
            </Row>
          </View>
          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
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
                  onChangeText={handleChange("stadt")}
                  onBlur={handleBlur("stadt")}
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
                  onChangeText={handleChange("postleitzahl")}
                  onBlur={handleBlur("postleitzahl")}
                  error={errors.postleitzahl}
                  touched={touched.postleitzahl}
                  onSubmitEditing={() => handleSubmit()}
                />
              </Col>
            </Row>
          </View>

          <Row>
            <Col numRows={1}>
             
                <SelectList
                  placeholder="Bundesland"
                  setSelected={onSelectBundesland}
                  save="value"
                  searchPlaceholder="suche"
                  //  value={selectedItem}
                  data={bundeslaender}
                  dropdownStyles={{ backgroundColor: "#DCD7C9", height: 200, zIndex:1 }}
                  boxStyles={{marginTop:67, paddingVertical:15,borderColor:'#DCD7C9', borderWidth:0.5}}
                  inputStyles={{color:'#DCD7C9'}}
                  //dropDownName={"Bundesland"}
                  // value={selectedBundesland}
                  // data={bundeslaender}
                  // onSelect={onSelectBundesland}
                />
            
            </Col>
          </Row>

          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
            <Row>
              <Col numRows={1}>
                <TextInput
                  placeholder="+49"
                  autoCompleteType="text"
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange("vorwahl")}
                  onBlur={handleBlur("vorwahl")}
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
                  onChangeText={handleChange("telefonnummer")}
                  onBlur={handleBlur("telefonnummer")}
                  error={errors.telefonnummer}
                  touched={touched.telefonnummer}
                  onSubmitEditing={() => handleSubmit()}
                />
              </Col>
            </Row>
          </View>
          <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
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
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                  onSubmitEditing={() => handleSubmit()}
                />
              </Col>
            </Row>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Button label="Sign Up" onPress={handleSubmit} />
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          <Button
            label="Zurück"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          />
        </View>
      </View>
    </DismissKeyboard>
  );
}
