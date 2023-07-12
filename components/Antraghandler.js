import Fuehrungszeugnis from "./AntragCards/Fuehrungszeugnis";
import ErwFuehrungszeugnis from "./AntragCards/ErwFuehrungszeugnis";


function AntragHandler ({antragAusstellerDaten, scrollY}){

     let document = <Fuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />


     if (antragAusstellerDaten.title == 'Fuehrungszeugnis'){
        document = <Fuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} scrollY = {scrollY} />
     } else if (antragAusstellerDaten.title == 'ErwFuehrungszeugnis') {
        document = <ErwFuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />
     };

    return ( document );
}

export default AntragHandler;