import { View, StyleSheet, Text, Image } from 'react-native';
import WeiterButton from '../../components/WeiterButton';
import React, { useRef, useState, useContext } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import validationColor from "../../components/TextInput";
import { useFormik } from "formik";

function ZahlungsScreen({ route, navigation }) {
    //let antragData = route.params.antragData;
    let dateValue = "Bezahldatum";
    let dateTextColor = "rgba(34, 62, 75, 0.7)";

    const [BezahlungDeKomCheckboxState, setBezahlungDeKomCheckboxState] = React.useState(false);
    const [BezahlungBereitsGemachtCheckboxState, setBezahlungBereitsGemachtCheckboxState] = React.useState(false);
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

    const changeDateTextColor = (dateValue) => {
        if (dateValue == "Bezahldatum") {
            return dateTextColor;
        } else return (dateTextColor = "black");
    };

    let month = dateValue.toString().substring(4, 7);
    let day = dateValue.toString().substring(8, 10);
    let year = dateValue.toString().substring(11, 15);

    const checkString = (datevalue) => {
        if (datevalue == "Bezahldatum") {
            return dateValue;
        } else return day + " " + month + " " + year;
    };

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        bezahldatum: "",
      },
      onSubmit: (values) => {
        console.log("Unser Values sieht so aus: " + JSON.stringify(values));
        console.log(`Bezahldatum: ${
          day + " " + month + " " + year
        }`);
      },
    });
    
    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>|DeKom </Text>
                <WeiterButton onPress={() => { navigation.navigate("ExportPDFTestScreen", { antragData }); }}>weiter</WeiterButton>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/images/paypal-logo.jpeg')} />
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
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: "green" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            onPress={() => setBezahlungDeKomCheckboxState(!BezahlungDeKomCheckboxState)}
                        />
                    </View>
                </View>
                <View style={[styles.textBetweenContainer]}>
                    <Text style={styles.textBetween
                    }>Oder</Text>
                </View>
                <View style={[styles.questionContainer]}>
                    <Text style={styles.questionText}>Bezahlung bereits gemacht am: </Text>
                    <View style={styles.checkbox}>
                        <BouncyCheckbox
                            disableText={false}
                            isChecked={BezahlungBereitsGemachtCheckboxState}
                            size={25}
                            fillColor="#e94832"
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: "green" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            onPress={() => setBezahlungBereitsGemachtCheckboxState(!BezahlungBereitsGemachtCheckboxState)}
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
        color: '#1CA352'
    },
    headerContainer: {
        marginTop: 50,
        marginBottom: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 26,
        marginLeft: 20,
        marginBottom: 25
    },
    imageContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
    },
    bodyContainer: {
        height: 200,
        marginTop: 5,
        backgroundColor: '#eeeeee',
        flexDirection: 'column',
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        height: 0,
    },
    textBetweenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0,
    },
    textInputContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    questionText: {
        fontSize: 17,
        flex: 7,
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
        alignSelf: "center",
    },
    textBetween: {
        fontSize: 17,
        flex: 5,
        marginLeft: 20,
        marginTop: 0,
        marginRight: 20,
        marginBottom: 0,
        alignSelf: "center"
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
        backgroundColor: '#f8c8c1'
    },
    dateText: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        borderColor: validationColor,
        padding: 14,
      },

});



export default ZahlungsScreen;

