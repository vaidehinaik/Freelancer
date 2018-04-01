let connection =  new require('./kafka/Connection');
let kafka_topics =  require('./kafka_topics').kafka_topic_enums;

let producer = connection.getProducer();

let login = require('./db_services/login');
let signup = require('./db_services/signup');
let userinfo = require('./db_services/userinfo');
let updateuserinfo = require('./db_services/updateuserinfo');

let loginConsumer = connection.getConsumerObj(kafka_topics.LOGIN);
let signupConsumer = connection.getConsumerObj(kafka_topics.SIGNUP);
let userinfoConsumer = connection.getConsumerObj(kafka_topics.USERINFO);
let updateuserinfoConsumer = connection.getConsumerObj(kafka_topics.UPDATEUSERINFO);

try {
  loginConsumer.on('message', function (message) {
      var data = JSON.parse(message.value);

      console.log('*** login message received ***');
      console.log(data);
      console.log("Topic: " + data.replyTo);

      login.handle_request(data.data, function (err, res) {
        console.log('After Handle Response: ' + JSON.stringify(res));
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
            console.log("Payload: " + JSON.stringify(payloads));
            console.log("Data: " + JSON.stringify(data));
            console.log("Error: " + err);
        });
      });
    });

    signupConsumer.on('message', function (message) {
        if (message.topic === kafka_topics.SIGNUP) {
            var data = JSON.parse(message.value);
            console.log('*** signup message received ***');
            console.log(data);
            console.log("Topic: " + data.replyTo);

            signup.handle_request(data.data, function (err, res) {
                console.log('after handle: ' + JSON.stringify(res));
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
                    console.log(payloads);
                });
            });
        }
    });

    userinfoConsumer.on('message', function (message) {
        if (message.topic === kafka_topics.USERINFO) {
            var data = JSON.parse(message.value);
            console.log('*** userinfo message received ***');
            console.log(data);
            console.log("Topic: " + data.replyTo);

            userinfo.handle_request(data.data, function (err, res) {
                console.log('after handle: ' + JSON.stringify(res));
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
                    console.log(payloads);
                });
            });
        }
    });

    updateuserinfoConsumer.on('message', function (message) {
        if (message.topic === kafka_topics.UPDATEUSERINFO) {
            var data = JSON.parse(message.value);
            console.log('*** update userinfo message received ***');
            console.log(data);
            console.log("Topic: " + data.replyTo);

            updateuserinfo.handle_request(data.data, function (err, res) {
                console.log('after handle: ' + JSON.stringify(res));
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
                    console.log(payloads);
                });
            });
        }
    });
} catch (error) {
  console.log("Error: " + error);
}
