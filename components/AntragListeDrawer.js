import React, {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useContext,
  useEffect,
} from "react";
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
  useWindowDimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Header } from "./Header";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { HeaderBottomdrawer } from "./HeaderBottomDrawer";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import colorEnum from "./DeKomColors";
import AntragContext from "../context/AntragContext";
import { DataContext } from "../context/DataContext";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;
const DATA = [
  {
    id: "1",
    title: "Führungszeugnis",
    navigator: "FormBlockScreen",
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

const Antragmenue = forwardRef(
  ({ navigation, isExpanded, activeHeight, props }, ref) => {
    const height = useWindowDimensions().height;
    const newActiveHeight = height - activeHeight;
    const topAnimation = useSharedValue(height);
    const [selectedId, setSelectedId] = useState(null);

    const {isLoading, formBlock, getFormBlocksCount, getContentFormBlock, contentInsideBlock, formBlockAttributes } =
    useContext(AntragContext);
    const { data, getWalletData } = useContext(DataContext);

    useEffect( ()=>{
         getContentFormBlock()
        if(contentInsideBlock){
         console.log("contentInsideBlock in FORMBLOCK: " + JSON.stringify(contentInsideBlock))
         const keys = Object.keys(contentInsideBlock);
         console.log("keys[0]: " + keys[0])
         const firstArrayKey = keys[0];
         const firstArray = contentInsideBlock[firstArrayKey]
         console.log("Das erste Array:", firstArray)
        }
    },[])

    const DataReal = [
      {
        id: "1",
        title: contentInsideBlock[0].title,
        navigator: "FormBlockScreen",
      },
    ];

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const backDropAnimation = useAnimatedStyle(() => {
      const opacity = interpolate(
        topAnimation.value,
        [height, newActiveHeight],
        [0, 0.7]
      );

      const display = opacity === 0 ? "none" : "flex";

      return {
        opacity,
        display,
      };
    });

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
        ctx.startY = topAnimation.value;
      },
      onActive: (event, ctx) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(ctx.startY + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      },
      onEnd: () => {
        if (topAnimation.value > newActiveHeight + 150) {
          topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      },
    });

    const expand = useCallback(() => {
      ("worklet");
      topAnimation.value = withSpring(newActiveHeight, {
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
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
      >
        <Text style={[styles.title, textColor]}>{item.title}</Text>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? colorEnum.tertiary : colorEnum.secondary;
      const color = item.id === selectedId ? colorEnum.primary : colorEnum.quartiary;

      return (
        <Item
          item={item}
          onPress={() => {
            setSelectedId(item.id),
              setTimeout(() => {
                navigation.navigate(item.navigator);
              }, 250),
              close();
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };

    if(contentInsideBlock){
      console.log("AAAAAAAAAAAAA: " + JSON.stringify(contentInsideBlock[0].title))
    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            close();
          }}
        >
          <Animated.View style={[styles.backDrop, backDropAnimation]} />
        </TouchableWithoutFeedback>
        <PanGestureHandler
          failOffsetY={[-5, 5]}
          activeOffsetX={[-1, 1]}
          onGestureEvent={gestureHandler}
        >
          <Animated.View style={[styles.container, animationStyle]}>
            <HeaderBottomdrawer
              navigation={navigation}
              isExpanded={isExpanded}
            />
            <FlatList
              style={styles.flatlist}
              data={DataReal}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </Animated.View>
        </PanGestureHandler>
      </>
    );
        }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: colorEnum.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    width: 410,
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
  flatlist: {
    height: ITEM_WIDTH * 1.5,
    overflow: "hidden",
  },
  backDrop: {
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Antragmenue;
