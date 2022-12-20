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
    title: "Geburtsurkunde",
    navigator: "Home"
  },
  {
  id: "3",
  title: "Wohnsitz-Ummeldung",
  navigator: "Home"
},
{
    id: "4",
    title: "Kirchenaustritt",
    navigator: "Menu"
  },
  {
    id: "5",
    title: "Kindergeld",
    navigator: "Menu"
  },
  {
    id: "6",
    title: "Wohngeld",
    navigator: "Home"
  },
  {
  id: "7",
  title: "Arbeitslosengeld",
  navigator: "Home"
},
{
    id: "8",
    title: "In Arbeit 2",
    navigator: "Menu"
  },
  {
    id: "9",
    title: "In Arbeit 2",
    navigator: "Menu"
  },
  {
    id: "10",
    title: "In Arbeit 2",
    navigator: "Menu"
  },
  {
    id: "11",
    title: "In Arbeit 2",
    navigator: "ScreenDoesNotExist"
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
      navigation.navigate(item.navigator)
    }

    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.id), setTimeout(() => {
            navigation.navigate("ScreenDoesNotExist")
          }, 250)}}
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
