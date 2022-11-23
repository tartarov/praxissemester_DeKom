const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password", // ''
  database: "testdb",
});

const connection2 = mysql.createPool({
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
// Creating a GET route that returns data from the 'users' table.
app.get("/testdb.userdaten", function (req, res) {
  console.log("REQUEST: " + req.query.pin);
  // Connecting to the database.
  connection.getConnection(function (err, ourConnection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query(
      "SELECT * FROM testdb.userdaten WHERE PIN=" + req.query.pin,
      function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;
        console.log(results);
        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
      }
    );
  });
});

app.get("/dekomdb.dekom_user", function (req2, res2) {
  connection2.getConnection(function (err, ourConnection) {
    console.log("REQUEST HASH : " + req2.query.userhash);
    connection2.query(
      "SELECT USER_HASH FROM dekomdb.dekom_user WHERE USER_HASH='" +
        req2.query.userhash +
        "';",
      function (error2, results2, fields) {
        if (error2) {
          console.log("An error occurred:", error2.message);
        } else {
          if (results2.length) {
            console.log("User found successfully.");
            console.log("HASH THERE? : " + results2);
            res2.send(true);
          } else {
            console.log("User-------- not found.");
            connection2.query(
              "INSERT INTO dekomdb.dekom_user (USER_HASH) VALUES ('" +
                req2.query.userhash +
                "');",
              function (error3, result3) {
                if (error3) throw error3;
                console.log("1 record inserted");
              }
            );
            console.log("user inserted into Database!")
            res2.send(results2);
          }
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
