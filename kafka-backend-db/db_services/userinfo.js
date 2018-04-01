var mongo = require('../mongo/mongo');
var usersModel = require('../models/Users');
var mongoURL = "mongodb://localhost:27017/freelancer";

handle_request = ((data, callback)=> {
    let res = {};
    try {
        console.log("Get user info");
        mongo.connect(mongoURL, function(){
            var userCollection = mongo.collection('users');

            userCollection.findOne({username: data.username}, function(err, result){
                console.log("Data from mongo: " + JSON.stringify(result));
                if(err) {
                    console.log(err);
                    throw err;
                }
                if(result!==null && result!==undefined) {
                    res.status = 201;
                    res.name = result.name;
                    res.contact =  result.contact;
                    res.aboutMe =  result.aboutMe;
                    res.username = result.username;
                    res.skills =  result.skills;
                    res.message = "user info data";
                    callback(err, res);
                }
                else {
                    res.status = 400;
                    res.message = "user info not found";
                    callback(err, res);
                }
            });
        });
    }
    catch (error){
        callback(error,{});
    }
});

exports.handle_request = handle_request;
