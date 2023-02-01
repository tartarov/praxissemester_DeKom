import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import InputFeld from "../../components/InputFeld";
import ZahlAuswahl from "../../components/ZahlAuswahl";
//Dion
function ErteilungScreen(){
//missing check box for the confirmation if you want it sent
//Missing 
//then this bekomes editable
//continue basicly needs nothing because then this is finished



    return(
       <View style={styles.screen}>
        <View style={styles.headerContainer}>
            <Text style={styles.logo}>|Dekom</Text>
        </View>
        <InputFeld/>
        {/* text = Wie viele Exemplare des Führungszeugnisses benötigen Sie?, min = 1, max = 10 */}
        <View style={styles.container}>
            <ZahlAuswahl
            text={"Wie viele Exemplare des Führungszeugnisses benötigen Sie?"}
            minNumber={1}
            maxNumber={10}
            />
        </View>
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
    buttonContainer : {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    headerContainer : {
        height: 50,
        flexDirection: 'row',
       // justifyContent: 'space-between',
        marginTop: 10,
    },
    logo : {
        fontWeight: 'bold',
        fontSize: 38,
        marginLeft: 20,
    }
});

export default ErteilungScreen;