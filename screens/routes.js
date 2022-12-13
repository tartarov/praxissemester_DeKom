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
 let hash = createHmac("sha256", secret)
    .update(value)
    .digest("hex");
    return hash
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
        if (error) throw error;
        console.log(results);
        if (results.length) {
          resTestdb.send(true);
        } else {
          resTestdb.send(false);
        }
      }
    );
  });
});

const authorized = async (id, pin) => {
  let respond = await fetch(
    "http://10.1.111.32:3000/auth.behoerde?pin=" + pin + "&id=" + id
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
    console.log("Ich bin im ELSE!!1");
    resTestdb.send(formattingResponse(null, { value: null }));
  }
});

app.get("/dekomdb.dekom_user", cookieJWTAuth, function (reqDekomdb, resDekmdb) {
  const token = reqDekomdb.cookies.token; //so bekommen wir den Token
  let decoded = jwt_decode(reqDekomdb.query.token);
  let decodedJSON = JSON.stringify(decoded)
  let decodedParseToken = JSON.parse(decodedJSON);
  connectionDekomdb.getConnection(function (err, ourConnection) {
    getHash(decodedParseToken.user.id).then((hash) => { 
      console.log(hash)
      connectionDekomdb.query(
        "SELECT USER_UUID FROM dekomdb.dekom_user WHERE USER_UUID='" +
          hash +
          "';",
        function (error2, results2, fields) {
          if (error2) {
            console.log("An error occurred:", error2.message);
          } else {
            if (results2.length) {
              console.log("User found successfully.");
              resDekmdb.send(formattingResponse(token, { value: "true" }));
            } else {
              console.log("User-------- not found.");
              resDekmdb.send(formattingResponse(token, { value: "false" }));
            }
          }
        }
      );
    });
  });
});


app.get("insert/userData",cookieJWTAuth, function (req, resData) {
  let decoded = jwt_decode(req.query.token);
  let decodedJSON = JSON.stringify(decoded)
  let decodedParseToken = JSON.parse(decodedJSON);
  connectionDekomdb.getConnection(function (err, ourConnection) {
      getHash(decodedParseToken.user.id).then((hash) => {
        connectionDekomdb.query(
        "INSERT INTO dekomdb.dekom_user (USER_UUID) VALUES ('" +
        hash +
        "');"
        );
      })
  })
})

/*
    connectionDekomdb.query(
                "INSERT INTO dekomdb.dekom_user (USER_UUID) VALUES ('" +
                  hash +
                  "');"
              );
*/

app.get("/user/data", function (req, resData) {
  connectionDekomdb.getConnection(function (err, ourConnection) {
    connectionDekomdb.query(
      "SELECT NAME FROM dekomdb.dekom_user WHERE USER_HASH='" + hash + "';",
      function (error, results, fields) {
        if (error) {
          throw error;
        } else {
          resData.send(results);
        }
      }
    );
  });
});

// Starting our server.
app.listen(3000, () => {
  console.log(
    "Go to http://93.132.35.91:3000/testdb.userdaten so you can see the data."
  );
});
