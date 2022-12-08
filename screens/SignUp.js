import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../components/Button.js";
import TextInput from "../components/TextInput.js";
import DropDown from "../components/DropDown.js";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
  "text": {
    paddingTop: 16,
  },
  "dateText": {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(34, 62, 75, 0.7)',
    padding: 14,
  }
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

let dateValue = "Geburtsdatum";



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
      Geburtsdatum: ${values.geburtsdatum}`)
    }
  });
  const [selectedItem, setSelectedItem] = useState(null)
  const onSelect = (item) => { setSelectedItem(item) };
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    dateValue = date;
    hideDatePicker();
  };

  let month = dateValue.toString().substring(4,7);
  let day = dateValue.toString().substring(8,10);
  let year = dateValue.toString().substring(11,15);

  const checkString = (datevalue) => {
    if(datevalue == "Geburtsdatum"){
      return (dateValue)
    } else 
    return day + " " + month + " " + year
  };

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
                onChangeText={handleChange('titel')}
                onBlur={handleBlur('titel')}
                error={errors.titel}
                touched={touched.titel}
                onSubmitEditing={() => vorname.current?.focus()}
              />
            </Col>
            <Col numRows={1}>
              <DropDown
                dropDownName={'Geschlecht'}
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
          </Row>
        </View>
        <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
          <Row>
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
            <Col numRows={1}>
              <TextInput
                placeholder="Behörde"
                autoCompleteType="text"
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange('behörde')}
                onBlur={handleBlur('behörde')}
                error={errors.behörde}
                touched={touched.behörde}
                onSubmitEditing={() => handleSubmit()}
              />
            </Col>
          </Row>
        </View>
        <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
          <Row>
            <Col numRows={1}>
              <Text
                style={styles.dateText}
                onPress={showDatePicker}>
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
                placeholder="Geburtsort"
                autoCompleteType="text"
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange('geburtsort')}
                onBlur={handleBlur('geburtsort')}
                error={errors.geburtsort}
                touched={touched.geburtsort}
                onSubmitEditing={() => handleSubmit()}
              />
            </Col>
          </Row>
        </View>
        <View style={[styles.app, { zIndex: 0, marginTop: 60 }]}>
          <Row>
            <Col numRows={1}>
              <TextInput
                placeholder="Augenfarbe"
                autoCompleteType="text"
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange('augenfarbe')}
                onBlur={handleBlur('augenfarbe')}
                error={errors.augenfarbe}
                touched={touched.augenfarbe}
                onSubmitEditing={() => handleSubmit()}
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
                placeholder="Größe"
                autoCompleteType="text"
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange('größe')}
                onBlur={handleBlur('größe')}
                error={errors.größe}
                touched={touched.größe}
                onSubmitEditing={() => handleSubmit()}
              />
            </Col>
            <Col numRows={1}>
              <Text style={styles.text}>in cm</Text>
            </Col>
          </Row>
        </View>
      </View>
      <View>
        <Text style={[styles.text, { marginTop: 50 }]}>
          Alle notwendigen Daten können sie 1zu1 aus ihrem Personalausweis entnehmen.
        </Text>
      </View>

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>

        <Button
          label="Sign Up"
          onPress={handleSubmit} />
      </View>
    </View>
  );
}
