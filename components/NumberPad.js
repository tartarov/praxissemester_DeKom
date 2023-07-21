import React, {
    useState,
  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colorEnum from './DeKomColors';

export default function NumberPad() {
    const [enteredNumbers, setEnteredNumbers] = useState("");

    const numberPad = [
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "0" },
      ];

      const handleNumberPress = (number) => {
        setEnteredNumbers(enteredNumbers + number);
      };
    
      const handleBackspace = () => {
        setEnteredNumbers(enteredNumbers.slice(0, -1));
      };

    return (
        <View style={styles.numberPad}>
        {numberPad.map((button) => (
          <TouchableOpacity
            key={button.value}
            style={styles.numberPadButton}
            onPress={() => handleNumberPress(button.value)}
            disabled={enteredNumbers.length === 10}
          >
            <Text style={styles.numberPadButtonText}>{button.value}</Text>
          </TouchableOpacity>
        ))}
         <TouchableOpacity
          style={styles.backspaceButton}
          onPress={handleBackspace}
        >
          <Text style={styles.backspaceButtonText}>{"<"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colorEnum.quartiary,
      position: "absolute",
      top: 500,
      bottom: 0,
      left: 0,
      right: 0,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    numberPad: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 30,
    },
    numberPadButton: {
      width: 50,
      height: 50,
      borderRadius: 40,
      margin: 10,
      backgroundColor: "#E2E8ED",
      justifyContent: "center",
      alignItems: "center",
    },
    numberPadButtonText: {
      fontSize: 24,
      color: "#000000",
    },
    backspaceButton: {
      width: 50,
      height: 50,
      borderRadius: 40,
      margin: 10,
      backgroundColor: "#E2E8ED",
      justifyContent: "center",
      alignItems: "center",
    },
    backspaceButtonText: {
      fontSize: 24,
      color: "#000000",
    },
  });
  