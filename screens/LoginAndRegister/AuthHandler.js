import React, { useContext, useEffect } from "react";
import Login from "./Login";
import SignUpNav from "./SignUpFlow/SignUpNav";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/animations/Loader";
import DrawerNavigator from "../../navigations/DrawerNavigator";

let alreadyCalled = false;
 function AuthHandler () {
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
        console.log("Hey")
      }
    }, []);
  
    if (userToken && userSignedUp) {
      alreadyCalled = true;
      console.log("Hey2")
      return <DrawerNavigator/>; 
    }
  
    if (userToken && !userSignedUp) {
      console.log("Hey3")
      return <SignUpNav />;
    }

    console.log("Hey4")
    return <Login />;
  };

  export default AuthHandler