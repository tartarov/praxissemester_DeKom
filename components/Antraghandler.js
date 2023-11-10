import Fuehrungszeugnis from "./AntragCards/Fuehrungszeugnis";
import ErwFuehrungszeugnis from "./AntragCards/ErwFuehrungszeugnis";
import React from "react";


function AntragHandler ({antragAusstellerDaten, scrollY, signature}){

     let document = <Fuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />


     if (antragAusstellerDaten.title == 'Führungszeugnis'){
        document = <Fuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} scrollY = {scrollY} signature={signature} />
     } else if (antragAusstellerDaten.title == 'ErwFuehrungszeugnis') {
        document = <ErwFuehrungszeugnis antragAusstellerDaten={antragAusstellerDaten} />
     };

    return ( document );
}

export default AntragHandler;