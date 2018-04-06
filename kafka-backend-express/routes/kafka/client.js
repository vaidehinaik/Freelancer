let rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(topic_name, msg_payload, callback) {
	rpc.makeRequest(topic_name, msg_payload, function(err, response) {
		if(err)
			console.error("Error: " + err);
		else{
			// console.log("response: " + JSON.stringify(response));
			callback(null, response);
		}
	});
}

exports.make_request = make_request;
