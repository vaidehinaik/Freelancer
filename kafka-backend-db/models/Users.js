var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var Schema = mongoose.Schema;

let usersSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      default: "null"
    },
    aboutMe: {
      type: String,
      default: "null"
    },
    skills: [{
      type: String
    }],
    userProjects: [{
      type: String,
      ref: "projects"
    }],
    userBids: [{
      type: String,
      ref: "projects"
    }]
});

usersSchema.plugin(findOrCreate);

let Users = mongoose.model('users', usersSchema);

module.exports = Users;
