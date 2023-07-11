import Ausweis from "./WalletCards/Ausweis";
import Fuehrerschein from "./WalletCards/Fuehrerschein";

function WalletHandler ({data, refrence}){
    // getUserDataByHash();

     let document = <Ausweis data={data} />

     if (data.title == 'Personalausweis'){
        document = <Ausweis data={data} />
     } else if (data.title == 'Führerschein') {
        document = <Fuehrerschein data={data} />
     };


    return ( document );
}

export default WalletHandler;