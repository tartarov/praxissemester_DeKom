Willkomen im Repo der DeKom-App.
Das Repo ist unterteilt in verschiedene Ordner, die den Quellcode strukturieren. 

Screens: Screens ist der Ordner, wo alle Screens der DeKom-App enthalten sind. So gibt es innerhalb des Screens-Ordners beispielsweise einen LoginAndRegister Ordner, die alle Screens im Kontext der Authentifizierung des Nutzers innehält. Fäschlicherweise liegt dort auch der Server drin. TODO: Server von der DeKom-App separieren. 

Server: Der Server-Ordner befindet derzeit noch im Screens-Ordner. Im Ordner befindet sich der node.js-Server und ein .env-file, die die Umgebungsveriablen innehält. Ein wichtiger Ordner ist ebenso die middleware. Diese enthält die Verifizierung für eine Sesssion-Dauer innerhalb der Anwendung und hat einen engen Zusammenhang mit dem Server während der Requesterfasung.

Navigations: Navigations enthält alle navigationskomponenten einer React Native Anwendung. Diese Komponenten erlauben es, zwischen den Screens zu navigieren.

Context: Context ist ein wichtiger Ordner, der alle Schichten der Anwendung enthält. Beispielsweise gibt es einen Authentifizierungskontext-File, der die Logik der Authentifizerung enthält. DataKontext kontrolliert den Datenfluss der Anwendung während AntragKontext die Rolle des Antragsmanagements übernimmt. Der Context-Ordner ist somit das Herz der DeKom-App Anwendung.

Components: Dieser Ordner enthält alle wiederverwendbaren Kompontenten, wie Buttons, Lottie-Files, Formular-Karten und andere Blueprints, die für das UI und UX wichtig sind. 

Der Android-Ordner enthält zusätzlich noch die Integration des AusweisApp2-Clients mittels einer Bridge.
