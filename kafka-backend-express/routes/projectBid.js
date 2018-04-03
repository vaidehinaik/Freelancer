var express = require('express');
var router = express.Router();


router.post('/userbid', function(req, res) {
  console.log("\n\n****************************************************\n\n");
  try {
      console.log("Attempting to add/udpate user bid in project bid table: " + JSON.stringify(req.body));
      kafka.make_request(kafka_topics.UPDATEUSERBID , req.body, function(err, results) {
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
              console.log("Final project details: " + JSON.stringify(resp_load));
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
