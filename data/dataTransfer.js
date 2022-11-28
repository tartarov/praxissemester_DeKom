export default function dataTransfer(){

    const getUserDataByHash = async () => {
        respUserData = await fetch(
          "http://localhost:3000/user/data"
        );
        respUserData = await respUserData.json();
        resultData = JSON.stringify(respUserData);
        objData = JSON.parse(resultData);
        console.log(objData);
    }
    
}