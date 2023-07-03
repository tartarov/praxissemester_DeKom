import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const { width } = Dimensions.get('screen');

const ImageWidth = width * 0.95;
const ImageHeight = ImageWidth * 0.6;

function Ausweis ({data}){
    return(
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/persoBackground2.png')} style={styles.image}>
                <View style={{ flexDirection: 'row',}}>
              { data.document.vorname == "Tim" ?  <Image source={require('../../assets/images/TimA.jpeg')} 
                        style={{height:170,width:120, margin:0, marginLeft: 15, marginTop:50, borderRadius:2}}/> :  <Ionicons
                        name="person-circle-outline"
                        size={100}
                        style={{ marginTop: 70, color: '#2C3639', marginRight:10, marginLeft: 30}}
                      /> }
                <View style={styles.dataContainer}>
                <View style={styles.textNummer}>
                    <Text style={styles.text}>{data.document.nummer}</Text>
                </View>
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
                        <Text style={styles.heading}>Geburtstag</Text>
                        <Text style={styles.text}>{data.document.geburtstag}</Text>
                    </View>
                    <View style={[styles.textContainer , {marginLeft: 15}]}> 
                        <Text style={styles.heading}>Staatsangehörigkeit</Text>
                        <Text style={styles.text}>{data.document.staatsangehoerigkeit}</Text>
                    </View>
                </View>
                <View style={styles.textContainer}> 
                    <Text style={styles.heading}>Geburtsort</Text>
                    <Text style={styles.text}>{data.document.geburtsort}</Text>
                </View>
                <View style={styles.group}>
                   <View style={styles.textContainer}> 
                      <Text style={styles.heading}>Gültig bis</Text>
                      <Text style={styles.text}>{data.document.gueltigBis}</Text>
                   </View>
                   <View style={[styles.textContainer, {marginLeft: 5, marginTop:0}]}> 
                      <Text style={styles.textCAN}>{data.document.can}</Text>
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
        borderColor: "#3F4E4F",
        overflow: 'hidden',
    },
    dataContainer: {
        padding: 20,
        paddingTop: 50
    },
    group: {
        flexDirection: 'row',
    },
    textContainer: {
        paddingTop: 1,
    },
    heading: {
        fontSize: 8,
        fontStyle: 'italic',
        fontFamily: 'Nexa-ExtraLight',
        color: '#223e4b',
        paddingHorizontal: 10,
    },
    text: {
        color: '#223e4b',
        fontSize: 12,
        fontFamily: 'Nexa-Heavy',
        paddingHorizontal: 10,
    },
    textCAN: {
        color: '#223e4b',
        fontSize: 16,
        fontFamily: 'Nexa-Heavy',
        paddingHorizontal: 10,
    },
    textNummer: {
        color: '#223e4b',
        fontSize: 12,
        fontFamily: 'Nexa-Heavy',
        paddingHorizontal: 10,
        marginLeft:100,
        marginTop: -10,
    }
})