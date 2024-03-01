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
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
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
import TextInput from "../TextInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from "../Buttons/Button";

const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.9;
const ImageHeight = ImageWidth * 0.6;

function FormCard({ data, attributes }) {

    const {fillAntrag} =
    useContext(AntragContext);

    const blockAttributes = {
      properties: []
  };

  const filloutForm = []

const formDataRef = useRef({});
const [background, setBackground] = useState(colorEnum.aufenthaltsTitelcolor);
const [isChecked, setIsChecked] = useState({});

console.log("DATA: " + JSON.stringify(data))

// Funktion, um alle F-Objekte auf false zu setzen
const initializeFormData = (data) => {
  if (data && data.properties) {
    data.properties.forEach((property) => {
      if (property.type.startsWith('b')) {
        formDataRef.current[property.path] = false;
      }
      if (property.type === 'object' && property.name.startsWith('G')) {
        initializeFormData(property);
      }
    });
  }
};

// Aufruf der Initialisierungsfunktion
useEffect(() => {
  initializeFormData(data);
}, []);

// Handler-Funktion für die Eingabeänderung
const handleInputChange = useCallback((id, value) => {
  formDataRef.current[id] = value; // Wert im Ref aktualisieren
}, []);

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <View style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name + " " + item.title}</Text>
    {item.type === "string" && (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TextInput
        placeholder={item.title}
        autoCompleteType="text"
        keyboardType="default"
        autoCapitalize="none"
        keyboardAppearance="dark"
        returnKeyType="go"
        returnKeyLabel="go"
        onChangeText={(text) => handleInputChange(item.path,text)}
      />
          </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    )}
    {item.type === "boolean" && (
      <BouncyCheckbox
      onPress={(isChecked) => handleInputChange(item.path, isChecked)}
      />
    )}
    {(item.type === "integer" || item.type === "number") && (
      <TextInput
      placeholder={item.title}
      keyboardType="numeric"
      onChangeText={(text) => handleInputChange(item.path, text)}
      />
    )}
    {(item.type === "object" && item.name.startsWith("G") ) && (
     item.properties.map((prop, index) => (
      <Item
          key={index}
          item={prop}
          backgroundColor={{ backgroundColor }}
          textColor={"blue"}
      />
  ))
    )}
  </View>
);

const countFObjects = (data) => {
  let count = 0;

  if (data && data.properties) {
      // Durchlaufe alle Eigenschaften
      data.properties.forEach((property) => {
          // Wenn es sich um ein F-Objekt handelt, erhöhe den Zähler
          if (property.type === 'string' || property.type === 'boolean' || property.type === 'integer' || property.type === 'number') {
              count++;
          }
          // Wenn es sich um ein G-Objekt handelt, durchlaufe rekursiv seine Eigenschaften
          if (property.type === 'object' && property.name.startsWith('G')) {
              count += countFObjects(property);
          }
      });
  }

  return count;
};

// Aufruf der Funktion
const totalFObjects = countFObjects(data);
console.log("Gesamtanzahl der F-Objekte:", totalFObjects);

    let allFObjects = []

    const renderItem = ({ item }) => {
      const backgroundColor = colorEnum.aufenthaltsTitelcolor;
      const color = "#DCD7C9";
  
      if(item.name.startsWith("F")){
        allFObjects.push(item.name)
      }
      console.log("[item]: "+JSON.stringify(item))
    //  console.log("allFObjects: " + allFObjects)
      return (
        <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
      );
    };

    const collectData = () => {
      console.log("totalFObjects: " + totalFObjects)

      if(Object.keys(formDataRef.current).length == totalFObjects){
        setBackground("lightgreen" );
         fillAntrag(formDataRef.current)
      } else {
        setBackground("lightcoral" );
        Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
      }

      console.log("DATA INSIDE FORMCARD: " + JSON.stringify(data))
      console.log("Gesammelte Daten:", formDataRef.current);
      // Hier kannst du weitere Aktionen ausführen, z.B. Daten speichern, usw.
    };

    return (
      <>
        <View style={[styles.container,{ backgroundColor: background }]}>
            <View style = {{alignItems: "center", padding: 15}}>
            <Text style={[styles.titleHead]} >{data.title}</Text>
            </View>
            <FlatList style={styles.flatlist}
            data={data.properties}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
      />
      <View style = {{alignItems: "center", padding: 30}}>
       <Button label="speichern" onPress={collectData} />
       </View>
        </View>
      </>
    );
  }
//}

export default React.memo(FormCard);

const styles = StyleSheet.create({
  container: {
    width: ImageWidth,
    height: ImageHeight + 400,
    elevation: 16,
    borderRadius: 10,
    backgroundColor: colorEnum.aufenthaltsTitelcolor,
    opacity: 1,
    borderWidth: 1,
    borderColor: colorEnum.secondary,
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleHead: {
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom:10,
  },
  flatlist:{
    overflow: "hidden",
  }
});
