import React, { useState, useContext, useEffect } from "react";
import { View, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataContext } from "../context/DataContext";
import { Header } from "../components/Header";
import QRCode from "react-native-qrcode-svg";
import CustomText from "../components/Font";
import TextInput from "../components/TextInput";
import { useFormik } from "formik";
import LogoText from "../components/LogoFont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import Loader from "../components/animations/Loader";
import ButtonGhost from "../components/Buttons/ButtonGhost";

const { width } = Dimensions.get("screen");

function ScanMe({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const { data, getWalletData } = useContext(DataContext);
  const [nameVar, setNameVar] = useState("");
  const [userId, serUserId] = useState("");

  const getData = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log("AsyncStorage JWT token: " + data);
        const decodedToken = jwtDecode(data);

        serUserId(decodedToken.user.vorname, decodedToken.user.streetAddress);
        return decodedToken.user.pin;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const userToken = await getData("userToken");
      console.log("yourKey Value:  " + userToken);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      await fetchUserData();
    }
    getUserData();
    getWalletData();
    setIsLoading(false);
  }, []);

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { name: "" },
      onSubmit: (values) => {
        console.log(values);
        setNameVar(values);
      },
    });

 // if (userId.length) {
    return (
      <SafeAreaView style={{ backgroundColor: "#2C3639", flex:1}}>
        <View
          style={{
            backgroundColor: "#3F4E4F",
            width: 410,
            height: 530,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            marginTop: width / 12,
            elevation: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: 380,
              height: 380,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginBottom: 10,
              elevation: 9,
            }}
          >
           {userId.length ?  <QRCode value={userId} size={350}  /> : <Loader/>}
          </View>
          <LogoText
            style={{ marginTop: 5, color: "#DCD7C9", alignItems: "center" }}
          >
            {nameVar.name
              ? nameVar.name
              : data[0].document.vorname +
                " " +
                data[0].document.name.charAt(0) +
                "."}{" "}
          </LogoText>
        </View>
        <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 70,
        }}
      >
        <ButtonGhost
          title="Back to home"
          label="Zurück zu Home"
          onPress={() => {
            navigation.navigate("Home")
          }}
        />
      </View>
      </SafeAreaView>
    );
  } 

export default ScanMe;
