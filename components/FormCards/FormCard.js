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

console.log("DATA: " + Object.keys(data))

const handleInputChange = useCallback((gObject, id, value) => {
    formDataRef.current[[gObject,id]] = value; // Wert im Ref aktualisieren
}, []);

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item}</Text>
    {console.log("item: " +  item)}
    {item === "string" && (
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
       // ref={land}
        onChangeText={(text) => handleInputChange(item.gObject, item.fObject,text)}
      //  onSubmitEditing={() => filloutForm.push(land.current.value)}
       // onChangeText={(text) => setFormData(item.fObject, text)}
        //value={}  
        // onBlur={handleBlur("verwendungszweck")}
        // error={errors.verwendungszweck}
        // touched={touched.verwendungszweck}
        // onSubmitEditing={() => behörde.current?.focus()}
      />
          </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    )}
    {item.type === "boolean" && (
      <BouncyCheckbox
      onPress={(isChecked) => handleInputChange(item.gObject, item.fObject, isChecked)}
      />
    )}
    {(item.type === "integer" || item.type === "number") && (
      <TextInput
      placeholder={item.title}
      keyboardType="numeric"
      onChangeText={(text) => handleInputChange(item.gObject, item.fObject, text)}
      />
    )}
  </TouchableOpacity>
);

if (data.length > 0) {
  const titleOfFirstProperty = data[0].title;
  console.log("Title des ersten Elements: ", titleOfFirstProperty);
} else {
  console.log("properties-Array ist leer.");
}

 //   const attributesForBlock = () =>{
  //    for(let i=0; i <= data.length; i++){
  //      if (data[i]) {
        const valueAttributes = {
         // id: i,
          gObject: data.name ? data.name : null, 
          fObject: data.name ? data.name : null, 
          title: data.title ? data.title : null,
          type: data.type ? data.type : null,
      };

      console.log(valueAttributes)
    
 //     blockAttributes.properties.push(valueAttributes);
 //   }
 //   }
  //  console.log("blockAttributes: " + JSON.stringify(blockAttributes.properties))
  //  return blockAttributes.properties
  //  }

  console.log(Object.keys(data))

    const renderItem = ({ item }) => {
      const backgroundColor = colorEnum.aufenthaltsTitelcolor;
      const color = item.id === "#DCD7C9";
  
      console.log(data[item])
      return (
        <Item
        item={data[item]}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
      );
    };

    const collectData = () => {

      if(Object.keys(formDataRef.current).length == data.properties.length){
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
            data={Object.keys(data)}
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
});
