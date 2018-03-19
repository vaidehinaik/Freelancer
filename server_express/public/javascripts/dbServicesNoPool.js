var mysql = require('mysql');
// Connect to mysql
var connection = require('./mysqlConnector');

console.log("Connection DB with regular connection ");
exports.selectData = (callback, query) => {
    console.log("RUNNING MySQL SELECT QUERY THROUGH REGULAR CONNECTION: " + query);
    connection.query(query, function (err, result, fields) {
      if (err) {
        console.log("ERROR: " + err.message);
        throw err;
      }
      console.log("Results: \n" + JSON.stringify(result));
      callback(err, result);
    });
}

exports.insertData = (callback, query) => {
	  console.log("RUNNING MySQL INSERT QUERY THROUGH REGULAR CONNECTION: " + query);
    console.log("Connected!");
    connection.query(query, function (err, result) {
      if (err) {
        console.log("ERROR: " + err.message);
        throw err;
      }
      console.log("Results: \n" + JSON.stringify(result));
      console.log("The inserted id is: " + result.insertId);
      callback(err, result);
    });
}
