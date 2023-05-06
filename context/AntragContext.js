import { createContext, useState, useContext } from "react";
import { Alert } from "react-native";
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

    let respond = await fetch("http://192.168.178.24:3000/user/save/antrag", {
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
      console.log("respond contains true => success... YUHU");
      Alert.alert("Gespeichert!", "Deine Änderungen wurden gespeichert.");
    }

    console.log("addToListeTriggered");
    console.log("file: " + file);
    setAntragFile((prevState) => [...prevState, { file }]);
  };

  const getAntrag = async () => {
    isVarifiedVar = isVerified;
    console.log("guten tag.");

    let respond = await fetch("http://192.168.178.24:3000/user/identify/antrag");

    console.log("MY RESPONSE is ready");
    const responseJSON = await respond.json();
    //console.log("MY RESPONSE : " + JSON.stringify(respond));
    console.log("MY RESPONSE JSON: " + responseJSON.body.result[0].ANTRAG);
    setAntragFile(responseJSON.body.result[0].ANTRAG);
    setAntragFileId(responseJSON.body.result[0].ID);

    const verificationStatus = await isVarifiedVar(responseJSON);

    if (verificationStatus == "verified" && responseJSON.body.value == true) {
      console.log("respond contains true => success... YUHU");
      Alert.alert("Gespeichert!", "Deine Änderungen wurden gespeichert.");
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
