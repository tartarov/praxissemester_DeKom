import React, {
    useState,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    forwardRef,
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
  import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    useAnimatedGestureHandler,
  } from "react-native-reanimated";
  import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
  import colorEnum from "./DeKomColors";
import AntragHandler from "./Antraghandler";
import AntragContext from "../context/AntragContext";
  
  const { width } = Dimensions.get("screen");
  const ITEM_WIDTH = width * 0.95;

  
  const AntragDetailBottomSheet = forwardRef(
    ({ navigation, isExpanded, activeHeight, antragAusstellerDaten, selectedId }, ref) => {
      const height = useWindowDimensions().height;
      const newActiveHeight = height - activeHeight;
      const topAnimation = useSharedValue(height);
      const { getAntragById, desiredAntrag } = useContext(AntragContext);

      console.log("desiredAntrag: " + JSON.stringify(desiredAntrag))
  
      useEffect(() => {
        // setIsLoading(true);
         getAntragById(selectedId);
        // setIsLoading(false);
       }, []);

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
          [0, 0.9]
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
            <View style={{justifyContent:"center", alignItems:"center", backgroundColor:"#fff", borderRadius:10}}>
            <AntragHandler antragAusstellerDaten={desiredAntrag} />  
            </View>
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
  
  export default AntragDetailBottomSheet;
  