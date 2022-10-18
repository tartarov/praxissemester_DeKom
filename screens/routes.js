// This is the routes.js file!

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'password', // ''
  database : 'testdb'
});


// Starting our app.
const app = express();
app.use(bodyParser.json({type: 'application/json'}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let ourConnection;
// Creating a GET route that returns data from the 'users' table.
app.get('/testdb.userdaten', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, ourConnection) {

   
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM testdb.userdaten', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/testdb.userdaten so you can see the data.');
});