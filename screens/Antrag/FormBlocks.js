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
import PrimaryButton from "../../components/Buttons/PrimaryButton.js";
import AntragReady from "../../components/AntragReadyBottomSheet.js";

const { width } = Dimensions.get("screen");


const DATA = dataSample;

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;



function FormBlocks({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {
    isLoading,
    fillAntrag,
    formData,
    getContentFormBlock,
    createNestedObject,
    sendAntrag,
    contentInsideBlock,
    formBlockAttributes,
    totalCount,
  } = useContext(AntragContext);
  const { data, getWalletData } = useContext(DataContext);
  const { height } = useWindowDimensions();
  const antragdetail = useRef(null);

  useEffect(() => {
    getContentFormBlock();
  }, []);

console.log("formData im FormBlocks: " + formData)

  const formBlockArray = Array.from(
    { length: contentInsideBlock.length },
    (_, index) => index + 1
  );

  if (contentInsideBlock.length != 0 && contentInsideBlock != null) {
    return (
      <SafeAreaView style={styles.container}>
    {/*}    {Object.keys(formData).length >= contentInsideBlock.length ? ( */}
          <PrimaryButton
            onPress={() => {
              sendAntrag(formData, antragdetail);
            }}
          >
            Absenden
          </PrimaryButton>
      {/*}  ) : null} */}


          <View style={styles.flatListContainer}>
            {isLoading ? (
              <Loader />
            ) : (
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
                        Alert.alert(
                          "Willst du diesen Daten bearbeiten?" + item
                        );
                    }}
                  >
                    <View>
                      <View style={styles.textContainer}>
                        {/*}   <Text style={styles.text}>{item.title}</Text> */}
                      </View>
                      <View style={styles.documentContainer}>
                        <FormCard
                          data={contentInsideBlock[index]}
                          attributes={formBlockAttributes}
                        />
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
            )}
          </View>
          <Paginator data={contentInsideBlock.length} scrollX={scrollX} />
          <AntragReady activeHeight={height * 0.6} ref={antragdetail} />
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
    flexDirection: "row",
  },
  flatListContainer: {
    height: ITEM_WIDTH * 1.7,
    marginTop: ITEM_HEIGHT * 0.08,
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
