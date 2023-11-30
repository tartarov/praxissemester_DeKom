// ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
    console.log(progress)
    if(progress){
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: progress? `${progress}%` : 0 }]} />
      <Text style={styles.progressText}>{Math.floor(progress? progress : null)}%</Text>
    </View>
  );
    }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 0,
    backgroundColor:"grey",
    paddingHorizontal:"0%"
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#B8C7B2',
 //   paddingHorizontal:"10%"
  },
  progressText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
  },
});

export default ProgressBar;