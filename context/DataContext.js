import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const { isVerified } = useContext(AuthContext);

  let currentData = [
    {
      title: "Personalausweis",
      color: 'green',
      //location: 'Max, Mustermann',
      // date: 'Nov 17th, 2020',
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
      color: 'blue',
      //location: 'Max, Mustermann',
      // date: 'Sept 3rd, 2020',
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

  const getWalletData = async () => {
    let respond = await fetch(
      "http://192.168.178.173:3000/dekomdb.dekom_user/identify",
      {
        credentials: "same-origin",
      }
    );

    let respJson = await respond.json();
    let respStringy = JSON.stringify(respJson);
    console.log("respStringy" + respStringy);
    let respParsed = JSON.parse(respStringy);
    console.log("respParsed: " + respParsed.body.value);

    if (respParsed.body.value == true) {
      if ((await isVerified(respParsed)) == "verified") {
        //Data of Personalausweis
        currentData[0].document.name = respParsed.body.result[0].NAME;
        currentData[0].document.vorname = respParsed.body.result[0].VORNAME;
        currentData[0].document.geburtstag = respParsed.body.result[0].GEBURTSDATUM;
        currentData[0].document.geburtsort = respParsed.body.result[0].GEBURTSORT;
        currentData[0].document.staatsangehoerigkeit = respParsed.body.result[0].STAATSANGEHOERIGKEIT;

        //Data of Fuehrerschein
        currentData[1].document.name = respParsed.body.result[0].NAME;
        currentData[1].document.vorname = respParsed.body.result[0].VORNAME;
        currentData[1].document.geburtstag =
          respParsed.body.result[0].GEBURTSDATUM;
        currentData[1].document.geburtsort =
          respParsed.body.result[0].GEBURTSORT;

        setData(currentData);

        console.log("data : " + currentData[0].document.name);
      }
    }
  };

  const getUserData = async () => {
    let respond = await fetch(
      "http://192.168.178.173:3000/dekomdb.dekom_user/identify",
      {
        credentials: "same-origin",
      }
    );

    let respJson = await respond.json();
    let respStringy = JSON.stringify(respJson);
    console.log("respStringy" + respStringy);
    let respParsed = JSON.parse(respStringy);
    console.log("respParsed: " + respParsed.body.value);

    if (respParsed.body.value == true) {
      if ((await isVerified(respParsed)) == "verified") {

        let data = {
          name: respParsed.body.result[0].NAME,
          vorname: respParsed.body.result[0].VORNAME,
          geburtstag: respParsed.body.result[0].GEBURTSDATUM,
          geburtsort: respParsed.body.result[0].GEBURTSORT,
          staatsangehoerigkeit: respParsed.body.result[0].STAATSANGEHOERIGKEIT,
          strasse: respParsed.body.result[0].STRASSE,
          hausnummer: respParsed.body.result[0].HAUSNUMMER,
          plz: respParsed.body.result[0].PLZ,
          stadt: respParsed.body.result[0].STADT,
          signatur: respParsed.body.signature
        }


        console.log("data : " + data);
        return (data);
      }
    }
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
