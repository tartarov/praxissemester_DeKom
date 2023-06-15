import React, { Component, useCallback, forwardRef, useImperativeHandle } from 'react';
import {StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import CustomText from './Font';
import InputFeld from './InputFeld';
import LogoText from './LogoFont';
import TextInputBlack from './TextInputBlack';

const BottomSheet = forwardRef(({activeHeight},ref) => {
    const height = useWindowDimensions().height
    const topAnimation = useSharedValue(height);
    const animationStyle = useAnimatedStyle(() =>{
        const top = topAnimation.value;
        return{
            top,
        }
    });


    const expand= useCallback(()=>{
        'worklet'
        topAnimation.value = withSpring(activeHeight,{
            damping:100,
            stiffness:400
        });
    },[])

    const close = useCallback(()=>{
        'worklet'
        topAnimation.value = withSpring(height, {
            damping:100,
            stiffness:400
        })
    })

    useImperativeHandle(
        ref, 
        () =>({
        expand,
        close,
        }), 
        [expand, close],
    )


    return (
      <Animated.View style={[styles.container, animationStyle]}>
        <LogoText style={{fontSize: 30, alignSelf: 'center', paddingVertical: 25, color:"#2C3639"}}> Pleaser enter your PIN </LogoText>
        <View
            style={{ paddingHorizontal: 32, marginBottom: 0, width: "100%", paddingTop:50 }}
          >
        <TextInputBlack
         style={{ color: "#3F4E4F" }}
         icon="key"
         placeholder="Enter your PIN"
         secureTextEntry
         autoCompleteType="password"
         keyboardType="number-pad"
         autoCapitalize="none"
         keyboardAppearance="dark"
         returnKeyType="go"
         returnKeyLabel="go"
        ></TextInputBlack>
        </View>
      </Animated.View>
    );
});

export default BottomSheet;

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#DCD7C9",
        position: "absolute",
        top: 500,
        bottom:0,
        left:0,
        right:0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,

    }
})