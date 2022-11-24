import * as React from 'react';
import {StatusBar,Image,FlatList,Dimensions,Animated,Text,View,StyleSheet,SafeAreaView, Button,} from 'react-native';
import {dataSample} from '../data/DataSample.js';
import WalletHandler from '../components/WalletHandler.js';
import PrimaryButton from '../components/PrimaryButton.js';
import NotificationButton from '../components/NotificationButton';
import { useRef, useState } from 'react';
import Paginator from '../components/Paginator.js';


const { width } = Dimensions.get('screen');

const DATA = dataSample;

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;

function addAntrag(){
  console.log('Antrag hinzufügen');
}

function HomeScreen() {
  const data = dataSample;
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  

  return (
        <SafeAreaView style={styles.container}>
          <StatusBar />
          <View style={styles.headerContainer}>
            <Text style={styles.logo}>|DeKom </Text>
            <NotificationButton />
          </View>
          <View style={styles.flatListContainer}>
           <FlatList 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            bounces={false}
            data={data} 
            renderItem={({item, index}) => <View style={styles.documentContainer}><WalletHandler data={item}/></View> } 
            keyExtractor={data => data.title} 
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX }}}],{
              useNativeDriver: false,
            })}
           />
          </View>
           <Paginator data={data} scrollX={scrollX}/> 
         <View style={styles.buttonContainer}>
         <PrimaryButton children={'Antrag hinzufügen'} onPress={addAntrag} />
         <PrimaryButton children={'Ausweis hinzufügen'} onPress={addAntrag} />
         </View>
        </SafeAreaView>
   
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    color: '#1CA352',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 38,
    marginLeft:  20,
    color: '#223e4b',
  },
  documentContainer: {
     width: width,
     justifyContent: 'center',
     alignItems: 'center',
  },
  flatListContainer: {
    height: ITEM_WIDTH * 0.8,
    marginTop: 50,
  },
});