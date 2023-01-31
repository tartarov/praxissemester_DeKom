let htmlVorname = "Marcel";
let htmlNachname = "Grund";
let htmlGeburtsname ="Grund";
let htmlName = htmlVorname + " " + htmlNachname;

let htmlStraße = "Rezagstraße";
let htmlHausnummer = "23";
let htmlAdresse = htmlStraße + " " + htmlHausnummer;

let htmlPostleitzahl = "51143";
let htmlStadt = "Köln";
let htmlOrt = htmlPostleitzahl + " " + htmlStadt;

let htmlGeburtsdatum = "16.05.2001";
let htmlGeburtsort = "Köln";
let htmlStaatsangehörigkeit = "Deutschland";

let hmtlCheckBox1 = false;
let hmtlCheckBox2 = true;
let hmtlCheckBox3 = true;
let hmtlCheckBox4 = true;
let hmtlCheckBox5 = true;
let hmtlCheckBox6 = true;
let hmtlCheckBox7 = true;
let hmtlCheckBox8 = true;
let hmtlCheckBox9 = true;
let hmtlCheckBox10 = true;

let htmlEinsichtLand = "Deutschland";
let htmlBezahlungDatum = "01.01.2022";

let htmlVerwendungszweck = "Bewerbung";
let htmlBezeichung = "Keine Ahnung bro";
let htmlAnschrift = "HierGasse 3, 12345 Bielefeld";

var antragPageOne = document.getElementById("AntragPageOne");
var antragPageTwo = document.getElementById("AntragPageTwo");

if(antragPageOne){
var nameHolder = document.getElementById("nameHolder").innerHTML = htmlName;
var adressHolder = document.getElementById("adresseHolder").innerHTML = htmlAdresse;
var ortHolder = document.getElementById("ortHolder").innerHTML = htmlOrt;
var checkBox1 = document.getElementById("checkBox1").checked = hmtlCheckBox1;
var checkBox2 = document.getElementById("checkBox2").checked = hmtlCheckBox2;
var checkBox3 = document.getElementById("checkBox3").checked = hmtlCheckBox3;
var checkBox4 = document.getElementById("checkBox4").checked = hmtlCheckBox4;
var checkBox5 = document.getElementById("checkBox5").checked = hmtlCheckBox5;
var checkBox6 = document.getElementById("checkBox6").checked = hmtlCheckBox6;
var checkBox7 = document.getElementById("checkBox7").checked = hmtlCheckBox7;
var checkBox8 = document.getElementById("checkBox8").checked = hmtlCheckBox8;
var checkBox9 = document.getElementById("checkBox9").checked = hmtlCheckBox9;
var checkBox10 = document.getElementById("checkBox10").checked = hmtlCheckBox10;
var einsichtLandHolder = document.getElementById("einsichtLandHolder").innerHTML = document.getElementById("einsichtLandHolder").innerHTML.replace("LAND", htmlEinsichtLand);
var bezahlungDatumHolder = document.getElementById("bezahlungDatumHolder").innerHTML = document.getElementById("bezahlungDatumHolder").innerHTML.replace("DATUM", htmlBezahlungDatum);
var geburtsnameHolder = document.getElementById("geburtsnameHolder").innerHTML = document.getElementById("geburtsnameHolder").innerHTML.replace("NAME", htmlGeburtsname);
var familiennameHolder = document.getElementById("familiennameHolder").innerHTML = document.getElementById("familiennameHolder").innerHTML.replace("NAME", htmlNachname);
var vornameHolder = document.getElementById("vornameHolder").innerHTML = document.getElementById("vornameHolder").innerHTML.replace("NAME", htmlVorname);
var geburtsdatumHolder = document.getElementById("geburtsdatumHolder").innerHTML = document.getElementById("geburtsdatumHolder").innerHTML.replace("DATUM", htmlGeburtsdatum);
var geburtsortHolder = document.getElementById("geburtsortHolder").innerHTML = document.getElementById("geburtsortHolder").innerHTML.replace("ORT", htmlGeburtsort);
var staatsangehörigkeitHolder = document.getElementById("staatsangehörigkeitHolder").innerHTML = document.getElementById("staatsangehörigkeitHolder").innerHTML.replace("LAND", htmlStaatsangehörigkeit);
}
if(antragPageTwo){
var verwendungszweckHolder = document.getElementById("verwendungszweckHolder").innerHTML = document.getElementById("verwendungszweckHolder").innerHTML.replace("ZWECK", htmlVerwendungszweck);
var bezeichnungHolder = document.getElementById("bezeichnungHolder").innerHTML = document.getElementById("bezeichnungHolder").innerHTML.replace("BEZEICHNUNG", htmlBezeichung);
var anschriftHolder = document.getElementById("anschriftHolder").innerHTML = document.getElementById("anschriftHolder").innerHTML.replace("ANSCHRIFT", htmlAnschrift);
}