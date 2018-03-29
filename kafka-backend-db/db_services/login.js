function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    if(msg.username == "vaidehin" && msg.password =="vaidehi"){
        res.status = 200;
        res.value = "Success Login";
        console.log("login successful");

    }
    else{
        res.status = 401;
        res.value = "Failed Login";
    }
    callback(null, res);
}

exports.handle_request = handle_request;




//var bcrypt = require('bcrypt');





//var mysqlconn = require('../mysql/mysqlConnectionPool');
// var mysqlconn = require('../mysql/mysqlSingleConnection');

/*Salt round for hashing password*/
//const saltRounds = 10;

//console.log("Login");

//exports.handle_request = (data, callback) => {
  //var response = {};

  //try {
    //  var mysqlQuery = "select username, password from users where username = '" + data.username + "'";
      //mysqlconn.fetchData(function(error, result) {
        //  if (error) {
          //    console.log(error);
            //  callback(error, null);
          //}
          //else {
            //  console.log(result);
              //if (result.length === 1) {
                //  if (bcrypt.compareSync(data.password, result[0].password)) {
                  //    response.status = 200;
                    //  response.username = data.username;
                      //response.message = "user log in successful";
                  //}
                  //else {
                    //  response.message = "Incorrect password. Please try again";
                      //response.status = 401;
                //  }
                  //callback(null, response);
              //}
              //else {
                //  response.status = 400;
                  //response.message = "Username does not exist. Please sign up";
                  //callback(null, response);
              //}
          //}
      //}, mysqlQuery);
  //}
  //catch (error) {
    //  console.log(error);
      //callback(error, response);
  //}
//}
