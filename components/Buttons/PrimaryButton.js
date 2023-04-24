import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';


const { width } = Dimensions.get('screen');

function PrimaryButton({children, onPress}){
    return (
    <View style={styles.buttonOuterContainer}>
      <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer} onPress={onPress} 
      android_ripple={{color: '#DCD7C9'}}>
         <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 14,
        margin: 9,
        overflow: 'hidden',
        //width: width * 0.5,
        elevation: 5,
    },
    buttonInnerContainer:{
        backgroundColor: '#A27B5C',
        paddingHorizontal: 32,
        paddingTop:18,
        paddingBottom:18
    },
    buttonText: {
        color: '#DCD7C9',
        textAlign: 'center',
        padding: 10,
        fontSize: 12,
        fontFamily: 'Nexa-ExtraLight',
    },
    pressed: {
        opacity: 0.75,
    }

});