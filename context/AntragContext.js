import { createContext, useState, useContext, useRef, useCallback } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { AuthContext } from "./AuthContext";

const AntragContext = createContext();

export function AntragProvider({ children }) {
  const [antragFile, setAntragFile] = useState(null);
  const [antragFileId, setAntragFileId] = useState(null);
  const { isVerified } = useContext(AuthContext);
  let isVarifiedVar;

  const addToListe = async (file) => {
    isVarifiedVar = isVerified;
    console.log("Hello :0 my file is: " + file);

    let respond = await fetch("http://192.168.178.129:3000/user/save/antrag", {
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
      "http://192.168.178.129:3000/user/identify/antrag"
    );

    const responseJSON = await respond.json();

    const verificationStatus = await isVarifiedVar(responseJSON);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      setAntragFile(responseJSON.body.result);
      setAntragFileId(responseJSON.body.result.length);

      console.log(responseJSON.body.result.length);
      console.log("respond contains true => success... YUHU");
    } else if (
      verificationStatus == "verified" &&
      responseJSON.body.value == false
    ) {
      setAntragFileId(0);
    }
  };

  return (
    <AntragContext.Provider
      value={{
        antragFile,
        antragFileId,
        addToListe,
        getAntrag,
      }}
    >
      {children}
    </AntragContext.Provider>
  );
}

export default AntragContext;
