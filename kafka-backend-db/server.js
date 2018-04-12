let connection =  new require('./kafka/Connection');
let kafka_topics =  require('./kafka_topics').kafka_topic_enums;
let mongoConnect = require('./mongo/mongooseConnection');

// get producer object
let producer = connection.getProducer();
// get all consumer objects
let login = require('./db_services/login');
let signup = require('./db_services/signup');
let userinfo = require('./db_services/userinfo');
let updateuserinfo = require('./db_services/updateuserinfo');
let postproject = require('./db_services/postproject');
let allprojects = require('./db_services/allprojects');
let projectAndBidsInfo = require('./db_services/projectAndBidsInfo');
let updateUserBid = require('./db_services/updateuserbid');
let userBidProjects = require('./db_services/userbidprojects');
let userProjects = require('./db_services/userprojects');
let transaction = require('./db_services/transactionmanager');
let alltransactions = require('./db_services/alltransactions');


let loginConsumer = connection.getConsumerObj(kafka_topics.LOGIN);
let signupConsumer = connection.getConsumerObj(kafka_topics.SIGNUP);
let userinfoConsumer = connection.getConsumerObj(kafka_topics.USERINFO);
let updateuserinfoConsumer = connection.getConsumerObj(kafka_topics.UPDATEUSERINFO);
let postprojectConsumer = connection.getConsumerObj(kafka_topics.POSTPROJECT);
let allprojectsConsumer = connection.getConsumerObj(kafka_topics.ALLPROJECTS);
let projectAndBidsInfoConsumer = connection.getConsumerObj(kafka_topics.PROJECTANDBIDINFO);
let updateUserBidConsumer = connection.getConsumerObj(kafka_topics.UPDATEUSERBID);
let userBidProjectsConsumer = connection.getConsumerObj(kafka_topics.USERBIDPROJECTS);
let userProjectsConsumer = connection.getConsumerObj(kafka_topics.USERPROJECTS);
let transactionConsumer = connection.getConsumerObj(kafka_topics.TRANSACTIONMANAGER);
let alltransactionsConsumer = connection.getConsumerObj(kafka_topics.ALLTRANSACTIONS);

try {
  loginConsumer.on('message', function (message) {
    var data = JSON.parse(message.value);

    console.log('*** login message received ***');
    // console.log(data);
    console.log("Topic: " + data.replyTo);

    login.handle_request(data.data, function (err, res) {
      console.log('\nAfter Handle Response: ' + JSON.stringify(res));
      var payloads = [
          {
              topic: data.replyTo,
              messages: JSON.stringify({
                  correlationId: data.correlationId,
                  data: res
              }),
              partition: 0
          }
      ];
      producer.send(payloads, function (err, data) {
          // console.log("\npayloads: " + JSON.stringify(payloads));
          console.log("\n****************************************************\n");
      });
    });
  });

  signupConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.SIGNUP) {
          var data = JSON.parse(message.value);
          console.log('*** signup message received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          signup.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  userinfoConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.USERINFO) {
          var data = JSON.parse(message.value);
          console.log('*** userinfo message received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          userinfo.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  updateuserinfoConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.UPDATEUSERINFO) {
          var data = JSON.parse(message.value);
          console.log('*** update userinfo message received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          updateuserinfo.handle_request(data.data, function (err, res) {
            console.log('\nAfter Handle Response: ' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log("\npayloads: " + JSON.stringify(payloads));
                console.log("\n****************************************************\n");
            });
        });
      }
  });

  postprojectConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.POSTPROJECT) {
          var data = JSON.parse(message.value);
          console.log('*** post project message received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          postproject.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  allprojectsConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.ALLPROJECTS) {
          var data = JSON.parse(message.value);
          console.log('*** All projects message received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          allprojects.handle_request(function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  projectAndBidsInfoConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.PROJECTANDBIDINFO) {
          var data = JSON.parse(message.value);
          console.log('\n*** Project description and bids info message received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          projectAndBidsInfo.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  updateUserBidConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.UPDATEUSERBID) {
          var data = JSON.parse(message.value);
          console.log('\n*** Update user bid message received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          updateUserBid.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  userBidProjectsConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.USERBIDPROJECTS) {
          var data = JSON.parse(message.value);
          console.log('\n*** user bid projects received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          userBidProjects.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  userProjectsConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.USERPROJECTS) {
          var data = JSON.parse(message.value);
          console.log('\n*** user projects received ***');
          // console.log(data);
          console.log("Topic: " + data.replyTo);

          userProjects.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  transactionConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.TRANSACTIONMANAGER) {
          var data = JSON.parse(message.value);
          console.log('*** transaction message received ***');
          console.log("\n**** Message INFO ****:\n " + JSON.stringify(message));
          console.log("Topic: " + data.replyTo);

          transaction.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });

  alltransactionsConsumer.on('message', function (message) {
      if (message.topic === kafka_topics.ALLTRANSACTIONS) {
          var data = JSON.parse(message.value);
          console.log('*** Message recieved for all transactions ***');
          console.log("\n**** Message INFO ****:\n " + JSON.stringify(message));
          console.log("Topic: " + data.replyTo);

          alltransactions.handle_request(data.data, function (err, res) {
              console.log('\nAfter Handle Response: ' + JSON.stringify(res));
              var payloads = [
                  {
                      topic: data.replyTo,
                      messages: JSON.stringify({
                          correlationId: data.correlationId,
                          data: res
                      }),
                      partition: 0
                  }
              ];
              producer.send(payloads, function (err, data) {
                  // console.log("\npayloads: " + JSON.stringify(payloads));
                  console.log("\n****************************************************\n");
              });
          });
      }
  });


} catch (error) {
    console.log("Error: " + error);
}
