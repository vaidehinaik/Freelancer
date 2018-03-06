var mysql = require('mysql');
// Connect to mysql
var pool = require('./mysqlConnectionPool');

exports.selectData = (callback, query) => {
    console.log("MySQL SELECT QUERY: " + query);
    pool.getConnection((err, connection) => {
        connection.query(query, function(err, rows, fields) {
            if(err) {
                console.log("ERROR: " + err.message);
            }
            else
            {
              console.dir("Results: \n" + JSON.stringify(rows));
              callback(err, rows);
            }
        });
      connection.release();
      console.log("Connection released");
  });
}

exports.insertData = (callback, query) => {
	  console.log("MySQL INSERT QUERY: " + query);
  	pool.getConnection( (error, connection) => {
    		connection.query(query, function(err, result) {
      			if(err) {
      				  console.log("ERROR: " + err.message);
      			} else {
        				console.log("Results: \n" + JSON.stringify(result));
                console.log("The inserted id is: " + result.insertId);
        				callback(err, result);
      			}
    		});
        connection.release();
        console.log("Connection released");
  	});
}
