import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import MainScreen from "./screens/MainScreen";
import { AuthProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const {Navigator, Screen } = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
let alreadyCalled = false;


const AuthHandler = () => {
  const { isLoading, userToken, userSignedUp } = useContext(AuthContext);
  const { isSignedUp } = useContext(AuthContext);
  

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if(userToken == null){
    console.log("USER TOKEN IS NULL! alreadyCalled is now false.") 
      alreadyCalled = false;
    }

  useEffect(() => {
      console.log("USER-Token: " + userToken + ",    alreadyCalled: " + alreadyCalled);
    if (userToken != null && alreadyCalled == false){
      console.log("hallolöle :-)") 
      isSignedUp();
      console.log("CiaoCiao :-)") 
      alreadyCalled = true
      console.log("alreadyCalled ist auf: " + alreadyCalled)
    }
    /*console.log("ALREADYCOALLED:" + alreadyCalled)
    if (alreadyCalled == false){
    console.log("hallolöle :-)") 
     isSignedUp();
    console.log("CiaoCiao :-)") 
    alreadyCalled = true;
    } */
  }, [])


  //console.log("App.js: USERTOKEN: " + userToken);
  //console.log("IsIsignedUp: " + userSignedUp);

  if (userToken !== null && userSignedUp != "false") {
    return <MainScreen />;
  } else if (userToken !== null && userSignedUp == "false") {
    return <SignUp />;
  } else {
    return <Login />;
  }


};

//seperater Handler für MainScreen oder SIgnUp der mit Datenbank Checkt ob Singup noch angezeigt werden muss

const App = () => {

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="AuthFlow">
          <Stack.Screen
            name="AuthFlow"
            component={AuthHandler}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
