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
import Button from "../components/Buttons/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import Loader from "../components/animations/Loader";
const { width } = Dimensions.get("screen");

function You({ navigation }) {
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

        serUserId(decodedToken.user.pin);
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
      <SafeAreaView style={{ backgroundColor: "#3F4E4F", flex:1 }}>
        <Header navigation={navigation} />
        <View
          style={{
            backgroundColor: "#2C3639",
            width: 190,
            height: 230,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            marginLeft: width / 3.8,
            marginTop: width / 12,
            elevation: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: 150,
              height: 160,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginBottom: 10,
              elevation: 9,
            }}
          >
           {userId.length ?  <QRCode value={userId} size={120}  /> : <Loader/>}
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
            paddingHorizontal: 32,
            marginTop: width / 12,
            width: "100%",
          }}
        >
          <CustomText style={{ marginLeft: 10, color: "#DCD7C9" }}>
            Name
          </CustomText>
          <TextInput
            style={{ color: "#fff" }}
            placeholder={
              data[0].document.vorname +
              " " +
              data[0].document.name.charAt(0) +
              "."
            }
            autoCapitalize="none"
            autoCompleteType="cc-number"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            error={errors.name}
            onBlur={handleBlur("name")}
            onChangeText={handleChange("name")}
            value={values.name}
            onSubmitEditing={() => handleSubmit()}
          />
        </View>
        {/* <View style={{marginTop: 15, borderBottomColor: '#DCD7C9',borderBottomWidth: StyleSheet.hairlineWidth,}}/> */}
        <View
          style={{
            marginTop: width / 2,
            alignitems: "center",
            marginHorizontal: width / 5,
            paddingBottom: 95,
          }}
        >
          <Button title="signate" label="Code generieren"></Button>
        </View>
      </SafeAreaView>
    );
  } 

export default You;
