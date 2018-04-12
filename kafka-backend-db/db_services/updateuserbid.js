var mongo = require("../mongo/mongo");
// var mongoURL =  require('../mongo/mongo_url').url;
var usersModel = require('../models/Users');
var projectsModel = require('../models/Projects');
// var mongoose = require('mongoose');
// native promises
// mongoose.Promise = global.Promise;

handle_request = ((data, callback) => {
    var response = {};
    try {
      console.log("Data received for mongo: "  + JSON.stringify(data));
      usersModel.findOneAndUpdate({username: data.username},
        {$addToSet: {userBids: data.projectId}},
        {new: true},
        function (err, updatedData) {
          if (err) {
            console.log("error: " + err);
            throw err;
          }
          console.log("updated user data: " + JSON.stringify(updatedData));
          var user_id = updatedData.userId;
          projectsModel.update({"projectId": data.projectId, "projectBids.userId": user_id},
            {$set: {"projectBids.$.bidAmount": data.bidAmount,
                    "projectBids.$.periodInDays": data.periodInDays,
                    }},
            {new: true},
            function (err, updatedProjectBid) {
                if (err) {
                  console.log("error: " + err);
                  throw err;
                }
                console.log("Updated project bid data: " + JSON.stringify(updatedProjectBid.nModified));
                if(updatedProjectBid.nModified !== 0) {
                  response.status = 201;
                  response.message = "User bid updated";
                  callback(err, response);
                } else {
                  projectsModel.update({"projectId": data.projectId, "projectBids.userId": {$ne : user_id}},
                    {$addToSet: {projectBids: { bidAmount: data.bidAmount,
                                                periodInDays: data.periodInDays,
                                                userId: user_id
                                              }}},
                    {new: true},
                    function (err, newProjectBid) {
                        if (err) {
                          console.log("error: " + err);
                          throw err;
                        }
                        console.log("New project bid data: " + JSON.stringify(newProjectBid));
                        response.status = 201;
                        response.message = "User bid added";
                        callback(err, response);
                    });
                }
          });
      });
    } catch (error) {
        console.log("ERROR: " + error);
        response.status = 401;
        response.message = "Error while updating user profile";
        callback(error, response);
    }
});

exports.handle_request = handle_request;
