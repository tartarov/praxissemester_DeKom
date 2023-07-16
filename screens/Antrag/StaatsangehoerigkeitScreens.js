import * as React from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import WeiterButton from "../../components/Buttons/WeiterButton";
//import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import Select2 from "react-native-select-two";
import countries from "../../assets/countries.json";
import NationalityItem from "./components/NationalityItem";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { Header } from "../../components/Header";

const mockData = [
  { id: 1, name: "React Native Developer", checked: true }, // set default checked for render option item
  { id: 2, name: "Android Developer" },
  { id: 3, name: "iOS Developer" },
];

export default function StaatsangehoerigkeitsScreen({ route, navigation }) {
  let antragData = route.params?.antragData || null;

  const countriesList = countries;
  const [selected, setSelected] = React.useState([]);
  const [nationalities, setNationalities, getNationalities] = React.useState(
    []
  );
  const [singleFile, setSingleFile] = React.useState(null);

  function updateNationalities() {
    nationalities.forEach((nationality) => {
      if (!selected.find((id) => id == nationality.id)) {
        let index = nationalities.indexOf(nationality);
        nationalities.splice(index, 1);
      }
    });

    selected.forEach((id) => {
      if (!nationalities.find((nationality) => nationality.id == id)) {
        let nation = countries.find((item) => item.id == id);
        setNationalities((currentNationalities) => [
          ...currentNationalities,
          { id: nation.id, name: nation.name },
        ]);
      }
    });

    antragData = { ...antragData, ...nationalities };
  }

  updateNationalities();

   pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "application/pdf",
    });
    console.log(result.type);
    console.log(result.uri);
    console.log(result);
    setSingleFile(result);

    if (singleFile != null) {
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append("name", "Image upload");
      data.append("file_attachment", fileToUpload);
    }
  };

  return (
    <View>
      <Header/>
      <View style={styles.headerContainer}>
        <WeiterButton
          onPress={() => {
            navigation.navigate("FragenScreen", { antragData });
          }}
        >
          zurück
        </WeiterButton>
        <WeiterButton
          onPress={() => {
            navigation.navigate("AntragSignatureScreen", { antragData });
          }}
        >
          weiter
        </WeiterButton>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.logo}>
          Ergänzende Daten - {"\n"}Weitere Staatsangehörigkeiten
        </Text>
        <Text style={styles.questionText}>
          Gibt es weitere Staatsangehörigkeiten, die im Führungszeugnis
          berücksichtigt werden sollen?
        </Text>

        <View style={styles.nationSelectContainer}>
          <View style={styles.selectListContainer}>
            <Select2
              style={styles.selectList}
              isSelectSingle={false}
              colorTheme="#223e4b"
              popupTitle="Staatsangehörigkeiten Auswahl"
              title="Staatsangehörigkeiten auswählen"
              searchPlaceHolderText="Wählen Sie Ihre Staatsangehöhrigkeiten aus"
              selectButtonText="Auswahl bestätigen"
              cancelButtonText="Abbruch"
              data={countriesList}
              onSelect={(data) => {
                setSelected(data);
              }}
              onRemoveItem={(data) => {
                setSelected(data);
              }}
              selectItem={nationalities}
            />
            <FlatList
              keyExtractor={(item) => item.id}
              data={nationalities}
              renderItem={(itemData) => {
                return (
                  <NationalityItem
                    id={itemData.item.id}
                    text={itemData.item.name}
                    onPress={pickDocument}
                    textcolor="#223e4b"
                  />
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 3,
  },
  button: {
    backgroundColor: "#8B93A5",
    padding: 10,
    borderRadius: 6,
    marginTop: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  nationSelectContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems:"center",
    backgroundColor: "#2C3639", //2C3639
    paddingLeft: 80,
    paddingBottom: 10,
  },
  bodyContainer: {
    height: 700,
    marginTop: 0,
    backgroundColor: "#3F4E4F",
  },
  h2: {
    fontSize: 20,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0,
    color: "#DCD7C9",
  },
  questionText: {
    fontSize: 15,
    marginLeft: 20,
    marginTop: 10,
    color: "#DCD7C9",
  },
  selectListContainer: {
    flex: 7,
    marginRight: 20,
    color: "#223e4b",
  },
  selectList: {
    backgroundColor: "#ffffff",
  },
});
