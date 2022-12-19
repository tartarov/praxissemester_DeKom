import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DATA = [
  {
    id: "1",
    title: "Führungszeugnis",
    navigator: "Menu"
  },
  {
    id: "2",
    title: "In Arbeit",
    navigator: "Home"
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const Antragmenue = ({navigation}) => {
        const [selectedId, setSelectedId] = useState(null);


  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#e94832" : "#f8c8c1";
    const color = item.id === selectedId ? 'white' : 'black';

    const getToNav = ({item}) => {
      setSelectedId(item.id)
      
    }

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate(item.navigator)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (

    <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
    <Text style={styles.logo}>|DeKom. </Text>
  </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <View>
      <Text  style={{alignItems: 'center'}}>...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      logo: {
        marginTop: 10,
        marginBottom: StatusBar.currentHeight || 0,
        fontWeight: "bold",
        fontSize: 38,
        marginLeft: 20,
        color: "#223e4b",
      },
  container: {
    flex: 1,
   // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
    borderRadius: 6
  },
  title: {
    fontSize: 18,
  },
});

export default Antragmenue;
