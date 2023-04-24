import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { HeaderBottomdrawer } from "../../components/HeaderBottomDrawer";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;
const DATA = [
  {
    id: "1",
    title: "Führungszeugnis",
    navigator: "FragenScreen",
  },
  {
    id: "2",
    title: "erweitertes Führungszeugnis",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "3",
    title: "Wohnsitz-Ummeldung",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "4",
    title: "Kirchenaustritt",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "5",
    title: "Kindergeld",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "6",
    title: "Wohngeld",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "7",
    title: "Arbeitslosengeld",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "8",
    title: "neuer Personalausweiß",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "9",
    title: "neuer Führerschein",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "10",
    title: "BAFöG",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "11",
    title: "Geburtsurkunde",
    navigator: "ScreenDoesNotExist",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const Antragmenue = ({ navigation  , isExpanded}) => {
  const [selectedId, setSelectedId] = useState(null);
  
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#A27B5C" : "#3F4E4F";
    const color = item.id === selectedId ? "DCD7C9" : "#DCD7C9";

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
     <HeaderBottomdrawer navigation={navigation} isExpanded={isExpanded}/>
      <FlatList style={styles.flatlist}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#2C3639",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow:'hidden'
  },
  item: {
    padding: 20,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 6,
    elevation: 1,
  },
  title: {
    fontSize: 18,
  },
  flatlist:{
    height: ITEM_WIDTH * 1.5,
  }
});

export default Antragmenue;
