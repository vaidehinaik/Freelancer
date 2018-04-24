var mysql = require('mysql');

// localhost config
// var pool_config = {
// 						connectionLimit: 100,
// 						host     : 'localhost',
// 						user     : 'root',
// 						password : 'admin',
// 						database : 'freelancer'
// 					}

// aws database
var pool_config = {
						connectionLimit: 100,
						host     : 'freelancer.ca9j02g2avzs.us-west-1.rds.amazonaws.com',
						user     : 'root',
						password : 'password123',
						database : 'freelancer'
					}
// connection pool
var pool =  mysql.createPool(pool_config);
console.log("Connection pool is set ...")

module.exports = pool;
