const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { send } = require("process");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

////////////////////////////////// EXPRESS-SESSION-OPTIONS
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
/*
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
*/
/////////////////////////////////

app.use(cookieParser());
/*
app.use(
  cors({
    credentials: true,
    origin: "http://192.168.178.24:3000",
    optionsSuccessStatus: 200,
  })
);
*/

let ourConnection;
let hash;
let session;

app.get("/testdb.userdaten", function (reqTestdb, resTestdb) {
  connectionTestdb.getConnection(function (err, ourConnection) {
    connectionTestdb.query(
      "SELECT * FROM testdb.userdaten WHERE PIN=" +
        reqTestdb.query.pin +
        " AND ID='" +
        reqTestdb.query.id +
        "'",
      function (error, results, fields) {
        if (error) throw error;
        let user = results;
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          //JWT
          expiresIn: "1m",
        });
        resTestdb.cookie("token", token, {
          httpOnly: true,
        });
        resTestdb.send(results);
      }
    );
  });
});

let alreadySend = false;
app.get("/dekomdb.dekom_user", function (reqDekomdb, resDekmdb) {
  const token = reqDekomdb.cookies.token; //so bekommen wir den Token
  console.log(token);
  try {
    console.log("verifying user. Do you have a token?");
    const user = jwt.verify(token, process.env.JWT_SECRET); //JWT
    reqDekomdb.user = user;
    console.log("You have a token. +++");
  } catch {
    resDekmdb.clearCookie("token");
    resDekmdb.send(false);
    console.log("You dont have a token. Please Login again. ---");
    alreadySend = true;
  }
  connectionDekomdb.getConnection(function (err, ourConnection) {
    console.log("REQUEST HASH : " + reqDekomdb.query.userId);

    const createHash = async () => {
      const { createHmac } = await import("crypto");
      const secret = "abcdefgahah";
      hash = createHmac("sha256", secret)
        .update(reqDekomdb.query.userId)
        .digest("hex");
    };
    createHash().then(() => {
      connectionDekomdb.query(
        "SELECT USER_UUID FROM dekomdb.dekom_user WHERE USER_UUID='" +
          hash +
          "';",
        function (error2, results2, fields) {
          if (error2) {
            console.log("An error occurred:", error2.message);
          } else {
            /*  console.log(reqDekomdb.session);
            console.log("Session-ID / TOKEN: " + reqDekomdb.session.id);
            session = reqDekomdb.session;
            session.userid = hash;
            console.log(session);
            console.log(session.cookie.expires);
            

            connectionDekomdb.query(
              "INSERT INTO dekomdb.sessions (TOKEN,USER_UUID,EXPIRES) VALUES ('" +
                token +
                "','" +
                hash +
                "','" +
                reqDekomdb.session.cookie.expires +
                "');"
            );
            */

            if (results2.length) {
              console.log("User found successfully.");
              //  console.log("HASH THERE? : " + results2);
              if (alreadySend == false) {
                resDekmdb.send(true);
              }
            } else {
              console.log("User-------- not found.");
              connectionDekomdb.query(
                "INSERT INTO dekomdb.dekom_user (USER_UUID) VALUES ('" +
                  hash +
                  "');"
              );
              console.log("user inserted into Database!");
              if (alreadySend == false) {
                resDekmdb.send(results2);
              }
            }
          }
        }
      );
    });
  });
});

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
