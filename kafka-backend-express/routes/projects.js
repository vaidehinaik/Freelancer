var express = require('express');
var router = express.Router();
const passport = require("passport");
require('./passport')(passport);
let kafka = require('./kafka/client');
let kafka_topics =  require('../configs/kafka_topics').kafka_topic_enums;


router.post('/postproject', function(req, res, next){
    try {
        console.log("request body: " + JSON.stringify(req.body));
        kafka.make_request(kafka_topics.POSTPROJECT , req.body, function(err,results){
            console.log('Result: ' + results);
            if(err){
                console.log(err);
                throw err;
            }
            else
            {
                if(results.status === 201){
                    console.log("Result - username: " + results.username);
                    res.status(results.status).json({"message":"Signup Successful"});
                }
                else if(results.status === 200){
                    res.status(results.status).json({"message":"User already Exist"});
                }
                else if(results.status === 401) {
                    res.status(results.status).json({"message":"post project failed"});
                }
            }
        });
    }
    catch (e){
        console.log(e);
        res.status(401).json({message: "posting project failed "});
    }
});
