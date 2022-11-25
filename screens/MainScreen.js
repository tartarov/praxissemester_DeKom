import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

function MainScreen(){
    return (
        <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name='Dokumente' component={HomeScreen} options={{  //change HomeScreen to DokumenteScreen
                tabBarIcon: ({color, size}) => <Ionicons name='document' color={color} size={size} /> }} />
              <Tab.Screen name='Home' component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => <Ionicons name='home' color={color} size={size} /> ,
              }} />
              <Tab.Screen name='Menu' component={HomeScreen} options={{ //change HomeScreen to MenuScreen
                tabBarIcon: ({color, size}) => <Ionicons name='menu' color={color} size={size} /> }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainScreen;

const styles = StyleSheet.create({

});