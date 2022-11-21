import Ausweis from "./Ausweis";
import Fuehrerschein from "./Fuehrerschein";

function WalletHandler ({data}){
     let document = <Ausweis data={data} />

     if (data.title == 'Personalausweis'){
        document = <Ausweis data={data} />
     } else if (data.title == 'Führerschein') {
        document = <Fuehrerschein data={data} />
     };


    return ( document );
}

export default WalletHandler;