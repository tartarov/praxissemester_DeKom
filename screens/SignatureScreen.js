import React, {useRef, useState} from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity, Text, ScrollView, View, Alert} from 'react-native';
import {SignatureView} from 'react-native-signature-capture-view';
import ButtonGhost from "../components/ButtonGhost";

const SignatureCaptures = ({navigation}) => {
  const signatureRef = useRef(null);
  const [text,setText] = useState('')

  const alertNav =()=>{
    if(alert("Your signature has been saved!")){navigation.navigate('Menü')}
  }

  return (
    <>
      <StatusBar barStyle="dark-content" style={{paddingTop:100}}/>
      <SafeAreaView style={{ flex: 1, paddingTop:100}}>
        <SignatureView
        style={{
          borderWidth:2,
          height:250,
        }}
        
          ref={signatureRef}
          // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
          onSave={(val) => {
            //  a base64 encoded image
            console.log('saved signature')
            console.log(val);
            setText(val)
           
          }}
          onClear={() => {
            console.log('cleared signature')
            setText('')
          }}
        />
        <View style={{flexDirection: 'row', justifyContent:'center', height: 50}}>
        <TouchableOpacity
        style={{ justifyContent:'center',alignItems:'center', flex:1}}
          onPress={() => {
            signatureRef.current.clearSignature(); Alert.alert("Gelöscht.","Deine Signatur wurde gelöscht.")
          }}>
          <Text>Löschen</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={{ justifyContent:'center',alignItems:'center', flex:1}}
          onPress={() => {
            signatureRef.current.saveSignature(); Alert.alert("Gespeichert!","Deine Signatur wurde gepeichert.")
          }}>
          <Text>Speichern</Text>
        </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent:'center', height: 50, paddingTop:50}}>
        <ButtonGhost
          title="Back"
          label="zurück"
            onPress={() => {navigation.navigate("Menü");
          }}
        />
        </View>
       
        <ScrollView style={{flex:1,margin: 20, paddingTop:50}}>
          <Text numberOfLines={10} ellipsizeMode='tail'>{text}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignatureCaptures;