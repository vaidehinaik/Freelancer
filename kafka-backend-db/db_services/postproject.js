var mongo = require('../mongo/mongo');
var usersModel = require('../models/Users');
var projectsModel = require('../models/Projects');
var ObjectID = require('mongodb').ObjectID;

handle_request = ((data, callback) => {
    let err=null;
    let response = {};
    try {
        console.log("Data received for mongo: "  + JSON.stringify(data));
        var objectId = new ObjectID();
        var project = {
            _id  : objectId,
            projectId: objectId.toHexString(),
            title: data.title,
            description: data.description,
            budgetLow: data.budgetLow,
            budgetHigh: data.budgetHigh,
            skills: data.skills,
            employer: data.username
        };
        console.log("Attempt to insert data: " + JSON.stringify(project));
        usersModel.findOne({username: data.username}, (err, result) => {
            console.log("Result from mongo: " + JSON.stringify(result));
            if (err) {
              console.log("error:" + err);
              throw err;
            }
            if (result) {
                console.log("User found: " + result.userId);
                // Update the userId in projects document
                project.ownerUserId = result.userId;
                var projectObj = new projectsModel(project);
                projectObj.save((err, project) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    usersModel.findOneAndUpdate({username: data.username},
                      {$addToSet: { userProjects: project.projectId }},
                      { new: true },
                      function (err, updatedData) {
                        if (err) return handleError(err);
                        console.log("project posted successfully");
                        response.status = 201;
                        response.message = "Project posted successfully";
                        callback(err, response);
                    });
                });
            } else {
                response.status = 401;
                response.message = "Unauthorized user";
                callback(err, response);
            }
        });
    }
    catch (error) {
        console.log("Error in catch: " + error);
        response.status = 401;
        response.message = "Post project failed";
        callback(error, response);
    }
});

exports.handle_request = handle_request;
