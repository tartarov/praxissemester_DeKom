import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import colorEnum from '../DeKomColors';


const { width } = Dimensions.get('screen');

function PrimaryButton({children, onPress}){
    return (
    <View style={styles.buttonOuterContainer}>
      <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer} onPress={onPress} 
      android_ripple={{color: colorEnum.quartiary}}>
         <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius:7,
        margin: 10,
        overflow: 'hidden',
        //width: width * 0.5,
        elevation: 5,
    },
    buttonInnerContainer:{
        backgroundColor: colorEnum.tertiary,
        paddingHorizontal: 0,
        paddingTop:0,
        paddingBottom:0
    },
    buttonText: {
        color: colorEnum.primary,
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        fontFamily: 'Nexa-ExtraLight',
    },
    pressed: {
        opacity: 0.75,
    }

});