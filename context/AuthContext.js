import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userSignedUp, setUserSignedUp] = useState(false);

  const login = async (userPin, userId) => {
    setIsLoading(true);
    let response = await fetch(
      "http://10.1.111.32:3000/testdb.userdaten?pin=" +
        userPin +
        "&id=" +
        userId
    ).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
        });;
    let dataTestdb = await response.json();
    let resultTestdb = JSON.stringify(dataTestdb);
    let objTestdb = JSON.parse(resultTestdb);
    console.log("objTestdb.token:" + objTestdb.token);

    if (objTestdb.token !== null) {
      setUserToken(objTestdb.token);
      AsyncStorage.setItem("userToken", objTestdb.token);
    } else {
      alert("UserToken is null.");
    }
    setIsLoading(false);
    //.then(response => {

    // NOTE: Muss man nicht noch einen Fetch erstellen, damit man beim login überprüfen kann, ob der User schon in der db ist?
    //})
  };

  const signup = () => {
    setIsLoading(true);
    setUserSignedUp(true);
    AsyncStorage.setItem('isSignedUp', userSignedUp)
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isSignedUp = async () => {
    try {
      let userIsSignedUp = await AsyncStorage.getItem('isSignedUp')
      if(userIsSignedUp != null){
        return true
      }else{
        return false
      }
    } catch (e) {
      console.log(`isSignedUp error : ${e}`);
    }
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error : ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, signup, isSignedUp, isLoading, userToken, userSignedUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
