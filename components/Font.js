import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import Loader from './animations/Loader';

export default function CustomText(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Nexa-ExtraLight": require("../assets/fonts/Nexa-ExtraLight.ttf"),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    console.log("Hallo :+)")
    return null
  }

  return (
    <Text style={{ ...props.style, fontFamily: "Nexa-ExtraLight" }}>
      {props.children}
    </Text>
  );
};
