import * as React from 'react';
import {View, StyleSheet, Text } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NumericInput from 'react-native-numeric-input'



export default function FragenScreen() {

    const [state, setState] = React.useState(1);
    console.log(state);

    return (
        
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>|DeKom </Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.logo}>Ergänzende Daten - Angaben zum Führung</Text>
                <View style={[styles.questionContainer, styles.white]}>
                    <Text style={styles.questionText}>Benötigen Sie das Führungszeugnis zur Vorlage bei einer deutschen Behörde?</Text>
                    <View style={styles.checkbox}>
                    <BouncyCheckbox
                        disableText={false}
                        size={25}
                        fillColor="grey"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "green" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ textDecorationLine: "none", fontFamily: "JosefinSans-Regular" }}
                    />
                    </View>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>Benötigen Sie das Führungszeugnis zur Verwendung im Ausland?</Text>
                    <View style={styles.checkbox}>
                    <BouncyCheckbox
                        disableText={false}
                        size={25}
                        fillColor="grey"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "green" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ textDecorationLine: "none", fontFamily: "JosefinSans-Regular" }}
                    />
                    </View>
                </View>
                <View style={[styles.questionContainer, styles.white]}>
                    <Text style={styles.questionText}>Benötigen Sie ein erweitertes Führungszeugnis?</Text>
                    <View style={styles.checkbox}>
                    <BouncyCheckbox
                        disableText={false}
                        size={25}
                        fillColor="grey"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "green" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ textDecorationLine: "none", fontFamily: "JosefinSans-Regular" }}
                    />
                    </View>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>Wie viele Exemplare des Führungszeugnisses benötigen Sie?</Text>
                    <View style={styles.checkbox}>
                    <NumericInput 
                        value={state.value} 
                        onChange={value => setState({value})} 
                        minValue={1}
                        maxValue={10}
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
                        leftButtonBackgroundColor='#Be2525'/>

                    </View>
                </View>
            </View>
            
        
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      bodyContainer: {
        height: 700,
        marginTop: 100,
        backgroundColor: '#9AA6D2',
        flexDirection: 'column',
        maxHeight: 660

      },
      logo: {
        fontWeight: 'bold',
        fontSize: 26,
        marginLeft:  20,
        marginBottom: 25
      },
      label: {
        margin: 8,
      },
      questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
      },
      questionText: {
        fontSize: 17,
        flex: 5,
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        alignSelf: "center"
      },
      checkbox: {
        flex: 2,
        alignSelf: "center",
      },
      white: {
        backgroundColor: '#C0C0C0'
      }
});

