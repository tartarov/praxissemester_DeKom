import { StyleSheet, Text, View } from 'react-native';
import InputFeld from "../../components/InputFeld";
import ZahlAuswahl from "../../components/ZahlAuswahl";
import React,{useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import PrimaryButton from "../../components/PrimaryButton";
//Dion

let editableValue = false;

function ErteilungScreen(){
//missing check box for the confirmation if you want it sent
//Missing 
//then this bekomes editable
//continue basicly needs nothing because then this is finished
    let [isSelected, setSelected] = useState(false);

    const combineMethods = () =>{
        editableValue = !editableValue;
        console.log(editableValue);
        return(setSelected(!isSelected));
    }

    return(
       <View style={styles.screen}>
        <View style={styles.headerContainer}>
            <Text style={styles.logo}>|Dekom</Text>
        </View>
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
            <InputFeld
                placeholderText='Adresse der Erteilung'
                editableBoolean={editableValue}
            />
        </View>
        <View>
            <ZahlAuswahl
                text={"Wie viele Exemplare des Führungszeugnisses benötigen Sie?"}
                minNumber={1}
                maxNumber={10}
            />
        </View>
        <View style={styles.buttonView}>
            <PrimaryButton children={'Absenden'}/>
        </View>
        {/* text = Wie viele Exemplare des Führungszeugnisses benötigen Sie?, min = 1, max = 10 */}
        
       </View>
    );
}
const styles = StyleSheet.create({
    screen : {
        color: '#1CA352'
    },
    container : {
        flex:1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerContainer : {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    logo : {
        fontWeight: 'bold',
        fontSize: 38,
        marginLeft: 20,
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
    buttonView:{
        marginTop:100,
    }
});

export default ErteilungScreen;