var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysqlconn = require('../public/javascripts/dbServicesWithPool');

/*DB TABLES*/
const USER_TABLE = "freelancer.users";
const PROJECT_TABLE = "freelancer.projects";
const PROJECT_BID_TABLE = "freelancer.projectbid";

router.post('/userbid', function (req, res) {
  console.log("Attempting to add/udpate user bid in project bid table: " + req.body.username);
  var final_query = "";
  const mysql_select_query = "select userId from " + USER_TABLE + " where username='" + req.body.username + "'";
  mysqlconn.selectData(function (error, results) {
    if (error) {
      console.log("DB Error in select query: user bid !!!");
      throw error;
    } else {
      if (results.length === 0) {
        res.status(401).json({ message: "Unauthorised user!!!" });
      } else {
        const userId = results[0].userId;
        const mysql_select_query_2 = "select * from " + PROJECT_BID_TABLE + " where userId = " + userId + " AND projectId = " + req.body.projectId;
        mysqlconn.selectData(function (error, results) {
          if (error) {
            console.log("DB Error in select query for finding the entry in project Bid table !!!");
            throw error;
          } else {
            if (results.length === 0) {
              final_query = "Insert INTO " + PROJECT_BID_TABLE + " (projectId, userId, bidAmount, periodInDays) values(" + req.body.projectId + "," + userId + "," + req.body.bidAmount + "," + req.body.periodInDays + ")";
            } else {
              final_query = "Update " + PROJECT_BID_TABLE + " SET projectId = " + req.body.projectId + ", userId = " + userId + ", bidAmount = " + req.body.bidAmount + ", periodInDays = " + req.body.periodInDays + " WHERE projectId = " + req.body.projectId + " AND userId = " + userId;
            }
            console.log("my final query is: " + final_query);
            mysqlconn.insertData(function (error, results) {
              if (error) {
                console.log("DB Error in: final query in user bid");
                throw error;
              } else {
                console.log("Insert Id: " + results.insertId);
                console.log("Rows affected: " + results.affectedRows);
                results.message = "Bid submitted successfully for user: " + req.body.username;
                res.status(201).json({ message: results.message });
              }
            }, final_query);
          }
        }, mysql_select_query_2);
      }
    }
  }, mysql_select_query);
});

module.exports = router;