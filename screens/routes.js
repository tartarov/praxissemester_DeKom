const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { send, allowedNodeEnvironmentFlags } = require("process");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetch = require("node-fetch");
const { cookieJWTAuth } = require("./middleware/cookieJWTAuth");
const jwt_decode = require("jwt-decode");
global.atob = require("atob");
global.Blob = require('node-blob');

const connectionTestdb = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password", // ''
  database: "testdb",
});

const connectionDekomdb = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password", // ''
  database: "dekomdb",
});

function formattingResponse(token, body) {
  let response = { token: token, body: body };
  return response;
}

// Starting our app.
const app = express();
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cookieParser());

let ourConnection;

const getHash = async (value) => {
  const { createHmac } = await import("crypto");
  const secret = "abcdefgahah";
  let hash = createHmac("sha256", secret).update(value).digest("hex");
  return hash;
};

app.get("/auth.behoerde", function (reqTestdb, resTestdb) {
  console.log("Ich bin hier!!!!!");
  connectionTestdb.getConnection(function (err, ourConnection) {
    connectionTestdb.query(
      "SELECT * FROM testdb.userdaten WHERE PIN=" +
        reqTestdb.query.pin +
        " AND ID='" +
        reqTestdb.query.id +
        "'",
      function (error, results, fields) {
        console.log("Result of Query" + results);
        console.log(results);
        if (results.length) {
          resTestdb.send(true);
        } else {
          resTestdb.send(false);
        }
        ourConnection.release();
        if (error) throw error;
      }
    );
  });
});

const authorized = async (id, pin) => {
  let respond = await fetch(
    "http://93.133.109.105:3000/auth.behoerde?pin=" + pin + "&id=" + id
  ).catch(function (error) {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
    throw error;
  });
  let respondJSON = await respond.json();
  let respondSTRING = JSON.stringify(respondJSON);
  return respondSTRING;
};

app.get("/testdb.userdaten", async function (reqTestdb, resTestdb) {
  console.log(
    "ServerSide - reqTestDb:" +
      reqTestdb.query.id +
      "------------- " +
      reqTestdb.query.pin
  );
  let value = await authorized(reqTestdb.query.id, reqTestdb.query.pin);

  if (value == "true") {
    let user = { id: reqTestdb.query.id, pin: reqTestdb.query.pin };
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      //JWT
      expiresIn: "10m",
    });
    resTestdb.cookie("token", token, {
      httpOnly: true,
    });
    resTestdb.send(formattingResponse(token, { value: true }));
  } else {
    resTestdb.send(formattingResponse(null, { value: null }));
  }
});

app.get(
  "/dekomdb.dekom_user/identify",
  cookieJWTAuth,
  function (reqDekomdb, resDekmdb) {
    const token = reqDekomdb.cookies.token; //so bekommen wir den Token
    let decoded = jwt_decode(token);
    let decodedJSON = JSON.stringify(decoded);
    let decodedParseToken = JSON.parse(decodedJSON);
    connectionDekomdb.getConnection(function (err, ourConnection) {
      getHash(decodedParseToken.user.id).then((hash) => {
        console.log(hash);
        connectionDekomdb.query(
          "SELECT * FROM dekomdb.dekom_user WHERE USER_ID_HASH='" + hash + "';",
          function (error2, results2, fields) {
            if (error2) {
              console.log("An error occurred:", error2.message);
              throw error2
            } else {

              if (results2.length) {
                console.log("User found successfully.");
              //  console.log("results2 IS: " + JSON.stringify(results2));
                resDekmdb.send(
                  formattingResponse(token, { value: true, result: results2 })
                );
              } else {
                console.log("User-------- not found.");
                resDekmdb.send(formattingResponse(token, { value: false }));
              }
            }
            ourConnection.release();
          }
        );
      });
    });
  }
);

app.post("/user/save", cookieJWTAuth, function (req, resData) {
  console.log("Request triggered");
  console.log("USERDATA IN ROUTES: " + req.body.geschlecht);
  let userData = req.body;
  console.log("UserData beim Server: " + JSON.stringify(userData));
  let token = req.cookies.token;
  let decoded = jwt_decode(token);
  let decodedJSON = JSON.stringify(decoded);
  let decodedParseToken = JSON.parse(decodedJSON);
  connectionDekomdb.getConnection(function (err, ourConnection) {
    getHash(decodedParseToken.user.id).then((hash) => {
      connectionDekomdb.query(
        "INSERT INTO dekomdb.dekom_user (USER_ID_HASH,TITEL,NAME,VORNAME,ZWEITNAME, GESCHLECHT,GEBURTSDATUM,AUGENFARBE,GROESSE,VORWAHL,TELEONNUMMER,BUNDESLAND,GEBURTSORT,STADT,BEHOERDE,PLZ,STRASSE,HAUSNUMMER,E_MAIL,STAATSANGEHOERIGKEIT) VALUES ('" +
          hash +
          "','" +
          userData.titel +
          "','" +
          userData.nachname +
          "','" +
          userData.vorname +
          "','" +
          userData.zweitname +
          "','" +
          userData.geschlecht +
          "','" +
          userData.geburtsdatum +
          "','" +
          userData.augenfarbe +
          "','" +
          userData.groesse +
          "','" +
          userData.vorwahl +
          "','" +
          userData.telefonnummer +
          "','" +
          userData.bundesland +
          "','" +
          userData.geburtsort +
          "','" +
          userData.stadt +
          "','" +
          userData.behoerde +
          "','" +
          userData.postleitzahl +
          "','" +
          userData.straße +
          "','" +
          userData.hausnummer +
          "','" +
          userData.email +
          "','" +
          userData.staatsangehoerigkeit +
          "');"
      );
    });
    ourConnection.release();
  });
  resData.send(formattingResponse(token, { value: true }));
});

app.post("/user/save/signature", cookieJWTAuth, function (req, resData) { 
console.log("hello!!!!!!")
let token = req.cookies.token;
let decoded = jwt_decode(token);
let decodedJSON = JSON.stringify(decoded);
let decodedParseToken = JSON.parse(decodedJSON);

let ret = req.body;
console.log("RET: " + JSON.stringify(ret))
const byteCharacters = global.atob(JSON.stringify(ret));
const byteNumbers = new Array(byteCharacters.length);
for (let i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
}
const byteArray = new Uint8Array(byteNumbers);
const blob = new global.Blob([byteArray]);
console.log('blob of signature is :' + JSON.stringify(blob))

connectionDekomdb.getConnection(function (err, ourConnection) {
  console.log("ich setze jetzt ein!")
  getHash(decodedParseToken.user.id).then((hash) => {
    connectionDekomdb.query(
      "UPDATE dekomdb.dekom_user SET SIGNATUR = '" + JSON.stringify(blob) + "' WHERE USER_ID_HASH='" + hash + "';"
    );
  });
  ourConnection.release();
});
resData.send(formattingResponse(token, { value: true }));
});

// Starting our server.
app.listen(3000, () => {
  console.log(
    "Go to http://93.132.35.91:3000/testdb.userdaten so you can see the data."
  );
});
