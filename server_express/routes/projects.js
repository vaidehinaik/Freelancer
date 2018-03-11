var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysqlconn = require('../public/javascripts/dbServicesWithPool');

/*DB TABLES*/
const USER_TABLE = "freelancer.users";
const PROJECT_TABLE = "freelancer.projects";

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/postproject', function(req, res) {
  console.log("Attempting to post project by user: " + req.body.username);
  const mysql_select_query = "select * from " + USER_TABLE + " where username='" + req.body.username +"'";
  mysqlconn.selectData(function(error, results) {
    if (error) {
      console.log("DB Error in select query: post project !!!");
      throw error;
    } else {
        if (results.length == 0) {
            res.status(401).json({message: "Unauthorised user!!!"});
        } else {
            const userId = results[0].userId;
            console.log("Found user with username: " + req.body.username + " & user id: " + userId);
            var skills = req.body.projectSkills.join();
            const mysql_insert_query = "insert into " + PROJECT_TABLE
                                     + " (title,ownerUserId,description,budgetLow,budgetHigh,skills) values('"
                                     + req.body.title + "'," + userId + ",'" + req.body.description + "',"
                                     + req.body.budgetLow + "," + req.body.budgetHigh + ",'" + skills + "')";
            mysqlconn.insertData(function(error, results) {
                if (error) {
                    console.log("DB Error in insert query: post project !!!");
                    throw error;
                } else {
                    console.log("Insert Id: " + results.insertId);
                    console.log("Rows affected: " + results.affectedRows);
                    results.message = "Project posted successfully for user: " + results.insertId
                    console.log("Result message: " + results.message);
                    res.status(201).json(results);
                }
            }, mysql_insert_query);
        }
    }
  }, mysql_select_query)
});

module.exports = router;
