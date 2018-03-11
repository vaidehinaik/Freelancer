var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysqlconn = require('../public/javascripts/dbServicesWithPool');

/*Salt round for hashing password*/
const saltRounds = 10;
/*DB TABLES*/
const USER_TABLE = "freelancer.users";
const PROJECT_TABLE = "freelancer.projects";

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  const mysql_select_query = "select * from " + USER_TABLE;
  console.log("Executing MySQL Query: " + mysql_select_query);
  mysqlconn.selectData(function(error, results) {
    if (error) {
      console.log("DB Error in select query: post project !!!");
      throw error;
    } else {
      res.status(201).json(results);
    }
  }, mysql_select_query)
});

router.post('/login', function(req, res) {
  console.log("Attempting to login by user: " + req.body.username);
  const mysql_query = "select * from " + USER_TABLE + " where username='" + req.body.username +"'";
  mysqlconn.selectData(function(error, results) {
      if (error) {
          console.log("DB Error: Login !!!");
          throw error;
      } else {
          if (results.length > 0 && bcrypt.compareSync(req.body.password, results[0].password)) {
              console.log("Login Successful !!!");
              res.status(201).json({message: "Login successful"});
          } else {
              console.log("Login Failed !!!");
              res.status(401).json({message: "Login failed"});
          }
      }
  }, mysql_query)
})

router.post('/signup', function(req, res) {
  console.log("Attempting to signup by user: " + req.body.username);
  const mysql_select_query = "select * from " + USER_TABLE + " where username='" + req.body.username +"'";
  mysqlconn.selectData(function(error, results) {
    if (error) {
      console.log("DB Error: Signup !!!");
      throw error;
    } else {
        if (results.length == 0) {
            var salt = bcrypt.genSaltSync(saltRounds);
            /* Hash the password with the salt*/
            var hash = bcrypt.hashSync(req.body.password, salt);
            const mysql_insert_query = "insert into " + USER_TABLE
                                        + " (name,username,password) values('" + req.body.name + "','"
                                        + req.body.username + "','" + hash + "')";
            console.log("Executing MySQL Query: " + mysql_insert_query);
            mysqlconn.insertData(function(error, results) {
                if (error) {
                    console.log("DB Error: Signup !!!");
                    throw error;
                } else {
                    console.log("Insert Id: " + results.insertId);
                    console.log("Rows affected: " + results.affectedRows);
                    results.message = "Signup successful ... !!!"
                    console.log("Result message: " + results.message);
                    res.status(201).json(results);
                }
            }, mysql_insert_query);

        } else {
          res.status(200).json({message: "User already exists..!!"});
        }
    }
  }, mysql_select_query)
})

router.get('/logout',function(req, res) {
    console.log("Attempting to logout by user: " + req.body.username);
    res.status(200).json({message: "User successfully logged out !!!"});
})

module.exports = router;
