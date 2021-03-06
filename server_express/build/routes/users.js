var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
// With connection pool
var mysqlconn = require('../public/javascripts/dbServicesWithPool');
// With single mysql connector
// var mysqlconn = require('../public/javascripts/dbServicesNoPool');

/*Salt round for hashing password*/
const saltRounds = 10;
/*DB TABLES*/
const USER_TABLE = "freelancer.users";
const PROJECT_TABLE = "freelancer.projects";

/* GET users listing. */
router.get('/', function (req, res, next) {
    const mysql_select_query = "select * from " + USER_TABLE;
    console.log("Executing MySQL Query: " + mysql_select_query);
    console.dir("request session: " + JSON.stringify(req.session));
    mysqlconn.selectData(function (error, results) {
        if (error) {
            console.log("DB Error in select query: post project !!!");
            throw error;
        } else {
            res.status(201).json(results);
        }
    }, mysql_select_query);
});

router.post('/userinfo', function (req, res, next) {
    console.log("Fetching info for user: " + req.body.username);
    const mysql_select_query = "select userId, name, username, contact, aboutMe, skills, photoUrl from " + USER_TABLE + " where username = '" + req.body.username + "'";
    mysqlconn.selectData(function (error, results) {
        if (error) {
            console.log("DB Error in select query: user info !!!");
            throw error;
        } else {
            res.status(201).json(results[0]);
        }
    }, mysql_select_query);
});

router.post('/updateuserinfo', function (req, res) {
    console.log("Attempting to update user details for user: " + req.body.username);
    const mysql_select_query = "select * from " + USER_TABLE + " where username='" + req.body.username + "'";
    mysqlconn.selectData(function (error, results) {
        if (error) {
            console.log("DB Error in select query: update user info !!!");
            throw error;
        } else {
            if (results.length == 0) {
                res.status(401).json({ message: "Unauthorised user !!!" });
            } else {
                var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
                const userId = results[0].userId;
                console.log("Found user with username: " + req.body.username + " & user id: " + userId);
                console.log("request body: " + req.body);
                var name = req.body.name === '' ? "null" : req.body.name;
                var skills = req.body.skills.join(',') === '' ? "null" : req.body.skills.join(',');
                var aboutMe = req.body.aboutMe === '' ? "null" : req.body.aboutMe;
                var contact = req.body.contact === '' ? "null" : req.body.contact;
                const mysql_update_query = "UPDATE " + USER_TABLE + " SET name = '" + name + "', " + "contact = '" + contact + "', " + "skills = '" + skills + "', " + "aboutMe = '" + aboutMe + "' where userId = " + userId;
                mysqlconn.insertData(function (error, results) {
                    if (error) {
                        console.log("DB Error in insert query: post project !!!");
                        throw error;
                    } else {
                        console.log("Rows affected: " + results.affectedRows);
                        results.message = "User info updated successfully";
                        console.log("Result message: " + results.message);
                        res.status(201).json(results);
                    }
                }, mysql_update_query);
            }
        }
    }, mysql_select_query);
});

router.post('/login', function (req, res) {
    console.log("Attempting to login by user: " + req.body.username);
    const mysql_query = "select * from " + USER_TABLE + " where username='" + req.body.username + "'";
    mysqlconn.selectData(function (error, results) {
        if (error) {
            console.log("DB Error: Login !!!");
            throw error;
        } else {
            if (results.length > 0 && bcrypt.compareSync(req.body.password, results[0].password)) {
                console.log("Login Successful !!!");
                req.session.username = req.body.username;
                res.status(201).json({ message: "Login successful", "token": req.session.id });
            } else {
                console.log("Login Failed !!!");
                res.status(401).json({ message: "Login failed" });
            }
        }
    }, mysql_query);
});

router.post('/signup', function (req, res) {
    console.log("Attempting to signup by user: " + req.body.username);
    const mysql_select_query = "select * from " + USER_TABLE + " where username='" + req.body.username + "'";
    mysqlconn.selectData(function (error, results) {
        if (error) {
            console.log("DB Error: Signup !!!");
            throw error;
        } else {
            if (results.length == 0) {
                var salt = bcrypt.genSaltSync(saltRounds);
                /* Hash the password with the salt*/
                var hash = bcrypt.hashSync(req.body.password, salt);
                const mysql_insert_query = "insert into " + USER_TABLE + " (name,username,password) values('" + req.body.name + "','" + req.body.username + "','" + hash + "')";
                console.log("Executing MySQL Query: " + mysql_insert_query);
                mysqlconn.insertData(function (error, results) {
                    if (error) {
                        console.log("DB Error: Signup !!!");
                        throw error;
                    } else {
                        console.log("Insert Id: " + results.insertId);
                        console.log("Rows affected: " + results.affectedRows);
                        results.message = "Signup successful ... !!!";
                        console.log("Result message: " + results.message);
                        res.status(201).json(results);
                    }
                }, mysql_insert_query);
            } else {
                res.status(200).json({ message: "User already exists..!!" });
            }
        }
    }, mysql_select_query);
});

router.post('/logout', function (req, res) {
    console.log("=====================================");
    console.log("Express Session: " + JSON.stringify(req.session));
    console.log("=====================================");
    console.log("Session username: " + req.session.username);
    console.log("=====================================");
    console.log("Request Cookie: " + JSON.stringify(req.cookies));
    req.session.destroy();
    console.log('Session Destroyed');
    console.log("Logged out successfully ... ");
    res.status(201).json({ message: "Logging out ... !!!" });
});

module.exports = router;