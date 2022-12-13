import {View,StyleSheet} from 'react-native';
import PDF from 'react-native-pdf';
// Dion
function PreviewScreen(){

    return(
        <View style={styles.screen}>
            <View>
                {/* Pdf View not the react-native-pdf, doesnt support expo go*/}
                {/* Fuck it, lets try it anyway */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen : {
        color: '#1CA352'
    },


});

export default PreviewScreen;