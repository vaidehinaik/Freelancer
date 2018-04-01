var bcrypt = require('bcrypt');
var mongo = require('../mongo/mongo');
var usersModel = require('../models/Users');
var ObjectID = require('mongodb').ObjectID;
var mongoURL = "mongodb://localhost:27017/freelancer";

handle_request = ((data, callback) => {
    let err=null;
    let response = {};
    try {
        var objectId = new ObjectID();
        console.log("Data received for mongo: "  + JSON.stringify(data));
        var salt = bcrypt.genSaltSync(10);
        var user = {
            _id  : objectId,
            userId: objectId.toHexString(),
            name : data.name,
            username: data.username,
            password : bcrypt.hashSync(data.password, salt),
            contact: "null",
            aboutMe: "null",
            skills: "null",
        };
        console.log("Attempt to insert data: " + JSON.stringify(user));

        mongo.connect(mongoURL, function () {
            var userscollection = mongo.collection("users");
            userscollection.findOne({username: data.username}, function (err, result) {
                console.log("Result from mongo: " + JSON.stringify(result));
                if (err) {
                    console.log("error:" + err);
                    throw err;
                }
                if (result) {
                    console.log("User Exists: " + result.userId);
                    response.status = 200;
                    response.message = "User already exists..!!";
                    callback(err, response);
                }
                else {
                  userscollection.insertOne(user, function (err, resultData) {
                      console.log("result data: " + resultData);
                      if (err) {
                          console.log(err);
                          throw err;
                      }
                      if (resultData.insertedCount===1) {
                          console.log("Sign up successful");
                          response.status = 201;
                          response.username = data.username;
                          response.message = "Signup Successful";
                          callback(err, response);
                      }
                      else {
                          response.status = 401;
                          response.message = "Signup Failed";
                          callback(err, response);
                      }
                  });
                }
            });
        });
    }
    catch (error) {
        console.log("Error in catch: " + error);
        response.status = 401;
        response.message = "Signup Failed";
        callback(error, response);
    }
});

exports.handle_request = handle_request;
