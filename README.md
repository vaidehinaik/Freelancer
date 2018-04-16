How to run the project step by step:

1. Run Zookeeper Server
   bin/zookeeper-server-start.sh config/zookeeper.properties
2. Run Kafka Server
   bin/kafka-server-start.sh config/server.properties
3. Create Kafka Topics
   Check Kafka_Topics_Script directory for the list of kafka topics created for freelancer project
4. npm start (React Server) : Freelancer/client_react_redux
5. npm start (Kafka node server): Freelancer/kafka_backend_express
6. npm start (server.js): Freelancer/kafka_backend_db

FREELANCER KAFKA TOPICS:
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic logout_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userinfo_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic updateuserinfo_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic postproject_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic allprojects_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic projectinfo_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic projectandbidinfo_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic updateuserbid_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userbidprojects_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userprojects_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic transactionmanager_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic alltransactions_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic acceptproject_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic projectcompleted_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic makepayment_topic
_____________________________________________________________________________________________________________________________

MONGO DB Database:
__________________
DB Name: Freelancer
DB Collections:
   - users
   - projects

Schema Details in:
- Freelancer/models/Projects.js
Freelancer/models/Users.js

mlab deployment link:
_____________________

1. To connect using the mongo shell:
   mongo ds231199.mlab.com:31199/freelancer -u admin -p admin

2. To connect using a driver via the standard MongoDB URI:
   mongodb://admin:admin@ds231199.mlab.com:31199/freelancer
