var projectsModel = require('../models/Projects');
var mongoURL =  require('../mongo/mongo_url').url;

var mongoose = require('mongoose');
mongoose.connect(mongoURL);

handle_request = ((callback) => {
    let res = {};
    try {
        console.log("Get all projects");
        projectsModel.find((err, results) => {
            if (err) {
              console.log("Error: " + err);
              throw err;
            }
            if(results) {
              console.log("all projects: " + JSON.stringify(results));
              results.map(function (project) {
                  bid_info = calculate_avg_bid_total_bids(project.projectBids);
                  console.log("bid info: " + JSON.stringify(bid_info));
                  project.averageBidAmount = bid_info[0];
                  project.bidsCount = bid_info[1];
              })
              console.log("results after: " + JSON.stringify(results));
              res.status = 201;
              res.projects = results;
              res.message = "Returning all projects";
              callback(err, res);
            } else {
              res.status = 401;
              res.message = "Unauthorized user";
              callback(err, res);
            }
        });
    }
    catch (error) {
        res.status = 401;
        res.message = "Failed to fetch all projects";
        callback(error, res);
    }
});

calculate_avg_bid_total_bids = (projectBids) => {
  console.log("my project bids: "+ JSON.stringify(projectBids));
  var avgBid = 0;
  var sum = 0;
  var length = projectBids.length;
  if (length === 0) {
    return [avgBid, length];
  }
  projectBids.forEach(function(bidInfo) {
    sum += bidInfo.bidAmount;
  });
  avgBid = Math.round(sum/length);
  return [avgBid, length];
}

exports.handle_request = handle_request;
