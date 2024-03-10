import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import TextInput from "./TextInput";
import { SelectList } from "react-native-dropdown-select-list";

function FormCardFieldFilled({ data, onChangeText, item, setSelected }) {
  const [isDisagree, setIsDisagree] = useState(false);

  const handleDisagreePress = () => {
    setIsDisagree(true);
  };

  return (
    <View>
      {isDisagree ? (
        <View>
          {item.enum ? (
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
          ) : (
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
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{data}</Text>
          <TouchableOpacity onPress={handleDisagreePress}>
            <Text style={ {textDecorationLine: "underline"}}>stimmt nicht?</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default FormCardFieldFilled;
