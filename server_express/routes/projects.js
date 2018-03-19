var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysqlconn = require('../public/javascripts/dbServicesWithPool');
var sql_queries = require('../public/javascripts/complexMySqlQueries');

/*DB TABLES*/
const USER_TABLE = "freelancer.users";
const PROJECT_TABLE = "freelancer.projects";
const PROJECT_BID_TABLE = "freelancer.projectbid";

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
        if (results.length === 0) {
            res.status(401).json({message: "Unauthorised user!!!"});
        } else {
            const userId = results[0].userId;
            console.log("Found user with username: " + req.body.username + " & user id: " + userId);
            var skills = req.body.skills.join(',');
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
                    results.message = "Project posted successfully for user.";
                    console.log("Result message: " + results.message);
                    res.status(201).json(results);
                }
            }, mysql_insert_query);
        }
    }
  }, mysql_select_query)
});

router.get('/allprojects', function(req, res) {
  console.log("Attempting to fetch all projects.");
  const mysql_select_query = sql_queries.get_all_projects_query_string();
  mysqlconn.selectData(function(error, results) {
    if (error) {
      console.log("DB Error in select query: all projects !!!");
      throw error;
    } else if(results.length >= 0) {
       res.status(201).json({message: "Returning all projects", results: results});
    } else {
       res.status(401).json({message: "Unauthorised !!!"});
    }
  }, mysql_select_query)
});

router.post('/userprojects', function(req, res) {
  console.log("Attempting to fetch user posted projects for username: " + req.body.username);
  const mysql_select_query = sql_queries.get_user_projects_query_string(req.body.username);
  mysqlconn.selectData(function(error, results) {
    if (error) {
      console.log("DB Error in select query: user posted projects !!!");
      throw error;
    } else if(results.length >= 0) {
       res.status(201).json({message: "Returning user posted projects", results: results});
    } else {
       res.status(401).json({message: "Unauthorised !!!"});
    }
  }, mysql_select_query)
});

router.post('/userbidprojects', function(req, res) {
  console.log("Attempting to fetch user bid projects for username: " + req.body.username);
  const mysql_select_query = sql_queries.get_user_bid_projects_query_string(req.body.username);
  mysqlconn.selectData(function(error, results) {
    if (error) {
      console.log("DB Error in select query: user bid projects !!!");
      throw error;
    } else if(results.length >= 0) {
       res.status(201).json({message: "Returning user bid projects", results: results});
    } else {
       res.status(401).json({message: "Unauthorised !!!"});
    }
  }, mysql_select_query)
});

router.post('/projectandbids', function(req, res) {
  console.log("Attempting to fetch the project details along with its bids: " + req.body.projectId);
  const mysql_select_query = "select u.userId, u.name, u.username, u.contact, p.projectId, p.title, p.description, "
                              + "p.budgetLow, p.budgetHigh, p.skills, p.status From "
                              + USER_TABLE + " as u INNER JOIN " + PROJECT_TABLE
                              + " as p on u.userId = p.ownerUserId AND p.projectId = '"
                              + req.body.projectId + "'";
  // const mysql_select_query = "select * from " + PROJECT_TABLE + " where projectId = '" + req.body.projectId +"'";
  var resp_load = {projectDetails: {}, userProfilesWithBids: []};
  mysqlconn.selectData(function(error, results) {
    if (error) {
      console.log("DB Error mysql_select_query project details !!!");
      throw error;
    } else {
        if (results.length === 0) {
            res.status(401).json({message: "No project details found !!!"});
        } else {
            resp_load.projectDetails = results[0];
            const mysql_query_users_from_bid = "SELECT userId from " + PROJECT_BID_TABLE + " where projectId =" + req.body.projectId;
            mysqlconn.selectData(function(error, results) {
                if (error) {
                    console.log("DB Error: mysql_query_users_from_bid !!!");
                    throw error;
                } else if (results.length === 0) {
                    res.status(201).json(resp_load);
                } else {
                    var ids = [];
                    results.forEach(function(obj) {
                        console.log("userId: " + obj.userId);
                        ids.push(obj.userId);
                    });
                    const select_inner_join_query = "select u.userId, u.name, u.username, u.contact, u.aboutMe, "
                                                    + "u.skills, pb.projectId, pb.bidAmount, pb.periodInDays From " +
                                                    USER_TABLE + " as u INNER JOIN " + PROJECT_BID_TABLE +
                                                    " as pb on u.userId = pb.userId AND pb.projectId=" + 
                                                    req.body.projectId + " AND u.userId IN (" + ids.join(',') + ")";
                    mysqlconn.selectData(function(error, userResults) {
                      if (error) {
                            console.log("DB Error in: select_inner_join_query");
                            throw error;
                      } else {
                        resp_load.userProfilesWithBids = userResults;
                        res.status(201).json(resp_load);
                      }
                    }, select_inner_join_query)
                }
            }, mysql_query_users_from_bid)
        }
    }
  }, mysql_select_query)
});

router.post('/acceptproject', function(req, res) {
  console.log("Attempting to accept project: " + req.body.projectId);
  const mysql_insert_query = "Update projects Set status=1 Where projectId = " + req.body.projectId;
  console.log("Executing MySQL Query: " + mysql_insert_query);
  mysqlconn.insertData(function(error, results) {
      if (error) {
          console.log("DB Error: Accept Project !!!");
          throw error;
      } else {
          console.log("Rows affected: " + results.affectedRows);
          results.message = "Project status has been updated ... !!!"
          console.log("Result message: " + results.message);
          res.status(201).json(results);
      }
  }, mysql_insert_query);
});

module.exports = router;
