import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import colorEnum from '../DeKomColors';
import React from 'react';


const { width } = Dimensions.get('screen');

function WeiterButton({children, onPress}){
    return (
    <View style={styles.buttonOuterContainer}>
      <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer} onPress={onPress} 
      android_ripple={{color: '#23619A'}}>
         <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
    );
}

export default WeiterButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderColor: "#fff",
       // borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 10,
        marginRight: 25,
        marginTop: 8,
        overflow: 'hidden',
        width: 100,
    },
    buttonInnerContainer:{
        backgroundColor: colorEnum.tertiary,
    //    paddingVertical: 2,
    //    paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: colorEnum.quartiary,
        textAlign: 'center',
        padding: 6,
    },
    pressed: {
        opacity: 0.75,
    }

});