import {StyleSheet, TextInput, View, CheckBox, Text} from 'react-native';
import PrimaryButton from './PrimaryButton';
import React, {useState, useDebugValue} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//add all Navigation later
let editableValue = false;

function InputFeld(){
    const [text,onChangeText] = React.useState("Useless Text");
    let [isSelected, setSelected] = useState(false);

    const combineMethods = () =>{
        editableValue = !editableValue;
        console.log(editableValue);
        return(setSelected(!isSelected));
    }

    return(
        <View>
            <View style={styles.ViewRow}>
                {/**Text and Checkbox(if sent, and other adress) and Stuff */}
                <BouncyCheckbox
                text='Dokument per Post verschicken lassen'
                textStyle={{textDecorationLine: "none"}}
                fillColor='#014381'
                unfillColor='#FFFFFF'
                isChecked={isSelected}
                onPress={()=> setSelected(!isSelected)}
                style={styles.bouncyCheckboxStyle}
                />
            </View>
            <View style={styles.ViewRow}>
                <BouncyCheckbox
                text='Dokument an abweisende Adresse Schicken'
                textStyle={{textDecorationLine: "none"}}
                fillColor='#014381'
                unfillColor='#FFFFFF'
                isChecked={isSelected}
                onPress={() => combineMethods()}
                style={styles.bouncyCheckboxStyle}
                />
                <View style={styles.shownElement}>
                    <TextInput
                    editable={editableValue}
                    style={[styles.inputField, editableValue ? styles.editInput : styles.staticInput]}
                    onChangeText={onChangeText}
                    placeholder="Adresse der Erteilung"
                    />
                    <PrimaryButton children={'Absenden'}/>
                </View>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
inputField : {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
},
checkBoxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
},
label: {
    margin: 8,
}, 
shownElement: {

},
ViewRow:{
    flexDirection:"row",
    flexWrap:"wrap",
    margin: 8,

},
bouncyCheckboxStyle:{
    color:"#000000",
    alignSelf: "center",
},
editInput:{
    disabled:false,
},
staticInput:{
    disabled:true,
}
});
export default InputFeld;