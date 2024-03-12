import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TextInput from "./TextInput";
import { SelectList } from "react-native-dropdown-select-list";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function FormCardFieldFilled({ data, onChangeText, item, setSelected }) {
  const [isDisagree, setIsDisagree] = useState(false);

  const handleDisagreePress = () => {
    setIsDisagree(true);
  };

  return (
    <View>
      {isDisagree ? (
        <View>
          {item.type === "number" || item.type === "integer" ? (
            // Render TextInput for number or integer type
            <TextInput
              placeholder={item.title}
              autoCompleteType="text"
              keyboardType="numeric"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={(text) => onChangeText(parseInt(text))}
              style={{ paddingRight: 200 }}
            />
          ) : (
            // Render TextInput for other types
            <TextInput
              placeholder={item.title}
              autoCompleteType="text"
              keyboardType="default"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              onChangeText={(text) => onChangeText(text)}
              style={{ paddingRight: 200 }}
            />
          )}
          {/* Render SelectList if item has enum */}
          {item.enum && (
            <SelectList
              placeholder={item.title}
              setSelected={(text) => setSelected(text)}
              save="value"
              searchPlaceholder="suche"
              data={item.enum}
              boxStyles={{
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "black",
              }}
            />
          )}
          {/* Render BouncyCheckbox if item type is boolean */}
          {item.type === "boolean" && (
            <BouncyCheckbox
              onPress={(isChecked) =>
                handleInputChange(item.path ? item.path : item.name, isChecked)
              }
            />
          )}
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{data}</Text>
          <TouchableOpacity onPress={handleDisagreePress}>
            <Text style={{ textDecorationLine: "underline" }}>
              stimmt nicht?
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default FormCardFieldFilled;
