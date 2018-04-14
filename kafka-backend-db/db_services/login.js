var bcrypt = require('bcrypt');
var usersModel = require('../models/Users');

handle_request = ((data, callback) => {
    let res = {};
    try {
        console.log("Trying to log in");
        usersModel.findOne({username: data.username}, function(err, result) {
            console.log("mongodb results from mongoose: " + JSON.stringify(result));
            if(err) {
                console.log(err);
                throw err;
            }
            if(result!==null && result!==undefined) {
                if (bcrypt.compareSync(data.password, result.password)) {
                    res.status = 201;
                    res.username = result.username;
                    res.message = "Login Successful ... !!!";
                    callback(err, res);
                }
                else {
                    res.status = 401;
                    res.message = "Incorrect Password";
                    callback(err, res);
                }
            }
            else {
                res.status = 400;
                res.message = "Username does not exist. Please signup";
                callback(err, res);
            }
        });
    }
    catch (error){
        callback(error,{});
    }
});

exports.handle_request = handle_request;
