var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoURL = "mongodb://localhost:27017/freelancer";
mongoose.connect(mongoURL);

let usersSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    contact: {
      type: String
    },
    aboutMe: {
      type: String
    },
    skills: [{
      type: String
    }],
    userProjects: [{
      type: String
    }],
    userBids: [{
      type: String
    }]
});

let Users = mongoose.model('users', usersSchema);

module.exports = Users;
