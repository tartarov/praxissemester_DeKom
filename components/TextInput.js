import React, { forwardRef } from 'react';
import { TextInput as RNTextInput, View, StyleSheet} from 'react-native';
import { Entypo as Icon } from '@expo/vector-icons';

const TextInput = forwardRef(({ icon, error, touched, ...otherProps }, ref) => {
 const validationColor = !touched ? '#aaa' : error ? '#CC3D3F' : '#223e4b';
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8,
      }}
    >
      <View style={{ padding: 2}}>
        <Icon name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1}}>
        <RNTextInput
          underlineColorAndroid='transparent'
          placeholderTextColor='#DCD7C9'
          ref={ref}
          {...otherProps}
        />
      </View>
    </View>
  );
});

export default TextInput;