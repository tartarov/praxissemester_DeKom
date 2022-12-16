import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import SignUpAdress from "./screens/SignUpAdress";
import SignUpNav from "./screens/SignUpNav";
import MainScreen from "./screens/MainScreen";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import LottieView from 'lottie-react-native';

const Stack = createNativeStackNavigator();
let alreadyCalled = false;

const AuthHandler = () => {
  const { isLoading, userToken, userSignedUp } = useContext(AuthContext);
  const { isSignedUp } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <LottieView
        autoPlay
        //ref={animation}
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('./assets/loader.json')}
      />
      {/* <ActivityIndicator size={"large"} /> */}
      </View>
    );
  }
  if (userToken == null) {
    console.log("USER TOKEN IS NULL! alreadyCalled is now false.");
    alreadyCalled = false;
  }

  useEffect(() => {
    console.log(
      "USER-Token: " + userToken + ",    alreadyCalled: " + alreadyCalled
    );
    if (userToken != null && alreadyCalled == false) {
      console.log("hallolöle :-)");
      isSignedUp();
      console.log("CiaoCiao :-)");
      alreadyCalled = true;
      console.log("alreadyCalled ist auf: " + alreadyCalled);
    }
  }, []);

  if (userToken !== null && userSignedUp != "false") {
    return <MainScreen />;
  } else if (userToken !== null && userSignedUp == "false") {
    return <SignUpNav />;
  } else {
    return <Login />;
  }
};

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
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
            name="SignUpAdress"
            component={SignUpAdress}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
