import React, { forwardRef } from 'react';
import { TextInput as RNTextInput, View, StyleSheet} from 'react-native';
import { Entypo as Icon } from '@expo/vector-icons';

const TextInputBlack = forwardRef(({ icon, error, touched, ...otherProps }, ref) => {
 const validationColor = !touched ? '#2C3639' : error ? '#CC3D3F' : '#3fcc3d';
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 68,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: 2, //StyleSheet.hairlineWidth
        padding: 10,
      }}
    >
      <View style={{ padding: 2}}>
        <Icon name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1}}>
        <RNTextInput
          underlineColorAndroid='transparent'
          placeholderTextColor='#3F4E4F'
          color='#3F4E4F'
          ref={ref}
          {...otherProps}
        />
      </View>
    </View>
  );
});

export default TextInputBlack;