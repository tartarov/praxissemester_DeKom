import {View,StyleSheet,Text, Image} from 'react-native';
import WeiterButton from '../../components/WeiterButton';

function ZahlungsScreen({navigation}){

    return(
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>|DeKom </Text>
                <WeiterButton onPress={() => {navigation.navigate("ExportPDFTestScreen");}}>weiter</WeiterButton>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/images/paypal-logo.jpeg')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen : {
        color: '#1CA352'
    },
    headerContainer: {
        marginTop: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 26,
        marginLeft:  20,
        marginBottom: 25
    },
    imageContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
    }


});

export default ZahlungsScreen;