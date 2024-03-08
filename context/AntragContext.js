import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Alert, useWindowDimensions } from "react-native";
import { object } from "yup";
import { AuthContext } from "./AuthContext";

const AntragContext = createContext();

export function AntragProvider({ children }) {
  const [antragFile, setAntragFile] = useState(null);
  const [antragAusstellerDaten, setAntragAusstellerDaten] = useState([]);
  const [desiredAntrag, setDesiredAntrag] = useState({});
  const [antragFileId, setAntragFileId] = useState(null);
  const [bearbeitungsstatus, setBearbeitungsstatus] = useState([]);
  const { isVerified } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formBlock, setFormBlock] = useState(0);
  const [formBlockAttributes, setFormBlockAttributes] = useState(0);
  const [contentInsideBlock, setContentInsideBlock] = useState(null);
  const [formData, setFormData] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [caseID, setCaseID] = useState("");
  const [schemaUri, setSchemaUri] = useState("")
  const [antragTitle, setAntragTitle] = useState("none")
  const ipAddress = "dekom.ddns.net";
  let isVarifiedVar;

  const openPinInput = useCallback((antragdetail) => {
    antragdetail.current.expand();
  }, []);

  useEffect(() => {
    setBearbeitungsstatus(["in Bearbeitung", "in zustellung", "zugestellt"]);
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const sendAntrag = async (filledAntrag, antragRef, antragTitle) => {
    console.log("FILLEDANTRAG: " + JSON.stringify(filledAntrag));
    console.log("und unser AntragTitle ist: " + antragTitle);
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        antrag: filledAntrag,
        schemaUri: schemaUri,
      }),
    };

    const response = await fetch(
      "https://dekom.ddns.net:4222/user/send/antrag",
      requestOptions
    );

    const antrag = await response.json();

    if (antrag.body.value === true) {
      console.log("True ist eben true");
      const tokenObject = JSON.parse(antrag.token);
      const caseID = tokenObject.caseID;
      const submissionID = tokenObject.submissionID;
      const submissionStatus = tokenObject.submissionStatus;
      console.log("caseID: " + caseID);
      console.log("submissionID: " + submissionID)
      console.log("submissionStatus: " + submissionStatus)
      setCaseID(caseID);
      const toListeAdded = addToListe(caseID, submissionID, submissionStatus, antragTitle, null);
      if (toListeAdded) {
        openPinInput(antragRef);
      }
    }
  };

  const fillAntrag = async (antragPiece) => {
    const updatedFormData = { ...formData };

    for (const [key, value] of Object.entries(antragPiece)) {
      const keyParts = key.split(".");
      let currentObject = updatedFormData;
      for (let i = 0; i < keyParts.length - 1; i++) {
        const part = keyParts[i];
        if (part.startsWith("G")) {
          if (!currentObject[part]) {
            currentObject[part] = {};
          }
          currentObject = currentObject[part];
        }
      }

      const fObject = keyParts[keyParts.length - 1];
      if (currentObject[fObject]) {
        console.log(`Das F-Objekt ${fObject} existiert bereits im G-Objekt.`);
      }
      currentObject[fObject] = value;
    }
    setFormData(updatedFormData);

    console.log("Filled Antrag:", updatedFormData);
  };

  const getSchemaURi = async (leikaKey) => {

    const response = await fetch(
      `https://dekom.ddns.net:4222/user/antrag/get/schemaUri?leikaKey=${leikaKey}`
    );

    const schemaData = await response.json();
    console.log("schemaData ist: " + schemaData.token.schemaUri)
    setSchemaUri(schemaData.token.schemaUri)
    return schemaData.token.schemaJson;
  };

  async function getContentFormBlock(leikaKey) {
    setIsLoading(true);
    const schema = await getSchemaURi(leikaKey);
    if (schema) {
      const contentFormBlocks = [];
      const processedGObjects = new Set();
      const usedFObjects = new Set(); // Hier werden alle verwendeten F-Objekte gespeichert

      const processObject = (gObject, currentPath = []) => {
        const gObjectData = {
          name: currentPath[currentPath.length - 1],
          type: gObject.type,
          title: gObject.title,
          properties: [],
        };

        if (gObject.properties) {
          Object.keys(gObject.properties).forEach((key) => {
            const nextGObject = schema.$defs[key];
            const newPath = [...currentPath, key];

            if (key.startsWith("G")) {
              processedGObjects.add(key);
              const nestedGObject = processObject(nextGObject, newPath);
              gObjectData.properties.push(nestedGObject);
            } else if (key.startsWith("F")) {
              const fObjectName = key;
              const fObjectInSchema = schema.$defs[fObjectName];
              const fObjectData = {
                name: key,
                type: fObjectInSchema ? fObjectInSchema.type : null,
                title: fObjectInSchema ? fObjectInSchema.title : null,
                array: gObject.properties[key].type === "array",
                enum: fObjectInSchema ? fObjectInSchema.enum : null,
                format: fObjectInSchema ? fObjectInSchema.format : null,
                description: fObjectInSchema
                  ? fObjectInSchema.description
                  : null,
                path: newPath.join("."),
              };
              gObjectData.properties.push(fObjectData);
              // Füge das F-Objekt zu den verwendeten F-Objekten hinzu
              usedFObjects.add(key);
            }
          });
        }
        return gObjectData;
      };

      Object.keys(schema.$defs).forEach((gObjectName) => {
        const gObject = schema.$defs[gObjectName];
        if (
          gObjectName.startsWith("G") &&
          !processedGObjects.has(gObjectName)
        ) {
          processedGObjects.add(gObjectName);
          const gObjectData = processObject(gObject, [gObjectName]);
          contentFormBlocks.push(gObjectData);
        }
      });

      // Finde ungenutzte F-Objekte
      const gObjectData = {
        name: null,
        type: "Ghost",
        title: "Weiteres",
        properties: [],
      };
      const unusedFObjects = [];
      Object.keys(schema.$defs).forEach((fObjectName) => {
        if (fObjectName.startsWith("F") && !usedFObjects.has(fObjectName)) {
          const fObjectInSchema = schema.$defs[fObjectName];
          const fObjectData = {
            name: fObjectName,
            type: fObjectInSchema ? fObjectInSchema.type : null,
            title: fObjectInSchema ? fObjectInSchema.title : null,
          };
          if (fObjectData.type && fObjectData.title) {
            gObjectData.properties.push(fObjectData);
          }
        }
      });

      contentFormBlocks.push(gObjectData);
      setContentInsideBlock(contentFormBlocks);
      countProperties(contentFormBlocks);
      setIsLoading(false);
      return contentFormBlocks;
    }
  }

  const countProperties = (contentInsideBlock) => {
    let totalCount = 0;
    contentInsideBlock.forEach((obj) => {
      totalCount += obj.length;
    });
    setTotalCount(totalCount);
    return totalCount;
  };

  function createNestedObject(formData) {
    const nestedObject = {}; // Das äußere Objekt

    // Iteriere über die Schlüssel im FormData-Objekt
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const [gNumber, fNumber] = key.split(","); // Trenne den Schlüssel in G- und F-Nummerierungen

        // Wenn die G-Nummerierung bereits im nestedObject existiert, füge die F-Nummerierung mit Wert hinzu
        if (nestedObject.hasOwnProperty(gNumber)) {
          nestedObject[gNumber][fNumber] = formData[key];
        } else {
          // Wenn die G-Nummerierung nicht im nestedObject existiert, erstelle sie und füge die F-Nummerierung mit Wert hinzu
          nestedObject[gNumber] = { [fNumber]: formData[key] };
        }
      }
    }

    console.log("NESTEDOBJECT ISSSSS:" + JSON.stringify(nestedObject));
    return nestedObject;
  }

  async function extractFObjectsWithTitles(contentFormBlocks) {
    const schema = await getSchemaURi();

    const fObjectsWithTitleAndType = {};
    const fArrayWithTitleAndType = [];

    Object.keys(contentFormBlocks).forEach((gObjectName) => {
      contentFormBlocks.forEach((fKey) => {
        const fObject = schema.token.$defs[contentFormBlocks];

        if (fObject && fObject.title && fObject.type) {
          fObjectsWithTitleAndType[fKey] = {
            title: fObject.title,
            type: fObject.type,
          };
        }
      });
    });

    return fObjectsWithTitleAndType;
  }

  const addToListe = async (file, submissionID, submissionStatus, antragName, signatur) => {
    isVarifiedVar = isVerified;

    console.log("antragName: " + antragName)
    let respond = await fetch(`https://${ipAddress}:4222/user/save/antrag`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        file: file,
        signatur: signatur ? signatur : null,
        antragName: antragName,
        submissionID: submissionID,
        submissionStatus: submissionStatus,
      }),
    });

    const responseJSON = await respond.json();

    const verificationStatus = await isVarifiedVar(responseJSON);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      console.log("respond contains true => success... YUHU");
    }

    getAntrag();
    return true;
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

        console.log("responseJSON.body.result[i].STATUS: " + responseJSON.body.result[i].STATUS)
        switch (responseJSON.body.result[i].STATUS) {
          case "SUBMITTED":
            antragColor = "blue";
            break;
          case "REJECTED":
            antragColor = "red";
            break;
          case "ACCEPTED":
            antragColor = "green";
            break;
          default:
            antragColor = "white";
        }

        updatedItems.push({
          title: responseJSON.body.result[i].ANTRAGSNAME,
          document: {
            antragDir: responseJSON.body.result[i].ANTRAG,
            ausstellDatum: responseJSON.body.result[i].DATUM,
            antragId: responseJSON.body.result[i].ID,
            antragSignature: responseJSON.body.signature[i],
            ausstellerName: "Mustermann",
            ausstellerVorname: "Max",
            ausstellerNummer: "K4BN2912A",
            einreichungsbehoerde: "Stadt Köln",
            bearbeitungsStatus: responseJSON.body.result[i].STATUS,
            caseID: responseJSON.body.result[i].CASE_ID,
            submissionID:  responseJSON.body.result[i].SUBMISSION_ID,
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
        title:  responseJSON.body?.result[0]?.ANTRAGSNAME,
        document: {
          antragDir: responseJSON.body?.result[0]?.ANTRAG,
          ausstellDatum: responseJSON.body?.result[0]?.DATUM,
          antragId: responseJSON.body?.result[0]?.ID,
          antragSignature: responseJSON.body?.signature,
          ausstellerName: "Mustermann",
          ausstellerVorname: "Max",
          ausstellerNummer: "K4BN2912A",
          einreichungsbehoerde: "Stadt Köln",
          caseID: responseJSON.body.result[i].ANTRAG,
          rueckverfolgungsnummer: Math.floor(Math.random() * 1000000000),
        },
      };
      setDesiredAntrag(foundAntrag);
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
        formData,
        totalCount,
        caseID,
        antragTitle,
        sendAntrag,
        createNestedObject,
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
