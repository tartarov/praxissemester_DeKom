import React, { useCallback } from "react";
import {
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Vibration,
  Alert,
  useWindowDimensions,
  SectionList,
} from "react-native";
import { dataSample } from "../../data/DataSample.js";
import WalletHandler from "../../components/WalletHandler.js";
import { useRef, useState, useContext, useEffect } from "react";
import Paginator from "../../components/Paginator.js";
import { DataContext } from "../../context/DataContext";
import Loader from "../../components/animations/Loader.js";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import Button from "../../components/Buttons/Button.js";
import { ScrollView } from "react-native-gesture-handler";
import AntragContext from "../../context/AntragContext.js";
import AntragHandler from "../../components/Antraghandler.js";
import PaginatorDark from "../../components/PaginatorDark.js";
import colorEnum from "../../components/DeKomColors.js";
import FormCard from "../../components/FormCards/FormCard.js";

const { width } = Dimensions.get("screen");

const DATA = dataSample;

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;

function FormBlocks({navigation}) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const {isLoading, formBlock, getFormBlocksCount, getContentFormBlock, contentInsideBlock, formBlockAttributes } =
    useContext(AntragContext);
    const { data, getWalletData } = useContext(DataContext);

    useEffect( ()=>{
         getContentFormBlock()
        if(contentInsideBlock){
         console.log("contentInsideBlock in FORMBLOCK: " + JSON.stringify(contentInsideBlock))
         const keys = Object.keys(contentInsideBlock);
         console.log("keys[0]: " + keys[0])
         const firstArrayKey = keys[0];
         const firstArray = contentInsideBlock[firstArrayKey]
         console.log("Das erste Array:", firstArray)
        }
    },[])


       const formBlockArray = Array.from({ length: formBlock }, (_, index) => index + 1);


     

if(formBlock != 0 && contentInsideBlock != null){
    console.log("contentInsideBlock HIHIHAHA:  " + JSON.stringify(contentInsideBlock))
  return (
    <SafeAreaView>
               
               <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          bounces={true}
          decelerationRate={"fast"}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX} } }],
            { useNativeDriver: false }
          )}
        >
            <View style={styles.flatListContainer}>
              <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={true}
                snapToAlignment="start"
                decelerationRate={"fast"}
                data={formBlockArray}
                renderItem={({ item, index }) => (

                  <Pressable
                  //  onPress={() => handleItemPress({ item })}
                    onLongPress={() => {
                      console.log("pressed"),
                        Vibration.vibrate(100),
                        Alert.alert("Willst du diesen Daten bearbeiten?" + item);
                    }}
                  >
                    <View>
                      <View style={styles.textContainer}>
                     {/*}   <Text style={styles.text}>{item.title}</Text> */}
                      </View>
                      <View style={styles.documentContainer}>
                        <FormCard data={contentInsideBlock[Object.keys(contentInsideBlock)[index]]} attributes = {formBlockAttributes} />
                      </View>
                    </View>
                  </Pressable>
                )}
                keyExtractor={(data) => data.title}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
              />
            </View>
        <Paginator data={formBlock} scrollX={scrollX} /> 
        </ScrollView>
    </SafeAreaView>
  );
                }
}

export default FormBlocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorEnum.primary,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  documentContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    height: ITEM_WIDTH * 1.8,
    marginTop: ITEM_HEIGHT * 0.05,
  },
  flatListContainer2: {
    height: ITEM_WIDTH * 1.6,
    marginTop: ITEM_HEIGHT * 0.05,
    marginBottom: 0,
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 60,
  },
  /*textContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3F4E4F",
    marginLeft: ITEM_WIDTH / 11,
    marginRight: ITEM_WIDTH / 9,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#DCD7C9",
  },
  */
  text: {
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "Nexa-ExtraLight",
    color: colorEnum.primary,
  },
});
