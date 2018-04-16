var mongoose = require('mongoose');
// var uri = "mongodb://localhost:27017/freelancer";
// MongoDB MLAB URL
// "mongodb://<username>:<password>@ds231199.mlab.com:31199/freelancer"
var uri = "mongodb://admin:admin@ds231199.mlab.com:31199/freelancer"

const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  keepAlive: true,
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

exports.connectToMongo = mongoose.connect(uri, options, function(error) {
  // Check error in initial connection.
  if (error) {
    console.log("Failed to connect mongodb through mongoose");
    throw error;
  }
  console.log("Connected to mongodb ... :) ");
});
