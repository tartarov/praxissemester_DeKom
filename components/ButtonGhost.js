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
        backgroundColor: '#d2d8db',
        borderWidth:2,
        borderColor: '#223e4b'
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: '#223e4b', textTransform: 'uppercase' }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}