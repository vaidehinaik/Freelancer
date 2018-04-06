var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var kafka_topics =  require('../configs/kafka_topics').kafka_topic_enums;

router.post('/postproject', function(req, res, next) {
    console.log("\n****************************************************\n");
    try {
        console.log("request body: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.POSTPROJECT , req.body, function(err, results) {
            console.log('Result: ' + JSON.stringify(results));
            if(err){
                console.log(err);
                throw err;
            }
            else if(results.status === 201) {
                res.status(results.status).json({"message": results.message});
            } else {
                res.status(results.status).json({"message": results.message});
            }
        });
    }
    catch (e) {
        console.log("Error in catch: " + e);
        res.status(401).json({message: "posting project failed "});
    }
});

router.get('/allprojects', function(req, res, next) {
    console.log("\n****************************************************\n");
    try {
        console.log("calling all projects: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.ALLPROJECTS , {}, function(err, results) {
            console.log('\n***Results***\n ' + JSON.stringify(results));
            if(err) {
                console.log(err);
                throw err;
            }
            else if(results.status === 201) {
                res.status(results.status).json({message: results.message, results: results.projects});
            } else {
                res.status(results.status).json({message: results.message});
            }
        });
    }
    catch (e) {
        console.log("Error in catch: " + e);
        res.status(401).json({message: "posting project failed "});
    }
});

router.post('/userbidprojects', function(req, res) {
    console.log("\n****************************************************\n");
    try {
        console.log("user bid projects: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.USERBIDPROJECTS , req.body, function(err, results) {
            console.log('\n***Result in bid prjs***\n ' + JSON.stringify(results));
            if(err) {
                console.log(err);
                throw err;
            }
            else if(results.status === 201) {
                res.status(results.status).json({message: results.message, results: results.projects});
            } else {
                res.status(results.status).json({message: results.message});
            }
        });
    }
    catch (e) {
        console.log("Error in catch: " + e);
        res.status(401).json({message: "failed to fetch user bid projects"});
    }
});

router.post('/userprojects', function(req, res) {
    console.log("\n****************************************************\n");
    try {
        console.log("user projects: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.USERPROJECTS , req.body, function(err, results) {
            console.log('\n***Result in user prjs***\n ' + JSON.stringify(results));
            if(err) {
                console.log(err);
                throw err;
            }
            else if(results.status === 201) {
                res.status(results.status).json({message: results.message, results: results.projects});
            } else {
                res.status(results.status).json({message: results.message});
            }
        });
    }
    catch (e) {
        console.log("Error in catch: " + e);
        res.status(401).json({message: "failed to fetch user posted projects"});
    }
});

router.post('/projectandbids', function(req, res) {
    console.log("\n****************************************************\n");
    var resp_load = {projectDetails: {}, userProfilesWithBids: []};
    try {
        console.log("calling project description and user bids: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.PROJECTANDBIDINFO , req.body, function(err, results) {
            if(err) {
                console.log(err);
                throw err;
            }
            else if(results.status === 201) {
                results.projects.name = results.projects.ownerUserId.name;
                results.projects.username = results.projects.ownerUserId.username;
                results.projects.contact = results.projects.ownerUserId.contact;
                results.projects.aboutMe = results.projects.ownerUserId.aboutMe;
                results.projects.skills = results.projects.skills.join(",");
                resp_load.projectDetails = results.projects;
                resp_load.userProfilesWithBids = results.projects.projectBids;
                resp_load.userProfilesWithBids.map(function (bid, index) {
                    bid.name = bid.userId.name;
                    bid.contact = bid.userId.contact
                });
                console.log("\n*** Final project details: ***\n " + JSON.stringify(resp_load));
                res.status(results.status).json(resp_load);
            } else {
                res.status(results.status).json({message: results.message});
            }
        });
    }
    catch (e) {
        console.log("Error in catch: " + e);
        res.status(401).json({message: "Project description and bids info failed"});
    }
});

module.exports = router;
