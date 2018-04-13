var mongo = require('../mongo/mongo');
var usersModel = require('../models/Users');

handle_request = ((data, callback)=> {
    let res = {};
    try {
        console.log("Get user all transactions");
        usersModel.findOne({username: data.username},{'transactions._id': 0})
        .populate('transactions.userId', {username: 1, name: 1, _id: 0})
        .exec(function(err, result) {
            console.log("mongodb results from mongoose: " + JSON.stringify(result));
            if(err) {
                console.log(err);
                throw err;
            }
            if(result!==null && result!==undefined) {
                res.status = 201;
                res.name = result.name;
                res.username = result.username;
                res.message = "All user transactions";
                res.transactions = result.transactions;
                res.totalFunds = result.totalFunds;
                callback(err, res);
            }
            else {
                res.status = 401;
                res.message = "User transaction not found";
                callback(err, res);
            }
        });
    }
    catch (error){
      res.status = 401;
      res.message = "Failed to fetch all transactions";
      callback(error, res);
    }
});

exports.handle_request = handle_request;
