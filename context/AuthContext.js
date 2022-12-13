import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userSignedUp, setUserSignedUp] = useState("false");

  const login = async (userPin, userId) => {
    setIsLoading(true);
    console.log("login going into fetch...");
    let response = await fetch(
      "http://10.1.111.32:3000/testdb.userdaten?pin=" +
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
      console.log("login Token is not null.");
      setUserToken(objTestdb.token);
      console.log("login Token inserterted into AsyncStorage!");
      AsyncStorage.setItem("userToken", objTestdb.token);
    } else {
      alert("UserToken is null.");
    }
    setIsLoading(false);
  };

  const signup = () => {
    console.log(
      "SignUp Process pressed. No function implemented yet. SetUserSignUp stll false."
    );
    setIsLoading(true);
    // setUserSignedUp("true");
    //  AsyncStorage.setItem("isSignedUp", userSignedUp);
    //  console.log("uSU: " + userSignedUp);
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
        "http://10.1.111.32:3000/dekomdb.dekom_user?token=" + userToken
      );

      console.log("isSignedUp data fetched. Verifying if Token still Valid.");
      let userSignedUpJSON = await userIsInDataBank.json();
      let userSignedUpStringy = JSON.stringify(userSignedUpJSON)
      let userSignedUpPARSED = JSON.parse(userSignedUpStringy)
      if ((await isVerified(userSignedUpPARSED)) == "verified") {
        console.log("Bin in if Abfrage");
        if (userSignedUpPARSED.body.value != "false") {
          console.log("userIsSignedUp: " + userSignedUpPARSED.body.value);
          console.log("isSignedUp: " + true);
          setUserSignedUp("true");
          setIsLoading(false);
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
        alert("Session ended. Please Login again.");
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
        userToken,
        userSignedUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
