import Button from "../components/Button";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import ButtonGhost from "../components/ButtonGhost";

let html;

export default function ExportPDFTestScreen({route, navigation}) {
let antragData = route.params.antragData;
let antragDataStringy = JSON.stringify(antragData);
console.log("Antrag Data:  " + antragDataStringy);


const { getUserData } = useContext(DataContext);

function getCheckBoxValue(boolean){
    if(boolean == true) {
        return "checked";
    } else {
        return "";
    };
};

  async function loadUserData() {
    data = await getUserData();
    console.log("DIE SIGNATUR IN DER HTML:" + data.signatur)

    const userData = {
      vorname: data.vorname,
      name: data.name,
      geburtsname: data.name,

      straße: data.strasse,
      hausnummer: data.hausnummer,

      postleitzahl: data.plz,
      stadt: data.stadt,

      geburtsdatum: data.geburtstag,
      geburtsort: data.geburtsort,
      staatsangehörigkeit: data.staatsangehoerigkeit,
      signatur: data.signatur,

  einsichtsland: antragData.konsulatLand,
  bezahlungsdatum: antragData.zahlungsDatum,

  verwendungszweck: antragData.verwendungszweck,
  bezeichung: antragData.behörde,
  anschrift: antragData.anschriftBehörde,

  checkbox1: getCheckBoxValue(antragData.normales),  //Führungszeugnis
  checkbox2: getCheckBoxValue(antragData.erweitertes),  //erweitertes Führungszeugnis
  checkbox3: getCheckBoxValue(antragData.übersendungPrivat), //Übersendung an PrivatAnschrift
  checkbox4: getCheckBoxValue(antragData.übersendungBehörde), //Vorlage bei Behörde
  checkbox7: getCheckBoxValue(antragData.einsichtÜbersendungBotschaft), //Deutsche Botschaft
  checkbox8: getCheckBoxValue(antragData.einsichtÜbersendungKonsulat), //Deutsches Konsulat in Land zur Einsichtnahme
  checkbox9: getCheckBoxValue(antragData.bezahlungDeKom), //Gebühr bereits bezahlt
  checkbox10: getCheckBoxValue(antragData.bezahlungBereitsGemacht), //überwiesen an Datum auf das Bundesamt für Justiz Konto
}

 html = `
 <!doctype html>
 <html id="Test">
 
 <head>
     <title>Antrag</title>
     <meta name="description" content="Our first page">
 </head>
 
 <body>
     <page id="AntragPageOne" style="background: white;
     display: block;
     width: auto;
     ">
         <div style="padding-left: 26pt; padding-right: 26pt;">
 
 
             <div class="row">
                 <div class="column" style="float: left; width: 50%;">
                     <p
                         style="padding-top: 20pt;padding-left: 50pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                         Bundesamt für Justiz</p>
                     <p style="padding-left: 50pt;text-indent: 0pt;text-align: left;">- Bundeszentralregister -</p>
                     <p style="padding-left: 50pt;text-indent: 0pt;text-align: left;">Referat IV 2</p>
                     <p style="padding-left: 50pt;text-indent: 0pt;text-align: left;">53094 Bonn</p>
                     <p style="text-indent: 0pt;text-align: left;"><br></p>
                 </div>
                 <div class="column" style="padding-top: 0pt; padding-left: 280pt;">
                     <p class="s1"
                         style="padding: 10pt; margin-left: 0pt;display:inline-block ;text-indent: 0pt;line-height: 12pt;text-align: left;border-radius: 10px ;border:black solid 1px;">
                         <span class="h3">Absender: </span>(<u>Bitte aktuelle Privatanschrift eintragen</u>)<br><br>
                         <span id="nameHolder" class="p">${userData.vorname+ " " + userData.name}</span><br>
                         <span id="adresseHolder" class="p">${userData.straße+ " " + userData.hausnummer}</span><br>
                         <span id="ortHolder" class="p">${userData.postleitzahl+ " " + userData.stadt}</span>
                     </p>
                 </div>
             </div>
 
             <p class="s3" style="text-indent: 0pt;text-align: left; padding-top: 35pt;"><b>Ich beantrage die Erteilung
                     eines
                 </b></p>
             <input type="checkbox" id="checkBox1" ${userData.checkbox1}>
             <label> Führungszeugnisses</label><br>
             <p style="margin-top: 3pt; margin-bottom: 3pt;">oder</p>
             <input type="checkbox" id="checkBox2" ${userData.checkbox2}>
             <label> erweiterten
                 Führungszeugnisses </label>
             <p style="margin-top: 0pt;">Eine <b>schriftliche
                     Bestätigung</b>,
                 dass die Voraussetzungen zur Beantragung eines erweiterten Führungszeugnisses vorliegen, <b>ist zwingend
                     beizufügen.</b></p>
 
             <input type="checkbox" id="checkBox3" ${userData.checkbox3}>
             <label> bitte um Übersendung an meine oben
                 genannte private Anschrift </label><br><br>
 
             <input type="checkbox" id="checkBox4" ${userData.checkbox4}>
             <label> bitte um Übersendung des
                 Führungszeugnisses zur Vorlage bei einer Behörde an die unten bezeichnete <b>deutsche
                     Behörde</b>.</label><br>
 
             <h4 style="padding-top: 5pt;text-indent: 0pt;text-align: left;">Bei Übersendung an eine
                 deutsche Behörde sind zusätzlich folgende Angaben nötig:</h4>
 
             <p id="verwendungszweckHolder" style="margin-top: -10pt"> Verwendungszweck, ggf. Aktenzeichen:
                 ${userData.verwendungszweck}</p>
             <p id="bezeichnungHolder" style="margin-top: -10pt"> Bezeichnung der Behörde:
                 ${userData.bezeichung}</p>
             <p id="anschriftHolder" style="margin-top: -10pt"> Anschrift der Behörde:
                 ${userData.anschrift}</p>
 
             <p style="margin-top: -10pt;"><i> Übersendung an ausländische Behörden ist nicht möglich. </i></p>
             <div style="margin-left: 40pt;">
                 <p style=" margin-bottom: 0pt;"> Für den Fall, dass das
                     Führungszeugnis Eintragungen enthält, bitte ich um Übersendung an: <b>(nur eine Auswahl
                         ankreuzen)</b></p>
                 <input type="checkbox" id="checkBox7" ${userData.checkbox7}>
                 <label> Deutsche Botschaft / </label><br>
                 <input type="checkbox" id="checkBox8" ${userData.checkbox8}>
                 <label id="einsichtLandHolder"> Deutsches Konsulat in <b>${userData.einsichtsland}</b> zur Einsichtnahme. (Bitte Hinweise auf
                     Seite 2
                     dieses Vordrucks
                     beachten!) </label>
             </div>
             <p class="s3" style="padding-top: 10pt;text-indent: 0pt;text-align: left; margin-bottom: 0pt;">Die Gebühr
                 für
                 das
                 Führungszeugnis in Höhe von 13 € habe ich (bitte ankreuzen)</p>
 
             <input type="checkbox" id="checkBox9" ${userData.checkbox9}>
             <label> Bereits bezahlt </label>
             <p style="margin-top: 3pt; margin-bottom: 3pt;">oder</p>
             <input type="checkbox" id="checkBox10" ${userData.checkbox10}>
             <label id="bezahlungDatumHolder"> überwiesen am <b>${userData.bezahlungsdatum}</b>
                 auf das Konto des Bundesamts für Justiz</label><br> <br>
             <p class="s3" style="padding-left: 199pt;text-indent: 0pt;line-height: 10pt;text-align: left;">Deutsche
                 Bundesbank <br>
                 – Filiale Köln – <br>
                 BIC: MARKDEF1370 <br>
                 IBAN-Nr.: DE49370000000038001005.
             </p>
     </page>
     <page id="AntragPageTwo" style="background: white;
     display: block;
     width: auto; 
     ">
         <div style="padding-left: 26pt; padding-right: 26pt;">
 
             <body>
                 <div style="margin-left: 26pt; padding-top: 30pt;">
                     <h3> Meine Personaldaten lauten:</h3>
                     <p id="geburtsnameHolder" style="margin-top: -10pt"> Geburtsname (Pflichtfeld):
                         ${userData.geburtsname}</p>
                     <p id="familiennameHolder" style="margin-top: -5pt"> Familienname: ${userData.name}</p>
                     <p id="vornameHolder" style="margin-top: -5pt"> Vorname(n): ${userData.vorname}</p>
                     <p id="geburtsdatumHolder" style="margin-top: -5pt"> Geburtsdatum: ${userData.geburtsdatum}</p>
                     <p id="geburtsortHolder" style="margin-top: -5pt"> Geburtsort: ${userData.geburtsort}</p>
                     <p id="staatsangehörigkeitHolder" style="margin-top: -5pt"> Staatsangehörigkeit:
                         ${userData.staatsangehörigkeit}</p>
                 </div>
 
                 <h3 style="padding-top: 12pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Die Verwendung
                     dieses
                     Formulars
                     ist nur zulässig, wenn sich der/die Antrag-steller/-in im Ausland befindet!</h3>
                 <p style="text-indent: 0pt;text-align: left;"></p>
                 <h3 style="padding-top: 4pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Unterschrift der
                     Antrag
                     stellenden Person<span class="s9">: <br>
                     <img src= "data:image/png;base64,${userData.signatur}" style="width:20%; height:20%; paddingLeft:50%"/>
                     <br> </span><span
                         class="s3">..........................................................................................</span>
                 </h3>
                 <br>
                 <div style="margin-left: 7pt">
                     <p class="s1"
                         style="padding: 10pt;display:inline-block ;text-indent: 0pt;line-height: 12pt;text-align: left;border-radius: 10px ;border:rgb(255, 0, 0) solid 1px;">
                         <span
                             style=" color: #F00; font-family:Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt;">
                             Vorstehende Unterschrift und die persönlichen Daten werden hiermit beglaubigt:</span>
                         <br><br><br><br>
                         <span
                             style=" color: #F00; font-family:Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt;">
                             _________________&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                             Siegel &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                             ________________________________________</span></span><br>
                         <span
                             style=" color: #F00; font-family:Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 11pt;">
                             Datum
                             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                             Botschaft / Konsulat / Polizeidienststelle / Behörde / Notar</span>
 
                 </div>
 
                 <br> <br> <br> <br> <br> <br> <br>
                 <h3 style="padding-top: 3pt;padding-left: 200pt;text-indent: 0pt;text-align: left;">Merkblatt</h3>
 
                 <h3 style="padding-left: 0pt;text-indent: -21pt;text-align: left;">1. Örtliche Zuständigkeit und Form
                     des
                     Antrags</h3>
                 <p style="padding-top: 4pt;padding-left: 0pt;text-indent: 0pt;text-align: left;">Jede Person, die
                     <u><b>außerhalb der Bundesrepublik Deutschland wohnt</b></u><b> </b>und das 14. Lebensjahr
                     vollendet
                     hat, kann einen <u><b>schriftlichen</b></u><b> </b>Antrag auf Erteilung eines
                     (Privat-)Führungszeugnisses oder eines Führungszeugnisses zur Vorlage bei einer Behörde stellen.
                     Der
                     Antrag kann unmittelbar bei der Registerbehörde unter folgender Anschrift gestellt werden:
                 </p>
                 <h3
                     style="padding-top: 5pt;padding-left: 142pt;text-indent: 0pt;text-align: left; margin-bottom: -15pt;">
                     Bundesamt für
                     Justiz
                 </h3>
                 <h3 style="padding-left: 142pt;text-indent: 0pt;text-align: left; margin-bottom: -15pt;">-
                     Bundeszentralregister -Referat
                     IV 2
                 </h3>
                 <h3 style="padding-left: 142pt;text-indent: 0pt;line-height: 13pt;text-align: left;">53094 Bonn</h3>
     </page> 
     <page id="AntragPageThree" style="background: white;
     display: block;
     width: auto;
     ">
         <div style="padding-left: 0pt; padding-right:26pt; padding-top: 26pt;">
 
             <p style="padding-top: 6pt;padding-left: 0pt;text-indent: 0pt;text-align: left;">Die Antrag
                 stellende
                 Person hat ihre Identität und - wenn sie als gesetzliche Vertretung handelt - ihre
                 Ver-tretungsmacht
                 nachzuweisen. Die betroffene Person kann sich bei der Antragstellung <u>nicht</u> durch eine
                 bevollmächtigte Person, auch <u>nicht</u> durch eine Rechtsanwältin oder einen Rechtsanwalt,
                 vertreten
                 lassen (§ 30 Abs. 2 Bundeszentralregistergesetz - BZRG). Der Antrag muss die vollständigen
                 Personendaten
                 der betroffenen Person enthalten und von ihr persönlich unterschrieben sein. Daneben ist die
                 Übersen-dungsanschrift für das Führungszeugnis anzugeben. Die Personendaten und die Unterschrift
                 müssen
                 <u><b>amtlich</b></u><b> </b>bestätigt sein. Eine solche amtliche Bestätigung (neueren Datums)
                 kann
                 durch eine deutsche diplomatische oder konsularische Vertretung oder durch eine ausländische
                 Behörde
                 oder notariell erteilt werden. Sollte der Geburtsname vom Familiennamen abweichen, so sind beide
                 Namen
                 zu vermerken.
             </p>
             <p style="padding-left: 0pt;text-indent: 0pt;text-align: left;">Bei Beantragung eines
                 <b>erweiterten
                     Führungszeugnisses </b>ist zudem eine schriftliche Aufforderung der Stelle vorzulegen, die
                 das
                 erweiterte Führungszeugnis verlangt und in der diese bestätigt, dass die Voraussetzungen des §
                 30 a
                 Abs.
                 1 BZRG vorliegen. Zur Erteilung eines erweiterten Führungszeugnisses für private Zwecke ist eine
                 entsprechende Bestätigung vorzulegen.
             </p>
                    <br>
             <h3 style="padding-left: 0pt;text-indent: -21pt;text-align: left;">2. Gebühren</h3>
             <p style="padding-top: 6pt;padding-left: 0pt;text-indent: 0pt;text-align: left;">Die Gebühr für
                 jedes
                 Führungszeugnis beträgt <b>13 €. </b>Die Zahlung hat durch Überweisung auf das nachstehende
                 Konto
                 des
                 Bundesamts für Justiz zu erfolgen:</p>
             <h4 style="padding-top: 5pt;padding-left: 0pt;text-indent: 0pt;text-align: left; margin-bottom: -15pt;">
                 Deutsche
                 Bundesbank -
                 Filiale Köln - <br> IBAN-Nr.: DE49370000000038001005 <br> BIC/swift-Nr.: MARKDEF1370</h4>
             <h4 style="padding-left: 0pt;text-indent: 0pt;line-height: 13pt;text-align: left;">
                 Verwendungszweck:
                 (Aktenzeichen des Vorgangs - falls vorhanden - oder Vor- und Nachname der Antrag
                 stellenden Person)</h4>
             <p style="padding-left: 0pt;text-indent: 0pt;text-align: left;">Die Durchschrift des
                 Überweisungsantrags
                 ist - sofern möglich - mit dem Antrag auf Erteilung des Führungszeugnisses an das Bundesamt für
                 Justiz
                 zu senden.</p>
             <h4 style="padding-top: 0pt;padding-left: 0pt;text-indent: 0pt;text-align: left;margin-top: -10pt;">Bitte beachten
                 Sie,
                 dass
                 die Gebühr nicht mehr per Scheck entrichtet werden kann.</h4>
             <p style="padding-top: 5pt;padding-left: 0pt;text-indent: 0pt;text-align: left;">Das
                 Führungszeugnis
                 kann
                 erst nach Eingang der Gebühr oder Vorlage des Zahlungsnachweises erteilt werden (§ 8 JVKostG).
             </p>
 
             <h3 style="padding-left: 0pt;text-indent: -21pt;text-align: left;">3. Verschiedenes</h3>
 
 
             <p style="padding-top: 6pt;padding-left: 0pt;text-indent: 0pt;text-align: left;">Ein beantragtes
                 (Privat-)Führungszeugnis wird nur an die Antrag stellende Person persönlich an ihre Privatanschrift
                 übersandt.
                 Ein zur Vorlage bei einer Behörde beantragtes Führungszeugnis wird direkt an die Behörde übersandt. In
                 dem
                 Antrag auf Erteilung eines Führungszeugnisses zur Vorlage bei einer Behörde ist daher die Anschrift der
                 Behörde
                 sowie der Verwendungszweck und/oder das Aktenzeichen der Empfängerbehörde anzugeben.</p>
             <p style="padding-top: 3pt;padding-left: 0pt;text-indent: 0pt;text-align: justify;">Sollten Sie - neben
                 oder
                 anstatt der deutschen - die Staatsangehörigkeit eines oder mehrerer anderer EU-Mitgliedstaaten besitzen,
                 so
                 sind
                 diese anzugeben. In diesem Fall wird ein Europäisches Führungszeugnis erteilt.</p>
             <p style="padding-top: 3pt;padding-left: 0pt;text-indent: 0pt;text-align: justify; margin-bottom: -10pt;">
                 Das Führungszeugnis
                 wird
                 nur in
                 deutscher Sprache erteilt. Eine ggf. gewünschte Übersetzung ist von der Antrag stellenden Person selbst
                 zu
                 veranlassen. Der Inhalt des Führungszeugnisses richtet sich nach den Bestimmungen des BZRG. Zur
                 Antragstellung
                 kann das umseitige Antragsformular verwendet werden.</p>
 
                 <div style="margin-left: 0pt; margin-top: 6pt;">
                 <p>__________________________________________________________________</p>
             </div>
             <p class="s10"
                 style="padding-left: 0pt;text-indent: 0pt;line-height: 9pt;text-align: left; margin-bottom: -10pt; font-size: 10pt;">
                 <b>Hausanschrift: </b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                 <b>Postanschrift: </b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                 <b>Telefon: </b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                 <b>Sprechzeiten: </b>
             </p>
             <p class="s8"
                 style="padding-left: 0pt;text-indent: 0pt;text-align: left; font-size: 10pt; margin-bottom: -10pt;">
                 Adenauerallee 99-103 &nbsp; &nbsp; &nbsp; &nbsp;
                 53094 Bonn &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                 +49 228 99 410-5668 &nbsp; &nbsp;
                 Di - Do 09:00 – 12:00 Uhr
             </p>
             <p class="s8"
                 style="padding-left: 0pt;text-indent: 0pt;text-align: left; font-size: 10pt; margin-bottom: -10pt;">
                 53113 Bonn &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                 Germany
             </p>
             <p class="s8" style="padding-left: 0pt;text-indent: 0pt;text-align: left; font-size: 10pt;">
                 <a href="http://www.bundesjustizamt.de/" target="_blank">www.bundesjustizamt.de</a>
             </p>
     </div>
     </page>
     <script src="../data/htmlInput.js"></script>
     <script src="../screens/ExportPDFTestScreen.js"></script>
 </body>
 
 </html>
`;
  }

  const generatePdf = async () => {


    await loadUserData();
    const file = await printToFileAsync({
      html: html,
      base64: true,
      margins: {
        left: 20,
        top: 50,
        right: 20,
        bottom: 50,
      },
    });
    await shareAsync(file.uri);
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        <Button label="Export PDF" onPress={generatePdf} />
        <View style={{marginTop:50}}>
        <ButtonGhost
            title="Back"
            label="zurück"
            onPress={() => {
              navigation.navigate("ZahlungsScreen", route);
            }}
          />
          </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
