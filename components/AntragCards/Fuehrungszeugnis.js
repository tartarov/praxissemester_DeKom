import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
  useWindowDimensions,
  Animated,
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
import BottomQRCode from "../BottomQRCode";


const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.9;
const ImageHeight = ImageWidth * 0.6;


function Fuehrungszeugnis({ antragAusstellerDaten, scrollY }) {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  //const scrollY = useRef(new Animated.Value(0)).current;

  const bottomSheetRefQr = useRef(null);

  const interpolateColorY = scrollY.interpolate({
    inputRange: [0, height/2],
    outputRange: ["#2C3639", "#ffff"],
    extrapolate: "clamp",
    //, { backgroundColor: interpolateColorY}
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, height/2],
    outputRange: [0, 1],
    extrapolate: "clamp",
    //, { backgroundColor: interpolateColorY}
  });

  return (
    <>
      <Animated.View style={[styles.container, {backgroundColor: interpolateColorY, opacity: opacity }]}> 
        <View style={{ flexDirection: "column", opacity: 1 }}>
          <View style={{ flexDirection: "row", opacity: 1 }}>
            {antragAusstellerDaten.title == "Fuehrungszeugnis" ? (
              <Image
                source={require("../../assets/images/fuehrungszeugnis.png")}
                style={{
                  height: 180,
                  width: 110,
                  margin: 10,
                  marginTop: 30,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#2C3639",
                }}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={100}
                style={{
                  marginTop: 30,
                  marginBottom: 70,
                  color: "#2C3639",
                  marginRight: 10,
                  marginLeft: 30,
                }}
              />
            )}
            <View style={styles.dataContainer}>
              <View style={styles.textNummer}>
                <Text style={styles.text}>{antragAusstellerDaten.title}</Text>
              </View>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Rückverfolgungsnummer</Text>
              <Text style={styles.text}>
                {antragAusstellerDaten.document.rueckverfolgungsnummer}
              </Text>
            </View>
            <View style={[styles.textContainer, { marginLeft: 15 }]}>
              <Text style={styles.heading}>Ausstelldatum</Text>
              <Text style={[styles.text, { fontSize: 12 }]}>
                {antragAusstellerDaten.document.ausstellDatum}
              </Text>
            </View>
          </View>
          <View style={styles.group}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Einreichungsbehörde</Text>
            <Text style={styles.text}>
              {antragAusstellerDaten.document.einreichungsbehoerde}
            </Text>
          </View>
            <View style={[styles.textContainer, {marginLeft:0}]}>
              <Text style={styles.heading}>Nummer des Ausstellers</Text>
              <Text style={styles.text}>
                {antragAusstellerDaten.document.ausstellerNummer}
              </Text>
            </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={[
                  styles.textContainer,
                  { paddingLeft: 0, marginTop: 50, bakcgroundColor:"red" },
                ]}
              >
                <Text style={styles.textCAN}>
                  {antragAusstellerDaten.document.can}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingTop: 30,
                  marginLeft: 10,
                  borderBottomWidth: 1,
                  width: 350,
                  borderBottomColor: "#2C3639",
                  // borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />

              <View style={{ flexDirection: "row" }}>
                <View style={styles.textContainerInitials}>
                  <Text style={styles.headingInitials}>
                    {antragAusstellerDaten.document.bearbeiitungsStatus}
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
                      paddingLeft: 30,
                      paddingTop: 30,
                      color: "#2C3639",
                      marginRight: 10,
                      marginLeft: 30,
                    }}
                  />
                </Pressable>
              </View>
            </View>
      
        </View>
        {/* <BottomQRCode activeHeight={height * 0.9} ref={bottomSheetRefQr}/>*/}
      </Animated.View>
    </>
  );
}

export default React.memo(Fuehrungszeugnis);

const styles = StyleSheet.create({
  container: {
    width: ImageWidth,
    height: ImageHeight + 350,
    elevation: 16,
    borderRadius: 10,
    backgroundColor: "#DCD7C9",
    opacity: 1,
    borderWidth: 1,
    borderColor: "#3F4E4F",
  },
  image: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3F4E4F",
    overflow: "hidden",
    backgroundColor: "#A27B5C",
    marginBottom: 20,
  },
  dataContainer: {
    padding: 20,
    paddingTop: 30,
  },
  group: {
    flexDirection: "row",
  },
  textContainer: {
    paddingTop: 5,
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
    color: "#223e4b",
    paddingHorizontal: 4,
  },
  headingInitials: {
    fontSize: 24,
    fontFamily: "Nexa-Heavy",
    color: "#223e4b",
    marginLeft: 10,
    marginTop: 0,
    justifyContent: "center",
  },
  text: {
    color: "#223e4b",
    fontSize: 16,
    fontFamily: "Nexa-Heavy",
    paddingHorizontal: 4,
  },
  textCAN: {
    color: "#223e4b",
    fontSize: 16,
    fontFamily: "Nexa-Heavy",
    paddingHorizontal: 0,
  },
  textNummer: {
    color: "#223e4b",
    fontSize: 12,
    fontFamily: "Nexa-Heavy",
    flexDirection: "row",
    paddingHorizontal: 0,
    marginLeft: 10,
    marginTop: 0,
  },
});
