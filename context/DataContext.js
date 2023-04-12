import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const { isVerified } = useContext(AuthContext);
  const ipAddress = "192.168.178.183";

  let currentData = [
    {
      title: "Personalausweis",
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
        nummer: "K591MLO6G",
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
        ausstellungsbehoerde: "Kreis Köln",
        type: "AM/B/L",
      },
    },
  ];

  const fetchData = async () => {
    const respond = await fetch(
      `http://192.168.178.184:3000/dekomdb.dekom_user/identify`,
      {
        credentials: "same-origin",
      }
    );
    const thisUser = await respond.json();
    return thisUser;
  };

  const getWalletData = async () => {
    const thisUser = await fetchData();
    const personalInfo = thisUser.body.result[0];
    const { NAME, VORNAME, GEBURTSDATUM, GEBURTSORT, STAATSANGEHOERIGKEIT } =
      personalInfo;

    if (thisUser.body.value !== true) {
      return;
    }

    const verificationStatus = await isVerified(thisUser);

    if (verificationStatus !== "verified") {
      return;
    }
    //Data of Personalausweis
    currentData[0].document = {
      ...currentData[0].document,
      name: NAME,
      vorname: VORNAME,
      geburtstag: GEBURTSDATUM,
      geburtsort: GEBURTSORT,
      staatsangehoerigkeit: STAATSANGEHOERIGKEIT,
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
  };

  const getUserData = async () => {
    const thisUser = await fetchData();
    const personalInfo = thisUser.body.result[0];
    const {
      NAME,
      VORNAME,
      GEBURTSDATUM,
      GEBURTSORT,
      STAATSANGEHOERIGKEIT,
      STRASSE,
      HAUSNUMMER,
      PLZ,
      STADT,
    } = personalInfo;

    if (thisUser.body.value !== true) {
      return;
    }

    const verificationStatus = await isVerified(thisUser);

    if (verificationStatus !== "verified") {
      return;
    }

    let data = {
      name: NAME,
      vorname: VORNAME,
      geburtstag: GEBURTSDATUM,
      geburtsort: GEBURTSORT,
      staatsangehoerigkeit: STAATSANGEHOERIGKEIT,
      strasse: STRASSE,
      hausnummer: HAUSNUMMER,
      plz: PLZ,
      stadt: STADT,
      signatur: thisUser.body.signature,
    };
    return data;
  };

  return (
    <DataContext.Provider
      value={{
        getWalletData,
        data,
        getUserData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
