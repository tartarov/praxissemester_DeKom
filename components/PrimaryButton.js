import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';


const { width } = Dimensions.get('screen');

function PrimaryButton({children, onPress}){
    return (
    <View style={styles.buttonOuterContainer}>
      <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer} onPress={onPress} 
      android_ripple={{color: '#23619A'}}>
         <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 9,
        overflow: 'hidden',
        width: width * 0.5,
        elevation: 5,
    },
    buttonInnerContainer:{
        backgroundColor: '#e94832',
        paddingVertical: 1,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    pressed: {
        opacity: 0.75,
    }

});