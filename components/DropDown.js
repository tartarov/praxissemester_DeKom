import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import imagesPath from '../constants/imagesPath';

const DropDown = ({data = [],value = {}, onSelect = () => {} }) => {

    console.log("value", !!value)

    return (
        <View style={StyleSheet.container}>
            <TouchableOpacity style={styles.dropDownStyle} activeOpacity={0.8}>
                <Text>{!!value? value.name: 'Choose an option'}</Text>
                <img  style={{width: 25, height: 25}} src={imagesPath.icDropDown}/>
            </TouchableOpacity>
            
            {data.map((val,i)=>{
                return(
                    <TextInput key={String(i)} placeholder={val.name}></TextInput>
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    dropDownStyle:{
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 8,
        borderRadius: 6,
        minHeight: 42,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems: 'center'
    }
});

export default DropDown