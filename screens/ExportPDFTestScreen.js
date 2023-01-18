import Button from "../components/Button.js";
import RNHTMLtoPDF from 'react-native-html-to-pdf';

var testHtml = document.getElementById("Test");

export default function ExportPDFTestScreen({navigation}) {


      return(
    <Button
    label="ExportPDF"
    onPress={console.log(testHtml)}/>
      );
}