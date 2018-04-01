var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var kafka_topics =  require('../configs/kafka_topics').kafka_topic_enums;

router.post('/postproject', function(req, res, next){
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

module.exports = router;
