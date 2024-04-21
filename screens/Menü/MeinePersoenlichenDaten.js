import React, { useContext, useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, FlatList } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Button from "../../components/Buttons/Button";
import { Header } from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";

export default function MeinePersoenlichenDaten({ navigation }) {
  const { logout } = useContext(AuthContext);
  const { data, getWalletData, getUserData } = useContext(DataContext);
  const [userDataObj, setUserDataObj] = useState({});

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData();
      setUserDataObj(userData);
    }
    fetchData();
    Alert.alert("Deine persönlichen Daten", "Hier findest du deine Daten, die aus dem Personalausweis entzogen wurden, mit dem du dich authentifiziert hast. ACHTUNG: Wenn du deine Daten nicht mehr im System haben möchtest, dann melde dich unter Menü -> Log out ab.")
  }, []);

  console.log("userDataObj: ", userDataObj);

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>  
        <Text style={styles.heading}>
          Diese Daten wurden aus deinem Personalausweis entnommen:
        </Text>
        </View>
        <FlatList
          style={styles.dataContainer}
          data={Object.entries(userDataObj)}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item[0]}</Text>
              <Text style={styles.value}>{item[1]}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ height: 80, backgroundColor: "#3F4E4F", }} />
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#3F4E4F",
  },
  heading: {
    marginBottom: 20,
    fontSize: 20,
    color: "white",
  },
  buttonContainer: {
    marginTop: 0,
  },
  dataContainer: {
    marginTop: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  value: {
    fontSize: 14,
    color: "#333333",
  },
};