let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let projectsSchema = new Schema({
    projectId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    ownerUserId: {
      type: String,
      required: true,
      ref: 'users'
    },
    employer: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      default: 0
    },
    completed: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      default: 0
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    budgetLow: {
      type: String,
      required: true
    },
    budgetHigh: {
      type: String,
      required: true
    },
    skills: [{
      type: String,
      required: true
    }],
    projectFiles: [{
      type: String
    }],
    projectBids: [{
        userId: {
            type: String,
            ref: 'users'
        },
        bidAmount: {
            type: Number
        },
        periodInDays: {
            type: Number
        },
        bidStatus: {
          type: Number,
          required: true,
          min: 0,
          max: 1,
          default: 0
        }
    }]
});

let Projects = mongoose.model('projects', projectsSchema);

module.exports = Projects;
