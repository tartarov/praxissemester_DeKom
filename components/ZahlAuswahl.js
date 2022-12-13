import { StyleSheet, View, Text } from "react-native";
import React from 'react';
import NumericInput from 'react-native-numeric-input'
import { Colors } from "react-native/Libraries/NewAppScreen";




function ZahlAuswahl (props){
    console.log("Done");
    if(isNaN(props.text) || !isNaN(props.minNumber) || !isNaN(props.maxNumber)){
        return(
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.alertMessage}>Alert Inputtype Wrong</Text>
                </View>
            </View>
        );
    }
    return(
            <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{props.text}</Text>
                    <View>
                    <NumericInput 
                        value={1} 
                        onChange={value => setState({value})} 
                        minValue={props.minNumber}
                        maxValue={props.maxNumber}
                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                        totalWidth={100} 
                        totalHeight={40} 
                        iconSize={20}
                        step={1}
                        valueType='real'
                        rounded 
                        textColor='#00000' 
                        iconStyle={{ color: 'white' }} 
                        rightButtonBackgroundColor='#80BE25' 
                        leftButtonBackgroundColor='#Be2525'
                        />

                    </View>
                </View>

    );
}

styles = StyleSheet.create({
    questionContainer : {
    },
    questionText : {
    },
    mainContainer : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertMessage : {
        flex: 1,
        fontWeight: 'bold',
    },

});

export default ZahlAuswahl;