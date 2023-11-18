import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import colorEnum from "../DeKomColors";
import CustomText from "../Font";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.9;
const ImageHeight = ImageWidth * 0.6;

console.log("ENUMCOLOR: " + colorEnum.primary);
function Ausweis({ data, refrence }) {
  console.log("DÖÖTA: " + JSON.stringify(data.document))
  const maxSize = 34;
  const minSize = 10;
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [textNachname, setTextNachname] = useState(data.document.name); //data.document.name
  const [textVorname, setTextVorname] = useState(data.document.vorname);
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [letterToWidthRatioNach, setWidthRatioNach] = useState(
    textNachname.length / width
  );
  const [letterToWidthRatioVor, setWidthRatioVor] = useState(
    textNachname.length / width
  );
  //const [decodedToken, setDecodedToken] = useState({});
  const [isAuthenticationInProgress, setAuthenticationInProgress] =
    useState(false);
    let decodedToken

  const [fontSizeNachname, setFontSizeNachname] = useState(maxSize);
  const [fontSizeVorname, setFontSizeVorname] = useState(maxSize);

  console.log("fontSizeNachname: " + fontSizeNachname);
  console.log("fontSizeVorname: " + fontSizeVorname);
  console.log(fontSizeNachname < maxSize ? fontSizeNachname * 5 : 110);

  useEffect(() => {
    // Do your calculation here
    console.log("textNachname.length" + textNachname.length);
    setWidthRatioNach(width / Math.max(textNachname.length, 2) / 1.5);
    setWidthRatioVor(width / Math.max(textVorname.length, 2) / 1.1);
  }, [textNachname, textVorname, width]);

  useEffect(() => {
    const sizeN = Math.max(Math.min(letterToWidthRatioNach, maxSize), minSize);
    const sizeV = Math.max(Math.min(letterToWidthRatioVor, maxSize), minSize);
    setFontSizeNachname(sizeN);
    setFontSizeVorname(sizeV);
  }, [width, textNachname, letterToWidthRatioNach]);

  //if (isFingerprintRead) {  || Object.keys(decodedToken).length > 0
    return (
      <>
        <View style={[styles.container, {backgroundColor: data.document.dokumentTyp == "AR" ? colorEnum.aufenthaltsTitelcolor : colorEnum.quartiary,}]}>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={[
                styles.headingInitials,
                {
                  fontSize: 24,
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: 10,
                  backgroundColor:  data.document.dokumentTyp == "AR" ? colorEnum.aufenthaltsTitelcolor2 : "",
                  borderRadius: 5,
                  paddingHorizontal: 82
                },
              ]}
            >
              {data.document.dokumentTyp == "AR" ? "Aufenthaltstitel" : "Personalausweis"}
            </Text>
            <Text
              style={[
                styles.headingInitials,
                {
                  fontSize: 16,
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: 0,
                },
              ]}
            >
              {data.title2}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.dataContainer}>
                <Text
                  style={[styles.heading, { paddingTop: 0, paddingLeft: 20 }]}
                >
                  Typ des Dokuments
                </Text>
                <View style={styles.textNummer}>
                  <Text style={[styles.textNummer, { letterSpacing: 3 }]}>
                    {data.document.dokumentTyp}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>Geburtstag</Text>
                  <Text style={styles.text}>{data.document.geburtstag}</Text>
                </View>
                <View style={[styles.textContainer]}>
                  <Text style={styles.heading}>Staatsangehörigkeit</Text>
                  <Text style={styles.text}>
                    {data.document.staatsangehoerigkeit}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>Geburtsort</Text>
                  <Text style={styles.text}>{data.document.geburtsort}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>Gültig bis</Text>
                  <Text style={styles.text}>{data.document.gueltigBis}</Text>
                </View>
                <View
                  style={[
                    styles.textContainer,
                    {
                      paddingLeft: 250,
                      marginTop: 0,
                      flexDirection: "row",
                      right: 20,
                    },
                  ]}
                >
                  <Image
                    source={require("../../assets/images/AusweisApp2_Bildmarke_Symbol.png")}
                    style={{
                      height: 31,
                      width: 31,
                      right: 210,
                    }}
                  />
                  <Text style={styles.textCAN}>{data.document.can}</Text>
                </View>
              </View>
              {data.document.vorname == "ERIKA" ? (
                <Image
                  source={require("../../assets/images/Erika_Mustermann.png")}
                  style={{
                    height: 220,
                    width: 160,
                    margin: 0,
                    marginLeft: -140,
                    marginTop: 35,
                    marginBottom: 20,
                    borderRadius: 10,
                    right: 30,
                  }}
                  
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={100}
                  style={{
                    marginTop: 30,
                    marginBottom: 70,
                    color: colorEnum.primary,
                    marginRight: 10,
                    marginLeft: 30,
                    right: 20,
                  }}
                />
              )}
               {data.document.vorname == "HANS-GÜNTHER" ? (
                <Image
                  source={require("../../assets/images/Drebenbusch-Dalgoßen.jpeg")}
                  style={{
                    height: 220,
                    width: 160,
                    margin: 0,
                    marginLeft: -280,
                    marginTop: 35,
                    marginBottom: 20,
                    borderRadius: 10,
                    right: 30,
                  }}
                  
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={100}
                  style={{
                    marginTop: 30,
                    marginBottom: 70,
                    color: colorEnum.primary,
                    marginRight: 10,
                    marginLeft: 30,
                    right: 20,
                  }}
                />
              )}
                 {data.document.vorname == "ANDRÉ" ? (
                <Image
                  source={require("../../assets/images/Missing-Person.png")}
                  style={{
                    height: 220,
                    width: 160,
                    margin: 0,
                    marginLeft: -415,
                    marginTop: 35,
                    marginBottom: 20,
                    borderRadius: 10,
                    right: 30,
                  }}
                  
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={100}
                  style={{
                    marginTop: 30,
                    marginBottom: 70,
                    color: colorEnum.primary,
                    marginRight: 10,
                    marginLeft: 30,
                    right: 20,
                  }}
                />
              )}
            </View>
            <View style={styles.group}>
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    alignItems: "center",
                    paddingTop: 20,
                    marginLeft: 10,
                    borderBottomWidth: 1,
                    width: 350,
                    borderBottomColor: colorEnum.primary,
                    // borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />

                <View style={{ flexDirection: "row" }}>
                  <View style={styles.textContainerInitials}>
                    <Text
                      style={[
                        styles.headingInitials,
                        { fontSize: fontSizeVorname, letterSpacing: 0.5 },
                      ]}
                    >
                      {data.document.vorname}
                    </Text>
                    <Text
                      style={[
                        styles.headingInitials,
                        { fontSize: fontSizeNachname, letterSpacing: 0.5 },
                      ]}
                    >
                      {data.document.name}
                    </Text>
                    <Text style={[styles.heading, { paddingHorizontal: 0 }]}>
                      Vorname/Nachname
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ScanMe");
                    }}
                  >
                    <Ionicons
                      name="qr-code-outline"
                      size={60}
                      style={{
                        paddingRight: 28,
                        paddingTop: 0,
                        color: colorEnum.textcolor,
                     //   backgroundColor: colorEnum.aufenthaltsTitelcolor2,
                        marginLeft:
                          fontSizeNachname < maxSize
                            ? fontSizeNachname * 1
                            : 110,
                        marginTop: 20,
                        left:
                          fontSizeNachname < maxSize ? fontSizeNachname : 110,
                        top: 0,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* <BottomQRCode activeHeight={height * 0.9} ref={bottomSheetRefQr}/>*/}
        </View>
      </>
    );
  }
//}

export default Ausweis;

const styles = StyleSheet.create({
  container: {
    width: ImageWidth,
    height: ImageHeight + 350,
    elevation: 16,
    borderRadius: 10,
    backgroundColor: colorEnum.aufenthaltsTitelcolor,
    opacity: 1,
    borderWidth: 1,
    borderColor: colorEnum.secondary,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorEnum.secondary,
    overflow: "hidden",
    backgroundColor: colorEnum.tertiary,
    marginBottom: 20,
  },
  dataContainer: {
    paddingTop: 30,
  },
  group: {
    flexDirection: "row",
  },
  textContainer: {
    paddingTop: 15,
    paddingLeft: 10,
  },
  textContainerInitials: {
    paddingTop: 2,
    paddingLeft: 10,
    //backgroundColor: colorEnum.aufenthaltsTitelcolor2,
    //filter: 'blur(10px)',
  },
  heading: {
    fontSize: 12,
    fontStyle: "italic",
    fontFamily: "Nexa-ExtraLight",
    color: colorEnum.textcolor,
    paddingHorizontal: 10,
  },
  headingInitials: {
    //fontSize: 34,
    fontFamily: "Nexa-ExtraLight",
    color: colorEnum.textcolor,
    justifyContent: "center",
  },
  text: {
    color: colorEnum.textcolor,
    fontSize: 16,
    fontFamily: "Nexa-ExtraLight",
    paddingHorizontal: 10,
  },
  textCAN: {
    color: colorEnum.textcolor,
    fontSize: 16,
    fontFamily: "Nexa-ExtraLight",
    right: 15,
  },
  textNummer: {
    color: colorEnum.textcolor,
    fontSize: 18,
    fontFamily: "Nexa-ExtraLight",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginLeft: 0,
    marginTop: 0,
  },
});
