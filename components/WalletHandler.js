import Ausweis from "./WalletCards/Ausweis";
import Fuehrerschein from "./WalletCards/Fuehrerschein";
import React from "react";

function WalletHandler ({data, refrence}){
    // getUserDataByHash();

     let document = <Ausweis data={data} />

     if (data.documentType == 'ID'){
      console.log("Ich bin im data. documentType!! == " + data.documentType )
        document = <Ausweis data={data} />
     } else if (data.title == 'Führerschein') {
        document = <Fuehrerschein data={data} />
     };


    return ( document );
}

export default WalletHandler;