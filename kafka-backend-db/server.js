let connection =  new require('./kafka/Connection');
let kafka_topics =  require('kafka_topics').kafka_topic_enums;

let producer = connection.getProducer();

let login = require('./services/login');
let signup = require('./services/signup');

let loginConsumer = connection.getConsumerObj(kafka_topics.LOGIN);
let signupConsumer = connection.getConsumerObj(kafka_topics.SIGNUP);

try {
  loginConsumer.on('message', function (message) {
      var data = JSON.parse(message.value);

      console.log('*** message received ***');
      console.log(JSON.stringify(message.value));
      console.log("Topic: " + data.replyTo);

      login.handle_request(data.data, function (err, res) {
        console.log('After Handle Response: ' + res);
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
            console.log("Payload: " + payloads);
            console.log("Data: " + data);
            console.log("Error: " + err);
        });
      });
    });

    signupConsumer.on('message', function (message) {
      var data = JSON.parse(message.value);

      console.log('*** message received ***');
      console.log(JSON.stringify(message.value));
      console.log(data.replyTo);

      signup.handle_request(data.data, function (err, res) {
        console.log('After Handle Response: ' + res);
        let payloads = [
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
            console.log("Payload: " + payloads);
            console.log("Data: " + data);
            console.log("Error: " + err);
        });
      });
    });
} catch (error) {
  console.log("Error: " + error);
}
