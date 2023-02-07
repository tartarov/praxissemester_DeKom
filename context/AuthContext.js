import React, { createContext, useState, useEffect } from "react";
import { Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';
import checkmark from '../components/animations/checkmark.js'
export const AuthContext = createContext();

export const AuthProvider = ({ children }, {navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCorrect, setIsLoadingCorrect] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userSignedUp, setUserSignedUp] = useState("false");
  let greetingsName;

  const login = async (userPin, userId) => {
    setIsLoading(true);
    console.log("login going into fetch...");
    let response = await fetch(
      "http://93.133.109.105:3000/testdb.userdaten?pin=" +
        userPin +
        "&id=" +
        userId
    ).catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      throw error;
    });
    console.log("login data from behörde fetched.");
    console.log("login ongoing parsing to get token...");
    let dataTestdb = await response.json();
    let resultTestdb = JSON.stringify(dataTestdb);
    let objTestdb = JSON.parse(resultTestdb);
    console.log("TOKEN AFTER LOGIN: " + objTestdb.token);

    if (objTestdb.token !== null) {
      setIsLoadingCorrect(true)
      console.log("login Token is not null.");
      setUserToken(objTestdb.token);
      console.log("login Token inserterted into AsyncStorage!");
      AsyncStorage.setItem("userToken", objTestdb.token);
    } else {
      Alert.alert(
        "Etwas ist schiefgelaufen.",
        "Deine ID oder PIN ist falsch. Bitte veruche es erneut."
      );
    }
     setIsLoading(false)
     setIsLoadingCorrect(false)
  };

  const signup = async (userData) => {
    console.log(
      "SignUp Process pressed. No function implemented yet. SetUserSignUp stll false."
    );
    setIsLoading(true);
    let response = await fetch("http://93.133.109.105:3000/user/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(userData),
    });

    let responseJSON = await response.json();
    let responseStringy = JSON.stringify(responseJSON);
    let responseParsed = JSON.parse(responseStringy);

    if ((await isVerified(responseParsed)) == "verified") {
      if (responseParsed.body.value == true) {
        console.log("respond contains true => success");
        setUserSignedUp("true");
      }
    }
    setIsLoading(false);
  };

  const logout = () => {
    console.log("logut initiated.");
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("isSignedUp");
    console.log(
      "logut token and Boolean for SignUp deleted from AsyncStorage."
    );
    setIsLoading(false);
  };

  const isSignedUp = async () => {
    setIsLoading(true);
    console.log(
      "isSignedUp initiated. preparing fetch with Token from AsyncStorage..."
    );
    try {
      let userIsInDataBank = await fetch(
        "http://93.133.109.105:3000/dekomdb.dekom_user/identify?token=" +
          userToken
      );

      console.log("isSignedUp data fetched. Verifying if Token still Valid.");
      let userSignedUpJSON = await userIsInDataBank.json();
      let userSignedUpStringy = JSON.stringify(userSignedUpJSON);
      let userSignedUpPARSED = JSON.parse(userSignedUpStringy);
      if ((await isVerified(userSignedUpPARSED)) == "verified") {
        console.log("Bin in if Abfrage");
        if (userSignedUpPARSED.body.value != false) {
          console.log("userIsSignedUp: " + userSignedUpPARSED.body.value);
          console.log("isSignedUp: " + true);
          setUserSignedUp("true");
          setIsLoading(false);
        if (userSignedUpPARSED.body.value == true){
          greetingsName = userSignedUpPARSED.body.result[0].VORNAME;
          Alert.alert("Willkommen, " + greetingsName + "!");
        }
          return true;
        } else {
          console.log("userIsSignedUp: " + userSignedUpPARSED.body.value);
          console.log("isSignedUp: " + false);
          setUserSignedUp("false");
          setIsLoading(false);
          return false;
        }
      } else {
        console.log("alles Käse!");
      }
    } catch (e) {
      console.log(`isSignedUp error : ${e}`);
    }
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      console.log("ISLOGGEDIN checking Token from Storage");
      let userToken = await AsyncStorage.getItem("userToken");
      console.log("ISLOGGEDIN Token from Strage is: " + userToken);
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error : ${e}`);
    }
  };

  const isVerified = async (result) => {
    try {
      /*let resultJSON = await result.json();
      let resultStringy = JSON.stringify(resultJSON)
      let resultPARSE = JSON.parse(resultStringy)*/
      console.log("resultStringy:" + result.body.value);
      if (result.body.value == "logout") {
        console.log("ich bin im logout");
        logout();
        Alert.alert("Session wurde beendet. Bitte logge dich nochmal ein.");
      } else {
        return "verified";
      }
    } catch (e) {
      console.log(`isVerifiedError error : ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
    //  isSignedUp();
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
        isLoadingCorrect,
        userToken,
        userSignedUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


