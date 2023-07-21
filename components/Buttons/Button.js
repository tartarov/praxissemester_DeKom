import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colorEnum from '../DeKomColors';

export default function Button({ label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        height: 50,
        width: 245,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorEnum.tertiary, 
       // elevation: 2
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: colorEnum.primary, textTransform: 'uppercase', fontFamily: "Nexa-Heavy" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}