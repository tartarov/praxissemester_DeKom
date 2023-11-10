const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetch = require("node-fetch");
const { cookieJWTAuth } = require("../middleware/cookieJWTAuth");
const { formattingResponse } = require("../middleware/Formatter.js");
const jwt_decode = require("jwt-decode");
const tls = require("node:tls");
const https = require("https");
var http = require("http");
const fs = require("fs");
global.atob = require("atob");
global.Blob = require("node-blob");

const connectionTestdb = mysql.createPool({
  host: process.env.TEST_DB_HOST,
  port: process.env.TEST_DB_PORT,
  user: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASSWORD, // ''
  database: process.env.TEST_DB_DATABASE,
});

const connectionDekomdb = mysql.createPool({
  host: process.env.DEKOM_DB_HOST,
  port: process.env.DEKOM_DB_PORT,
  user: process.env.DEKOM_DB_USER,
  password: process.env.DEKOM_DB_PASSWORD, // ''
  database: process.env.DEKOM_DB_DATABASE,
});

const app = express();

const optionsNoIp = {
  key: fs.readFileSync("C:/Users/themo/dekomPrivateKey.key"),
  cert: fs.readFileSync("C:/Users/themo/dekom_ddns_net.pem"),
  passphrase: process.env.PASSPHRASE,
};
// Lese die Zertifikate aus den Dateien
const cert1 = fs.readFileSync(
  "C:/AusweisIDent/Signaturzertifikat/Aktuelles_AusweisIdent_Signaturzertifikat/AusweisIDent_Signaturzertifikat.cer"
);
const cert2 = fs.readFileSync(
  "C:/AusweisIDent/Signaturzertifikat/Aktuelles_AusweisIdent_Signaturzertifikat/D-TRUST_Limited_Basic_CA_1-2_2019.pem"
);
const cert3 = fs.readFileSync(
  "C:/AusweisIDent/Signaturzertifikat/Aktuelles_AusweisIdent_Signaturzertifikat/D-TRUST_Limited_Basic_Root_CA_1_2019.pem"
);

const optionsDtrust = {
  cert: [cert1], // Ein Array mit den Zertifikaten  // Weitere Optionen...
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const getHash = async (name, streetAddress) => {
  const { createHmac } = await import("crypto");
  const secret = process.env.HASH_SECRET;
  let value = name+streetAddress;
  let hash = createHmac("sha256", secret).update(value).digest("hex");
  return hash;
};

const getUserInfoToken = async (accessToken) => {
  console.log("in getUserInfoToken ist folgender AccesToken: " + accessToken);

  const requestOptionsUserInfo = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + accessToken,
     // "Content-Type": "application/json",
    },
  };

    try {
      const response2 = await fetch(
        `https://ref-ausweisident.eid-service.de/oic/user-info`,
        requestOptionsUserInfo
      );
      const userInfoJSON = await response2.text();
    //  console.log("RESPONSE2: " + userInfoJSON)
      return(userInfoJSON)
    } catch (error) {
      console.error(`Error during authorization: ${error.message}`);
      throw error;
    }
};

app.get("/auth", async (req, res) => {

//https://ref-ausweisident.eid-service.de/oic/authorize?scope=openid+FamilyNames+GivenNames+DateOfBirth+PlaceOfResidence&response_type=code&redirect_uri=https%3A%2F%2Fdekom.ddns.net%3A4222%2Fauth&state=123456&client_id=UF2RkWt7dI&acr_values=browser

  console.log("requestquery: " + JSON.stringify(req.query.code));

  const uri_encoded_ClientId = encodeURIComponent("UF2RkWt7dI");
  console.log("URI encoded Client ID: " + uri_encoded_ClientId);

  const uri_encoded_Cs = encodeURIComponent(":B3?KZN1uN#rDn0sc?wxb");
  console.log("URI encoded secret: " + uri_encoded_Cs);

  const authrozationHeader = uri_encoded_ClientId + ":" + uri_encoded_Cs;
  console.log("raw authHeader: " + authrozationHeader);

  const authorizationHeader = new Buffer.from(authrozationHeader).toString(
    "base64"
  );
  console.log("authorizationHeader: " + authorizationHeader);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + authorizationHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  let responseJSON;

  try {
    const response = await fetch(
      `https://ref-ausweisident.eid-service.de/oic/token?code=${req.query.code}&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fdekom.ddns.net%3A4222%2Fauth`,
      requestOptions
    );
    responseJSON = await response.json();
    console.log(responseJSON);
    const  accessToken = responseJSON.access_token
    const userInfo = await getUserInfoToken(accessToken)
    const decodedUserInfo = jwt_decode(userInfo)
    console.log("userInfo: " + JSON.stringify(decodedUserInfo))
    let user = { name: decodedUserInfo.name, streetAdress: decodedUserInfo.address.streetAddress, locality: decodedUserInfo.address.locality, birthdate: decodedUserInfo.birthdate  };
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
  
    res.cookie("token", token, { httpOnly: true });
    res.send(formattingResponse(token, { value: true }));
   // res.send("NAME: " + decodedUserInfo.name + " ; ADRESSE: " + decodedUserInfo.address.streetAddress + ", " + decodedUserInfo.address.locality + " ; GEBURTSTAG: " +  decodedUserInfo.birthdate )
  } catch (error) {
    console.error(`Error during authorization: ${error.message}`);
    throw error;
  }

 // console.log("Access Token: " + JSON.stringify(responseJSON.access_token));
});

app.get("/testdb.userdaten", async (req, res) => {
  const { pin } = req.query;
  console.log("https funktioniert!");

  // const isAuthenticated = await authorized(id, pin);

  // if (isAuthenticated) {
  let user = { pin: pin };
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "0.5m",
  });

  res.cookie("token", token, { httpOnly: true });
  res.send(formattingResponse(token, { value: true }));
  // } else {
  //    res.send(formattingResponse(null, { value: null }));
  //  }
});

app.get("/dekomdb.dekom_user/identify", cookieJWTAuth, async (req, res) => {
  const token = req.cookies.token; //so bekommen wir den Token
  console.log("in server Token: " + token)
  const decoded = jwt_decode(token);
  console.log("in server decoded Token: " + decoded)
  const userIdHash = await getHash(decoded.user.name,decoded.user.streetAddress);

  const query = `SELECT * FROM dekomdb.dekom_user WHERE USER_ID_HASH='${userIdHash}'`;
  connectionDekomdb.getConnection((err, ourConnection) => {
    connectionDekomdb.query(query, (error, results, fields) => {
      if (error) {
        console.log("An error occurred:", error.message);
        throw error;
      } else {
        if (results.length) {
          console.log("User found successfully.");
          let buf = "";
          if (results[0].SIGNATUR !== null) {
            buf = new Buffer.from(results[0].SIGNATUR).toString("base64");
          } else {
            buf = "";
          }
          res.send(
            formattingResponse(token, {
              value: true,
              result: results,
              signature: buf,
            })
          );
        } else {
          console.log("User-------- not found.");
          res.send(formattingResponse(token, { value: false }));
        }
      }
      ourConnection.release();
    });
  });
});

app.post("/user/save", cookieJWTAuth, async (req, resData) => {
  const userData = req.body;

  const token = req.cookies.token;
  const decoded = jwt_decode(token);
  const hash = await getHash(decoded.user.name,decoded.user.streetAddress);

  connectionDekomdb.getConnection((err, ourConnection) => {
    connectionDekomdb.query(
      "INSERT INTO dekomdb.dekom_user (USER_ID_HASH,TITEL,NAME,VORNAME,ZWEITNAME, GESCHLECHT,GEBURTSDATUM,AUGENFARBE,GROESSE,VORWAHL,TELEONNUMMER,BUNDESLAND,GEBURTSORT,STADT,BEHOERDE,PLZ,STRASSE,HAUSNUMMER,E_MAIL,STAATSANGEHOERIGKEIT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      (values = [
        hash,
        userData.titel,
        userData.nachname,
        userData.vorname,
        userData.zweitname,
        userData.geschlecht,
        userData.geburtsdatum,
        userData.augenfarbe,
        userData.groesse,
        userData.vorwahl,
        userData.telefonnummer,
        userData.bundesland,
        userData.geburtsort,
        userData.stadt,
        userData.behoerde,
        userData.postleitzahl,
        userData.straße,
        userData.hausnummer,
        userData.email,
        userData.staatsangehoerigkeit,
      ])
    );
    ourConnection.release();
  });
  resData.send(formattingResponse(token, { value: true }));
});

app.post("/user/save/signature", cookieJWTAuth, async (req, resData) => {
  let token = req.cookies.token;
  let decoded = jwt_decode(token);
  const hash = await getHash(decoded.user.name,decoded.user.streetAddress);

  connectionDekomdb.getConnection((err, ourConnection) => {
    connectionDekomdb.query(
      "UPDATE dekomdb.dekom_user SET SIGNATUR = ? WHERE USER_ID_HASH= ? ;",
      (values = [new Buffer.from(req.body.base, "base64"), hash]),
      function (err, res) {
        if (err) {
          throw err;
        }
      }
    );
    ourConnection.release();
  });
  resData.send(formattingResponse(token, { value: true }));
});

app.post("/antrag/save/signature", cookieJWTAuth, async (req, resData) => {
  let token = req.cookies.token;
  let decoded = jwt_decode(token);
  const hash = await getHash(decoded.user.name,decoded.user.streetAddress);

  connectionDekomdb.getConnection((err, ourConnection) => {
    connectionDekomdb.query(
      "UPDATE dekomdb.userdocuments SET SIGNATUR = ? WHERE USER_ID_HASH= ? ;",
      (values = [new Buffer.from(req.body.base, "base64"), hash]),
      function (err, res) {
        if (err) {
          throw err;
        }
      }
    );
    ourConnection.release();
  });
  resData.send(formattingResponse(token, { value: true }));
});

app.post("/user/save/antrag", cookieJWTAuth, async (req, resData) => {
  let token = req.cookies.token;
  let decoded = jwt_decode(token);
  const hash = await getHash(decoded.user.name,decoded.user.streetAddress);

  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  // prints date in YYYY-MM-DD format
  console.log(year + "-" + month + "-" + date);

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  let fullDate =
    date +
    "-" +
    month +
    "-" +
    year +
    ",  " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  console.log(
    date +
      "-" +
      month +
      "-" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
  );

  connectionDekomdb.getConnection((err, ourConnection) => {
    console.log("File ist " + req.body.file);
    connectionDekomdb.query(
      "INSERT INTO dekomdb.userdocuments (USER_ID_HASH, ANTRAG, DATUM, SIGNATUR) VALUES (?,?,?,?)",
      (values = [
        hash,
        req.body.file,
        fullDate,
        new Buffer.from(req.body.signatur, "base64"),
      ]),
      function (err, res) {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
    ourConnection.release();
  });
  resData.send(formattingResponse(token, { value: true }));
});

app.get("/user/identify/antrag", cookieJWTAuth, async (req, resData) => {
  let token = req.cookies.token;
  let decoded = jwt_decode(token);
  const hash = await getHash(decoded.user.name,decoded.user.streetAddress);

  connectionDekomdb.getConnection((err, ourConnection) => {
    connectionDekomdb.query(
      "SELECT * FROM dekomdb.userdocuments WHERE USER_ID_HASH= ? ",
      (values = [hash]),
      (err, res) => {
        if (err) {
          console.log(err);
          throw err;
        } else if (res.length) {
          console.log("Documents found! +++");
          let buf = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].SIGNATUR !== null) {
              buf.push(new Buffer.from(res[i].SIGNATUR).toString("base64"));
            } else {
              buf = "";
            }
          }
          resData.send(
            formattingResponse(token, {
              value: true,
              result: res,
              signature: buf,
            })
          );
        } else {
          console.log("No Documents found -------- ");
          resData.send(formattingResponse(token, { value: false }));
        }
      }
    );
    ourConnection.release();
  });
});

app.get("/user/getById/antrag", cookieJWTAuth, async (req, resData) => {
  let token = req.cookies.token;
  const { antragId } = req.query;
  let decoded = jwt_decode(token);
  const hash = await getHash(decoded.user.name,decoded.user.streetAddress);

  connectionDekomdb.getConnection((err, ourConnection) => {
    console.log(`SELECT FROM dekomdb.userdocuments WHERE ID=${antragId}`);
    connectionDekomdb.query(
      `SELECT * FROM dekomdb.userdocuments WHERE ID=${antragId}`,
      (err, res) => {
        //(values = [antragId])
        console.log("RES: " + JSON.stringify(res));
        if (err) {
          console.log(err);
          throw err;
        } else if (res) {
          console.log("Document By Id found ++++ : " + res);
          let buf = [];
          console.log(antragId !== "null");
          if (antragId !== "null") {
            buf.push(new Buffer.from(res[0].SIGNATUR).toString("base64"));
          } else {
            buf = "";
          }
          console.log(buf);
          resData.send(
            formattingResponse(token, {
              value: true,
              result: res,
              signature: buf[0],
            })
          );
        } else {
          console.log("No Document by given Id found -------- ");
          resData.send(formattingResponse(token, { value: false }));
        }
      }
    );
    ourConnection.release();
  });
});

app.delete("/user/remove/antrag", cookieJWTAuth, async (req, resData) => {
  let token = req.cookies.token;
  const { antragId } = req.query;
  let decoded = jwt_decode(token);
  const hash = await getHash(decoded.user.name,decoded.user.streetAddress);

  connectionDekomdb.getConnection((err, ourConnection) => {
    console.log(`DELETE FROM dekomdb.userdocuments WHERE ID=${antragId}`);
    connectionDekomdb.query(
      `DELETE FROM dekomdb.userdocuments WHERE ID=${antragId}`,
      (err, res) => {
        //(values = [antragId])
        console.log("RES: " + JSON.stringify(res));
        if (err) {
          console.log(err);
          throw err;
        } else if (res) {
          console.log("Document Removed ++++ : " + res);
          resData.send(
            formattingResponse(token, {
              value: true,
              result: res,
            })
          );
        } else {
          console.log("No Document found to remove -------- ");
          resData.send(formattingResponse(token, { value: false }));
        }
      }
    );
    ourConnection.release();
  });
});

const server = https.createServer(optionsNoIp, app);
const serversimple = http.createServer(app);

// Starting our server.
server.listen(process.env.PORT, process.env.IP, () => {
  console.log(
    `Server has been started and listens to port ${process.env.PORT}.`
  );
});
