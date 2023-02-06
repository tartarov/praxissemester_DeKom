import * as React from 'react';
import {View, StyleSheet, Text, ScrollView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NumericInput from 'react-native-numeric-input'
import WeiterButton from '../../components/WeiterButton';



export default function FragenScreen({navigation}) {

    const [state, setState] = React.useState(1);
    const [VorlageCheckboxState, setVorlageCheckboxState] = React.useState(false);
    const [AuslandCheckboxState, setAuslandCheckboxState] = React.useState(false);
    const [ErweitertesCheckboxState, setErweitertesCheckboxState] = React.useState(false);

    const antragData = {
      anzahlExemplare: state,
      zurVorlage: VorlageCheckboxState,
      zurVerwendungImAusland: AuslandCheckboxState,
      erweitertes: ErweitertesCheckboxState,
    }
    return (
        
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>|DeKom </Text>
                <WeiterButton onPress={() => {navigation.navigate("StaatsangehoerigkeitsScreen", {antragData});}}>weiter</WeiterButton>
            </View>
           <ScrollView>
            <View style={styles.bodyContainer}>
                <Text style={styles.logo}>Ergänzende Daten - Angaben zum Führungszeugnis</Text>
                <View style={[styles.questionContainer, styles.white]}>
                    <Text style={styles.questionText}>Benötigen Sie das Führungszeugnis zur Vorlage bei einer deutschen Behörde?</Text>
                    <View style={styles.checkbox}>
                    <BouncyCheckbox
                        disableText={false}
                        isChecked={VorlageCheckboxState}
                        size={25}
                        fillColor="#e94832"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "green" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ textDecorationLine: "none", fontFamily: "JosefinSans-Regular" }}
                        onPress={() => setVorlageCheckboxState(!VorlageCheckboxState)}
                    />
                    </View>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>Benötigen Sie das Führungszeugnis zur Verwendung im Ausland?</Text>
                    <View style={styles.checkbox}>
                    <BouncyCheckbox
                        disableText={false}
                        isChecked={AuslandCheckboxState}
                        size={25}
                        fillColor="#e94832"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "green" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ textDecorationLine: "none", fontFamily: "JosefinSans-Regular" }}
                        onPress={() => setAuslandCheckboxState(!AuslandCheckboxState)}
                    />
                    </View>
                </View>
                <View style={[styles.questionContainer, styles.white]}>
                    <Text style={styles.questionText}>Benötigen Sie ein erweitertes Führungszeugnis?</Text>
                    <View style={styles.checkbox}>
                    <BouncyCheckbox
                        disableText={false}
                        isChecked={ErweitertesCheckboxState}
                        size={25}
                        fillColor="#e94832"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "green" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ textDecorationLine: "none", fontFamily: "JosefinSans-Regular" }}
                        onPress={() => setErweitertesCheckboxState(!ErweitertesCheckboxState)}
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
                        totalHeight={30} 
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
            </ScrollView>
            
        
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 50,
        marginBottom: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      bodyContainer: {
        height: 700,
        marginTop: 5,
        backgroundColor: '#eeeeee',
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
        backgroundColor: '#f8c8c1'
      }
});

