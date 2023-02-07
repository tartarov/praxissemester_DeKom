import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";


const { width } = Dimensions.get('screen');

const ImageWidth = width * 0.95;
const ImageHeight = ImageWidth * 0.8;

function Ausweis ({data}){
    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/persoBackground.png')} style={styles.image}>
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
                        <Text style={styles.heading}>Geburtstag</Text>
                        <Text style={styles.text}>{data.document.geburtstag}</Text>
                    </View>
                    <View style={styles.textContainer}> 
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
                   <View style={[styles.textContainer, {paddingLeft: 50}]}> 
                      <Text style={styles.text}>{data.document.nummer}</Text>
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
        borderRadius: 14,
    },
    image: {
        flex: 1,
        borderRadius: 14,
        overflow: 'hidden',
    },
    dataContainer: {
        padding: 20,
    },
    group: {
        flexDirection: 'row',
    },
    textContainer: {
        paddingTop: 10,
    },
    heading: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#223e4b',
        paddingHorizontal: 10,
    },
    text: {
        color: '#223e4b',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    }
})