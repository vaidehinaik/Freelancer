var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');
let kafka_topics =  require('../configs/kafka_topics').kafka_topic_enums;

module.exports = function(passport) {
  passport.use('login', new LocalStrategy(function(username, password, done) {
    try {
      kafka.make_request(kafka_topics.LOGIN, {"username":username, "password":password}, function(err, results) {
        console.log('Results: ' + JSON.stringify(results));
        if(err) {
          done(err, {});
        } else {
            if(results.status === 200) {
                console.log("Username: "+ username);
                done(null, results);
            }
            else {
                done(null, false);
            }
        }
      });
    }
    catch (error) {
      done(error, {});
    }
  }));
};
