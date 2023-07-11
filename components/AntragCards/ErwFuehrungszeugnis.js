import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    Pressable,
    useWindowDimensions
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { useNavigation } from "@react-navigation/native";
  import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
  import BottomQRCode from "../BottomQRCode";
  
  
  const { width } = Dimensions.get("screen");
  
  const ImageWidth = width * 0.9;
  const ImageHeight = ImageWidth * 0.6;
  
  function ErwFuehrungszeugnis({ data, refrence }) {
      const navigation = useNavigation();
      const { height } = useWindowDimensions();
  
    const bottomSheetRefQr = useRef(null);
  
    const openQrCode = useCallback(() => {
      bottomSheetRefQr.current.expand();
    }, []);
    return (
      <>
      <View style={styles.container}>
        <View style={{ flexDirection: "column", opacity: 1 }}>
          <View style={{ flexDirection: "row", opacity: 1 }}>
            {data.document.vorname == "Tim" ? (
              <Image
                source={require("../../assets/images/TimA.jpeg")}
                style={{
                  height: 170,
                  width: 120,
                  margin: 0,
                  marginLeft: 15,
                  marginTop: 35,
                  marginBottom:20,
                  borderRadius: 2,
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
                <Text style={styles.text}>{data.document.nummer}</Text>
              </View>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Geburtstag</Text>
              <Text style={styles.text}>{data.document.geburtstag}</Text>
            </View>
            <View style={[styles.textContainer, { marginLeft: 15 }]}>
              <Text style={styles.heading}>Staatsangehörigkeit</Text>
              <Text style={styles.text}>
                {data.document.staatsangehoerigkeit}
              </Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Geburtsort</Text>
            <Text style={styles.text}>{data.document.geburtsort}</Text>
          </View>
          <View style={styles.group}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Gültig bis</Text>
              <Text style={styles.text}>{data.document.gueltigBis}</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={[styles.textContainer, { marginLeft: 100, marginTop: 50 }]}
              >
                <Text style={styles.textCAN}>{data.document.can}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingTop: 30,
                  marginLeft: -120,
                  borderBottomWidth: 1,
                  width: 350,
                  borderBottomColor: "#2C3639",
                  // borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
  
              <View style={{ flexDirection: "row" }}>
                <View style={styles.textContainerInitials}>
                  <Text style={styles.headingInitials}>
                    {data.document.vorname}
                  </Text>
                  <Text style={styles.headingInitials}>{data.document.name}</Text>
                </View> 
                <Pressable  onPress={() =>{navigation.navigate("ScanMe")}}>
                  <Ionicons
                    name="qr-code-outline"
                    size={60}
                    style={{
                      paddingLeft: 70,
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
        </View>
      {/* <BottomQRCode activeHeight={height * 0.9} ref={bottomSheetRefQr}/>*/}
      </View>
   
    </>
    );
  }
  
  export default React.memo(ErwFuehrungszeugnis);
  
  const styles = StyleSheet.create({
    container: {
      width: ImageWidth,
      height: ImageHeight + 350,
      elevation: 16,
      borderRadius: 10,
      backgroundColor: "#DCD7C9",
      opacity: 1,
      borderWidth:1,
      borderColor: "#3F4E4F"
    },
    image: {
      flex: 1,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#3F4E4F",
      overflow: "hidden",
      backgroundColor: "#A27B5C",
      marginBottom:20
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
      paddingHorizontal: 10,
    },
    headingInitials: {
      fontSize: 34,
      fontFamily: "Nexa-Heavy",
      color: "#223e4b",
      marginLeft: -120,
      marginTop: 0,
      justifyContent: "center",
    },
    text: {
      color: "#223e4b",
      fontSize: 16,
      fontFamily: "Nexa-Heavy",
      paddingHorizontal: 10,
    },
    textCAN: {
      color: "#223e4b",
      fontSize: 16,
      fontFamily: "Nexa-Heavy",
      paddingHorizontal: 10,
    },
    textNummer: {
      color: "#223e4b",
      fontSize: 12,
      fontFamily: "Nexa-Heavy",
      flexDirection: "row",
      paddingHorizontal: 10,
      marginLeft: 20,
      marginTop: 0,
    },
  });
  