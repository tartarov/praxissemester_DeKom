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
  FlatList
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
import AntragContext from "../../context/AntragContext";

const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.9;
const ImageHeight = ImageWidth * 0.6;

console.log("ENUMCOLOR: " + colorEnum.primary);

function FormCard({ data, attributes }) {

    const {extractFObjectsWithTitles} =
    useContext(AntragContext);

    const blockAttributes = {
      properties: []
  };

  
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

    const attributesForBlock = () =>{
      console.log("attributes: " + attributes)
      for(let i=0; i < attributes; i++){
        const valueAttributes = {
          id: i,
          title: JSON.stringify(data.properties[i]),
          //type: fObjectInSchema ? fObjectInSchema.type : null,
      };
     
      blockAttributes.properties.push(valueAttributes);
    }
    console.log("blockAttributes: " + JSON.stringify(blockAttributes))
    return blockAttributes.properties
    }

    const renderItem = ({ item }) => {
      const backgroundColor = colorEnum.aufenthaltsTitelcolor;
      const color = item.id === "#DCD7C9";
  
      return (
        <Item
          item={item}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };


    return (
      <>
        <View style={[styles.container,colorEnum.quartiary]}>
            <Text>{JSON.stringify(data.title)}</Text>
            <FlatList style={styles.flatlist}
            data={attributesForBlock()}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
      />
        </View>
      </>
    );
  }
//}

export default FormCard;

const styles = StyleSheet.create({
  container: {
    width: ImageWidth,
    height: ImageHeight + 450,
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
