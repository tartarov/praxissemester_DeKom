import React, { useRef } from 'react';
import { Text, View } from 'react-native';
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

export default function Login() {

  const { handleChange, handleSubmit, handleBlur, values,  errors, touched } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { id: '', pin: '' },
    onSubmit: values => { 
      fetchData();
      alert(`Id: ${values.id}, Pin: ${values.pin}`)
     // console.log();
    }
  });

  const fetchData = async () => {
    const resp = await fetch("http://192.168.20.129:3000/testdb.userdaten");
    const data = await resp.json();
  console.log(data);
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
      <Text style={{ color: '#223e4b', fontSize: 40, fontWeight: 'bold', marginBottom: 16 }}>
        DeKom
      </Text>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
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
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
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
