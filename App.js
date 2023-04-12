import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import SignUpAdress from "./screens/SignUpAdress";
import SignUpNav from "./screens/SignUpNav";
import MainScreen from "./screens/MainScreen";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Loader from "./components/Loader";

const Stack = createNativeStackNavigator();
let alreadyCalled = false;

const AuthHandler = () => {
  const { isLoading, userToken, userSignedUp, isSignedUp } =
    useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  if (userToken == null) {
    alreadyCalled = false;
  }

  useEffect(() => {
    if (userToken != null && alreadyCalled == false) {
      isSignedUp();
      alreadyCalled = true;
    }
  }, [userToken, userSignedUp, isSignedUp]);

  if (userToken && userSignedUp) {
    return <MainScreen />;
  }

  if (userToken && !userSignedUp) {
    return <SignUpNav />;
  }

  return <Login />;
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
