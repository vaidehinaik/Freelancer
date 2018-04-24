var mysql = require('mysql');

// localhost
// var db_config = {
// 						host     : 'localhost',
// 						user     : 'root',
// 						password : 'admin',
// 						database : 'freelancer'
// 					}

// aws database
var db_config = {
						host: 'freelancer.ca9j02g2avzs.us-west-1.rds.amazonaws.com',
						user: 'root',
						password: 'password123',
						database: 'freelancer'

						// mysql connection
};var connection = mysql.createConnection(db_config);
console.log("Mysql Connection is set ...");

module.exports = connection;