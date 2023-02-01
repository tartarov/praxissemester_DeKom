import Button from '../components/Button';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { DataContext } from '../context/DataContext';
import {useContext} from 'react';
import { StyleSheet, View } from 'react-native';

let html;

export default function ExportPDFTestScreen({navigation}) {
const { getUserData } = useContext(DataContext);

async function loadUserData() {
   data = await getUserData();
   


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

  einsichtsland: 'Deutschland',
  bezahlungsdatum: '01.01.2023',

  verwendungszweck: 'bewerbung',
  bezeichung: 'Kein Ahnung Bro',
  anschrift: 'Hier bla, 12355 Bielefeld',

  checkbox1: '',
  checkbox2: '',
  checkbox3: '',
  checkbox4: '',
  checkbox5: '',
  checkbox6: '',
  checkbox7: '',
  checkbox8: '',
  checkbox9: '',
  checkbox10: '',
}

 html = `
<!doctype html>
<html id="Test">
<head>
    <link rel="stylesheet" href="pdfAntrag.css">
    <title>Antrag</title>
    <meta name="description" content="Our first page">
</head>

<body>
    <page id="AntragPageOne" size="A4">
        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <p style="text-indent: 0pt;text-align: left;" />

        <p class="s1"
            style="padding: 10pt; margin-left: 300pt;display:inline-block ;text-indent: 0pt;line-height: 12pt;text-align: left;border-radius: 10px ;border:black solid 1px;">
            <span class="h3">Absender: </span>(<u>Bitte aktuelle Privatanschrift eintragen</u>)<br><br>
            <span id= "nameHolder" class="p">${userData.vorname+ " " + userData.name}</span><br>
            <span id= "adresseHolder" class="p">${userData.straße+ " " + userData.hausnummer}</span><br>
            <span id= "ortHolder" class="p">${userData.postleitzahl+ " " + userData.stadt}</span>
        </p>
        <p style="text-indent: 0pt;text-align: left;" />
        <p
            style="padding-top: 4pt;padding-left: 26pt;text-indent: 0pt;line-height: 11pt;text-align: left; display:inline-block;">
            Bundesamt
            für
            Justiz</p>
        <p style="padding-left: 26pt;text-indent: 0pt;text-align: left;">- Bundeszentralregister -</p>
        <p style="padding-left: 26pt;text-indent: 0pt;text-align: left;">Referat IV 2</p>
        <p style="padding-left: 26pt;text-indent: 0pt;text-align: left;">53094 Bonn</p>
        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <p class="s3" style="padding-left: 26pt;text-indent: 0pt;text-align: left;"><b>Ich beantrage die Erteilung eines
            </b></p>
        <br>
        <p style="text-indent: 0pt;text-align: left;" />
        <input type="checkbox" id="checkBox1" style="margin-left: 26pt;" ${userData.checkbox1}>
        <label> Führungszeugnisses und (bitte
            ankreuzen)</label><br><br>
        <input type="checkbox" id="checkBox2" style="margin-left: 26pt;" ${userData.checkbox2}>
        <label> erweiterten
            Führungszeugnisses und (bitte ankreuzen) </label><br>
        <p style="margin-left: 26pt;">Eine <b>schriftliche
                Bestätigung</b>,
            dass die Voraussetzungen zur Beantragung eines erweiterten Führungszeugnisses vorliegen, <b>ist zwingend
                beizufügen.</b></p> <br>
        <p style="text-indent: 0pt;text-align: left;" />
        <input type="checkbox" id="checkBox3" style="margin-left: 26pt;" ${userData.checkbox3}>
        <label> bitte um Übersendung an meine oben
            genannte private Anschrift </label><br><br>

        <input type="checkbox" id="checkBox4" style="margin-left: 26pt;" ${userData.checkbox4}>
        <label> bitte um Übersendung des
            Führungszeugnisses zur Vorlage bei einer Behörde an die unten bezeichnete <b>deutsche
                Behörde</b>.</label><br>

        <p style="margin-left: 26pt;"> Eine Übersendung an ausländische Behörden ist nicht möglich. </p> <br>
        <p style="text-indent: 0pt;text-align: left;" />
        <input type="checkbox" id="checkBox5" style="margin-left: 26pt;" ${userData.checkbox5}>
        <label> bitte um Übersendung an meine oben
            genannte private Anschrift </label><br><br>

        <input type="checkbox" id="checkBox6" style="margin-left: 26pt;" ${userData.checkbox6}>
        <label> Für den Fall, dass das
            Führungszeugnis Eintragungen enthält, bitte ich um Übersendung an: <b>(nur eine Auswahl
                ankreuzen)</b></label><br>
        <input type="checkbox" id="checkBox7" style="margin-left: 52pt;" ${userData.checkbox7}>
        <label> Deutsche Botschaft / </label><br>
        <input type="checkbox" id="checkBox8" style="margin-left: 52pt;" ${userData.checkbox8}>
        <label id="einsichtLandHolder"> Deutsches Konsulat in <b>LAND</b> zur Einsichtnahme. (Bitte Hinweise auf Seite 2 dieses Vordrucks
            beachten!) </label><br>
        <br>
        <p class="s3" style="padding-top: 4pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Die Gebühr für das
            Führungszeugnis in Höhe von 13 € habe ich (bitte ankreuzen)</p>

        <p style="text-indent: 0pt;text-align: left;" />
        <input type="checkbox" id="checkBox9" style="margin-left: 52pt;" ${userData.checkbox9}>
        <label> Bereits bezahlt </label><br>
        <input type="checkbox" id="checkBox10" style="margin-left: 52pt;" ${userData.checkbox10}>
        <label id="bezahlungDatumHolder" value="${userData.bezahlungsdatum}"> überwiesen am <b>DATUM</b>
            auf das Konto des Bundesamts für Justiz</label><br> <br>
        <p class="s3" style="padding-left: 199pt;text-indent: 0pt;line-height: 10pt;text-align: left;">Deutsche
            Bundesbank <br>
            – Filiale Köln – <br>
            BIC: MARKDEF1370 <br>
            IBAN-Nr.: DE49370000000038001005.
        </p>
        <br>
        <div style="margin-left: 26pt;">
            <h2> Meine Personaldaten lauten:</h2>
            <p id="geburtsnameHolder"style="margin-top: 10pt"> Geburtsname (Pflichtfeld): ${userData.geburtsname}</p>
            <p id="familiennameHolder"style="margin-top: 10pt"> Familienname: ${userData.name}</p>
            <p id="vornameHolder"style="margin-top: 10pt"> Vorname(n): ${userData.vorname}</p>
            <p id="geburtsdatumHolder"style="margin-top: 10pt"> Geburtsdatum: ${userData.geburtsdatum}</p>
            <p id="geburtsortHolder" style="margin-top: 10pt"> Geburtsort: ${userData.geburtsort}</p>
            <p id="staatsangehörigkeitHolder" style="margin-top: 10pt"> Staatsangehörigkeit: ${userData.staatsangehörigkeit}</p>
        </div>

        <h3 style="padding-top: 12pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Die Verwendung dieses
            Formulars
            ist nur zulässig, wenn sich der/die Antrag-steller/-in im Ausland befindet!</h3>
        <p style="text-indent: 0pt;text-align: left;"></p>
        <h3 style="padding-top: 4pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Unterschrift der Antrag
            stellenden Person<span class="s9">: </span><span
                class="s3">..........................................................................................</span>
        </h3>
        <br>
        <div style="margin-left: 7pt">
            <p class="s1"
            style="padding: 10pt;display:inline-block ;text-indent: 0pt;line-height: 12pt;text-align: left;border-radius: 10px ;border:rgb(255, 0, 0) solid 1px;">
            <span style=" color: #F00; font-family:Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt;">
                Vorstehende Unterschrift und die persönlichen Daten werden hiermit beglaubigt:</span>
                <br><br><br><br>
            <span style=" color: #F00; font-family:Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt;">
                _________________&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    Siegel &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    ________________________________________</span></span><br>
            <span style=" color: #F00; font-family:Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 11pt;">
                Datum
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                 Botschaft / Konsulat / Polizeidienststelle / Behörde / Notar</span>
            
        </div>
        <p style="padding-left: 20pt;text-indent: 0pt;text-align: left;" />
        <p style="text-indent: 0pt;text-align: left;" />
    </page>
    <page id="AntragPageTwo" size="A4">
        <br>
        <div style="margin-left: 26pt; margin-top: 6pt;">
        <h3 style="padding-top: 5pt;text-indent: 0pt;text-align: left;">Bei Übersendung an eine
            deutsche Behörde sind zusätzlich folgende Angaben nötig:</h3>

            <p id="verwendungszweckHolder" style="margin-top: 10pt"> Verwendungszweck, ggf. Aktenzeichen: ${userData.verwendungszweck}</p>
            <p id="bezeichnungHolder" style="margin-top: 10pt"> Bezeichnung der Behörde: ${userData.bezeichung}</p>
            <p id="anschriftHolder" style="margin-top: 10pt"> Anschrift der Behörde: ${userData.anschrift}</p>
            <p>__________________________________________________________________________________________________</p>
        </div>
        <p class="s10" style="padding-left: 26pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
            Hausanschrift: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Postanschrift: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Telefon: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Sprechzeiten:
        </p>
        <p class="s8" style="padding-left: 26pt;text-indent: 0pt;text-align: left;">
            Adenauerallee 99-103 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            53094 Bonn &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            +49 228 99 410-5668 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Di - Do 09:00 – 12:00 Uhr
        </p>
        <p class="s8" style="padding-left: 26pt;text-indent: 0pt;text-align: left;">
            53113 Bonn &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Germany
        </p>
        <p class="s8" style="padding-left: 26pt;text-indent: 0pt;text-align: left;">
            <a href="http://www.bundesjustizamt.de/"
                target="_blank">www.bundesjustizamt.de</a>
        </p>

        <div style="padding-left: 26pt; padding-right:26pt; padding-top: 26pt;">
        <h3 style="padding-top: 3pt;padding-left: 240pt;text-indent: 0pt;text-align: left;">Merkblatt</h3>
        <br>
        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <ol id="l1">
            <li data-list-text="1.">
                <h3 style="padding-left: 26pt;text-indent: -21pt;text-align: left;">Örtliche Zuständigkeit und Form des
                    Antrags</h3>
                <p style="padding-top: 4pt;padding-left: 27pt;text-indent: 0pt;text-align: left;">Jede Person, die
                    <u><b>außerhalb der Bundesrepublik Deutschland wohnt</b></u><b> </b>und das 14. Lebensjahr vollendet
                    hat, kann einen <u><b>schriftlichen</b></u><b> </b>Antrag auf Erteilung eines
                    (Privat-)Führungszeugnisses oder eines Führungszeugnisses zur Vorlage bei einer Behörde stellen. Der
                    Antrag kann unmittelbar bei der Registerbehörde unter folgender Anschrift gestellt werden:
                </p>
                <h3 style="padding-top: 5pt;padding-left: 182pt;text-indent: 0pt;text-align: left;">Bundesamt für Justiz
                </h3>
                <h3 style="padding-left: 182pt;text-indent: 0pt;text-align: left;">- Bundeszentralregister -Referat IV 2
                </h3>
                <h3 style="padding-left: 182pt;text-indent: 0pt;line-height: 13pt;text-align: left;">53094 Bonn</h3>
                <p style="padding-top: 6pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Die Antrag stellende
                    Person hat ihre Identität und - wenn sie als gesetzliche Vertretung handelt - ihre Ver-tretungsmacht
                    nachzuweisen. Die betroffene Person kann sich bei der Antragstellung <u>nicht</u> durch eine
                    bevollmächtigte Person, auch <u>nicht</u> durch eine Rechtsanwältin oder einen Rechtsanwalt,
                    vertreten
                    lassen (§ 30 Abs. 2 Bundeszentralregistergesetz - BZRG). Der Antrag muss die vollständigen
                    Personendaten
                    der betroffenen Person enthalten und von ihr persönlich unterschrieben sein. Daneben ist die
                    Übersen-dungsanschrift für das Führungszeugnis anzugeben. Die Personendaten und die Unterschrift
                    müssen
                    <u><b>amtlich</b></u><b> </b>bestätigt sein. Eine solche amtliche Bestätigung (neueren Datums) kann
                    durch eine deutsche diplomatische oder konsularische Vertretung oder durch eine ausländische Behörde
                    oder notariell erteilt werden. Sollte der Geburtsname vom Familiennamen abweichen, so sind beide
                    Namen
                    zu vermerken.
                </p>
                <p style="padding-left: 26pt;text-indent: 0pt;text-align: left;">Bei Beantragung eines <b>erweiterten
                        Führungszeugnisses </b>ist zudem eine schriftliche Aufforderung der Stelle vorzulegen, die das
                    erweiterte Führungszeugnis verlangt und in der diese bestätigt, dass die Voraussetzungen des § 30 a
                    Abs.
                    1 BZRG vorliegen. Zur Erteilung eines erweiterten Führungszeugnisses für private Zwecke ist eine
                    entsprechende Bestätigung vorzulegen.</p>
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="2.">
                <br>
                <h3 style="padding-left: 26pt;text-indent: -21pt;text-align: left;">Gebühren</h3>
                <p style="padding-top: 6pt;padding-left: 27pt;text-indent: 0pt;text-align: left;">Die Gebühr für jedes
                    Führungszeugnis beträgt <b>13 €. </b>Die Zahlung hat durch Überweisung auf das nachstehende Konto
                    des
                    Bundesamts für Justiz zu erfolgen:</p>
                <h3 style="padding-top: 5pt;padding-left: 90pt;text-indent: 0pt;text-align: left;">Deutsche Bundesbank -
                    Filiale Köln -IBAN-Nr.: DE49370000000038001005 BIC/swift-Nr.: MARKDEF1370</h3>
                <h3 style="padding-left: 90pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Verwendungszweck:
                    (Aktenzeichen des Vorgangs - falls vorhanden - oder</h3>
                <h3 style="padding-left: 226pt;text-indent: 0pt;text-align: left;">Vor- und Nachname der Antrag
                    stellenden
                    Person)</h3>
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
                <p style="padding-left: 26pt;text-indent: 0pt;text-align: left;">Die Durchschrift des
                    Überweisungsantrags
                    ist - sofern möglich - mit dem Antrag auf Erteilung des Führungszeugnisses an das Bundesamt für
                    Justiz
                    zu senden.</p>
                <h4 style="padding-top: 5pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Bitte beachten Sie,
                    dass
                    die Gebühr nicht mehr per Scheck entrichtet werden kann.</h4>
                <p style="padding-top: 5pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Das Führungszeugnis
                    kann
                    erst nach Eingang der Gebühr oder Vorlage des Zahlungsnachweises erteilt werden (§ 8 JVKostG).</p>
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="3.">
                <br>
                <h3 style="padding-left: 26pt;text-indent: -21pt;text-align: left;">Verschiedenes</h3>
            </li>
        </ol>
        <p style="padding-top: 6pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">Ein beantragtes
            (Privat-)Führungszeugnis wird nur an die Antrag stellende Person persönlich an ihre Privatanschrift
            übersandt.
            Ein zur Vorlage bei einer Behörde beantragtes Führungszeugnis wird direkt an die Behörde übersandt. In dem
            Antrag auf Erteilung eines Führungszeugnisses zur Vorlage bei einer Behörde ist daher die Anschrift der
            Behörde
            sowie der Verwendungszweck und/oder das Aktenzeichen der Empfängerbehörde anzugeben.</p>
        <p style="padding-top: 3pt;padding-left: 26pt;text-indent: 0pt;text-align: justify;">Sollten Sie - neben oder
            anstatt der deutschen - die Staatsangehörigkeit eines oder mehrerer anderer EU-Mitgliedstaaten besitzen, so
            sind
            diese anzugeben. In diesem Fall wird ein Europäisches Führungszeugnis erteilt.</p>
        <p style="padding-top: 3pt;padding-left: 26pt;text-indent: 0pt;text-align: justify;">Das Führungszeugnis wird
            nur in
            deutscher Sprache erteilt. Eine ggf. gewünschte Übersetzung ist von der Antrag stellenden Person selbst zu
            veranlassen. Der Inhalt des Führungszeugnisses richtet sich nach den Bestimmungen des BZRG. Zur
            Antragstellung
            kann das umseitige Antragsformular verwendet werden.</p>
        </div>
    </page>
    <script src="../data/htmlInput.js"></script>
    <script src="../screens/ExportPDFTestScreen.js"></script>
</body>

</html>
`;

};

const generatePdf = async () => { 
  await loadUserData();
  const file = await printToFileAsync({
      html: html,
      base64: false,
      margins: {
        left: 20,
        top: 50,
        right: 20,
        bottom: 50,
      },
  });
  await shareAsync(file.uri);
}



      return(
    <View style={styles.buttonContainer}>
        <Button
         label="ExportPDF"
         onPress={generatePdf}/>     
    </View> 
    );
}

const styles = StyleSheet.create({
    buttonContainer : {
      margin: 10,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
})