import Fuehrungszeugnis from "./AntragCards/Fuehrungszeugnis";
import ErwFuehrungszeugnis from "./AntragCards/ErwFuehrungszeugnis";

function AntragHandler ({antragAusstellerDaten}){

     let document = <Fuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />


     if (antragAusstellerDaten.title == 'Fuehrungszeugnis'){
        document = <Fuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />
     } else if (antragAusstellerDaten.title == 'ErwFuehrungszeugnis') {
        document = <ErwFuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />
     };

    return ( document );
}

export default AntragHandler;