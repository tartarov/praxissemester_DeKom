import { View, Text, StyleSheet, ImageBackground, Dimensions, Platform } from "react-native";


const { width } = Dimensions.get('screen');

const ImageWidth = width * 0.95;
const ImageHeight = ImageWidth * 0.8;

function Ausweis ({data}){
    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/fuehrerscheinBg.png')} style={styles.image}>
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
                    <View style={styles.textContainer}> 
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
                      <Text style={styles.text}>{data.document.ausstellungsbehoerde}</Text>
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
                </View>
                <View style={styles.textContainer}> 
                    <Text style={styles.heading}>Type</Text>
                    <Text style={styles.text}>{data.document.type}</Text>
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
        borderRadius: 14,
    },
    image: {
        flex: 1,
        borderRadius: 14,
        overflow: 'hidden',
    },
    dataContainer: {
        padding: 10,
    },
    group: {
        flexDirection: 'row',
    },
    textContainer: {
        paddingTop: 10,
    },
    heading: {
        fontSize: Platform.OS === 'android' ? 10 : 12, //Platform.OS === 'android' ? 10 : 12,
        fontStyle: 'italic',
        color: '#223e4b',
        paddingHorizontal: 10,
    },
    text: {
        color: '#223e4b',
        fontSize: Platform.OS === 'android' ? 16 : 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    }
})