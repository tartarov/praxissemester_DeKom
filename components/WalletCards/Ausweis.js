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
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import colorEnum from "../DeKomColors";

const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.9;
const ImageHeight = ImageWidth * 0.6;

console.log("ENUMCOLOR: " + colorEnum.primary)
function Ausweis({ data, refrence }) {
  const maxSize = 34;
  const minSize = 10;
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [textNachname, setTextNachname] = useState(data.document.name);
  const [textVorname, setTextVorname] = useState(data.document.vorname);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [letterToWidthRatioNach, setWidthRatioNach] = useState(textNachname.length / width);
  const [letterToWidthRatioVor, setWidthRatioVor] = useState(textNachname.length / width);

  const [fontSizeNachname, setFontSizeNachname] = useState(maxSize);
  const [fontSizeVorname, setFontSizeVorname] = useState(maxSize);

  useEffect(() => {
    // Do your calculation here
    setWidthRatioNach(width / Math.max(textNachname.length, 2)/1.1);
    setWidthRatioVor(width / Math.max(textVorname.length, 2)/1.1);
  }, [textNachname, textVorname, width]);

  useEffect(() => {
    const sizeN = Math.max(Math.min(letterToWidthRatioNach, maxSize), minSize);
    const sizeV = Math.max(Math.min(letterToWidthRatioVor, maxSize), minSize);
    setFontSizeNachname(sizeN);
    setFontSizeVorname(sizeV)
  }, [width, textNachname, letterToWidthRatioNach]);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={[
              styles.headingInitials,
              {
                fontSize: 24,
                alignSelf: "center",
                textAlign: "center",
                marginTop: 10,
              },
            ]}
          >
            {data.title}
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
                Personalausweisnummer
              </Text>
              <View style={styles.textNummer}>
                <Text style={[styles.textNummer, { letterSpacing: 3 }]}>
                  {data.document.nummer}
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
                  { paddingLeft: 250, marginTop: 0, flexDirection: "row",  right:20 },
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
            {data.document.vorname == "Tim" ? (
              <Image
                source={require("../../assets/images/TimA.jpeg")}
                style={{
                  height: 170,
                  width: 120,
                  margin: 0,
                  marginLeft: -110,
                  marginTop: 35,
                  marginBottom: 20,
                  borderRadius: 2,
                  right:30
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
                  right:20
                }}
              />
            )}
          </View>
          <View style={styles.group}>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  alignItems: "center",
                  paddingTop: 30,
                  marginLeft: 10,
                  borderBottomWidth: 1,
                  width: 350,
                  borderBottomColor: colorEnum.primary,
                  // borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />

              <View style={{ flexDirection: "row" }}>
                <View style={styles.textContainerInitials}>
                  <Text style={[styles.headingInitials, {fontSize: fontSizeVorname}]}>
                  {data.document.vorname}
                  </Text>
                  <Text style={[styles.headingInitials, {fontSize: fontSizeNachname}]}>
                   {data.document.name} 
                  </Text>
                  <Text style={[styles.heading, { paddingHorizontal: 0 }]}>
                    Vorname/Nachname
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    navigation.navigate("ScanMe");
                  }}
                >
                  <Ionicons
                    name="qr-code-outline"
                    size={60}
                    style={{
                      paddingLeft: 0,
                      paddingTop: 0,
                      color: colorEnum.primary,
                      marginRight: 0,
                      left: 20,
                      top:20
                    }}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        {/* <BottomQRCode activeHeight={height * 0.9} ref={bottomSheetRefQr}/>*/}
      </View>
    </>
  );
}

export default React.memo(Ausweis);

const styles = StyleSheet.create({
  container: {
    width: ImageWidth,
    height: ImageHeight + 350,
    elevation: 16,
    borderRadius: 10,
    backgroundColor: colorEnum.quartiary,
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
  },
  heading: {
    fontSize: 12,
    fontStyle: "italic",
    fontFamily: "Nexa-ExtraLight",
    color: colorEnum.primary,
    paddingHorizontal: 10,
  },
  headingInitials: {
    fontSize: 34,
    fontFamily: "Nexa-Heavy",
    color: colorEnum.primary,
    justifyContent: "center",
  },
  text: {
    color: colorEnum.primary,
    fontSize: 16,
    fontFamily: "Nexa-Heavy",
    paddingHorizontal: 10,
  },
  textCAN: {
    color: colorEnum.primary,
    fontSize: 16,
    fontFamily: "Nexa-Heavy",
    right: 15,
  },
  textNummer: {
    color: colorEnum.primary,
    fontSize: 18,
    fontFamily: "Nexa-Heavy",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginLeft: 0,
    marginTop: 0,
  },
});
