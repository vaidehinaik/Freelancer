var mongo = require('../mongo/mongo');
var usersModel = require('../models/Users');
// var mongoURL =  require('../mongo/mongo_url').url;
// var mongoose = require('mongoose');
// mongoose.connect(mongoURL);

handle_request = ((data, callback)=> {
    let res = {};
    try {
        console.log("Get user info");
        usersModel.findOne({username: data.username})
        .populate('userBids')
        .exec(function(err, result) {
            console.log("mongodb results from mongoose: " + JSON.stringify(result));
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
                res.transactions = result.transactions;
                res.totalFunds = result.totalFunds;
                callback(err, res);
            }
            else {
                res.status = 400;
                res.message = "user info not found";
                callback(err, res);
            }
        });
        // mongo.connect(mongoURL, function(){
        //     var userCollection = mongo.collection('users');
        //
        //     userCollection.findOne({username: data.username}, function(err, result){
        //         console.log("Data from mongo: " + JSON.stringify(result));
        //         if(err) {
        //             console.log(err);
        //             throw err;
        //         }
        //         if(result!==null && result!==undefined) {
        //             res.status = 201;
        //             res.name = result.name;
        //             res.contact =  result.contact;
        //             res.aboutMe =  result.aboutMe;
        //             res.username = result.username;
        //             res.skills =  result.skills;
        //             res.message = "user info data";
        //             callback(err, res);
        //         }
        //         else {
        //             res.status = 400;
        //             res.message = "user info not found";
        //             callback(err, res);
        //         }
        //     });
        // });
    }
    catch (error){
        callback(error,{});
    }
});

exports.handle_request = handle_request;
