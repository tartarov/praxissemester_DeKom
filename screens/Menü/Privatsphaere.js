import React from "react";
import { Header } from "../../components/Header";
import { View, Text, ScrollView } from "react-native";

export default function Privatsphaere({ navigation }) {
  return (
    <>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Datenschutzbestimmungen</Text>
        <Text style={styles.paragraph}>
          Diese Datenschutzbestimmungen gelten für die Nutzung der
          DeKom-Anwendung ("App") und legen dar, wie wir personenbezogene Daten
          erfassen, verwenden, offenlegen und schützen.
        </Text>

        <Text style={styles.subheading}>
          Erfassung und Verwendung von Daten
        </Text>
        <Text style={styles.paragraph}>
          Bei der Nutzung unserer App können bestimmte personenbezogene Daten
          erfasst werden, insbesondere im Rahmen des
          Authentifizierungsprozesses. Diese Daten umfassen Informationen, die
          von Ihrem Personalausweis abgelesen werden, wie beispielsweise Ihren
          Namen, Ihre Adresse und andere persönliche Angaben.
        </Text>
        <Text style={styles.paragraph}>
          Wir verwenden diese Daten ausschließlich zum Zwecke der
          Authentifizierung und zur Bereitstellung unserer Dienste gemäß den
          geltenden Gesetzen und Vorschriften. Die Daten werden nicht für andere
          Zwecke verwendet, es sei denn, Sie haben ausdrücklich eingewilligt
          oder es ist gesetzlich vorgeschrieben.
        </Text>

        <Text style={styles.subheading}>
          Zugriff auf und Verwaltung Ihrer Daten
        </Text>
        <Text style={styles.paragraph}>
          Sie haben das Recht, auf Ihre personenbezogenen Daten zuzugreifen und
          sie zu überprüfen. In unserer App können Sie Ihre persönlichen Daten
          in den Einstellungen einsehen.
        </Text>

        <Text style={styles.subheading}>
          Datenlöschung und Sicherheitsmaßnahmen
        </Text>
        <Text style={styles.paragraph}>
          Aus Sicherheitsgründen ist die Nutzung der App auf 15 Minuten
          beschränkt. Nach Ablauf dieser Zeit werden sämtliche personenbezogene
          Daten unwiderruflich gelöscht. Um die App wie gewohnt nutzen zu
          können, müssen Sie sich erneut authentifizieren.
        </Text>
        <Text style={styles.paragraph}>
          Wir setzen angemessene technische und organisatorische Maßnahmen ein,
          um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust,
          Missbrauch oder unbefugter Offenlegung zu schützen. Wir halten uns an
          bewährte Sicherheitsstandards, um die Vertraulichkeit und Integrität
          Ihrer Daten zu gewährleisten.
        </Text>

        <Text style={styles.paragraph}>
          Die Nutzerdaten werden ausschließlich lokal auf Ihrem Gerät
          gespeichert und nicht in einer zentralen Datenbank abgelegt. Lediglich
          Spurenelemente, wie Referenzen Ihre Anträge oder andere
          dienstleistungsspezifische Metadaten, werden in einer zentralen
          Datenbank gespeichert. Diese Daten dienen ausschließlich dem Zweck Ihrer
          Dienstleitungsverwaltung.
        </Text>

        <Text style={styles.subheading}>Weitergabe von Daten</Text>
        <Text style={styles.paragraph}>
          Wir geben keine personenbezogenen Daten an Dritte weiter, es sei denn,
          dies ist zur Erfüllung unserer vertraglichen Verpflichtungen oder zur
          Einhaltung gesetzlicher Vorschriften erforderlich. Wir geben Ihre
          Daten, im Normalfall, nur an den Authentifizierungsanbieter der Bundesdruckerei
          D-Trust weiter, um den Authentifizierungsprozess durchzuführen und
          Ihre Identität zu überprüfen. Bitte beachten Sie, dass bei jeder
          erfolgreichen Abwicklung einer Antragsdienstleistung Ihre Daten an die dafür vorgesehenen
          öffentlichen Behörden fließen können.
        </Text>

        <Text style={styles.subheading}>
          Änderungen an diesen Datenschutzbestimmungen
        </Text>
        <Text style={styles.paragraph}>
          Wir behalten uns das Recht vor, diese Datenschutzbestimmungen
          jederzeit zu ändern oder zu aktualisieren. Über wesentliche Änderungen
          werden wir Sie durch geeignete Mittel informieren. Wir empfehlen
          Ihnen, diese Datenschutzbestimmungen regelmäßig zu überprüfen, um über
          unsere Datenschutzpraktiken auf dem Laufenden zu bleiben.
        </Text>

        <Text style={styles.subheading}>Kontakt</Text>
        <Text style={styles.paragraph}>
          Wenn Sie Fragen oder Bedenken hinsichtlich dieser
          Datenschutzbestimmungen haben oder Ihre Datenschutzrechte ausüben
          möchten, können Sie uns unter dekom@support.de erreichen.
        </Text>

        <Text style={styles.subheading}>Letzte Aktualisierung</Text>
        <Text style={styles.paragraph}>
          Diese Datenschutzbestimmungen wurden zuletzt am 21.04.2024
          aktualisiert.
        </Text>

        <Text style={styles.paragraph}>
          Bitte beachten Sie, dass diese Datenschutzbestimmungen nur für unsere
          App gelten und nicht für Websites oder Dienste Dritter, die
          möglicherweise über Links in unserer App erreichbar sind. Wir
          übernehmen keine Verantwortung für die Datenschutzpraktiken oder den
          Inhalt solcher externen Websites oder Dienste.
        </Text>
      </ScrollView>
      <View style={{ height: 80, backgroundColor: "#3F4E4F" }} />
    </>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#3F4E4F",
  },
  heading: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subheading: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  paragraph: {
    marginBottom: 15,
    fontSize: 16,
    color: "white",
  },
};
