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
  Alert,
  Animated,
  Easing
} from "react-native";
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import colorEnum from "../DeKomColors";
import AntragContext from "../../context/AntragContext";
import TextInput from "../TextInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from "../Buttons/Button";
import { SelectList } from "react-native-dropdown-select-list";
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePickerModalComponent from "../../screens/Modals/DateTimePickerModal";
import FormCardFieldFilled from "../FormCardFieldFilled";

const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.9;
const ImageHeight = ImageWidth * 0.6;
let requiredCardreqCount = 0 

function FormCard({ data, userData }) {
  const { fillAntrag, countRequiredCardsChecked } = useContext(AntragContext);
  const formDataRef = useRef({});
  const [background, setBackground] = useState(colorEnum.aufenthaltsTitelcolor);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Dauer der Animation in Millisekunden
      useNativeDriver: true, // Führe die Animation auf dem nativen Thread aus (Performance)
    }).start();
  }, [fadeAnim]);

  const initializeFormData = (data, userData) => {
    if (data && data.properties) {
      data.properties.forEach((property) => {
        if (property.type) {
          if (property.type.startsWith("b")) {
            formDataRef.current[
              property.path ? property.path : property.name
            ] = false;
          }
      /*    if (property.type.startsWith("s") || property.type.startsWith("n")) {
            formDataRef.current[property.path ? property.path : property.name] =
              "000";
            if (property.format?.startsWith("d")) {
              formDataRef.current[
                property.path ? property.path : property.name
              ] = "2024-12-12";
            }
          }
          
          if (property.type.startsWith("i")) {
            formDataRef.current[property.path ? property.path : property.name] =
              parseInt("1");
          }
          */
          if (property.title == "Staatsangehörigkeit" ) {
            formDataRef.current[property.path ? property.path : property.name] =
              userData.staatsangehoerigkeit == "D"
                ? "000"
                : userData.staatsangehoerigkeit;
          }
          if (property.title == "Vornamen") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.vorname
          }
          if (property.title == "Familienname") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.name
          }
          if (property.title == "Geburtsort") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.geburtsort
          }
          if (property.title == "Straße") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.strasse
          }
          if (property.title == "Postleitzahl") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.plz
          }
          if (property.title == "Ort") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.stadt
          }
          if (property.title == "Tag (ohne Monat und Jahr)") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.geburtstagTag
          }
          if (property.title == "Monat") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.geburtstagMonat
          }
          if (property.title == "Jahr") {
            formDataRef.current[property.path ? property.path : property.name] =
            userData.geburtstagJahr
          }

          if (property.type === "object" && property.name.startsWith("G")) {
            initializeFormData(property, userData);
          }
        }
      });
    }
  };

  useEffect(() => {
    initializeFormData(data, userData);
  }, []);

  const handleInputChange = useCallback((id, value) => {
    formDataRef.current[id] = value;
  }, []);

  function Item ({ item, index, backgroundColor, textColor }) {
    const translateY = useRef(new Animated.Value(-50)).current;

    useEffect(() => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000, // Dauer der Animation in Millisekunden
        delay: index * 200,
        easing: Easing.out(Easing.exp), // Verzögerung basierend auf dem Index des Elements
        useNativeDriver: true, // Führe die Animation auf dem nativen Thread aus (Performance)
      }).start();
    }, [translateY, index]);

   return ( <Animated.View style={[styles.item, backgroundColor, {transform: [{ translateY: translateY }], opacity: fadeAnim,}]}>
      <View style={{flexDirection: "row"}}>
      <Text style={[styles.title, textColor]}>
        {item.title}
      </Text>
      <Text style={[styles.pflichtfeld, {color:"red"}]}>
        {item.required ? " (Pflichtfeld)" : null}
      </Text>
      </View>
      {item.description ? (
        <Text style={[styles.description, textColor]}>{item.description}</Text>
      ) : null}
      {item.type === "string" && (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {item.format ? (
                <DateTimePickerModalComponent
                  itemName={item.name}
                  onConfirm={(text) => {
                    handleInputChange(
                      item.path ? item.path : item.name,
                      new Date(text).toISOString().split("T")[0]
                    );
                    //  hideDatePicker(item.name, text);
                  }}
                    onCancel={() => hideDatePicker(item.name)}
                />
              ) : item.enum ? (
                <>
                  {item.title === "Staatsangehörigkeit" ? (
                    <FormCardFieldFilled
                      data={
                        userData.staatsangehoerigkeit == "D"
                          ? "000"
                          : userData.staatsangehoerigkeit
                      }
                      setSelected={(text) => {
                        handleInputChange(
                          item.path ? item.path : item.name,
                          text
                        );
                      }}
                      item={item}
                    />
                  ) : (
                    <SelectList
                      placeholder={item.title}
                      setSelected={(text) =>
                        handleInputChange(
                          item.path ? item.path : item.name,
                          text
                        )
                      }
                      save="value"
                      searchPlaceholder="suche"
                      data={item.enum}
                      boxStyles={{
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: "black",
                      }}
                    />
                  )}
                </>
              ) : item.title === "Vornamen" ? (
                <FormCardFieldFilled
                  data={userData.vorname}
                  onChangeText={(text) => {
                    handleInputChange(item.path ? item.path : item.name, text);
                  }}
                  item={item}
                />
              ) : item.title === "Familienname" ? (
                <FormCardFieldFilled
                  data={userData.name}
                  onChangeText={(text) => {
                    handleInputChange(item.path ? item.path : item.name, text);
                  }}
                  item={item}
                />
              ) : item.title === "Geburtsort" ? (
                <FormCardFieldFilled
                  data={userData.geburtsort}
                  onChangeText={(text) => {
                    handleInputChange(item.path ? item.path : item.name, text);
                  }}
                  item={item}
                />
              ) : item.title === "Straße" ? (
                <FormCardFieldFilled
                  data={userData.strasse}
                  onChangeText={(text) => {
                    handleInputChange(item.path ? item.path : item.name, text);
                  }}
                  item={item}
                />
              ) : item.title === "Postleitzahl" ? (
                <FormCardFieldFilled
                  data={userData.plz}
                  onChangeText={(text) => {
                    handleInputChange(item.path ? item.path : item.name, text);
                  }}
                  item={item}
                />
              ) : item.title === "Ort" ? (
                <FormCardFieldFilled
                  data={userData.stadt}
                  onChangeText={(text) => {
                    handleInputChange(item.path ? item.path : item.name, text);
                  }}
                  item={item}
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
                  onChangeText={(text) =>
                    handleInputChange(item.path ? item.path : item.name, text)
                  }
                />
              )}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </>
      )}
      {item.type === "boolean" && (
        <BouncyCheckbox
          onPress={(isChecked) =>
            handleInputChange(item.path ? item.path : item.name, isChecked)
          }
        />
      )}

      {(item.type === "integer" || item.type === "number") && (
        <>
          {item.title === "Tag (ohne Monat und Jahr)" ? (
            <FormCardFieldFilled
              data={userData.geburtstagTag}
              onChangeText={(text) => {
                handleInputChange(item.path ? item.path : item.name, text);
              }}
              item={item}
            />
          ) : item.title === "Monat" ? (
            <FormCardFieldFilled
              data={userData.geburtstagMonat}
              onChangeText={(text) => {
                handleInputChange(item.path ? item.path : item.name, text);
              }}
              item={item}
            />
          ) : item.title === "Jahr" ? (
            <FormCardFieldFilled
              data={userData.geburtstagJahr}
              onChangeText={(text) => {
                handleInputChange(item.path ? item.path : item.name, text);
              }}
              item={item}
            />
          ) : (
            <TextInput
              placeholder={item.title}
              autoCompleteType="text"
              keyboardType="numeric"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={(text) =>
                handleInputChange(item.path ? item.path : item.name, parseInt(text))
              }
            />
          )}
        </>
      )}

      {item.type === "object" &&
        item.properties.map((prop, index) => (
          <Item
            key={index}
            item={prop}
            backgroundColor={{ backgroundColor }}
            textColor={"blue"}
          />
        ))}
      {item.array === true && (
        <TextInput
          placeholder={item.title}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange(item.path, ["123", text])}
        />
      )}
    </Animated.View>
  )};

  const countFObjects = (data) => {
    let count = 0;
    let countArray = []
  
    if (data && data.properties) {
      data.properties.forEach((property) => {
        if (property.required == true) {
          count++
          countArray.push(property.path? property.path : property.name)
        }
        if (property.type === "object" && property.name.startsWith("G")) {
          const { count: subCount, countArray: subCountArray } = countFObjects(property);
          count += subCount;
          countArray = countArray.concat(subCountArray);
        }
      });
    }
  
    return  { count, countArray }
  };
  // Aufruf der Funktion
  const totalFObjects = countFObjects(data);
  console.log("totalFObjects: " + JSON.stringify(totalFObjects))

  const renderItem = ({ item, index }) => {
    const backgroundColor = colorEnum.aufenthaltsTitelcolor;
    const color = colorEnum.primary;

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        index = {index}
      />
    );
  };

  const collectData = () => {
    let count = 0;
    console.log(data.properties)

    Object.keys(formDataRef.current).forEach((key) => {
      console.log("Key: " + key)
      const value = formDataRef.current[key];
      console.log(value)
      console.log("totalFObjects.countArray[key]: " +totalFObjects.countArray.includes(key) + "value: " + value)
      if (totalFObjects.countArray.includes(key) && value || value == false) {
        console.log("moin")
        count++;
      }
    });
  
    console.log(count)
    console.log(totalFObjects)
    if (count == totalFObjects.count) {
      console.log(data.required)
      if(data.required){
        countRequiredCardsChecked(++requiredCardreqCount)
      }
      setBackground("lightgreen");
      fillAntrag(formDataRef.current);
    } else {
      setBackground("lightcoral");
      Alert.alert("Fehler", "Bitte füllen Sie alle Pflichtfelder aus.");
    }
  
    console.log("Gesammelte Daten:", formDataRef.current);
    // Hier kannst du weitere Aktionen ausführen, z.B. Daten speichern, usw.
  };
  
  return (
    <>
      <Animated.View
      style={{
        ...styles.container,
        opacity: fadeAnim, // Animate the opacity property
      }}
    >
        <View style={{ alignItems: "center", padding: 15 }}>
          <Text style={[styles.titleHead]}>{data.title}</Text>
          <Text style={[styles.pflichtkarte, { color: "red", textDecorationLine: "underline" }]}>{data.required ? "(Pflichtkarte)" : null}</Text>
        </View>
        <FlatList
          style={styles.flatlist}
          data={data.properties}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={{ alignItems: "center", padding: 30 }}>
          <Button label="speichern" onPress={collectData} />
        </View>
      </Animated.View>
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
  pflichtfeld: {
    fontSize: 10,
    fontWeight: "bold",
  },
  pflichtkarte: {
    fontSize: 14,
    fontWeight: "bold",
  },
  titleHead: {
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  description: {
    fontSize: 12,
    // fontWeight: "bold",
    padding: 0,
  },
  flatlist: {
    overflow: "hidden",
  },
});
