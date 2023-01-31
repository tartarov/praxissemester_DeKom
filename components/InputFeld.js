import {StyleSheet, TextInput, View, CheckBox, Text} from 'react-native';
import PrimaryButton from './PrimaryButton';
import React, {useState, useDebugValue} from 'react';

//add all Navigation later

function InputFeld(props){

    const [text,onChangeText] = React.useState("Useless Text");

    return(
        <View>
                <View style={styles.shownElement}>
                    <TextInput
                    editable={props.editableBoolean}
                    style={[styles.inputField, props.editableBoolean ? styles.editInput : styles.staticInput]}
                    onChangeText={onChangeText}
                    placeholder={props.placeholderText}
                    />
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