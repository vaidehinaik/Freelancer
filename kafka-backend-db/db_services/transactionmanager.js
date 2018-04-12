var mongo = require('../mongo/mongo');
// Mongoose Models
var usersModel = require('../models/Users');
var projectsModel = require('../models/Projects');
// Mongoose connection to mongoDB
// var mongoURL =  require('../mongo/mongo_url').url;
// var mongoose = require('mongoose');
// mongoose.connect(mongoURL);

handle_request = ((data, callback) => {
    let err=null;
    let response = {};
    try {
        console.log("Data received for mongo: "  + JSON.stringify(data));
        usersModel.findOne({username: data.username}, (err, result) => {
            console.log("User Result: " + JSON.stringify(result));
            if (err) {
              console.log("error:" + err);
              throw err;
            }
            if (result) {
                console.log("User found: " + result.userId);
                console.log("User funds: " + result.totalFunds);
                var amount = data.amount;
                if(data.amountType === "withdraw") {
                  // newFunds = newFunds - data.amount;
                    amount = -1 * data.amount;
                } else if(data.amountType === "deposit") {
                  // newFunds = newFunds + data.amount;
                    amount = 1 * data.amount;
                } else {
                  response.status = 401;
                  response.message = "Invalid amount type";
                  callback(error, response);
                }
                console.log("Input amount: " + amount);
                var transactionObj = {"userId": result.userId,
                                      "amount": data.amount,
                                      "amountType": data.amountType}
                usersModel.update({userId: result.userId},
                  {
                    $inc: { totalFunds: amount},
                    $addToSet: {transactions: transactionObj}
                  },
                  { new: true },
                  function (err, updatedData) {
                    if (err) {
                      console.log("ERROR: " + err);
                      throw err;
                    }
                    console.log("Transaction updated successfully");
                    response.status = 201;
                    response.message = "Transaction updated successfully";
                    callback(err, response);
                });
            } else {
                response.status = 401;
                response.message = "Unauthorized user for transaction";
                callback(err, response);
            }
        });
    }
    catch (error) {
        console.log("Error in catch: " + error);
        response.status = 401;
        response.message = "Transaction failed";
        callback(error, response);
    }
});

exports.handle_request = handle_request;
