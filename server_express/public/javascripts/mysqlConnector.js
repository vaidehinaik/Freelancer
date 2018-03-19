var mysql = require('mysql');

var db_config = {
						host     : 'localhost',
						user     : 'root',
						password : 'admin',
						database : 'freelancer'
					}

// mysql connection
var connection =  mysql.createConnection(db_config);
console.log("Mysql Connection is set ...")

module.exports = connection;
