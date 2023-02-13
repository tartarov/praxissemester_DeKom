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
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("screen");

const DATA = dataSample;

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;
let isVerifiedVar;
let colors;

async function addAntrag() {
  console.log("Antrag hinzufügen");
  let respAddAntrag = await fetch(
    "http://93.133.109.105:3000/dekomdb.dekom_user?userId=" + valuesid, //192.168.178.24 home or 10.1.111.32 work
    {
      credentials: "same-origin",
    }
  );

  console.log("Mein Fetch is durch. Result: " + respAddAntrag);
  let verified = await isVerifiedVar(respAddAntrag);
  console.log("Im Add Antrag ---> " + verified);
  if (verified == "verified") {
    let dataDekomdb = await respAddAntrag.json();
    let resultDekomdb = JSON.stringify(dataDekomdb);
    console.log("HOMESCREENDATA:" + resultDekomdb);
  }
}

function HomeScreen({ navigation }) {
  //const data = dataSample;
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isVerified } = useContext(AuthContext);
  const { data, getWalletData } = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    getWalletData();
    setIsLoading(false);
  }, []);
  isVerifiedVar = isVerified;

  /*
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const backgroundColor = viewableItems[0].item.backgroundColor;
      this.setState({ backgroundColor });
    }
  };
  */

  console.log("data ist currently------>: " + data);

  function DocumentList() {
    return (
      <>
        <View style={styles.flatListContainer}>
          
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={true}
            snapToAlignment='start'
            decelerationRate={'fast'}
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
               // listener: onViewableItemsChanged

              }
            )}
          />
        </View>
        <Paginator data={data} scrollX={scrollX} /> 
      </>
    );
  }

  function DocumentLoader() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          //ref={animation}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#dddddd",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../assets/loader2.json")}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>|DeKom. </Text>
        <NotificationButton />
      </View>
      {isLoading == true ? <DocumentLoader /> : <DocumentList />}
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
    fontWeight: '500',
    fontSize: 24,
    color: "#223e4b"
  }
});
