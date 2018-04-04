var projectsModel = require('../models/Projects');
var usersModel = require('../models/Users');
var mongoURL =  require('../mongo/mongo_url').url;

var mongoose = require('mongoose');
mongoose.connect(mongoURL);

handle_request = ((data, callback) => {
    let res = {};
    try {
        console.log("project and bids info");
        projectsModel.findOne({projectId: data.projectId})
        .populate('ownerUserId')
        .populate('projectBids.userId')
        .exec(function (err, result) {
          if(err) {
            console.log("ERROR: " + err);
            throw err;
          }
          console.log("Results: " + JSON.stringify(result));
          res.status = 201;
          res.projects = result;
          res.message = "Returning project and bids info";
          callback(err, res);
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
