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
import FertigeAntragListeIntegrated from "../FertigeAntragListeIntegrated";
import BottomQRCode from "../../components/BottomQRCode.js";
import { ScrollView } from "react-native-gesture-handler";
import AntragContext from "../../context/AntragContext.js";
import AntragHandler from "../../components/Antraghandler.js";

const { width } = Dimensions.get("screen");

const DATA = dataSample;

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;

function HomeScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollValue = useRef(new Animated.ValueXY()).current;
  const [isLoading, setIsLoading] = useState(true);
  const { data, getWalletData } = useContext(DataContext);
  const { antragAusstellerDaten, getAntrag, antragFileId } =
    useContext(AntragContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#DCD7C9");
  const [hasNfc, setHasNFC] = useState(null);

  const { height } = useWindowDimensions();

  const AntragListeRef = useRef(null);

  const openAntragListe = useCallback(() => {
    console.log("triggered");
    AntragListeRef.current.expand();
  }, []);

  const closeHandler = useCallback(() => {
    AntragListeRef.current.close();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getWalletData();
    getAntrag();
    setIsLoading(false);
  }, []);

  const toggleModal = () => {
    setModalVisible(() => !isModalVisible);
  };

  const interpolateColorX = scrollX.interpolate({
    inputRange: [0, ITEM_WIDTH],
    outputRange: ["#DCD7C9", "#2C3639"],
    extrapolate: "clamp",
  });

  const interpolateColorY = scrollY.interpolate({
    inputRange: [0, height],
    outputRange: ["#2C3639", "#193326"],
    extrapolate: "clamp",
  });

  const interpolateColorXY = Animated.add(scrollX, scrollY).interpolate({
    inputRange: [
      0,
      ITEM_WIDTH + height,
    ],
    outputRange: ["#DCD7C9", "#193326"],
    extrapolate: "clamp",
  });

  function DocumentList() {
    const handleItemPress = ({ item }) => {
      setSelectedItemIndex(item.title);
      setModalVisible(true);
    };

    console.log(
      "antragAusstellerDaten: " + JSON.stringify(antragAusstellerDaten)
    );

    return (
      <>
       
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={true}
          decelerationRate={"fast"}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX, y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          <Animated.View
            style={[styles.container, { backgroundColor: interpolateColorY }]}
          >
            <View style={styles.flatListContainer}>
              <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={true}
                snapToAlignment="start"
                decelerationRate={"fast"}
                data={data}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => handleItemPress({ item })}
                    onLongPress={() => {
                      console.log("pressed"),
                        Vibration.vibrate(1000),
                        Alert.alert("Willst du die Daten bearbeiten?");
                    }}
                  >
                    <View>
                      <View style={styles.textContainer}>
                     {/*}   <Text style={styles.text}>{item.title}</Text> */}
                      </View>
                      <View style={styles.documentContainer}>
                        <WalletHandler data={item} scrollX = {scrollX} />
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

            <Paginator data={data} scrollX={scrollX} />

            <View style={styles.flatListContainer2}>
              <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={true}
                snapToAlignment="start"
                decelerationRate={"fast"}
                data={antragAusstellerDaten}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => handleItemPress({ item })}
                    onLongPress={() => {
                      console.log("pressed"),
                        Vibration.vibrate(1000),
                        Alert.alert("Willst du die Daten bearbeiten?");
                    }}
                  >
                    <View>
                      <View style={styles.textContainer}>
                     {/*}   <Text style={styles.text}>{item.title}</Text>*/}
                      </View>
                      <View style={styles.documentContainer}>
                        <AntragHandler antragAusstellerDaten={item} scrollY = {scrollY} />
                      </View>
                    </View>
                  </Pressable>
                )}
                // keyExtractor={(antragAusstellerDaten) => antragAusstellerDaten.document.antragFileId}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
              />
            </View>
            <Paginator data={antragAusstellerDaten} scrollX={scrollX} />
            <View style={{ marginTop: 80 }}></View>
          </Animated.View>
        </ScrollView>

        <View>
          <Modal isVisible={isModalVisible}>
            <Modal.Container>
              {!data.length ? (
                <Loader />
              ) : (
                <Modal.Header title={selectedItemIndex} />
              )}
              <Modal.Body>
                <Text
                  style={{
                    alignItems: "center",
                    paddingLeft: 15,
                    color: "#DCD7C9",
                  }}
                >
                  {!data.length ? (
                    <Loader />
                  ) : (
                    `## \nHier sollen die ausführlichen Daten des ${selectedItemIndex}es von ${data[0].document.vorname} stehen.\n##`
                  )}
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button label="Verstanden" onPress={toggleModal} />
              </Modal.Footer>
            </Modal.Container>
          </Modal>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      {isLoading ? <Loader /> : <DocumentList />}
      {/*    {isLoading ? <Loader /> : <ModalTester />}
   {/*   <BottomDrawerScreen navigation={navigation} icon /> */}
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3639",
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
    height: ITEM_WIDTH * 1.6,
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
    color: "#2C3639",
  },
});
