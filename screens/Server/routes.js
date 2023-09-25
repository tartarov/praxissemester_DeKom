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
const tls = require('node:tls'); 
const https = require('https');
var http = require('http');
const fs = require('fs');
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

//var privateKey = fs.readFileSync( 'privatekey.pem' );
//var certificate = fs.readFileSync( 'certificate.pem' );

const filePath = 'C:/Users/themo/cert-key.pem';
  const fileContents = fs.readFileSync(filePath, 'utf8');
  console.log(fileContents + "                      ///END OF CERT KEY///                      ");

  const filePath2 = 'C:/Users/themo/fullchain.pem';
  const fileContents2 = fs.readFileSync(filePath2, 'utf8');
  console.log(fileContents2);

const options = {
  key: fs.readFileSync('C:/Users/themo/cert-key-coco.pem'),
  cert: fs.readFileSync('C:/Users/themo/fullchain-cocoOpenDNS.pem')
};
//console.log(JSON.stringify(fs.readFileSync('C:/Users/themo/fullchain.pem')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const getHash = async (value) => {
  const { createHmac } = await import("crypto");
  const secret = process.env.HASH_SECRET;
  let hash = createHmac("sha256", secret).update(value).digest("hex");
  return hash;
};

const authorized = async (id, pin) => {
  console.log("in Authorized ist folgende Pin: " + pin);
  let mock = true;

  if (mock == true) {
    try {
      const response = await fetch(
        `http://${process.env.IP}:3000/auth.behoerde?pin=${pin}&id=${id}`
      );
      const responseJSON = await response.json();

      return responseJSON;
    } catch (error) {
      console.error(`Error during authorization: ${error.message}`);
      throw error;
    }
  }
};

app.get("/auth.behoerde", (req, res) => {
  const { pin, id } = req.query;
  connectionTestdb.getConnection((err, ourConnection) => {
    connectionTestdb.query(
      "SELECT * FROM testdb.userdaten WHERE PIN = ? AND ID = ?",
      (values = [pin, id]),
      (err, results, fields) => {
        if (err) {
          console.error("Error querying database:", err);
          res.send(false);
          return;
        }
        //console.log(err)
        res.send(results.length > 0);
        ourConnection.release();
      }
    );
  });
});

app.get("/testdb.userdaten", async (req, res) => {
  const { pin } = req.query;
  console.log("https funktioniert!")

  // const isAuthenticated = await authorized(id, pin);

  // if (isAuthenticated) {
  let user = { pin: pin };
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("token", token, { httpOnly: true });
  res.send(formattingResponse(token, { value: true }));
  // } else {
  //    res.send(formattingResponse(null, { value: null }));
  //  }
});

app.get("/dekomdb.dekom_user/identify", cookieJWTAuth, async (req, res) => {
  const token = req.cookies.token; //so bekommen wir den Token
  const decoded = jwt_decode(token);
  const userIdHash = await getHash(decoded.user.pin);

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
            //  console.log("resultsssss[0]: " + JSON.stringify(results[0].SIGNATUR))
            // console.log("resultsssss[0]. SIGNATUR: " + res[1].SIGNATUR)
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
  const hash = await getHash(decoded.user.pin);

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
  const hash = await getHash(decoded.user.pin);

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
  const hash = await getHash(decoded.user.pin);

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
  const hash = await getHash(decoded.user.pin);

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
  const hash = await getHash(decoded.user.pin);

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
  const hash = await getHash(decoded.user.pin);

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
          console.log(antragId !== "null")
          if (antragId !== "null") {
              buf.push(new Buffer.from(res[0].SIGNATUR).toString("base64"));
          } else {
            buf = "";
          }
          console.log(buf)
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
  const hash = await getHash(decoded.user.pin);

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

const server = https.createServer(options, app);
const serversimple = http.createServer(app)


// Starting our server.
serversimple.listen(process.env.PORT, process.env.IP, () => {
  console.log(
    `Server has been started and listens to port ${process.env.PORT}.`
  );
});
