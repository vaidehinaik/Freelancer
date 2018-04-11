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
                //contact: data.contact,
                //aboutMe: data.aboutMe,
                //skills: data.skills
            }};
            mongo.connect(mongoURL, function () {
            var userscollection = mongo.collection("users");
                userscollection.findOneAndUpdate({username:data.username}, updateQuery, {new: true}, function (err, results) {
                    console.log(results);
                    if (err) {
                        throw err;
                    }
                    if (results !== null) {
                        console.log("updated transaction: " + JSON.stringify(results));
                        response.status = 201;
                        response.message = "transaction updated successfully";
                        callback(null, response);
                    }
                    else {
                        response.status = 401;
                        response.message = "Failed to Update transaction";
                        callback(null, response);
                    }
                });
            });
        }
    }
    catch (e){
        console.log(e);
        response.status = 401;
        response.message = "Error while updating transaction";
        callback(e, response);
    }
});

exports.handle_request = handle_request;
