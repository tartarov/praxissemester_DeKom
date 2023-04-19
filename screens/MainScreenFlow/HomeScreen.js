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
} from "react-native";
import { dataSample } from "../../data/DataSample.js";
import WalletHandler from "../../components/WalletHandler.js";
import PrimaryButton from "../../components/Buttons/PrimaryButton.js";
import { useRef, useState, useContext, useEffect } from "react";
import Paginator from "../../components/Paginator.js";
import { DataContext } from "../../context/DataContext";
import ModalTester from "../Modals/GeertingsModal.js";
import Loader from "../../components/animations/Loader.js";
import { Header } from "../../components/Header";

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


  useEffect(() => {
    setIsLoading(true);
    getWalletData();
    setIsLoading(false);
  }, []);

  function DocumentList() {
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
                onPress={() => {
                  console.log("Hello, ! was clicked!" + item.title);
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
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation ={navigation} />
      {isLoading == true ? <Loader /> : <DocumentList />}

      <View style={styles.buttonContainer}>
        <PrimaryButton
          children={"Antrag hinzufügen"}
         onPress={() => navigation.navigate("Dokumente")}
        />
        <PrimaryButton
          children={"Ausweis hinzufügen"}
          onPress={() => navigation.navigate("ScreenDoesNotExist")}
        />
      </View>
      <ModalTester/>
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
    marginTop: 30,
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 160,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3F4E4F",
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginLeft: ITEM_WIDTH/9,
    marginRight: ITEM_WIDTH/9,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#DCD7C9",
  },
  text: {
    fontWeight: "500",
    fontSize: 24,
    color: "#3F4E4F",
  },
});
