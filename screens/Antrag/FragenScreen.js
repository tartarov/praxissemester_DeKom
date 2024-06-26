import { LinkingContext } from "@react-navigation/native";
//import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NumericInput from "react-native-numeric-input";
import TextInput from "../../components/TextInput";
import WeiterButton from "../../components/Buttons/WeiterButton";
import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import { Header } from "../../components/Header";
import colorEnum from "../../components/DeKomColors";

export default function FragenScreen({ navigation }) {
  const [state, setState] = React.useState(1);
  const [VorlageCheckboxState, setVorlageCheckboxState] = React.useState(false);
  const [AuslandCheckboxState, setAuslandCheckboxState] = React.useState(false);
  const [ErweitertesCheckboxState, setErweitertesCheckboxState] =
    React.useState(false);
  const [NormalesCheckboxState, setNormalesCheckboxState] =
    React.useState(false);
  const [ÜbersendungPrivatCheckboxState, setÜbersendungPrivatCheckboxState] =
    React.useState(false);
  const [ÜbersendungBehördeCheckboxState, setÜbersendungBehördeCheckboxState] =
    React.useState(false);
  const [
    EinsichtÜbersendungBotschaftCheckboxState,
    setEinsichtÜbersendungBotschaftCheckboxState,
  ] = React.useState(false);
  const [
    EinsichtÜbersendungKonsulatCheckboxState,
    setEinsichtÜbersendungKonsulatCheckboxState,
  ] = React.useState(false);

  const verwendungszweck = useRef(null);
  const behörde = useRef(null);
  const anschriftBehörde = useRef(null);
  const land = useRef(null);

  const antragData = {
    anzahlExemplare: state,
    zurVorlage: VorlageCheckboxState,
    zurVerwendungImAusland: AuslandCheckboxState,
    erweitertes: ErweitertesCheckboxState,
    normales: NormalesCheckboxState,
    übersendungPrivat: ÜbersendungPrivatCheckboxState,
    übersendungBehörde: ÜbersendungBehördeCheckboxState,
    einsichtÜbersendungKonsulat: EinsichtÜbersendungKonsulatCheckboxState,
    einsichtÜbersendungBotschaft: EinsichtÜbersendungBotschaftCheckboxState,
    bezahlungDeKom: false,
    bezahlungBereitsGemacht: false,
    zahlungsDatum: "/",
    verwendungszweck: "/",
    behörde: "/",
    anschriftBehörde: "/",
    konsulatLand: "/",
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        verwendungszweck: "",
        behörde: "",
        anschriftBehörde: "",
        land: "",
      },
      onSubmit: (values) => {
        antragData.verwendungszweck = values.verwendungszweck;
        antragData.behörde = values.behörde;
        antragData.anschriftBehörde = values.anschriftBehörde;
        antragData.konsulatLand = values.land;
        navigation.navigate("StaatsangehoerigkeitsScreen", { antragData });
      },
    });

  return (
    <View>
       <Header/>
       <View style={styles.headerContainer}>
        <WeiterButton
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          zurück
        </WeiterButton>
        <WeiterButton
          onPress={() => {
            handleSubmit();
          }}
        >
          weiter
        </WeiterButton>
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <Text style={styles.headline}>
            Ergänzende Daten - Angaben zum Führungszeugnis
          </Text>
          <Text style={styles.bottomline}>Zutreffendes bitte Ankreuzen!</Text>
          <View style={[styles.questionContainer, styles.white]}>
            <Text style={styles.questionText}>
              Benötigen Sie ein normales Führungszeugnis?
            </Text>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                disableText={false}
                isChecked={NormalesCheckboxState}
                size={25}
                fillColor="#e94832"
                unfillColor={colorEnum.secondary}
                iconStyle={{ borderColor: "green" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() => setNormalesCheckboxState(!NormalesCheckboxState)}
              />
            </View>
          </View>
          <View style={[styles.textBetweenContainer, styles.white]}>
            <Text style={styles.textBetween}>Oder</Text>
          </View>
          <View style={[styles.questionContainer, styles.white]}>
            <Text style={styles.questionText}>
              Benötigen Sie ein erweitertes Führungszeugnis?
            </Text>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                disableText={false}
                isChecked={ErweitertesCheckboxState}
                size={25}
                fillColor="#e94832"
                unfillColor={colorEnum.secondary}
                iconStyle={{ borderColor: "green" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() =>
                  setErweitertesCheckboxState(!ErweitertesCheckboxState)
                }
              />
            </View>
          </View>
          <View style={[styles.questionContainer]}>
            <Text style={styles.questionText}>
              Bitten Sie um die Übersendung an Ihre oben genannte private
              Anschrift?
            </Text>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                disableText={false}
                isChecked={ÜbersendungPrivatCheckboxState}
                size={25}
                fillColor="#e94832"
                unfillColor={colorEnum.secondary}
                iconStyle={{ borderColor: "green" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() =>
                  setÜbersendungPrivatCheckboxState(
                    !ÜbersendungPrivatCheckboxState
                  )
                }
              />
            </View>
          </View>
          <View style={[styles.questionContainer, styles.white]}>
            <Text style={styles.questionText}>
              Bitten Sie um die Übersendung des Führungszeugnisses zur Vorlage
              an die deutsche Behörde?
            </Text>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                disableText={false}
                isChecked={ÜbersendungBehördeCheckboxState}
                size={25}
                fillColor="#e94832"
                unfillColor={colorEnum.secondary}
                iconStyle={{ borderColor: "green" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() =>
                  setÜbersendungBehördeCheckboxState(
                    !ÜbersendungBehördeCheckboxState
                  )
                }
              />
            </View>
          </View>
          <View style={[styles.textBetweenContainer, styles.white]}>
            <Text style={styles.textBetween}>
              Bei Übersendung an eine deutsche Behörde sind zusätzlich folgende
              Angaben nötig:
            </Text>
          </View>
          <View style={[styles.textInputContainer, styles.white]}>
            <View style={styles.textInputContainerBetween}>
              <TextInput
                placeholder="Verwendungszweck, ggf. Aktenzeichen"
                ref={verwendungszweck}
                autoCompleteType="text"
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange("verwendungszweck")}
                onBlur={handleBlur("verwendungszweck")}
                error={errors.verwendungszweck}
                touched={touched.verwendungszweck}
                onSubmitEditing={() => behörde.current?.focus()}
              ></TextInput>
            </View>
            <View style={styles.textInputContainerBetween}>
              <TextInput
                placeholder="Bezeichnung der Behörde"
                ref={behörde}
                autoCompleteType="text"
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange("behörde")}
                onBlur={handleBlur("behörde")}
                error={errors.behörde}
                touched={touched.behörde}
                onSubmitEditing={() => anschriftBehörde.current?.focus()}
              ></TextInput>
            </View>
            <View style={styles.textInputContainerBetween}>
              <TextInput
                placeholder="Anschrift der Behörde"
                ref={anschriftBehörde}
                autoCompleteType="text"
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange("anschriftBehörde")}
                onBlur={handleBlur("anschriftBehörde")}
                error={errors.anschriftBehörde}
                touched={touched.anschriftBehörde}
              ></TextInput>
            </View>
          </View>
          <View style={[styles.textBetweenContainer]}>
            <Text style={[styles.textBetween, { marginTop: 20 }]}>
              Für den Fall, dass das Führungszeugnis zur Vorlage einer Behörde
              Eintragungnen enthält, bitten Sie zur Einsichtnahme vor Versendung
              an die oben bezeichnete Behörde um Übersendung an:
            </Text>
          </View>
          <View style={[styles.questionContainer]}>
            <Text style={styles.questionText}>Die Deutsche Botschaft</Text>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                disableText={false}
                isChecked={EinsichtÜbersendungBotschaftCheckboxState}
                size={25}
                fillColor="#e94832"
                unfillColor={colorEnum.secondary}
                iconStyle={{ borderColor: "green" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() =>
                  setEinsichtÜbersendungBotschaftCheckboxState(
                    !EinsichtÜbersendungBotschaftCheckboxState
                  )
                }
              />
            </View>
          </View>
          <View style={[styles.textBetweenContainer]}>
            <Text style={styles.textBetween}>Oder</Text>
          </View>
          <View style={[styles.questionContainer]}>
            <Text style={styles.questionText}>das deutsche Konsulat in</Text>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                disableText={false}
                isChecked={EinsichtÜbersendungKonsulatCheckboxState}
                size={25}
                fillColor="#e94832"
                unfillColor="#A4B1B6"
                iconStyle={{ borderColor: "green" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() =>
                  setEinsichtÜbersendungKonsulatCheckboxState(
                    !EinsichtÜbersendungKonsulatCheckboxState
                  )
                }
              />
            </View>
          </View>
          <View
            style={[
              styles.textInputContainer,
              { marginBottom: 20, marginTop: -15 },
            ]}
          >
            <View style={{ alignSelf: "center", width: 340 }}>
              <TextInput
                placeholder="Land"
                ref={land}
                autoCompleteType="text"
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange("land")}
                onBlur={handleBlur("land")}
                error={errors.land}
                touched={touched.land}
              ></TextInput>
            </View>
          </View>
          <View style={[styles.questionContainer, styles.white, {paddingBottom:25, overflow:'hidden'}]}>
            <Text style={styles.questionText}>
              Wie viele Exemplare des Führungszeugnisses benötigen Sie?
            </Text>
            <View style={[styles.checkbox, { marginRight: 80 }]}>
              <NumericInput
                value={state.value}
                onChange={(value) => setState({ value })}
                minValue={1}
                maxValue={10}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                totalWidth={100}
                totalHeight={30}
                iconSize={20}
                step={1}
                valueType="real"
                rounded
                textColor="#00000"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#80BE25"
                leftButtonBackgroundColor="#Be2525"
              />
            </View>
          </View>
          <View
            style={[styles.questionContainer, { height: 50,position:"relative", paddingTop:120 }]}
          ></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems:"center",
    backgroundColor: colorEnum.primary, //2C3639
    paddingLeft: 80,
    paddingBottom: 10,
  },
  bodyContainer: {
    height: 1300,
    backgroundColor: colorEnum.monochrome,
    flexDirection: "column",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0,
    color: colorEnum.tertiary,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    color: colorEnum.quartiary,
  },
  bottomline: {
    fontWeight: "semi-bold",
    fontSize: 20,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    color: colorEnum.quartiary,
  },
  label: {
    margin: 8,
    color:  colorEnum.quartiary,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    color:  colorEnum.quartiary,

  },
  textBetweenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0,
    color:  colorEnum.quartiary,
 
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
    marginBottom: 0,
    alignSelf: "center",
    color:  colorEnum.quartiary,
  },
  textBetween: {
    fontSize: 17,
    flex: 5,
    marginLeft: 20,
    marginTop: 0,
    marginRight: 20,
    marginBottom: 0,
    alignSelf: "center",
    color:  colorEnum.quartiary,
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
    backgroundColor:  colorEnum.primary,
  },
});
