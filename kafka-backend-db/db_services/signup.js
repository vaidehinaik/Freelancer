var bcrypt = require('bcrypt');
var usersModel = require('../models/Users');
var ObjectID = require('mongodb').ObjectID;

// var mongoURL =  require('../mongo/mongo_url').url;
// var mongoose = require('mongoose');
// mongoose.connect(mongoURL);

handle_request = ((data, callback) => {
    var err=null;
    var response = {};
    try {
        var objectId = new ObjectID();
        console.log("Data received for mongo: "  + JSON.stringify(data));
        var salt = bcrypt.genSaltSync(10);
        var user = {
            _id: objectId,
            userId: objectId.toHexString(),
            name: data.name,
            username: data.username,
            password: bcrypt.hashSync(data.password, salt)
        };
        console.log("Attempt to insert data: " + JSON.stringify(user));
        usersModel.findOne({username: data.username}, (err, result) => {
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
    catch (error) {
        console.log("Error in catch: " + error);
        response.status = 401;
        response.message = "Signup Failed";
        callback(error, response);
    }
});

exports.handle_request = handle_request;
