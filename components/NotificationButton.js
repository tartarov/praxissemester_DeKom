import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


const { width } = Dimensions.get('screen');

function NotificationButton({onPress}){
    return (
    <View style={styles.container}>
      <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer} onPress={onPress} 
      android_ripple={{color: '#23619A'}}>
         <Ionicons name="notifications" size={32} color="black" />
      </Pressable>
    </View>
    );
}

export default NotificationButton;

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
    },
    buttonInnerContainer:{
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 8,
        elevation: 2,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 16,
    },
    pressed: {
        opacity: 0.50,
    }

});