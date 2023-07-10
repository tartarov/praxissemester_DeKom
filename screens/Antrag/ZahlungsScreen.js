import { View, StyleSheet, Text, Image } from "react-native";
import WeiterButton from "../../components/Buttons/WeiterButton";
import React, { useRef, useState, useContext } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import validationColor from "../../components/TextInput";
import { useFormik } from "formik";
import { Header } from "../../components/Header";

let dateValue = "Bezahldatum";
let dateTextColor = "#DCD7C9";

function ZahlungsScreen({ route, navigation }) {
  let antragData = route.params?.antragData || null;;
  console.log(
    "Antrag Data im ZahlungsScreen ==========>   " + JSON.stringify(antragData)
  );

  const [BezahlungDeKomCheckboxState, setBezahlungDeKomCheckboxState] =
    React.useState(false);
  const [
    BezahlungBereitsGemachtCheckboxState,
    setBezahlungBereitsGemachtCheckboxState,
  ] = React.useState(false);

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        bezahldatum: "",
      },
      onSubmit: (values) => {
        antragData.bezahlungDeKom = BezahlungDeKomCheckboxState;
        antragData.bezahlungBereitsGemacht =
          BezahlungBereitsGemachtCheckboxState;

        values.zahlungsDatum = day + " " + month + " " + year;
        antragData.zahlungsDatum = values.zahlungsDatum;

        console.log("Unser Values sieht so aus: " + JSON.stringify(values));
        console.log(`Bezahldatum: ${day + " " + month + " " + year}`);
      },
    });

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
  };

  let month = dateValue.toString().substring(4, 7);
  let day = dateValue.toString().substring(8, 10);
  let year = dateValue.toString().substring(11, 15);

  const checkString = (datevalue) => {
    if (datevalue == "Bezahldatum") {
      return dateValue;
    } else {
      return day + " " + month + " " + year;
    }
  };

  const changeDateTextColor = (dateValue) => {
    if (dateValue == "Bezahldatum") {
      return dateTextColor;
    } else return (dateTextColor = "#DCD7C9");
  };

  return (
    <View style={styles.screen}>
      <Header/>
      <View style={styles.headerContainer}>
        <WeiterButton
          onPress={() => {
            navigation.navigate("StaatsangehoerigkeitsScreen", { antragData });
          }}
        >
          zurück
        </WeiterButton>
        <WeiterButton
          onPress={() => {
            handleSubmit();
            navigation.navigate("ExportPDFTestScreen", { antragData });
          }}
        >
          weiter
        </WeiterButton>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/paypal-logo.jpeg")}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={[styles.questionContainer]}>
          <Text style={styles.questionText}>Bezahlung über DeKom</Text>
          <View style={styles.checkbox}>
            <BouncyCheckbox
              disableText={false}
              isChecked={BezahlungDeKomCheckboxState}
              size={25}
              fillColor="#e94832"
              unfillColor="#3F4E4F"
              iconStyle={{ borderColor: "green" }}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={() =>
                setBezahlungDeKomCheckboxState(!BezahlungDeKomCheckboxState)
              }
            />
          </View>
        </View>
        <View style={[styles.textBetweenContainer]}>
          <Text style={styles.textBetween}>Oder</Text>
        </View>
        <View style={[styles.questionContainer]}>
          <Text style={styles.questionText}>
            Bezahlung bereits gemacht am:{" "}
          </Text>
          <View style={styles.checkbox}>
            <BouncyCheckbox
              disableText={false}
              isChecked={BezahlungBereitsGemachtCheckboxState}
              size={25}
              fillColor="#e94832"
              unfillColor="#3F4E4F"
              iconStyle={{ borderColor: "green" }}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={() =>
                setBezahlungBereitsGemachtCheckboxState(
                  !BezahlungBereitsGemachtCheckboxState
                )
              }
            />
          </View>
        </View>
        <View style={[styles.textInputContainer]}>
          <View style={{ alignSelf: "center", width: 340 }}>
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
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1,
    color: "#3F4E4F",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems:"center",
    backgroundColor: "#2C3639", //2C3639
    paddingLeft: 80,
    paddingBottom: 10,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0,
    color: "#3F4E4F",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#3F4E4F'
  },
  image: {
    marginTop:20,
    width: 250,
    height: 250,
    borderRadius:20
  },
  bodyContainer: {
    height: 340,
    paddingBottom:70,
    backgroundColor: "#3F4E4F",
    flexDirection: "column",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    height: 0,
  },
  textBetweenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0,
  },
  textInputContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  questionText: {
    fontSize: 17,
    flex: 7,
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    alignSelf: "center",
    color:'#DCD7C9'
  },
  textBetween: {
    fontSize: 17,
    flex: 5,
    marginLeft: 20,
    marginTop: 0,
    marginRight: 20,
    marginBottom: 0,
    alignSelf: "center",
    color:'#DCD7C9'
  },
  textInputContainerBetween: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    width: 350,
    alignSelf: "center",
  },
  checkbox: {
    marginRight: 10,
    flex: 1,
    alignSelf: "center",
  },
  white: {
    backgroundColor: "#3F4E4F",
  },
  dateText: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderColor: validationColor,
    padding: 14,
  },
});

export default ZahlungsScreen;
