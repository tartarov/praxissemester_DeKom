
export async function getUserDataByHash() {
  let respUserData;
  let resultData;
  let objData;
  console.log("ich bin im getUserDataByHash!");
  respUserData = await fetch("http://192.168.178.24:3000/user/data");
  respUserData = await respUserData.json();
  let respUserData2 = JSON.stringify(respUserData);
  objData = JSON.parse(respUserData2);
  item = objData
  let userName = item[0].NAME
  console.log(userName);
  return userName
}
