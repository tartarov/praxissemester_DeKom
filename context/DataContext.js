import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import AntragContext from "./AntragContext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const { isVerified } = useContext(AuthContext);
  const ipAddress = "dekom.ddns.net";

  let currentData = [
    {
      title: "Personalausweis ",
      title2: "Bundesrepublik Deutschland",
      color: "green",
      poster:
        "https://images.unsplash.com/photo-1561016444-14f747499547?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80",
      document: {
        name: "Mustermann",
        vorname: "Max",
        geburtstag: "01.01.1999",
        staatsangehoerigkeit: "DEUTSCH",
        geburtsort: "KÖLN",
        gueltigBis: "10.12.2030",
        dokumentTyp: "Perso",
        nummer: "K591MLO6G",
        can: "1 3 5 0 9 9",
      },
    },
    {
      title: "Führerschein",
      color: "blue",
      poster:
        "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      document: {
        name: "Mustermann",
        vorname: "Max",
        geburtstag: "01.01.1999",
        ausstellungsdatum: "17.04.18",
        geburtsort: "KÖLN",
        ablaufdatum: "12.03.32",
        nummer: "K591MLO6G",
        can: "135799",
        ausstellungsbehoerde: "Kreis Köln",
        type: "AM/B/L",
      },
    },
  ];

  const fetchData = async () => {
    const respond = await fetch(
      `https://dekom.ddns.net:4222/dekomdb.dekom_user/identify`,
      {
        credentials: "same-origin",
      }
    );
    const thisUser = await respond.json();
    setUserData(thisUser);
    return thisUser;
  };

  const getWalletData = async () => {
    let isAuthenticationInProgress = false;
    let thisUser;
    try {
      if (isAuthenticationInProgress == false) {
        thisUser = await SecureStore.getItemAsync("userToken", {
          requireAuthentication: false,
        });

        const personalInfo = jwtDecode(thisUser);
        console.log("personalInfo: " + personalInfo.user.vorname);
        const { NAME, VORNAME, GEBURTSDATUM, GEBURTSORT, STAATSANGEHOERIGKEIT } =
          personalInfo;
        /*
        if (thisUser.body.value !== true) {
          return;
        }
    
        const verificationStatus = await isVerified(thisUser);
    
        if (verificationStatus !== "verified") {
          return;
        }
        */
    
        console.log("NAME: " + NAME);
        //Data of Personalausweis
        currentData[0].document = {
          ...currentData[0].document,
          name: personalInfo.user.nachname,
          vorname: personalInfo.user.vorname,
          geburtstag: personalInfo.user.birthdate,
          gueltigBis: personalInfo.user.dateOfExpiry,
          geburtsort: personalInfo.user.placeOfBirth,
          staatsangehoerigkeit: personalInfo.user.nationality,
          dokumentTyp: personalInfo.user.documentType,
        };
    
        //Data of Fuehrerschein
        currentData[1].document = {
          ...currentData[1].document,
          name: NAME,
          vorname: VORNAME,
          geburtstag: GEBURTSDATUM,
          geburtsort: GEBURTSORT,
        };
    
        setData(currentData);

        isAuthenticationInProgress = true;
      }
    } catch (error) {
      console.log("auth already in progress");
    }
  };

  async function getUserData() {
    let isAuthenticationInProgress = false;
    let thisUser;

    thisUser = await SecureStore.getItemAsync("userToken", {
      requireAuthentication: true,
    });

    /*
    const verificationStatus = await isVerified(thisUser);

    if (verificationStatus !== "verified") {
      return;
    }

   

    if (thisUser.body.value !== true) {
      return;
    }
    */

    const personalInfo = jwtDecode(thisUser);
    console.log("personalInfo.user: " + JSON.stringify(personalInfo.user));

    let data = {
      name: personalInfo.user.nachname,
      vorname: personalInfo.user.vorname,
      geburtstag: personalInfo.user.birthdate,
      geburtstagTag: personalInfo.user.birthdateSub.birthday,
      geburtstagMonat: personalInfo.user.birthdateSub.birthmonth, 
      geburtstagJahr: personalInfo.user.birthdateSub.birthyear, 
      geburtsort: personalInfo.user.placeOfBirth,
      staatsangehoerigkeit: personalInfo.user.nationality,
      strasse: personalInfo.user.streetAdress,
     // hausnummer: HAUSNUMMER,
      plz: personalInfo.user.postalCode,
      stadt: personalInfo.user.locality,
      aussteller: personalInfo.user.issuingState,
    //  signatur: thisUser.body.signature,
    };
    return data;
  }

  return (
    <DataContext.Provider
      value={{
        getWalletData,
        data,
        userData,
        getUserData,
        fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
