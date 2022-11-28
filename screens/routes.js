const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { send } = require("process");

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

let ourConnection;
let hash;
// Creating a GET route that returns data from the 'users' table.
app.get("/testdb.userdaten", function (reqTestdb, resTestdb) {
  console.log("REQUEST 1: " + reqTestdb.query.pin);
  console.log("REQUEST 2: " + reqTestdb.query.id);
  // Connecting to the database.
  connectionTestdb.getConnection(function (err, ourConnection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connectionTestdb.query(
      "SELECT * FROM testdb.userdaten WHERE PIN=" +
        reqTestdb.query.pin +
        " AND ID='" +
        reqTestdb.query.id +
        "'",
      function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;
        console.log(results);
        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        resTestdb.send(results);
      }
    );
  });
});

app.get("/dekomdb.dekom_user", function (reqDekomdb, resDekmdb) {
  connectionDekomdb.getConnection(function (err, ourConnection) {
    console.log("REQUEST HASH : " + reqDekomdb.query.userId);

    const createHash = async () => {
      const { createHmac } = await import("crypto");
      const secret = "abcdefgahah";
      hash = createHmac("sha256", secret)
        .update(reqDekomdb.query.userId)
        .digest("hex");
      console.log("Input String: " + reqDekomdb.query.userId);
      console.log("Hash Value: " + hash);
    };
    createHash().then(() => {
      connectionDekomdb.query(
        "SELECT USER_HASH FROM dekomdb.dekom_user WHERE USER_HASH='" +
          hash +
          "';",
        function (error2, results2, fields) {
          if (error2) {
            console.log("An error occurred:", error2.message);
          } else {
            if (results2.length) {
              console.log("User found successfully.");
              //  console.log("HASH THERE? : " + results2);
              resDekmdb.send(true);
            } else {
              console.log("User-------- not found.");
              connectionDekomdb.query(
                "INSERT INTO dekomdb.dekom_user (USER_HASH) VALUES ('" +
                  hash +
                  "');"
              );
              console.log("user inserted into Database!");
              resDekmdb.send(results2);
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
        console.log("results: " + results);
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
