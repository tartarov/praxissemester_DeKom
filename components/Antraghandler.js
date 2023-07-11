import Fuehrungszeugnis from "./AntragCards/Fuehrungszeugnis";
import ErwFuehrungszeugnis from "./AntragCards/ErwFuehrungszeugnis";
import {
    FlatList,
    Dimensions,
    Animated,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Pressable,
    Vibration,
    Alert,
    useWindowDimensions,
    SectionList,
  } from "react-native";

const { width } = Dimensions.get("screen");

const SPACING = 10;
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const VISIBLE_ITEMS = 3;

function AntragHandler ({antragAusstellerDaten, scrollY}){

     let document = <Fuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />


     if (antragAusstellerDaten.title == 'Fuehrungszeugnis'){
        document = <Fuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} scrollY = {scrollY} />
     } else if (antragAusstellerDaten.title == 'ErwFuehrungszeugnis') {
        document = <ErwFuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />
     };

    return ( document );
}

export default AntragHandler;