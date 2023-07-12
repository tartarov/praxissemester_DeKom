import { createContext, useState, useContext, useRef, useCallback } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { AuthContext } from "./AuthContext";

const AntragContext = createContext();

export function AntragProvider({ children }) {
  const [antragFile, setAntragFile] = useState(null);
  const [antragAusstellerDaten, setAntragAusstellerDaten] = useState([]);
  const [antragFileId, setAntragFileId] = useState(null);
  const [kommulierteAnträge, setKommulierteAnträge] = useState({});
  const { isVerified } = useContext(AuthContext);
  const ipAddress = "192.168.178.115";
  let isVarifiedVar;

  let initAntragAusstellerDaten = [
    {
      title: "Fuehrungszeugnis",
      document: {
        ausstellDatum: "none",
        ausstellerName: "Mustermann",
        ausstellerVorname: "Max",
        ausstellerNummer: "K4BN2912A",
        einreichungsbehoerde: "keine Angabe",
        bearbeiitungsStatus: "keine Angabe",
        rueckverfolgungsnummer: "1357924680",
        antragFileId: "123"
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
        antragFileId: "123"
      },
    },
  ];

  const addToListe = async (file) => {
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

    let respond = await fetch(
      `http://${ipAddress}:3000/user/identify/antrag`
    );

    const responseJSON = await respond.json();

    const verificationStatus = await isVarifiedVar(responseJSON);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      setAntragFile(responseJSON.body.result);
      setAntragFileId(responseJSON.body.result.length);

    //  console.log(responseJSON.body.result[0].ID);
    //  console.log(responseJSON.body.result[0].DATUM);
      console.log("respond contains true => success... YUHU");
    } else if (
      verificationStatus == "verified" &&
      responseJSON.body.value == false
    ) {
      setAntragFileId(0);
    }


    const updatedItems = [];
    for (let i = 0; i < responseJSON.body.result.length; i++) {
      updatedItems.push({
          title: "Fuehrungszeugnis",
          document: {
            ausstellDatum: responseJSON.body.result[i].DATUM,
            ausstellerName: "Mustermann",
            ausstellerVorname: "Max",
            ausstellerNummer: "K4BN2912A",
            einreichungsbehoerde: "Stadt Köln",
            bearbeiitungsStatus: "keine Angabe",
            rueckverfolgungsnummer: Math.floor(Math.random() * 1000000000),
            antragFileId: "123"
          },
      });

      updatedItems.document = {
        ...updatedItems.document, 
        antragFileId: responseJSON.body.result.length
      };  
    }
  

    setAntragAusstellerDaten(updatedItems);
  };

  return (
    <AntragContext.Provider
      value={{
        antragFile,
        antragFileId,
        antragAusstellerDaten,
        addToListe,
        getAntrag,
      }}
    >
      {children}
    </AntragContext.Provider>
  );
}

export default AntragContext;
