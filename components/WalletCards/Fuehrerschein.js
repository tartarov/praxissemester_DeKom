import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colorEnum from "../DeKomColors";

const { width } = Dimensions.get("screen");

const ImageWidth = width * 0.95;
const ImageHeight = ImageWidth * 0.6;

function Ausweis({ data }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/fuehrerscheinBg2.png")}
        style={styles.image}
      >
         <View style={{ flexDirection: 'row',}}>
            { data.document.vorname == "Tim" ?  <Image source={require('../../assets/images/TimA.jpeg')} 
                        style={{height:120,width:80, margin:0, marginLeft: 10, marginTop: 60, borderRadius:2}}/> :   <Ionicons
                        name="person-circle-outline"
                        size={100}
                        style={{ marginTop: 70, color: colorEnum.primary }}
                      /> } 
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Name</Text>
            <Text style={styles.text}>{data.document.name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Vorname</Text>
            <Text style={styles.text}>{data.document.vorname}</Text>
          </View>

          <View style={styles.group}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Geburtsdatum und -ort</Text>
              <Text style={styles.text}>{data.document.geburtstag}</Text>
            </View>
            <View style={{paddingTop:24}}>
              <Text style={styles.text}>{data.document.geburtsort}</Text>
            </View>
          </View>

          <View style={styles.group}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Ausstellungsdatum</Text>
              <Text style={styles.text}>{data.document.ausstellungsdatum}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Ausstellungsbehörde</Text>
              <Text style={styles.text}>
                {data.document.ausstellungsbehoerde}
              </Text>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Ablaufdatum</Text>
              <Text style={styles.text}>{data.document.ablaufdatum}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Führerscheinnummer</Text>
              <Text style={styles.text}>{data.document.nummer}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Type</Text>
              <Text style={styles.text}>{data.document.type}</Text>
            </View>
          </View>
        </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Ausweis;

const styles = StyleSheet.create({
  container: {
    width: ImageWidth,
    height: ImageHeight,
    elevation: 10,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorEnum.secondary,
    overflow: "hidden",
  },
  dataContainer: {
    padding: 10,
    marginLeft: 0,
    marginTop:10
  },
  group: {
    flexDirection: "row",
  },
  textContainer: {
    paddingTop: 8,
  },
  heading: {
    fontSize: Platform.OS === "android" ? 10 : 12, //Platform.OS === 'android' ? 10 : 12,
    fontStyle: "italic",
    color: colorEnum.textcolor,
    paddingHorizontal: 10,
  },
  text: {
    color: colorEnum.textcolor,
    fontSize: Platform.OS === "android" ? 10 : 12,
    fontFamily: 'Nexa-Heavy',
    paddingHorizontal: 10,
  },
});
