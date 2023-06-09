import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'
import imagesPath from '../constants/imagesPath';
import validationColor from './TextInput'

const DropDown = ({ data = [], value = {}, dropDownName = {}, onSelect = () => { } }) => {

    const [showOption, setShowOption] = useState(false)

    const onSelectedItem = (val) => {
     //   console.log(val)
        setShowOption(false)
        onSelect(val)
    }

    return (
        <View style={StyleSheet.container}>
            <TouchableOpacity
                style={styles.dropDownStyle}
                activeOpacity={1}
                onPress={() => setShowOption(!showOption)}
            >
                <Text style={{color: value ? 'black' : 'rgba(34, 62, 75, 0.7)', paddingHorizontal: 2}}>
                    {!!value ? value?.name : dropDownName}</Text>
                <Image style={{ width: 25, height: 25, rotate: showOption ? '180deg' : '0deg'}}
                    source={imagesPath.icDropDown} />
            </TouchableOpacity>
            {showOption && (<View
            style={{
                width: '100%',
                position: 'absolute',
                marginTop: 55,
                backgroundColor: 'white',
                padding: 8,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: 'black',
                maxHeight: 200,
            }}>
                <ScrollView
                keyboardShouldPersistTaps={"handled"}
                showsHorizontalScrollIndicator={false}>
                {data.map((val, i) => {
                    return (
                        <TouchableOpacity
                            key={String(i)}
                            onPress={() => onSelectedItem(val)}
                            style={{
                                backgroundColor: '#d0d0d0',
                                borderRadius: 8,
                                borderColor: 'black',
                                minHeight: 48,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 2,
                            }}
                        >
                            <Text style={{marginLeft: 8}}>{val.name}</Text>
                        </TouchableOpacity>
                    )
                })}
                </ScrollView>
            </View>)}
        </View>
    );
};

const styles = StyleSheet.create({
    dropDownStyle: {
        zIndex: 20,
        padding: 8,
        borderRadius: 8,
        borderColor: 'black',
        minHeight: 48,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: validationColor,
    }
});

export default DropDown