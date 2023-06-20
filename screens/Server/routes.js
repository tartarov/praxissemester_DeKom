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
  console.log("in Authorized ist folgende Pin: " + pin)
  let mock = true;

  if(mock == true){
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
  let fullDate = date + "-" + month + "-" + year + ",  " + hours + ":" + minutes + ":" + seconds
  console.log(date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds);
  console.log(date)


  connectionDekomdb.getConnection((err, ourConnection) => {
    console.log("File ist " + req.body.file);
    connectionDekomdb.query(
      "INSERT INTO dekomdb.userdocuments (USER_ID_HASH, ANTRAG, DATUM) VALUES (?,?,?)",
      (values = [hash, req.body.file, fullDate]),
      function (err, res) {
        if (err) {
          console.log(err)
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
      (values = [hash]), (err, res) => {
        if (err) {
          console.log(err)
          throw err;
        } else if (res.length) {
          console.log("Documents found! +++");
          console.log("Docuemnts are: " + JSON.stringify(res));
          resData.send(
            formattingResponse(token, {
              value: true,
              result: res,
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

// Starting our server.
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(
    `Server has been started and listens to port ${process.env.PORT}.`
  );
});
