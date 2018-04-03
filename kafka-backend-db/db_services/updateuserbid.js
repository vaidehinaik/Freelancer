var mongo = require("../mongo/mongo");
var mongoURL =  require('../mongo/mongo_url').url;
var usersModel = require('../models/Users');
var projectsModel = require('../models/Projects');

handle_request = ((data, callback) => {
    var response = {};
    try {
      console.log("Data received for mongo: "  + JSON.stringify(data));
      var userbidData = {
          bidAmount: data.bidAmount,
          periodInDays: data.periodInDays
      };
      usersModel.findOne({username: data.username}, (err, result) => {
          console.log("Result from mongo: " + JSON.stringify(result));
          if (err) {
            console.log("error:" + err);
            throw err;
          }
          if (result) {
              console.log("User Exists: " + result.userId);
              userBidData.userId = result.userId;
              response.status = 201;
              response.message = "User bid updated";
              callback(err, response);
          } else {
              var userObj = new usersModel(user);
              userObj.save(err => {
                  if (err) {
                      console.log(err);
                      throw err;
                  }
                  console.log("Sign up successful");
                  response.status = 201;
                  response.username = data.username;
                  response.message = "Signup Successful";
                  callback(err, response);
              });
          }
      });
    }
    catch (e){
        console.log(e);
        response.status = 401;
        response.message = "Error while updating user profile";
        callback(e, response);
    }
});

exports.handle_request = handle_request;
