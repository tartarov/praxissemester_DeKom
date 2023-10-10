import React, { createContext, useEffect, useReducer, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../components/Font";

export const AuthContext = createContext();

const initialState = {
  isLoading: false,
  userToken: null,
  userSignedUp: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_TOKEN":
      return { ...state, userToken: action.payload };
    case "SET_SIGNED_UP":
      return { ...state, userSignedUp: action.payload };
    case "CLEAR":
      return { isLoading: false, userToken: null, userSignedUp: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, userToken, userSignedUp } = state;
  const ipAddress = "dekom.ddns.net";

  const login = async (userPin) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch(
        `https://dekom.ddns.net:4222/testdb.userdaten?pin=${userPin}`
      );
      const requiredToken = await response.json();
      const token = requiredToken.token
      console.log("TOKEN: " + token)
      if (token) {
        dispatch({ type: "SET_TOKEN", payload: token });
        AsyncStorage.setItem("userToken", token);
      } else {
        Alert.alert(
          "Etwas ist schiefgelaufen.",
          "Deine ID oder PIN ist falsch. Bitte veruche es erneut."
        );
      }
    } catch (error) {
      console.log(`Error during login: ${error.message}`);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const signup = async (userData) => {
    dispatch({ type: "SET_LOADING", payload: true });

    const apiUrl = `https://${ipAddress}:4222/user/save`;
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(userData),
    };

    const response = await fetch(apiUrl, requestOptions);

    const newUser = await response.json();

    const verificationStatus = await isVerified(newUser);
    if (verificationStatus === "verified" && newUser.body.value === true) {
      console.log("Signup successful");
      dispatch({ type: "SET_SIGNED_UP", payload: true });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const logout = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR" });
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("isSignedUp");
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const isSignedUp = async () => {

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch(
        `https://${ipAddress}:4222/dekomdb.dekom_user/identify?token=${userToken}`
      );
      const confirmedUser = await response.json();

      const isUserVerified = (await isVerified(confirmedUser)) === "verified";

      if (!isUserVerified) {
        console.log("Invalid user verification status");
        dispatch({ type: "SET_LOADING", payload: false });
        return false;
      }

      const userIsSignedUp = confirmedUser.body.value === true;

      dispatch({
        type: "SET_SIGNED_UP",
        payload: userIsSignedUp ? true : false,
      });

      dispatch({ type: "SET_LOADING", payload: false });
      console.log("userIsSignedUp: ------ " + userIsSignedUp)
      return userIsSignedUp;
    } catch (e) {
      console.log(`isSignedUp error : ${e}`);
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  };

  const isLoggedIn = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const userToken = await AsyncStorage.getItem("userToken");
      dispatch({ type: "SET_TOKEN", payload: userToken });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (e) {
      console.log(`isLoggedIn error : ${e}`);
    }
  };

  const isVerified = async (result) => {
    try {
      if (result.body.value == "logout") {
        console.log("User session ended.");
        logout();
        Alert.alert("Session wurde beendet.", "Bitte authentifiziere dich nochmal.");
      } else {
        return "verified";
      }
    } catch (error) {
      console.log(`isVerifiedError error : ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        isSignedUp,
        isVerified,
        isLoading,
        userToken,
        userSignedUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
