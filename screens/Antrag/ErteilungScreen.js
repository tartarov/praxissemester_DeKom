import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import { Header } from "../../components/Header";
import InputFeld from "../../components/InputFeld";
import ZahlAuswahl from "../../components/ZahlAuswahl";
//Dion
function ErteilungScreen(){

    return(
       <View style={styles.screen}>
      <Header/>
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
    }
});

export default ErteilungScreen;