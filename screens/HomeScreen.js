import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
} from "react-native";
import { dataSample } from "../data/DataSample.js";
import WalletHandler from "../components/WalletHandler.js";
import PrimaryButton from "../components/PrimaryButton.js";
import NotificationButton from "../components/NotificationButton";
import { useRef, useState, useContext, useEffect } from "react";
import Paginator from "../components/Paginator.js";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import ModalTester from "./GeertingsModal.js";
import Loader from "../components/Loader.js";

const { width } = Dimensions.get("screen");

const DATA = dataSample;

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;
let isVerifiedVar;
//let ichBinDurch = false

function HomeScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);
  const { isVerified } = useContext(AuthContext);
  const { data, getWalletData } = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    getWalletData();
    setIsLoading(false);
  }, []);

  isVerifiedVar = isVerified;

  function DocumentList() {
    //ichBinDurch = true
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
              <View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.title}</Text>
                </View>
                <View style={styles.documentContainer}>
                  <WalletHandler data={item} />
                </View>
              </View>
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
      <StatusBar />
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>|DeKom. </Text>
        <NotificationButton />
      </View>
      {isLoading == true ? <Loader/> : <DocumentList />}
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
      <ModalTester data={data[0]} />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    color: "#223e4b",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fce9e6",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    marginTop: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 38,
    marginLeft: 20,
    color: "#223e4b",
  },
  documentContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    height: ITEM_WIDTH * 1,
    marginTop: 50,
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 160,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 24,
    color: "#223e4b",
  },
});
