import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Image,
  useWindowDimensions,
} from "react-native";
import { Header } from "../components/Header";
import { AntragProvider } from "../context/AntragContext";
import AntragContext from "../context/AntragContext";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../components/Font";
import colorEnum from "../components/DeKomColors";
import AntragDetailBottomSheet from "../components/AntragDetailBottomSheet";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;

const FertigeAntragListe = ({ navigation, isExpanded }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedId, setSelectedId] = useState(null);
  const { antragAusstellerDaten, getAntrag, removeAntrag, isLoading } =
    useContext(AntragContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [renderCounter, setRenderCounter] = useState(0);
  const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(1));
  const [filteredAntragAusstellerDaten, setFilteredAntragAusstellerDaten] =
    useState([]);
  const { height } = useWindowDimensions();
  const Antragdetail = useRef(null);

  const openAntragListe = useCallback(() => {
    Antragdetail.current.expand();
  }, []);

  const closeHandler = useCallback(() => {
    Antragdetail.current.close();
  }, []);


  const Item = ({ item, onPress, backgroundColor, textColor }) => {
    // Animate the opacity when the item changes
    return (
      <>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.item, backgroundColor]}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
            {item.title == "Führungszeugnis" ? (
              <Image
                source={require("../assets/images/fuehrungszeugnis.png")}
                style={{
                  height: 100,
                  width: 70,
                  //  margin: 10,
                  //  marginTop: 30,
                  //   marginBottom: 30,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#2C3639",
                }}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={100}
                style={{
                  marginTop: 30,
                  marginBottom: 70,
                  color: colorEnum.textcolor,
                  marginRight: 10,
                  marginLeft: 30,
                }}
              />
            )}
            <View style={{ flexDirection: "column" }}>
              <Text style={[styles.title, textColor]}>{item.title}</Text>
              <Text style={[styles.date, textColor]}>
                {item.document.ausstellDatum}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.document.antragId === selectedId
        ? colorEnum.tertiary
        : colorEnum.secondary;
    const color =
      item.document.antragId === selectedId
        ? colorEnum.primary
        : colorEnum.quartiary;

    return (
      <>
        <Item
          item={item}
          onPress={() => {
            setSelectedId(item.document.antragId);
            setRenderCounter((prevCounter) => prevCounter + 1);
            if (typeof item.navigator === "function") {
              item.navigator();
            } else {
              setTimeout(() => {
                openAntragListe();
              }, 250);
            }
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      </>
    );
  };

  const filterAndAnimateFlatList = useCallback(() => {
    let filteredData;
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      console.log(selectedStatus)
      if (selectedStatus === "all") {
        filteredData = antragAusstellerDaten;
      } else {
        filteredData = antragAusstellerDaten.filter(
          (item) => item.document.bearbeitungsStatus === selectedStatus
        );
      }

      setFilteredAntragAusstellerDaten(filteredData);

      setTimeout(() => {
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }, 130);
    });
  }, [antragAusstellerDaten, selectedStatus, animatedOpacity]);

  useEffect(() => {
    filterAndAnimateFlatList();
  }, [filterAndAnimateFlatList]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            selectedStatus === "all" && styles.activeNavigationButton,
          ]}
          onPress={() => {
            setSelectedStatus("all");
            filterAndAnimateFlatList();
          }}
        >
          <Text
            style={[
              styles.navigationButtonText,
              selectedStatus === "all" && styles.activeNavigationButtonText,
            ]}
          >
            Alle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            selectedStatus === "in Bearbeitung" &&
              styles.activeNavigationButton,
          ]}
          onPress={() => {
            setSelectedStatus("in Bearbeitung");
            filterAndAnimateFlatList();
          }}
        >
          <Text
            style={[
              styles.navigationButtonText,
              selectedStatus === "in Bearbeitung" &&
                styles.activeNavigationButtonText,
            ]}
          >
            In Bearbeitung
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            selectedStatus === "in zustellung" && styles.activeNavigationButton,
          ]}
          onPress={() => {
            setSelectedStatus("in zustellung");
            filterAndAnimateFlatList();
          }}
        >
          <Text
            style={[
              styles.navigationButtonText,
              selectedStatus === "in zustellung" &&
                styles.activeNavigationButtonText,
            ]}
          >
            In Zustellung
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            selectedStatus === "zugestellt" && styles.activeNavigationButton,
          ]}
          onPress={() => {
            setSelectedStatus("zugestellt");
            filterAndAnimateFlatList();
          }}
        >
          <Text
            style={[
              styles.navigationButtonText,
              selectedStatus === "zugestellt" &&
                styles.activeNavigationButtonText,
            ]}
          >
            Zugestellt
          </Text>
        </TouchableOpacity>
      </View>
      {filteredAntragAusstellerDaten.length ? (
        <Animated.FlatList
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={true}
          snapToAlignment="center"
          decelerationRate={"fast"}
          style={[styles.flatlist, { opacity: animatedOpacity }]}
          data={filteredAntragAusstellerDaten}
          renderItem={renderItem}
          keyExtractor={(item) => item.document.antragId.toString()}
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
            fontSize: 14,
            textAlign: "center",
            color: "gray",
            justifyContent: "center",
            alignItems:"center",
            top: height/3,
          }}
        >
          Bisher haben keine Anträge den Status "{selectedStatus}".
        </CustomText>
      )}
      <AntragDetailBottomSheet
        key={renderCounter}
        activeHeight={height * 0.7}
        ref={Antragdetail}
        navigation={navigation}
        antragAusstellerDaten={antragAusstellerDaten}
        selectedId={selectedId}
      />
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
    paddingHorizontal: 0,
    paddingVertical: 20,
    marginVertical: 5,
    //  marginBottom: 250,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorEnum.secondary,
    elevation: 1,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    paddingHorizontal: 50,
    textAlign: "center",
  },
  date: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    paddingHorizontal: 50,
    paddingVertical: 10,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
  },

  flatlist: {
    height: ITEM_WIDTH,
    marginTop: 10,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  navigationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  navigationButtonText: {
    fontSize: 16,
    color: "gray",
  },
  activeNavigationButton: {
    borderBottomWidth: 2,
    borderBottomColor: colorEnum.tertiary,
  },
  activeNavigationButtonText: {
    color: colorEnum.accent,
  },
});

export default FertigeAntragListe;
