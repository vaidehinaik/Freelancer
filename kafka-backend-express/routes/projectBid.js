var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var kafka_topics =  require('../configs/kafka_topics').kafka_topic_enums;


router.post('/userbid', function(req, res) {
  console.log("\n****************************************************\n");
  try {
      console.log("Attempting to add/udpate user bid in project bid table: " + JSON.stringify(req.body));
      kafka.make_request(kafka_topics.UPDATEUSERBID , req.body, function(err, results) {
          if(err) {
              console.log(err);
              throw err;
          }
          else if(results.status === 201) {
              res.status(results.status).json({message: results.message});
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
