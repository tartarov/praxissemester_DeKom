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
import alleAntraege from "./AlleAnträgeEnum";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.95;

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
         getContentFormBlock("99123456760610")
     /*   if(contentInsideBlock){
         console.log("contentInsideBlock in FORMBLOCK: " + JSON.stringify(contentInsideBlock))
         const keys = Object.keys(contentInsideBlock);
         console.log("keys[0]: " + keys[0])
         const firstArrayKey = keys[0];
         const firstArray = contentInsideBlock[firstArrayKey]
         console.log("Das erste Array:", firstArray)
        }
        */
    },[])
    
    

    const DataReal = [
      {
        id: "1",
        title: alleAntraege.a,
        leikaKey: "https://schema.fitko.de/fim/s00000092_1.0.schema.json",
        navigator: "FormBlockScreen",
      },
      {
        id: "2",
        title: alleAntraege.b,
        leikaKey: 99123456760610,
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
                console.log("ich wurde aufgerufen aaaah......" + item.leikaKey )
                navigation.navigate(item.navigator, { leikaKey: item.leikaKey, title: item.title });
              }, 250),
              close();
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };

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
