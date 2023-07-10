import React, {useCallback,} from "react";
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
  useWindowDimensions
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


const { width } = Dimensions.get("screen");

const DATA = dataSample;

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;

function HomeScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);
  const { data, getWalletData } = useContext(DataContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [hasNfc, setHasNFC ] = useState(null);

  const { height } = useWindowDimensions();
 

  const AntragListeRef = useRef(null);

  const openAntragListe = useCallback(() => {
    console.log("triggered")
    AntragListeRef.current.expand();
  }, []);

  const closeHandler = useCallback(() => {
    AntragListeRef.current.close();

  }, []);

  useEffect(() => {
    setIsLoading(true);
    getWalletData();
    setIsLoading(false);
  }, []);


  const toggleModal = () => {
    setModalVisible(() => !isModalVisible);
  };

  function DocumentList () {

    const handleItemPress = ({ item }) => {
      setSelectedItemIndex(item.title);
      setModalVisible(true);
    };

    return (
      <>
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
                onPress={() => handleItemPress({ item })} // handleItemPress({ item }
                onLongPress={() => {
                  console.log("pressed"), Vibration.vibrate(1000), Alert.alert("Willst du die Daten bearbeiten?");
                }}
              >
                <View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                  <View style={styles.documentContainer}>
                    <WalletHandler data={item} refrence={AntragListeRef} />
                  </View>
                </View>
              </Pressable>
            )}
            keyExtractor={(data) => data.title}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {useNativeDriver: false}
            )}
          />
        </View>

        <Paginator data={data} scrollX={scrollX} />

        <View>
          <Modal isVisible={isModalVisible}>
            <Modal.Container>
              {!data.length ? (
                <Loader />
              ) : (
                <Modal.Header
                  title={selectedItemIndex}
                />
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
    marginTop: ITEM_HEIGHT * 0.1,
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 60,
  },
  textContainer: {
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
  text: {
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "Nexa-ExtraLight",
    color: "#2C3639",
  },
});
