import LottieView from 'lottie-react-native';
import { useRef, useState, useContext, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text
  } from "react-native";

export default function checkmarker({navigation}) {

    return (
    <View style={styles.animationContainer}>
      <LottieView
        loop={true}
        onAnimationFinish={() => navigation.navigate("MainScreen")}
        autoPlay
        //ref={animation}
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#eee1',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/checkmark.json')}
      />
      <View >
        <Text style= {{fontSize: 18, fontWeight: "light", color: "#223e4b", marginTop: 40}}>Tut uns leid, wir arbeiten daran.</Text>
      </View>  
       <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
         marginTop: 80
       }}
     >
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