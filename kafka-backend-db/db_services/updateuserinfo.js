var mongo = require("../mongo/mongo");
var mongoURL =  require('../mongo/mongo_url').url;
var usersModel = require('../models/Users');

handle_request = ((data, callback) => {
    var response = {};
    try {
        if(data.username!==null || data.username!==undefined) {
            var updateQuery= {$set: {
                name : data.name,
                username: data.username,
                contact: data.contact,
                aboutMe: data.aboutMe,
                skills: data.skills
            }};
            var userscollection = mongo.collection("users");
            mongo.connect(mongoURL, function () {
                userscollection.findOneAndUpdate({username:data.username}, updateQuery, {new: true}, function (err, results) {
                    console.log(results);
                    if (err) {
                        throw err;
                    }
                    if (results !== null) {
                        console.log("updated user profile: " + JSON.stringify(results));
                        response.status = 201;
                        response.message = "user profile successfully";
                        callback(null, response);
                    }
                    else {
                        response.status = 401;
                        response.message = "Failed to Update Profile";
                        callback(null, response);
                    }
                });
            });
        }
    }
    catch (e){
        console.log(e);
        response.status = 401;
        response.message = "Error while updating user profile";
        callback(e, response);
    }
});

exports.handle_request = handle_request;
