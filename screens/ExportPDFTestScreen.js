import Button from '../components/Button';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';


const data = {
  vorname: 'Marcel',
  name: 'Grund',
  geburtsname: 'Grund',

  straße: 'Rezagstraße',
  hausnummer: '23',

  postleitzahl: '51143',
  stadt: 'Köln',

  geburtsdatum: '16.05.2001',
  geburtsort: 'Köln',
  staatsangehörigkeit: 'deutsch',

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

const html = `
<!doctype html>
<html id="Test">

<head>
    <title>Antrag</title>
    <meta name="description" content="Our first page">
</head>

<body margin: 0; box-shadow: 0; padding: 0; text-indent: 0;>
    <page id="AntragPageOne" size="A4">
        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <p style="text-indent: 0pt;text-align: left;" />

        <p class="s1" style="padding: 10pt; margin-left: 300pt;display:inline-block ;text-indent: 0pt;line-height: 12pt;text-align: left;border-radius: 10px ;border:black solid 1px;
            color: black;
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 10pt;">
            <span color: black; font-family: Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration:
                none; font-size: 11pt;>Absender: </span>(<u>Bitte aktuelle Privatanschrift eintragen</u>)<br><br>
            <span id="nameHolder" class="p">${data.vorname+ " " + data.name}</span><br>
            <span id="adresseHolder" class="p">${data.straße+ " " + data.hausnummer}</span><br>
            <span id="ortHolder" class="p">${data.postleitzahl+ " " + data.stadt}</span>
        </p>
        <p style="text-indent: 0pt;text-align: left;" />
        <p style="padding-top: 4pt;padding-left: 26pt;text-indent: 0pt;line-height: 11pt;text-align: left; display:inline-block; 
        color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;">
            Bundesamt
            für
            Justiz</p>
        <p style="padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        margin: 0pt;">- Bundeszentralregister -</p>
        <p style="padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        margin: 0pt;">Referat IV 2</p>
        <p style="padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        margin: 0pt;">53094 Bonn</p>
        <br>
        
        <p class="s3" style="padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;"><b>Ich beantrage die Erteilung eines
            </b></p>
        
        <p style="text-indent: 0pt;text-align: left;" />
        <input type="checkbox" id="checkBox1" style="margin-left: 26pt;" ${data.checkbox1}>
        <label> Führungszeugnisses und (bitte
            ankreuzen)</label><br><br>
        <input type="checkbox" id="checkBox2" style="margin-left: 26pt;" ${data.checkbox2}>
        <label> erweiterten
            Führungszeugnisses und (bitte ankreuzen) </label><br>
        <p style="margin-left: 26pt;">Eine <b>schriftliche
                Bestätigung</b>,
            dass die Voraussetzungen zur Beantragung eines erweiterten Führungszeugnisses vorliegen, <b>ist zwingend
                beizufügen.</b></p>
        
        <input type="checkbox" id="checkBox3" style="margin-left: 26pt;" ${data.checkbox3}>
        <label> bitte um Übersendung an meine oben
            genannte private Anschrift </label><br><br>

        <input type="checkbox" id="checkBox4" style="margin-left: 26pt;" ${data.checkbox4}>
        <label> bitte um Übersendung des
            Führungszeugnisses zur Vorlage bei einer Behörde an die unten bezeichnete <b>deutsche
            Behörde</b></label><br>

        <p style="margin-left: 26pt;"> Eine Übersendung an ausländische Behörden ist nicht möglich. </p>
        <p style="text-indent: 0pt;text-align: left;" />
        <input type="checkbox" id="checkBox5" style="margin-left: 26pt;" ${data.checkbox5}>
        <label> bitte um Übersendung an meine oben
            genannte private Anschrift </label><br><br>

        <input type="checkbox" id="checkBox6" style="margin-left: 26pt;" ${data.checkbox6}>
        <label> Für den Fall, dass das
            Führungszeugnis Eintragungen enthält, bitte ich um Übersendung an: <b>(nur eine Auswahl
              ankreuzen)</b></label><br>
        <input type="checkbox" id="checkBox7" style="margin-left: 52pt;" ${data.checkbox7}>
        <label> Deutsche Botschaft / </label><br>
        <input type="checkbox" id="checkBox8" style="margin-left: 52pt;" ${data.checkbox8}>
        <label id="einsichtLandHolder"> Deutsches Konsulat in <b>LAND</b> zur Einsichtnahme. (Bitte Hinweise auf Seite 2
            dieses Vordrucks
            beachten!) </label>
        <br>
        <p class="s3" style="padding-top: 4pt;padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;">Die Gebühr für das
            Führungszeugnis in Höhe von 13 € habe ich (bitte ankreuzen)</p>

        <p style="text-indent: 0pt;text-align: left;" />
        <input type="checkbox" id="checkBox9" style="margin-left: 52pt;" ${data.checkbox9}>
        <label> Bereits bezahlt </label><br>
        <input type="checkbox" id="checkBox10" style="margin-left: 52pt;" ${data.checkbox10}>
        <label id="bezahlungDatumHolder" value="${data.bezahlungsdatum}"> überwiesen am <b>DATUM</b>
            auf das Konto des Bundesamts für Justiz</label><br> <br>
        <p class="s3" style="padding-left: 199pt;text-indent: 0pt;line-height: 10pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;">Deutsche
            Bundesbank <br>
            – Filiale Köln – <br>
            BIC: MARKDEF1370 <br>
            IBAN-Nr.: DE49370000000038001005.
        </p>
        <br>
        <br>
        <div style="margin-left: 26pt;">
            <h2 style="color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 12pt;"> Meine Personaldaten lauten:</h2>
            <p id="geburtsnameHolder" style="margin-top: 10pt; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"> Geburtsname (Pflichtfeld): ${data.geburtsname}</p>
            <p id="familiennameHolder" style="margin-top: 10pt; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"> Familienname: ${data.name}</p>
            <p id="vornameHolder" style="margin-top: 10pt; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"> Vorname(n): ${data.vorname}</p>
            <p id="geburtsdatumHolder" style="margin-top: 10pt; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
             margin: 0pt;"> Geburtsdatum: ${data.geburtsdatum}</p>
            <p id="geburtsortHolder" style="margin-top: 10pt; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"> Geburtsort: ${data.geburtsort}</p>
            <p id="staatsangehörigkeitHolder" style="margin-top: 10pt; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"> Staatsangehörigkeit: ${data.staatsangehörigkeit}
            </p>
        </div>

        <h3 style="padding-top: 12pt;padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 11pt;">Die Verwendung dieses
            Formulars
            ist nur zulässig, wenn sich der/die Antrag-steller/-in im Ausland befindet!</h3>
        <p style="text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        margin: 0pt;"></p>
        <h3 style="padding-top: 4pt;padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 11pt;">Unterschrift der Antrag
            stellenden Person<span class="s9" style="color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 9pt;">: </span><span
                class="s3" style="color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 10pt;">..........................................................................................</span>
        </h3>
        <br>
        <div style="margin-left: 7pt">
            <p class="s1" style="padding: 10pt;display:inline-block ;text-indent: 0pt;line-height: 12pt;text-align: left;border-radius: 10px ;border:rgb(255, 0, 0) solid 1px; 
            color: black;
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 10pt;">
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
        <p style="padding-left: 20pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        margin: 0pt;" />
        <p style="text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        margin: 0pt;" />
    </page>
    <page id="AntragPageTwo" size="A4">
        <br>
        <div style="margin-left: 26pt; margin-top: 6pt;">
            <h3 style="padding-top: 5pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 11pt;">Bei Übersendung an eine
                deutsche Behörde sind zusätzlich folgende Angaben nötig:</h3>

            <p id="verwendungszweckHolder" style="margin-top: 10pt;color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"> Verwendungszweck, ggf. Aktenzeichen:
                ${data.verwendungszweck}</p>
            <p id="bezeichnungHolder" style="margin-top: 10pt; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"> Bezeichnung der Behörde: ${data.bezeichung}</p>
            <p id="anschriftHolder" style="margin-top: 10pt; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"> Anschrift der Behörde: ${data.anschrift}</p>
            <p>__________________________________________________________________________________________________</p>
        </div>
        <p class="s10" style="padding-left: 26pt;text-indent: 0pt;line-height: 9pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 8pt;">
            Hausanschrift: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Postanschrift: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Telefon: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;
            Sprechzeiten:
        </p>
        <p class="s8" style="padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;">
            Adenauerallee 99-103 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp;
            53094 Bonn &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            +49 228 99 410-5668 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Di - Do 09:00 – 12:00 Uhr
        </p>
        <p class="s8" style="padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;">
            53113 Bonn &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            Germany
        </p>
        <p class="s8" style="padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;">
            <a href="http://www.bundesjustizamt.de/" target="_blank" style="color: #00F;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: underline;
            font-size: 8pt;">www.bundesjustizamt.de</a>
        </p>

        <div style="padding-left: 26pt; padding-right:26pt; padding-top: 26pt;">
            <h3 style="padding-top: 3pt;padding-left: 240pt;text-indent: 0pt;text-align: left; color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 11pt;">Merkblatt</h3>
            <p style="text-indent: 0pt;text-align: left; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;"><br /></p>
            <ol id="l1">
                <li data-list-text="1." style="display: block;">
                    <h3 style="padding-left: 26pt;text-indent: -21pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">Örtliche Zuständigkeit und Form des
                        Antrags</h3>
                    <p style="padding-top: 4pt;padding-left: 0pt;text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;">Jede Person, die
                        <u><b>außerhalb der Bundesrepublik Deutschland wohnt</b></u><b> </b>und das 14. Lebensjahr
                        vollendet
                        hat, kann einen <u><b>schriftlichen</b></u><b> </b>Antrag auf Erteilung eines
                        (Privat-)Führungszeugnisses oder eines Führungszeugnisses zur Vorlage bei einer Behörde stellen.
                        Der
                        Antrag kann unmittelbar bei der Registerbehörde unter folgender Anschrift gestellt werden:
                    </p>
                    <br>
                    <br>
                    <br>
                    <br>
                    <h3 style="padding-top: 5pt;padding-left: 182pt;text-indent: 0pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">Bundesamt für Justiz
                    </h3>
                    <h3 style="padding-left: 182pt;text-indent: 0pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">- Bundeszentralregister -Referat IV 2
                    </h3>
                    <h3 style="padding-left: 182pt;text-indent: 0pt;line-height: 13pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">53094 Bonn</h3>
                    <p style="padding-top: 6pt;padding-left: 0pt;text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;">Die Antrag
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
                    <p style="padding-left: 0pt;text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;">Bei Beantragung eines
                        <b>erweiterten
                            Führungszeugnisses </b>ist zudem eine schriftliche Aufforderung der Stelle vorzulegen, die
                        das
                        erweiterte Führungszeugnis verlangt und in der diese bestätigt, dass die Voraussetzungen des §
                        30 a
                        Abs.
                        1 BZRG vorliegen. Zur Erteilung eines erweiterten Führungszeugnisses für private Zwecke ist eine
                        entsprechende Bestätigung vorzulegen.
                    </p>
                    <p style="text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;"><br /></p>
                </li>
                <li data-list-text="2." style="display: block;">
                    <br>
                    <h3 style="padding-left: 26pt;text-indent: -21pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">Gebühren</h3>
                    <p style="padding-top: 6pt;padding-left: 0pt;text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;">Die Gebühr für
                        jedes
                        Führungszeugnis beträgt <b>13 €. </b>Die Zahlung hat durch Überweisung auf das nachstehende
                        Konto
                        des
                        Bundesamts für Justiz zu erfolgen:</p>
                    <h3 style="padding-top: 5pt;padding-left: 40pt;text-indent: 0pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">Deutsche Bundesbank -
                        Filiale Köln -IBAN-Nr.: DE49370000000038001005 BIC/swift-Nr.: MARKDEF1370</h3>
                    <h3 style="padding-left: 40pt;text-indent: 0pt;line-height: 13pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">Verwendungszweck:
                        (Aktenzeichen des Vorgangs - falls vorhanden - oder</h3>
                    <h3 style="padding-left: 226pt;text-indent: 0pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">Vor- und Nachname der Antrag
                        stellenden
                        Person)</h3>
                    <p style="text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;"><br /></p>
                    <p style="padding-left: 0pt;text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;">Die Durchschrift des
                        Überweisungsantrags
                        ist - sofern möglich - mit dem Antrag auf Erteilung des Führungszeugnisses an das Bundesamt für
                        Justiz
                        zu senden.</p>
                    <h4 style="padding-top: 5pt;padding-left: 0pt;text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 10pt;">Bitte beachten
                        Sie,
                        dass
                        die Gebühr nicht mehr per Scheck entrichtet werden kann.</h4>
                    <p style="padding-top: 5pt;padding-left: 0pt;text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;">Das
                        Führungszeugnis
                        kann
                        erst nach Eingang der Gebühr oder Vorlage des Zahlungsnachweises erteilt werden (§ 8 JVKostG).
                    </p>
                    <p style="text-indent: 0pt;text-align: left; color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 10pt;
                    margin: 0pt;"><br /></p>
                </li>
                <li data-list-text="3." style="display: block;">
                    <br>
                    <h3 style="padding-left: 26pt;text-indent: -21pt;text-align: left; color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;">Verschiedenes</h3>
                </li>
            </ol>
            <p style="padding-top: 6pt;padding-left: 26pt;text-indent: 0pt;text-align: left; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;">Ein beantragtes
                (Privat-)Führungszeugnis wird nur an die Antrag stellende Person persönlich an ihre Privatanschrift
                übersandt.
                Ein zur Vorlage bei einer Behörde beantragtes Führungszeugnis wird direkt an die Behörde übersandt. In
                dem
                Antrag auf Erteilung eines Führungszeugnisses zur Vorlage bei einer Behörde ist daher die Anschrift der
                Behörde
                sowie der Verwendungszweck und/oder das Aktenzeichen der Empfängerbehörde anzugeben.</p>
            <p style="padding-top: 3pt;padding-left: 26pt;text-indent: 0pt;text-align: justify; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;">Sollten Sie - neben
                oder
                anstatt der deutschen - die Staatsangehörigkeit eines oder mehrerer anderer EU-Mitgliedstaaten besitzen,
                so
                sind
                diese anzugeben. In diesem Fall wird ein Europäisches Führungszeugnis erteilt.</p>
            <p style="padding-top: 3pt;padding-left: 26pt;text-indent: 0pt;text-align: justify; color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
            margin: 0pt;">Das Führungszeugnis
                wird
                nur in
                deutscher Sprache erteilt. Eine ggf. gewünschte Übersetzung ist von der Antrag stellenden Person selbst
                zu
                veranlassen. Der Inhalt des Führungszeugnisses richtet sich nach den Bestimmungen des BZRG. Zur
                Antragstellung
                kann das umseitige Antragsformular verwendet werden.</p>
        </div>
    </page>
</body>

</html>
`;

const generatePdf = async () => {
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


export default function ExportPDFTestScreen({navigation}) {
      return(
    <Button
    label="ExportPDF"
    onPress={generatePdf}/>
      );
}