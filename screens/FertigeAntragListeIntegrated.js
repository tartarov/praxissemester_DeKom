import React, { useState, useContext, useEffect, useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Vibration,
  Alert,
  Image,
} from "react-native";
import { Header } from "../components/Header";
import { AntragProvider } from "../context/AntragContext";
import AntragContext from "../context/AntragContext";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../components/Font";
import LogoText from "../components/LogoFont";
import Paginator from "../components/Paginator";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;

const FertigeAntragListeIntegrated = ({ navigation, isExpanded }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedId, setSelectedId] = useState(null);
  const { antragFile, antragFileId, getAntrag } = useContext(AntragContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAntrag();
    const updatedItems = [];
    for (let i = 0; i < antragFileId; i++) {
      updatedItems.push({
        id: i,
        title: "Führungszeugnis",
        body: antragFile[i].DATUM,
        navigator: "ScreenDoesNotExist",
      });
    }
    setItems(updatedItems);
  }, [antragFileId]);

  //"#e94832"

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#3F4E4F" : "#DCD7C9";
    const color = item.id === selectedId ? "#DCD7C9" : "#DCD7C9";

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
        onLongPress={() => {
          console.log("pressed"),
            Vibration.vibrate(100),
            Alert.alert("Willst du diesen Antrag löschen?");
        }}
      >
        <CustomText
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            textAlign: "center",
            color: "#A27B5C",
          }}
        >
          {item.title}
        </CustomText>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/images/fuehrungszeugnis.png")}
            style={{ height: 120, width: 70, margin:10, borderRadius: 5, borderWidth: 1, borderColor: "#2C3639" }}
          />
          <View style={{ flexDirection: "column" }}>
            <CustomText
              style={{
                alignItems: "center",
                fontSize: 14,
                color: "#2C3639",
                paddingHorizontal: 10,
                marginTop: 10,
              }}
            >
              eingereicht am:
            </CustomText>
            <LogoText
              style={{
                alignItems: "center",
                fontSize: 14,
                color: "white",
                paddingHorizontal: 10,
              }}
            >
              {item.body.length ? item.body : "nicht erkannt"}
            </LogoText>

            <CustomText
              style={{
                alignItems: "center",
                fontSize: 14,
                color: "#2C3639",
                paddingHorizontal: 10,
                marginTop: 10,
              }}
            >
              bearbeitungsstatus:
            </CustomText>
            <LogoText
              style={{
                alignItems: "center",
                fontSize: 14,
                color: "#2C3639",
                paddingHorizontal: 10,
              }}
            >
              {" "}
              {
                <Ionicons
                  name="remove-circle"
                  size={14}
                  style={{ color: "yellow" }}
                />
              }{" "}
              in Bearbeitung
            </LogoText>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id),
            setTimeout(() => {
              navigation.navigate(item.navigator);
            }, 250);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {items.length ? (
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={true}
          snapToAlignment="center"
          decelerationRate={"fast"}
          style={styles.flatlist}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
      ) : (
        <CustomText
          style={{
            fontSize: 24,
            textAlign: "center",
            color: "#DCD7C9",
            alignSelf: "center",
          }}
        >
          du hast derzeit keine Anträge beantragt.
        </CustomText>
      )}
      <Paginator data={items} scrollX={scrollX} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C3639",
    overflow: "hidden",
  },
  item: {
    alignItems: "center",
    marginHorizontal: 38,
    marginVertical:10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 6,
    elevation: 1,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
  },

  flatlist: {
    height: ITEM_WIDTH * 0.6,
  },
});

export default FertigeAntragListeIntegrated;
