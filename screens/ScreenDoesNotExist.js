import LottieView from 'lottie-react-native';
import * as React from "react";
import {
    View,
    StyleSheet,
    Text
  } from "react-native";
import Button from "../components/Button.js"
export function ScreenDoesNotExist({navigation}) {
    return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        progress={1}
        //ref={animation}
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/ScreenDoesNotExist.json')}
      />
      <View >
        <Text style= {{fontSize: 18, color: "#223e4b", marginTop: 40}}>Tut uns leid, wir arbeiten daran.</Text>
      </View>  
       <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
         marginTop: 80
       }}
     >
       <Button title='Back to home' label="Zurück zu Home"  onPress={() => navigation.navigate("Home")} />
     </View>
    </View>
    );
  }

  const styles = StyleSheet.create({
    animationContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 60,
    },
  });