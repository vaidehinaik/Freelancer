// To create kafka topics on windows machine

kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userinfo_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic updateuserinfo_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic postproject_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic allprojects_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic projectinfo_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic projectandbidinfo_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic updateuserbid_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userbidprojects_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userprojects_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic transactionmanager_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic alltransactions_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic acceptproject_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic projectcompleted_topic
kafka_2.12-1.1.0\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic makepayment_topic
