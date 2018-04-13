var express = require('express');
var router = express.Router();
const passport = require("passport");
require('./passport')(passport);
let kafka = require('./kafka/client');
let kafka_topics =  require('../configs/kafka_topics').kafka_topic_enums;

router.post('/login', function (req, res) {
    console.log("\n****************************************************\n");
    console.log("request body: " + JSON.stringify(req.body));
    passport.authenticate('login', function (err, response) {
        console.log("*** Result *** " + JSON.stringify(response));
        if (err) {
            console.log(err);
            res.status(400).json({message: "Something went wrong"});
        }
        if (response.status === 201) {
            req.session.username = response.username;
            console.log("session initilized: " + req.session.id);
            res.status(response.status).json({message: response.message, token: req.session.id});
        }
        else if (response.status === 401) {
            res.status(response.status).json({message: response.message});
        }
        else {
            res.status(response.status).json({message: response.message});
        }
    })(req, res);
});

router.post('/signup', function(req, res, next) {
    console.log("\n****************************************************\n");
    try {
        console.log("request body: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.SIGNUP , req.body, function(err, results) {
            console.log('*** Result *** ' + JSON.stringify(results));
            if(err){
                console.log(err);
                throw err;
            }
            else
            {
                if(results.status === 201){
                    console.log("Result - username: " + results.username);
                    res.status(results.status).json({"message":results.message});
                }
                else if(results.status === 200){
                    res.status(results.status).json({"message":results.message});
                }
                else if(results.status === 401) {
                    res.status(results.status).json({"message":results.message});
                }
            }
        });
    }
    catch (e) {
        console.log("Error in Catch: "  + e);
        res.status(401).json({message: "Signup Failed"});
    }
});

router.post('/userinfo', function(req, res, next) {
    console.log("\n****************************************************\n");
    console.log("Fetching info for user: " + req.body.username);
    try {
        console.log("request body: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.USERINFO , req.body, function(err,results){
            console.log('Result: ' + JSON.stringify(results));
            if(err){
                console.log(err);
                throw err;
            }
            else
            {
                if(results.status === 201) {
                    if (results.skills !== "null") {
                      results.skills = results.skills.join(',');
                    }
                    res.status(results.status).json(results);
                } else {
                    res.status(results.status).json({message:results.message});
                }
            }
        });
    }
    catch (e){
        console.log(e);
        res.status(401).json({message: "something went wrong.. Try again"});
    }
});

router.post('/updateuserinfo', function(req, res, next) {
    console.log("\n\n****************************************************\n\n");
    console.log("Fetching info for user: " + req.body.username);
    try {
        console.log("request body: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.UPDATEUSERINFO , req.body, function(err, results){
            console.log('Result: ' + JSON.stringify(results));
            if(err){
                console.log(err);
                throw err;
            }
            else
            {
                if(results.status === 201) {
                    console.log("Result - username: " + results.username);
                    res.status(results.status).json(results);
                } else {
                    res.status(results.status).send({message:results.message});
                }
            }
        });
    }
    catch (e){
        console.log(e);
        res.status(401).json({message: "something went wrong.. Try again"});
    }
});

router.post('/logout',function(req, res) {
    console.log("\n\n****************************************************\n\n");
    console.log("=====================================");
    console.log("Express Session: " + JSON.stringify(req.session));
    console.log("=====================================");
    console.log("Session username: " + req.session.username);
    req.session.destroy();
    console.log('Session Destroyed');
    console.log("Logged out successfully ... ");
    res.status(201).json({message: "Logging out ... !!!"});
});

router.post('/transaction', function(req, res, next) {
    console.log("\n****************************************************\n");
    try {
        console.log("request body: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.TRANSACTIONMANAGER , req.body, function(err, result) {
            console.log('*** Result *** ' + JSON.stringify(result));
            if(err) {
                console.log(err);
                throw err;
            }
            else {
                if(result.status === 201) {
                    res.status(result.status).json({"message":result.message});
                }
                else if(result.status === 401) {
                    res.status(result.status).json({"message":result.message});
                }
            }
        });
    }
    catch (e) {
        console.log("Error in Catch: "  + e);
        res.status(401).json({message: "Transaction failed"});
    }
});

router.post('/alltransactions', function(req, res, next) {
    console.log("\n****************************************************\n");
    try {
        console.log("request body: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.ALLTRANSACTIONS , req.body, function(err, result) {
            console.log('*** Result *** ' + JSON.stringify(result));
            if(err) {
                console.log(err);
                throw err;
            }
            else {
                if(result.status === 201) {
                    res.status(result.status).json(result);
                }
                else if(result.status === 401) {
                    res.status(result.status).json({"message":result.message});
                }
            }
        });
    }
    catch (e) {
        console.log("Error in Catch: "  + e);
        res.status(401).json({message: "All transactions failed"});
    }
});


module.exports = router;
