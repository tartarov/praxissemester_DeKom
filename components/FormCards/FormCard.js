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

function FormCard({ data, userData }) {
  const { fillAntrag } = useContext(AntragContext);
  const formDataRef = useRef({});
  const [background, setBackground] = useState(colorEnum.aufenthaltsTitelcolor);

  console.log("Nutzerdaten in FormBLocks: " + JSON.stringify(userData));
  console.log("formData in FormBLocks: " + JSON.stringify(data));

  const initializeFormData = (data, userData) => {
    if (data && data.properties) {
      data.properties.forEach((property) => {
        if (property.type) {
          if (property.type.startsWith("b")) {
            formDataRef.current[
              property.path ? property.path : property.name
            ] = false;
          }
          if (property.type.startsWith("s") || property.type.startsWith("n")) {
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
          if (property.title == "Staatsangehörigkeit") {
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

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <View style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>
        {[item.title, item.required ? " (Pflichtfeld)" : null]}
      </Text>
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
    </View>
  );

  const countFObjects = (data) => {
    let count = 0;

    if (data && data.properties) {
      data.properties.forEach((property) => {
        if (
          property.type === "string" ||
          property.type === "boolean" ||
          property.type === "integer" ||
          property.type === "number" ||
          property.type === null
        ) {
          count++;
        }
        if (
          property.type === "object" && property.name
            ? property.name.startsWith("G")
            : null
        ) {
          count += countFObjects(property);
        }
      });
    }

    return count;
  };

  // Aufruf der Funktion
  const totalFObjects = countFObjects(data);

  const renderItem = ({ item }) => {
    const backgroundColor = colorEnum.aufenthaltsTitelcolor;
    const color = colorEnum.primary;

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const collectData = () => {
    if (Object.keys(formDataRef.current).length == totalFObjects) {
      setBackground("lightgreen");
      fillAntrag(formDataRef.current);
    } else {
      setBackground("lightcoral");
      Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
    }

    console.log("Gesammelte Daten:", formDataRef.current);
    // Hier kannst du weitere Aktionen ausführen, z.B. Daten speichern, usw.
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: background }]}>
        <View style={{ alignItems: "center", padding: 15 }}>
          <Text style={[styles.titleHead]}>{data.title}</Text>
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
