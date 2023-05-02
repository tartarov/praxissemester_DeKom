import * as React from "react";
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
} from "react-native";
import { dataSample } from "../../data/DataSample.js";
import WalletHandler from "../../components/WalletHandler.js";
import { useRef, useState, useContext, useEffect } from "react";
import Paginator from "../../components/Paginator.js";
import { DataContext } from "../../context/DataContext";
import ModalTester from "../Modals/GeertingsModal.js";
import Loader from "../../components/animations/Loader.js";
import { Header } from "../../components/Header";
import BottomDrawerScreen from "../../components/BottomDrawer.js";
import { Modal } from "../../components/Modal";
import Button from "../../components/Buttons/Button.js";

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

  useEffect(() => {
    setIsLoading(true);
    getWalletData();
    setIsLoading(false);
  }, []);

  const toggleModal = () => {
    setModalVisible(() => !isModalVisible);
  };

  function DocumentList() {
    const handleItemPress = ({ item }) => {
      console.log(item.title);
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
                onPress={() => handleItemPress({ item })}
                onLongPress={() => {
                  console.log("pressed"), Vibration.vibrate(100), Alert.alert("Willst du die Daten bearbeiten?");
                }}
              >
                <View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                  <View style={styles.documentContainer}>
                    <WalletHandler data={item} />
                  </View>
                </View>
              </Pressable>
            )}
            keyExtractor={(data) => data.title}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
          />
        </View>

        <Paginator data={data} scrollX={scrollX} />

        <View style={{ flex: 1 }}>
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
      {isLoading ? <Loader /> : <ModalTester />}
      <BottomDrawerScreen navigation={navigation} icon />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#2C3639",
    // marginTop:10
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  documentContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    height: ITEM_WIDTH * 0.8,
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
    marginLeft: ITEM_WIDTH / 9,
    marginRight: ITEM_WIDTH / 9,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#DCD7C9",
  },
  text: {
    fontWeight: "500",
    fontSize: 24,
    fontFamily: "Nexa-ExtraLight",
    color: "#3F4E4F",
  },
});
