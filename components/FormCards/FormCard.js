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
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import colorEnum from "../DeKomColors";
import AntragContext from "../../context/AntragContext";
import TextInput from "../TextInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from "../Buttons/Button";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.9;
const ImageHeight = ImageWidth * 0.6;

function FormCard({ data, attributes }) {

    const {fillAntrag} =
    useContext(AntragContext);

    const blockAttributes = {
      properties: []
  };

const formDataRef = useRef({});
const [background, setBackground] = useState(colorEnum.aufenthaltsTitelcolor);

//const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const datePickerVisibilityRef  = useRef({});
const [forceRerender, setForceRerender] = useState(false);
const [showDate, setShowDate] = useState("Wähle das Datum aus");

const showDatePicker = (itemName) => {
  console.log("itemName: " + itemName)
  console.log(datePickerVisibilityRef.current[itemName])
  datePickerVisibilityRef.current[itemName] = true;
  setForceRerender(prevState => !prevState); 
};
const hideDatePicker = (itemName, date) => {
  const dateOnly = new Date(date).toISOString().split('T')[0];
  console.log(dateOnly);
  setShowDate(prevState => ({
    ...prevState,
    [itemName]: dateOnly
  }));
  datePickerVisibilityRef.current[itemName] = false;
 // setForceRerender(prevState => !prevState); 
};

const initializeFormData = (data) => {
  if (data && data.properties) {
    data.properties.forEach((property) => {
      if(property.type){
      if (property.type.startsWith('b')) {
        formDataRef.current[property.path? property.path : property.name] = false;
      }
      if(property.format){
        setShowDate("Wähle das Datum aus")
      }
      if (property.type === 'object' && property.name.startsWith('G')) {
        initializeFormData(property);
      }
    }
    });
  }
};

useEffect(() => {
  initializeFormData(data);
}, []);

const handleInputChange = useCallback((id, value) => {
  formDataRef.current[id] = value; 
}, []);

const Item = ({ item, onPress, backgroundColor, textColor}) => (
  <View style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{ item.title}</Text>
    {item.description? <Text style={[styles.description, textColor]}>{item.description}</Text> : null}
    {item.type === "string" && (
  <>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* Überprüfung, ob item.format vorhanden ist */}
        {item.format ? (
          <TouchableWithoutFeedback onPress={() => showDatePicker(item.name)}>
          <View>
          <Text style={{borderWidth: StyleSheet.hairlineWidth, borderRadius:8, margin:2, padding:13}}>{showDate[item.name]}</Text>
          <DateTimePickerModal
            isVisible={datePickerVisibilityRef.current[item.name]}
           // ref={ref => datePickerRef.current[item.name] = ref}
            mode="date"
            onConfirm={(text) => [handleInputChange(item.path ? item.path : item.name, new Date(text).toISOString().split('T')[0]),  hideDatePicker(item.name, text)]}
            onCancel={() => hideDatePicker(item.name)}
          />
          </View>
          </TouchableWithoutFeedback>
        ) : item.enum ? (
          <SelectList
            placeholder={item.title}
            setSelected={(text) => handleInputChange(item.path ? item.path : item.name, text)}
            save="value"
            searchPlaceholder="suche"
            data={item.enum}
            boxStyles={{borderWidth: StyleSheet.hairlineWidth, borderColor: "black"}}
          />
        ) : (
          <TextInput
            placeholder={item.title}
            autoCompleteType="text"
            keyboardType="default"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            onChangeText={(text) => handleInputChange(item.path ? item.path : item.name, text)}
          />
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </>
)}
    {item.type === "boolean" && (
      <BouncyCheckbox
      onPress={(isChecked) => handleInputChange(item.path? item.path : item.name, isChecked)}
      />
    )}
    {(item.type === "integer" || item.type === "number") && (
      <TextInput
      placeholder={item.title}
      keyboardType="numeric"
      onChangeText={(text) => handleInputChange(item.path? item.path : item.name, parseInt(text))}
      />
    )}
    {(item.type === "object" ) && (
     item.properties.map((prop, index) => (
      <Item
          key={index}
          item={prop}
          backgroundColor={{ backgroundColor }}
          textColor={"blue"}
        //  showDatePicker={showDatePicker}
        //  hideDatePicker={hideDatePicker}
         // datePickerVisibility={datePickerVisibility}
      />
  ))
    )}
        {(item.array === true) && (
      <TextInput
      placeholder={item.title}
      keyboardType="numeric"
      onChangeText={(text) => handleInputChange(item.path, ["123",text])}
      />
      )}
  </View>
);

const countFObjects = (data) => {
  let count = 0;

  if (data && data.properties) {
      // Durchlaufe alle Eigenschaften
      data.properties.forEach((property) => {
          // Wenn es sich um ein F-Objekt handelt, erhöhe den Zähler
          if (property.type === 'string' || property.type === 'boolean' || property.type === 'integer' || property.type === 'number' || property.type === null) {
              count++;
          }
          // Wenn es sich um ein G-Objekt handelt, durchlaufe rekursiv seine Eigenschaften
          if (property.type === 'object' && property.name ? property.name.startsWith('G') : null) {
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
      const color = colorEnum.primary;
  
      if(item.name.startsWith("F")){
        allFObjects.push(item.name)
      }
    //  console.log("allFObjects: " + allFObjects)
      return (
        <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
       // showDatePicker={showDatePicker}
       // hideDatePicker={hideDatePicker}
        //datePickerVisibility={datePickerVisibility[item.name]}
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
    marginVertical: 5,
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
  description: {
    fontSize: 12,
   // fontWeight: "bold",
    padding:0,
  },
  flatlist:{
    overflow: "hidden",
  }
});
