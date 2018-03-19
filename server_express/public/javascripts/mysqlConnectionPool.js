var mysql = require('mysql');

var pool_config = {
						connectionLimit: 100,
						host     : 'localhost',
						user     : 'root',
						password : 'admin',
						database : 'freelancer'
					}
// connection pool
var pool =  mysql.createPool(pool_config);
console.log("Connection pool is set ...")

module.exports = pool;
