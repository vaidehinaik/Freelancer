var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
export const getConnection = () => {
  	var connection = mysql.createConnection({
  		host     : 'localhost',
  		user     : 'root',
  		password : 'root',
  		database : 'test',
  		port	 : 3306
  	});
  	return connection;
}
