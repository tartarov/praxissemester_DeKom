import * as React from 'react';
import {StatusBar,Image,FlatList,Dimensions,Animated,Text,View,StyleSheet,SafeAreaView, Button,} from 'react-native';
import {FlingGestureHandler, Directions, State,} from 'react-native-gesture-handler';
import {dataSample} from '../data/DataSample.js';
import OverflowItems from '../components/OverFlowItems.js';
import WalletHandler from '../components/WalletHandler.js';
import PrimaryButton from '../components/PrimaryButton.js';
import NotificationButton from '../components/NotificationButton';


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
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar />
          <View style={styles.headerContainer}>
            <Text style={styles.logo}>|DeKom </Text>
            <NotificationButton />
          </View>
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
              paddingBottom: 0,
              marginTop: 50,
              marginBottom: 50,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >

                  <WalletHandler data={item}/>
                 {/* <Ausweis data={item} ITEM_WIDTH={ITEM_WIDTH} ITEM_HEIGHT={ITEM_HEIGHT}/> */} 



                  {/*}
                  <Image
                    source={{ uri: item.poster }}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14,
                    }}
                  /> */}
                </Animated.View>
              );
            }}
          />
         {/* <OverflowItems data={data} scrollXAnimated={scrollXAnimated}/> */} 
         <View style={styles.buttonContainer}>
         <PrimaryButton children={'Antrag hinzufügen'} onPress={addAntrag} />
         <PrimaryButton children={'Ausweis hinzufügen'} onPress={addAntrag} />
         </View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
   
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
});