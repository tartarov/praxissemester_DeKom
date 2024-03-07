import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
  } from "react-native";

const DateTimePickerModalComponent = ({
  itemName,
  onConfirm,
  onCancel,
}) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const datePickerVisibilityRef = useRef({});
    const showDate = useRef({});
    const [showDateOr, setShowDateOr] = useState("Wähle das Datum aus");
  
    const showDatePicker = (itemName) => {
      console.log("itemName: " + itemName);
      datePickerVisibilityRef.current[itemName] = true;
      setDatePickerVisibility({ ...datePickerVisibilityRef.current });
    };

    const hideDatePicker = (itemName, date) => {
      const dateOnly = new Date(date).toISOString().split("T")[0];
      console.log(dateOnly);
      showDate.current[itemName] = dateOnly;
      setShowDateOr({ ...showDate.current })
      console.log("HEY there :)")
      datePickerVisibilityRef.current[itemName] = false;
      setDatePickerVisibility({ ...datePickerVisibilityRef.current });
    };

  return (
    <TouchableWithoutFeedback onPress={() => showDatePicker(itemName)}>
      <View>
        <Text
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 8,
            margin: 2,
            padding: 13,
          }}
        >
          {showDateOr[itemName]? showDateOr[itemName] : showDateOr }
        </Text>
        <DateTimePickerModal
          isVisible={datePickerVisibilityRef.current[itemName]}
          mode="date"
          onConfirm={(date) => {
            onConfirm(date);
            hideDatePicker(itemName, date);
          }}
          onCancel={onCancel}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DateTimePickerModalComponent;
