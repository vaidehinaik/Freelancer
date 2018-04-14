var usersModel = require('../models/Users');

handle_request = ((data, callback) => {
    let res = {};
    let final_result = [];
    try {
        console.log("Get user projects: " + data.username);
        usersModel.findOne({username: data.username})
        .populate('userProjects')
        .exec((err, result) => {
            if (err) {
              console.log("Error: " + err);
              throw err;
            }
            if(result) {
                result.userProjects.map(function (project) {
                    var prj_data = JSON.parse(JSON.stringify(project))
                    bid_info = calculate_avg_bid_total_bids(project.projectBids);
                    prj_data.averageBidAmount = bid_info[0];
                    prj_data.bidsCount = bid_info[1];
                    final_result.push(prj_data);
                });
            } else {
              res.status = 401;
              res.message = "Data not found";
              callback(err, res);
            }
            console.log("\n*** User projects: ***\n " + JSON.stringify(final_result));
            res.status = 201;
            res.projects = final_result;
            res.message = "Returning user projects";
            callback(err, res);
        });
    }
    catch (error) {
        res.status = 401;
        res.message = "Failed to fetch user projects";
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
