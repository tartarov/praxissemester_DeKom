import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
//Dion
function ErteilungScreen(){

    return(
       <View>
        
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
        justifyContent: 'space-between',
    },
    logo : {
        fontWeight: 'bold',
        fontSize: 38,
        marginLeft: 20,
    }
});

export default ErteilungScreen;