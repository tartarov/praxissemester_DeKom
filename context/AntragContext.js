import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { AuthContext } from "./AuthContext";

const AntragContext = createContext();

export function AntragProvider({ children }) {
  const [antragFile, setAntragFile] = useState(null);
  const [antragAusstellerDaten, setAntragAusstellerDaten] = useState([]);
  const [antragFileId, setAntragFileId] = useState(null);
  const [bearbeitungsstatus, setBearbeitungsstatus] = useState([]);
  const { isVerified } = useContext(AuthContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const ipAddress = "192.168.1.213";
  let isVarifiedVar;

  let initAntragAusstellerDaten = [
    {
      title: "Führungszeugnis",
      document: {
        ausstellDatum: "none",
        ausstellerName: "Mustermann",
        ausstellerVorname: "Max",
        ausstellerNummer: "K4BN2912A",
        einreichungsbehoerde: "keine Angabe",
        bearbeiitungsStatus: "in Bearbeitung",
        rueckverfolgungsnummer: "1357924680",
        antragFileId: "123",
      },
    },
    {
      title: "ErwFuehrungszeugnis",
      document: {
        ausstellDatum: "none",
        ausstellerName: "Mustermann",
        ausstellerVorname: "Max",
        ausstellerNummer: "K4BN2912A",
        einreichungsbehoerde: "keine Angabe",
        bearbeiitungsStatus: "keineAngabe",
        rueckverfolgungsnummer: "1357924680",
        antragFileId: "123",
      },
    },
  ];

  useEffect(() => {
    setBearbeitungsstatus(["in Bearbeitung", "in zustellung", "zugestellt"]);
  }, []);

  const addToListe = async (file, signatur) => {
    isVarifiedVar = isVerified;
    console.log("Hello :0 my file is: " + file);

    let respond = await fetch(`http://${ipAddress}:3000/user/save/antrag`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        file: file,
        signatur: signatur,
      }),
    });

    const responseJSON = await respond.json();
    console.log("MY RESPONSE JSON: " + responseJSON.body.value);

    const verificationStatus = await isVarifiedVar(responseJSON);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      getAntrag();
      console.log("respond contains true => success... YUHU");
      //  Alert.alert("Gespeichert!", "Deine Änderungen wurden gespeichert.");
    }
    console.log("addToListeTriggered");
  };

  const getAntrag = async () => {
    isVarifiedVar = isVerified;

    let respond = await fetch(`http://${ipAddress}:3000/user/identify/antrag`);

    const responseJSON = await respond.json();

    const verificationStatus = await isVarifiedVar(responseJSON);
    console.log(" responseJSON.body.value: " + responseJSON.body.value);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      setAntragFile(responseJSON.body.result);
      setAntragFileId(responseJSON.body.result);
      const updatedItems = [];

      for (let i = 0; i < responseJSON.body.result.length; i++) {
        let random = Math.floor(Math.random() * bearbeitungsstatus.length);
        let bearbeitungsStatusValue = bearbeitungsstatus[random];
        let antragColor;

        switch (bearbeitungsStatusValue) {
          case "in Bearbeitung":
            antragColor = "yellow";
            break;
          case "in zustellung":
            antragColor = "white";
            break;
          case "zugestellt":
            antragColor = "green";
            break;
          default:
            antragColor = "white";
        }

        updatedItems.push({
          title: "Führungszeugnis",
          document: {
            antragDir: responseJSON.body.result[i].ANTRAG,
            ausstellDatum: responseJSON.body.result[i].DATUM,
            antragId: responseJSON.body.result[i].ID,
            antragSignature: responseJSON.body.signature[i],
            ausstellerName: "Mustermann",
            ausstellerVorname: "Max",
            ausstellerNummer: "K4BN2912A",
            einreichungsbehoerde: "Stadt Köln",
            bearbeiitungsStatus: bearbeitungsStatusValue,
            rueckverfolgungsnummer: Math.floor(Math.random() * 1000000000),
            antragColor: antragColor,
          },
        });
      }

      setAntragAusstellerDaten(updatedItems);

      console.log("respond contains true => success... YUHU");
    } else if (
      verificationStatus == "verified" &&
      responseJSON.body.value == false
    ) {
      setAntragFileId(0);
      setAntragAusstellerDaten([]);
    }
  };

  const removeAntrag = async (antragId) => {
    setIsLoading(true);
    isVarifiedVar = isVerified;
    console.log("antragId:  " + antragId);
    let respond = await fetch(
      `http://${ipAddress}:3000/user/remove/antrag?antragId=${antragId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      }
    );

    const responseJSON = await respond.json();

    const verificationStatus = await isVarifiedVar(responseJSON);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      Alert.alert("Document removed successfully!");
      getAntrag();
    } else if (
      verificationStatus == "verified" &&
      responseJSON.body.value == false
    ) {
      Alert.alert("Some Error occured");
    }
    setIsLoading(false);
  };

  return (
    <AntragContext.Provider
      value={{
        antragFile,
        antragFileId,
        antragAusstellerDaten,
        isLoading,
        addToListe,
        getAntrag,
        removeAntrag,
      }}
    >
      {children}
    </AntragContext.Provider>
  );
}

export default AntragContext;
