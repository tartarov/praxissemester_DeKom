import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        height: 50,
        width: 245,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A27B5C', 
       // elevation: 2
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: '#2C3639', textTransform: 'uppercase', fontFamily: "Nexa-Heavy" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}