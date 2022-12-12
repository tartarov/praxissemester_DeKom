import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import {AuthContext} from "../context/AuthContext"


export default function Menu () {

    const {logout} = useContext(AuthContext)

    return (
      <View>
        <Text> Menü </Text>
        <Button title = 'logout' onPress = {() => {logout()}}> logout </Button>
      </View>
    );

}
