import React, { useState, useCallback, useImperativeHandle, forwardRef, } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Vibration,
  useWindowDimensions
} from "react-native";
import { Header } from "./Header";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
  } from "react-native-reanimated";
  import { HeaderBottomdrawer } from "./HeaderBottomDrawer";
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

const Antragmenue = forwardRef(({navigation  , isExpanded, activeHeight, props }, ref) => {
const height = useWindowDimensions().height;
const drawerHeight = useSharedValue(height * 0.1);
    const topAnimation = useSharedValue(height);
  const [selectedId, setSelectedId] = useState(null);

  const animationStyle = useAnimatedStyle(() => {
    const top = topAnimation.value;
    return {
      top,
    };
  });

  const expand = useCallback(() => {
    console.log("I am here :(")
    "worklet";
    topAnimation.value = withSpring(activeHeight, {
      damping: 100,
      stiffness: 400,
    });
  }, []);

  const close = useCallback(() => {
    "worklet";
    topAnimation.value = withSpring(height, {
      damping: 100,
      stiffness: 400,
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      expand,
      close,
    }),
    [expand, close]
  );
  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  

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
            }, 250), close();
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <Animated.View style={[styles.container, animationStyle]}>
      <HeaderBottomdrawer/>
    {/* <HeaderBottomdrawer navigation={navigation} isExpanded={isExpanded}/> */}
      <FlatList style={styles.flatlist}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#2C3639",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    width: 410
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
