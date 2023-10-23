import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import Loader from './animations/Loader';

export default function CustomText(props) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { fontSize, style, children } = props;

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Nexa-ExtraLight": require("../assets/fonts/Univers 45 Light Regular.otf"),
      });
      console.log("Font loaded!");
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Loader />; // Or any loading indicator
  }

  return (
    <Text style={{ ...style, fontFamily: "Nexa-ExtraLight", fontSize: fontSize }}>
      {children}
    </Text>
  );
};
