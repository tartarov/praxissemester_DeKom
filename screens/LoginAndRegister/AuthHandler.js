import React, { useContext, useEffect, useState } from "react";
import Login from "./Login";
import SignUpNav from "./SignUpFlow/SignUpNav";
import { AuthContext } from "../../context/AuthContext";
import { EnvContext } from "../../context/EnvContext";
import Loader from "../../components/animations/Loader";
import DrawerNavigator from "../../navigations/DrawerNavigator";
import EnvironmentOption from "../EnvironmentOption";
import MockLogin from "./MockLogin";

 function AuthHandler () {

  console.log("mock2")
  const { mock } = useContext(EnvContext);
  console.log("mock: " + mock)

    let alreadyCalled = false;
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
    }, []);

    useEffect(() => {
    }, [mock]);
  
    if (userToken && userSignedUp) {
      alreadyCalled = true;
      return <DrawerNavigator/>; 
    }
  
    if (userToken && !userSignedUp) {
      return <SignUpNav />;
    }

    
    if (mock == false) {
      return <Login />;
    }

    if (mock == true) {
      return <MockLogin/>;
    }

    return <EnvironmentOption/>

  };

  export default AuthHandler