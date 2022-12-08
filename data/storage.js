import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeCookie (cookie) {
// storing data
const saveCookie = async (cookie) => {
    try {
      await AsyncStorage.setItem("userCookie", JSON.stringify(cookie));
      console,log("Save executed");
    } catch (error) {
      console.log("Cookie-Error occured with Message: " + error);
    }
  };
}