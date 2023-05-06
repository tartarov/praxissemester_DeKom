import React, { useState, useContext, useEffect } from "react";
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
import { Header } from "../components/Header";
import { AntragProvider } from "../context/AntragContext";
import AntragContext from "../context/AntragContext";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;

const FertigeAntragListe = ({ navigation, isExpanded }) => {
    const [selectedId, setSelectedId] = useState(null);
    const { antragFile } = useContext(AntragContext);
    const { antragFileId } = useContext(AntragContext);
    const { getAntrag } = useContext(AntragContext);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      getAntrag();
    }, []);
  
    useEffect(() => {
      const updatedItems = [];
      for (let i = 0; i < antragFileId; i++) {
        updatedItems.push({
          id: i,
          title: "Führungszeugnis",
          navigator: "ScreenDoesNotExist",
        });
      }
      setItems(updatedItems);
    }, [antragFileId]);
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#A27B5C" : "#3F4E4F";
      const color = item.id === selectedId ? "DCD7C9" : "#DCD7C9";
  
      const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
          <Text style={[styles.title, textColor]}>{item.title}</Text>
          <Text style={[styles.antragFile, textColor]}>{antragFile}</Text>
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
        <Header />
        <FlatList
          style={styles.flatlist}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
    alignItems: 'center',
    justifyContent:'center',
    fontSize: 24,
    textAlign:'center'
  },
  antragFile: {
    alignItems: 'center',
    justifyContent:'center',
    fontSize: 18,
  },
  flatlist:{
    height: ITEM_WIDTH * 1.5,
  }
});

export default FertigeAntragListe;
