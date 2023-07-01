import React, { useState, useContext, useEffect, useNavigation } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Header } from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { DataContext } from "../context/DataContext";
import CustomText from "../components/Font";
import CountryFlag from "react-native-country-flag";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;

const DATA = [
  {
    id: "1",
    title: "Meine persönlichen Daten",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "2",
    title: "Signaturen verwalten",
    navigator: "SignatureScreen",
  },
  {
    id: "3",
    title: "Meine Zahlungsmethoden",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "4",
    title: "Privatsphäre",
    navigator: "ScreenDoesNotExist",
  },
  {
    id: "5",
    title: "Informationen",
    navigator: "ScreenDoesNotExist",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <>
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <View>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          style={{ color: "#DCD7C9", paddingTop: 2 }}
        />
      </View>
    </TouchableOpacity>
  </>
);

function Settings({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const { data, getWalletData } = useContext(DataContext);
  const [selectedId, setSelectedId] = useState(null);
  const [countryFlag, setCountryFlag] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getWalletData();
    setIsLoading(false);
  }, []);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#A27B5C" : "#3F4E4F";
    const color = item.id === selectedId ? "DCD7C9" : "#DCD7C9";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          if (typeof item.navigator === "function") {
            item.navigator();
          } else {
            setTimeout(() => {
              navigation.navigate(item.navigator);
            }, 250);
          }
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  useEffect(() => {
    if (data.length && data[0].document.staatsangehoerigkeit == "deutsch") {
      console.log(data[0].document.staatsangehoerigkeit);
      setCountryFlag("de");
    }

    if (data.length && data[0].document.staatsangehoerigkeit == "ukraine") {
      console.log(data[0].document.staatsangehoerigkeit);
      setCountryFlag("ua");
    }

    if (data.length && data[0].document.staatsangehoerigkeit == "türkisch") {
      console.log(data[0].document.staatsangehoerigkeit);
      setCountryFlag("tr");
    }
  }, []);

  if (data.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <View
          style={{
            backgroundColor: "#2C3639",
            elevation: 8,
            alignItems: "center",
            marginTop: -4,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 30,
          }}
        >
          {/* <Image source={require('../assets/images/pngwing.com.png')} style={{height:80, width: 80, margin: 20}} />  */}
          <Ionicons
            name="person-circle-outline"
            size={162}
            style={{ margin: 10 }}
          />
          <CustomText style={{ color: "#DCD7C9", fontSize: 25 }}>
            {data[0].document.name + ", " + data[0].document.vorname}
          </CustomText>
          <View style={{ paddingTop: 20 }}>
            <CountryFlag isoCode={countryFlag} size={25} />
          </View>
        </View>
        <FlatList
          style={styles.flatlist}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        ></FlatList>
     {/*   <TouchableOpacity
          onPress={() => {
            navigation.navigate(logout());
          }}
          style={[
            styles.item,
            {
              backgroundColor: "#2C3639",
              elevation: 8,
              borderWidth: 0.5,
              borderColor: "#A27B5C",
            },
          ]}
        >
          <Text style={[styles.title, { color: "#DCD7C9" }]}>Ausloggen</Text>
          <View>
            <Ionicons
              name="log-out-outline"
              size={24}
              style={{ color: "#DCD7C9", paddingTop: 2, marginLeft: 250 }}
            />
          </View>
        </TouchableOpacity>
        */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#2C3639",
    //  overflow:'hidden'
  },
  item: {
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 6,
    elevation: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
  },
  flatlist: {
    marginTop: 10,
  },
});

export default Settings;
