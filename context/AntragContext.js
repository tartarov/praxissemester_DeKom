import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { AuthContext } from "./AuthContext";

const AntragContext = createContext();

export function AntragProvider({ children }) {
  const [antragFile, setAntragFile] = useState(null);
  const [antragAusstellerDaten, setAntragAusstellerDaten] = useState([]);
  const [desiredAntrag, setDesiredAntrag] = useState({});
  const [antragFileId, setAntragFileId] = useState(null);
  const [bearbeitungsstatus, setBearbeitungsstatus] = useState([]);
  const { isVerified } = useContext(AuthContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const [formBlock , setFormBlock] = useState(0);
  const [formBlockAttributes, setFormBlockAttributes] = useState(0)
  const [contentInsideBlock, setContentInsideBlock] = useState(null)
  const ipAddress = "dekom.ddns.net";
  let isVarifiedVar;

  useEffect(() => {
    setBearbeitungsstatus(["in Bearbeitung", "in zustellung", "zugestellt"]);
  }, []);

  const sendAntrag = async (schema) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schema),
    };

    const response = await fetch(
      "https://dekom.ddns.net:4222/user/send/antrag",
      requestOptions
    );

    const antrag = await response.json();

    console.log(antrag);

    console.log(typeof antrag.body.value);

    if (antrag.body.value === true) {
      console.log("True ist eben true");
      openPinInput();
    }
  };

  const fillAntrag = async () => {
    const schema = await getSchemaURi();

 //  const readySchema = await fillOutSchema(schema);

  const readySchema = getFormBlocksCount(schema);
  console.log("im FillAntrag ist das Schema: " + JSON.stringify(readySchema));

    await sendAntrag(readySchema);
  };

  const getSchemaURi = async () => {
    const response = await fetch(
      "https://dekom.ddns.net:4222/user/antrag/get/schemaUri"
    );

    const schemaJson = await response.json();

    return schemaJson;
  };

  async function getContentFormBlock() {
    const schema = await getSchemaURi();
    const contentFormBlocks = [];
    let countObjectsStartingWithG = 0;

    
    Object.keys(schema.token.$defs).forEach(gObjectName => {
        const gObject = schema.token.$defs[gObjectName];
        const gObjectData = {
            name: gObjectName,
            type: gObject.type,
            title: gObject.title,
            properties: []
        };

        if (gObjectName.startsWith("G")) {
            countObjectsStartingWithG++;
            let countObjectsStartingWithF = 0;
            
            if (gObject && gObject.properties) {
                Object.keys(gObject.properties).forEach(key => {
                    if (key.startsWith("F")) {
                      countObjectsStartingWithF++
                        const fObjectName = key;
                        const fObjectInSchema = schema.token.$defs[fObjectName];
                        const fObjectData = {
                            name: fObjectName,
                            type: fObjectInSchema ? fObjectInSchema.type : null,
                            title: fObjectInSchema ? fObjectInSchema.title : null
                        };
                       
                        console.log("countObjectsStartingWithF: " + countObjectsStartingWithF)
                        gObjectData.properties.push(fObjectData);
                    }
                });
            }

            contentFormBlocks.push(gObjectData);
        }
    });

    console.log("Inhalt von contentFormBlocks: " + JSON.stringify(contentFormBlocks));
    setFormBlock(countObjectsStartingWithG);
    setFormBlockAttributes(countObjectsStartingWithF)
    setContentInsideBlock(contentFormBlocks);
    return contentFormBlocks;
  }

/*
 async function getFormBlocksCount(contentFormBlocks) {
    
    console.log("contentFormBlocks: " + contentFormBlocks)
  const filteredObjects = {};
   let countObjectsStartingWithG = 0;

  Object.keys(contentFormBlocks).forEach(key => {
    console.log("KEY: " + key.startsWith("G"))
    if (key.startsWith("G")) {
      filteredObjects[key] = contentFormBlocks[key];
       countObjectsStartingWithG++;
    }
  });
  

  setFormBlock(countObjectsStartingWithG)
  return filteredObjects;
}
*/

async function extractFObjectsWithTitles(contentFormBlocks) {
  console.log("HalliHallo hier ist euer MOSCHUSSS")

  const schema = await getSchemaURi();

  const fObjectsWithTitleAndType = {};
  const fArrayWithTitleAndType = [];

  console.log("contentFormBlocks in extractFObjectsWithTitles "+ contentFormBlocks)
  // Iteriere über jedes G-Objekt im contentFormBlocks
  Object.keys(contentFormBlocks).forEach(gObjectName => {

    // Iteriere über jedes F-Objekt im aktuellen G-Objekt
    contentFormBlocks.forEach(fKey => {
      const fObject = schema.token.$defs[contentFormBlocks];

      // Überprüfe, ob das F-Objekt die inneren Schlüssel "title" und "type" hat
      if (fObject && fObject.title && fObject.type) {
        // Lege das F-Objekt mit "title" und "type" in das neue Objekt
        fObjectsWithTitleAndType[fKey] = {
          title: fObject.title,
          type: fObject.type
        };
      }
    });
  });

  console.log("fObjectsWithTitleAndType: " + JSON.stringify(fObjectsWithTitleAndType))
  return fObjectsWithTitleAndType;
}

  const addToListe = async (file, signatur) => {
    isVarifiedVar = isVerified;

    let respond = await fetch(`https://${ipAddress}:4222/user/save/antrag`, {
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

    const verificationStatus = await isVarifiedVar(responseJSON);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      
      console.log("respond contains true => success... YUHU");
    }
    console.log("addToListeTriggered");
    getAntrag();
  };

  const getAntrag = async () => {
    isVarifiedVar = isVerified;

    let respond = await fetch(`https://${ipAddress}:4222/user/identify/antrag`);

    const responseJSON = await respond.json();

    const verificationStatus = await isVarifiedVar(responseJSON);

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
            bearbeitungsStatus: bearbeitungsStatusValue,
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

  const getAntragById = async (antragId) => {
    setIsLoading(true);
    isVarifiedVar = isVerified;
    let respond = await fetch(
      `https://${ipAddress}:4222/user/getById/antrag?antragId=${antragId}`,
      {
        method: "GET",
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
      const foundAntrag = {
        title: "Führungszeugnis",
        document: {
          antragDir: responseJSON.body?.result[0]?.ANTRAG,
          ausstellDatum: responseJSON.body?.result[0]?.DATUM,
          antragId: responseJSON.body?.result[0]?.ID,
          antragSignature: responseJSON.body?.signature,
          ausstellerName: "Mustermann",
          ausstellerVorname: "Max",
          ausstellerNummer: "K4BN2912A",
          einreichungsbehoerde: "Stadt Köln",
          rueckverfolgungsnummer: Math.floor(Math.random() * 1000000000),
        },
      };
      setDesiredAntrag(foundAntrag)
    } else if (
      verificationStatus == "verified" &&
      responseJSON.body.value == false
    ) {
      Alert.alert("Some Error occured");
    }
    setIsLoading(false);
  };

  const removeAntragById = async (antragId) => {
    setIsLoading(true);
    isVarifiedVar = isVerified;
    let respond = await fetch(
      `https://${ipAddress}:4222/user/remove/antrag?antragId=${antragId}`,
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
        desiredAntrag,
        isLoading,
        formBlock,
        contentInsideBlock,
        formBlockAttributes,
        extractFObjectsWithTitles,
        getContentFormBlock,
        fillAntrag,
     //   getFormBlocksCount,
        addToListe,
        getAntrag,
        removeAntrag: removeAntragById,
        getAntragById,
      }}
    >
      {children}
    </AntragContext.Provider>
  );
}

export default AntragContext;
