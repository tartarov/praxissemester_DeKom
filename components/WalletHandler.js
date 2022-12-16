import Ausweis from "./Ausweis";
import Fuehrerschein from "./Fuehrerschein";
import getUserDataByHash from '../data/dataTransfer';




function WalletHandler ({data}){
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