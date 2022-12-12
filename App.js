import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import SignUpAdress from "./screens/SignUpAdress";
import MainScreen from "./screens/MainScreen";
import { AuthProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";

//const {Navigator, Screen } = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const AuthHandler = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const { userSignedup, isSignedUp } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  console.log("App.js: USERTOKEN: " + userToken)

  if (userToken !== null && isSignedUp() !== false) {
    return <MainScreen />;
  } else if(userToken !== null && isSignedUp() !== true) {
    return <SignUp /> ;
  } else {
    return <Login/>
  }
};

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
    </AuthProvider>
  );
};

export default App;
