import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import ModalTester from "../screens/GeertingsModal"
import { Modal } from './Modal';
import React, { useState, useContext, useEffect } from "react";
import Button from './Button';


const { width } = Dimensions.get('screen');

function NotificationButton({onPress}){
    return (
    <View style={styles.container}>
      <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer}   onPress={onPress}
      android_ripple={{color: '#23619A'}}>
         <Ionicons name="notifications" size={12} color="black" />
      </Pressable>
    </View>
    );
}

export default NotificationButton;

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        marginTop: 15,
    },
    buttonInnerContainer:{
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 16,
        elevation: 6,
    },
    pressed: {
        opacity: 0.50,
    }

});