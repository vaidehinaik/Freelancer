var mongo = require('../mongo/mongo');
// Mongoose Models
var usersModel = require('../models/Users');

handle_request = ((data, callback) => {
    let err=null;
    let response = {};
    try {
        console.log("Data received for mongo: "  + JSON.stringify(data));
        usersModel.findOne({userId: data.projectOwner.userId}, (err, result) => {
            console.log("owner Result: " + JSON.stringify(result));
            if (err) {
              console.log("error:" + err);
              throw err;
            }
            if (result) {
                console.log("User found: " + result.userId);
                console.log("User funds: " + result.totalFunds);
                var amount = parseInt(data.projectOwner.amount);
                if(data.projectOwner.amountType === "funded") {
                    amount = -1 * data.projectOwner.amount;
                } else {
                  response.status = 401;
                  response.message = "Invalid amount type for owner";
                  callback(err, response);
                }
                console.log("Input amount: " + amount);
                var transactionObj = {"userId": data.freelancer.userId,
                                      "amount": data.projectOwner.amount,
                                      "amountType": data.projectOwner.amountType}
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
                    if(updatedData.nModified !== 0) {
                      console.log("freelancer userID: " + JSON.stringify(data.freelancer.userId));
                      usersModel.findOne({userId: data.freelancer.userId}, (err, freelancerResult) => {
                          console.log("freelancer Result: " + JSON.stringify(freelancerResult));
                          if (err) {
                            console.log("error:" + err);
                            throw err;
                          }
                          if (freelancerResult) {
                              console.log("freelancer found: " + freelancerResult.userId);
                              console.log("freelancer funds: " + freelancerResult.totalFunds);
                              var amount = parseInt(data.freelancer.amount);
                              if(data.freelancer.amountType === "received") {
                                  amount = 1 * data.freelancer.amount;
                              } else {
                                response.status = 401;
                                response.message = "Invalid amount type for freelancer";
                                callback(err, response);
                              }
                              console.log("Input amount: " + amount);
                              var transactionObj = {"userId": data.projectOwner.userId,
                                                    "amount": data.freelancer.amount,
                                                    "amountType": data.freelancer.amountType}
                              usersModel.update({userId: freelancerResult.userId},
                                                {
                                                  $inc: { totalFunds: amount},
                                                  $addToSet: {transactions: transactionObj}
                                                },
                                                { new: true },
                                                function (err, freelancerUpdatedData) {
                                                        if (err) {
                                                          console.log("ERROR: " + err);
                                                          throw err;
                                                        }
                                                        if(freelancerUpdatedData.nModified !== 0) {
                                                          response.status = 201;
                                                          response.message = "payments updated successfully";
                                                        } else {
                                                          response.status = 401;
                                                          response.message = "Error while updating payments";
                                                        }
                                                    });
                              callback(err, response);
                          } else {
                            response.status = 401;
                            response.message = "Error while updating payments";
                            callback(err, response);
                          }
                      });
                    } else {
                      response.status = 401;
                      response.message = "Error while updating payments";
                      callback(err, response);
                    }
                });
            } else {
                response.status = 401;
                response.message = "Payment transaction failed";
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
