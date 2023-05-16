import React, { useState, useContext, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Header } from "../components/Header";
import { AntragProvider } from "../context/AntragContext";
import AntragContext from "../context/AntragContext";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../components/Font";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;

const FertigeAntragListe = ({ navigation, isExpanded }) => {
  const [selectedId, setSelectedId] = useState(null);
  const { antragFile, antragFileId, getAntrag } = useContext(AntragContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAntrag();
    const updatedItems = [];
    for (let i = 0; i < antragFileId; i++) {
      console.log("i: " + i);
      console.log("i: " + antragFileId);
      console.log("antragFile: " + JSON.stringify(antragFile[i].ANTRAG));
      updatedItems.push({
        id: i,
        title: "Führungszeugnis",
        body: antragFile[i].DATUM,
        navigator: "ScreenDoesNotExist",
      });
    }
    setItems(updatedItems);
  }, [antragFileId]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#A27B5C" : "#3F4E4F";
    const color = item.id === selectedId ? "DCD7C9" : "#DCD7C9";

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
      >
        <CustomText style={[styles.title, textColor]}>{item.title}</CustomText>
        <CustomText style={[styles.body, textColor]}>
          eingereicht am: {item.body.length ? item.body : "nicht erkannt"}
        </CustomText>
        <CustomText style={[styles.body, textColor]}>
          bearbeitungsstatus:{" "}
          {
            <Ionicons
              name="remove-circle"
              size={24}
              style={{ color: "orange" }}
            />
          }{" "}
          in Bearbeitung
        </CustomText>
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
      <Header navigation={navigation} />
      {items.length ? (
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          bounces={true}
          snapToAlignment="start"
          decelerationRate={"normal"}
          style={styles.flatlist}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
        />
      ) : (
        <CustomText style={[styles.title, { color: "grey" }]}>
          du hast derzeit keine Anträge beantragt.
        </CustomText>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#2C3639",
    overflow: "hidden",
  },
  item: {
    paddingHorizontal: 22,
    paddingVertical: 30,
    marginVertical: 10,
    marginBottom: 250,
    marginHorizontal: 10,
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
    paddingTop: 40,
    fontSize: 14,
  },

  flatlist: {
    height: ITEM_WIDTH * 1.5,
  },
});

export default FertigeAntragListe;
