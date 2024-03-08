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
  Platform,
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
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import colorEnum from "../DeKomColors";

const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.9;
const ImageHeight = ImageWidth * 0.6;

function Fuehrungszeugnis({ antragAusstellerDaten, scrollY, signature }) {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  let cacheUri;
  let documentUri;

  async function transferFileFromCacheToDocumentDirectory() {
    cacheUri = `${antragAusstellerDaten.document.antragDir}`;
    documentUri = `${FileSystem.documentDirectory}${antragAusstellerDaten.title}.pdf`;
    console.log(documentUri);
    try {
      // Read the content of the file from the CacheDirectory
      const fileContent = await FileSystem.readAsStringAsync(cacheUri);

      // Write the content to the DocumentDirectory
      await FileSystem.writeAsStringAsync(documentUri, fileContent);
      console.log(
        "File transferred from CacheDirectory to DocumentDirectory successfully."
      );
      if (Platform.OS == "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(cacheUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            antragAusstellerDaten.title + "- Antrag",
            "application/pdf"
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
            })
            .catch((e) =>
              console.log("Error while saving file to Directory: " + e)
            );
        } else {
          shareAsync(cacheUri);
        }
      } else {
        shareAsync(documentUri);
      }
    } catch (error) {
      console.error("Error transferring the file:", error);
    }
  }

  async function shareDocument() {
    cacheUri = `${antragAusstellerDaten.document.antragDir}`;
    shareAsync(cacheUri);
  }

  const interpolateColorY = scrollY?.interpolate({
    inputRange: [0, height / 2],
    outputRange: [colorEnum.primary, "#ffff"],
    extrapolate: "clamp",
    //, { backgroundColor: interpolateColorY}
  });

  const opacity = scrollY?.interpolate({
    inputRange: [0, height / 2],
    outputRange: [0, 1],
    extrapolate: "clamp",
    //, { backgroundColor: interpolateColorY}
  });

  let ionicon;
  let ioniconColor;

  if (antragAusstellerDaten?.document?.bearbeitungsStatus === "SUBMITTED") {
    ionicon = "reload-circle-outline"; // Set red color for specific statuses
    ioniconColor = "brown";
  } else if (
    antragAusstellerDaten?.document?.bearbeitungsStatus === "ACCEPTED"
  ) {
    ionicon = "checkmark-circle-outline";
    ioniconColor = "green"; // Set default color for other statuses
  } else if (
    antragAusstellerDaten?.document?.bearbeitungsStatus === "REJECTED"
  ) {
    ionicon = "checkmark-done-circle-outline";
    ioniconColor = "red";
  }

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: interpolateColorY, opacity: opacity }, //opacity
        ]}
      >
        <View style={{ flexDirection: "column", opacity: 1}}>
          <View style={{ flexDirection: "row", opacity: 1 }}>
            <View style={styles.dataContainer}>
                <Text style={[styles.text, {textDecorationLine: "underline"}]}>{antragAusstellerDaten.title}</Text>    
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>caseID</Text>
              <Text style={styles.text}>
                {antragAusstellerDaten?.document?.caseID}
              </Text>
            </View>
          
          </View>
          <View style={styles.group}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>SubmissionID</Text>
              <Text style={styles.text}>
                {antragAusstellerDaten?.document?.submissionID}
              </Text>
            </View>
          </View>
          <View style ={[styles.group, {padding:0}]}>           
              <View style={[styles.textContainer, { marginBottom: 20 }]}>
              <Text style={styles.heading}>Ausstelldatum</Text>
              <Text style={[styles.text, { fontSize: 12 }]}>
                {antragAusstellerDaten?.document?.ausstellDatum}
              </Text>
            </View>
       {/*}   <TouchableOpacity onPress={transferFileFromCacheToDocumentDirectory}>
                <Ionicons
                  name="download-outline"
                  size={40}
                  color="black"
                  style={{ top: 0, right: 0 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={shareDocument}>
                <Ionicons
                  name="share-social-outline"
                  size={40}
                  color="black"
                  style={{ top: 0, left: 0}}
                />
              </TouchableOpacity>
      */}
              </View>
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                alignItems: "center",
                marginLeft: 10,
                borderBottomWidth: 1,
                width: 350,
                borderBottomColor: colorEnum.textcolor,
                // borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <View style={{ alignItems: "center" }}>
              <View style={styles.textContainerInitials}>
                <Text style={styles.headingInitials}>
                  {antragAusstellerDaten?.document?.bearbeitungsStatus}
                </Text>
              </View>
              <View style={styles.ioniconContainer}>
                <Ionicons
                  name={ionicon}
                  size={60}
                  style={{ color: ioniconColor, left: 140, bottom: 10 }}
                />
              </View>
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
    height: ImageHeight + 120,
  //  elevation: 16,
    borderRadius: 10,
    backgroundColor: colorEnum.quartiary,
    opacity: 1,
 //   borderWidth: 1,
  //  borderColor: colorEnum.secondary,
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
    paddingTop: 10,
  },
  group: {
    flexDirection: "row",
  },
  textContainer: {
    paddingTop: 0,
    paddingLeft: 10,
  },
  textContainerInitials: {
    paddingTop: 0,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 12,
    fontStyle: "italic",
    fontFamily: "Nexa-ExtraLight",
    color: colorEnum.textcolor,
    padding: 4,
  },
  headingInitials: {
    fontSize: 24,
    fontFamily: "Nexa-Heavy",
    color: colorEnum.textcolor,
    marginLeft: 0,
    top: 40,
    right: 80,
    justifyContent: "center",
  },
  text: {
    color: colorEnum.textcolor,
    fontSize: 16,
    fontFamily: "Nexa-Heavy",
    paddingHorizontal: 4,
    fontWeight: "bold"
  },
  textCAN: {
    color: colorEnum.textcolor,
    fontSize: 16,
    fontFamily: "Nexa-Heavy",
    paddingHorizontal: 0,
  },
  textNummer: {
    color: colorEnum.textcolor,
    fontSize: 12,
    fontFamily: "Nexa-Heavy",
    flexDirection: "row",
    paddingHorizontal: 0,
    marginLeft: 10,
    marginTop: 0,
  },
  ioniconContainer: {
    paddingHorizontal: 0,
  },
});
