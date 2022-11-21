import React, { useRef, useState } from 'react';
import {ActivityIndicator, Text, View, StyleSheet, Modal, Pressable } from 'react-native'; //some imports not in use (yet)
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button.js';
import TextInput from '../components/TextInput.js';

const LoginSchema = Yup.object().shape({
  id: Yup.string()
  .min(8, 'Too Short!')
  .max(8,'Too Long!')
  .required('Required'),
  pin: Yup.string()
    .min(6, 'Too Short!')
    .max(6, 'Too Long!')
    .required('Required')
});



export default function Login({navigation}) {

  let resp; 
  let data;
  let result;  
  let obj; 

  const { handleChange, handleSubmit, handleBlur, values,  errors, touched } =  useFormik({
    validationSchema: LoginSchema,
    initialValues: { id: '', pin: '' },
    onSubmit: values => {
     fetchData({navigation})
    //  alert(`Id: ${values.id}, Pin: ${values.pin}`)
    }
  });

  

  const fetchData = async () => {
    resp = await fetch("http://localhost:3000/testdb.userdaten"); //"http://93.132.35.91:3000/testdb.userdaten"
    data = await resp.json();
    result = JSON.stringify(data);
    obj = JSON.parse(result);
    console.log(obj.some(item => item.PIN === values.pin));
    if(obj.some(item => item.PIN === values.pin)){
    //  modalView();
      alert('You are authorized!' + '\n' + 'Welcome to deKom!')
      navigation.navigate('SignUp');
    } else{
      alert('PIN incorrect. Please try again.')
    }
  };

  const pin = useRef(null);

  return (
    
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: '#223e4b', fontSize: 40, fontWeight: 'bold' }}>
        DeKom.
      </Text>
      <Text style={{ color: '#223e4b', fontSize: 10, fontWeight: 'light', marginBottom: 100 }}>
        All bueraucracies. One app.
      </Text>
      <View style={{ paddingHorizontal: 32, marginBottom: 36, width: '100%' }}>
        <TextInput
          icon="user"
          placeholder="Enter your ID"
          autoCapitalize="none"
          autoCompleteType="cc-number"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange('id')}
          onBlur={handleBlur('id')}
          error={errors.id}
          touched={touched.id}
          onSubmitEditing={() => pin.current?.focus()}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 36, width: '100%' }}>
        <TextInput
          icon="key"
          placeholder="Enter your PIN"
          secureTextEntry
          autoCompleteType="password"
          keyboardType="number-pad"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          onChangeText={handleChange('pin')}
          onBlur={handleBlur('pin')}
          error={errors.pin}
          touched={touched.pin}
          ref={pin}
          onSubmitEditing={() => handleSubmit()}
        />

        
      </View>
      <Button label='Login' onPress={handleSubmit} />
    </View>
  );
}

