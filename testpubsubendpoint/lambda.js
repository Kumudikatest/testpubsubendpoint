let AWS = require('aws-sdk');
let google = require('googleapis').google;
let _auth = require('./Authorizer');
const pubsub = google.pubsub('v1');
exports.handler = function (event, context, callback) {

	pubsub.projects.subscriptions.create({
		name: `projects/${process.env.GCLOUD_PROJECT_ID}/subscriptions/Sender1`,
		resource: {
			"topic": `projects/${process.env.GCLOUD_PROJECT_ID}/topics/SigmaOutgoing`,
			"retainAckedMessages": false,
			"messageRetentionDuration": "86400s",
			"ackDeadlineSeconds": 10
		}
	})
		.then(response => {
			console.log(response.data);           // successful response
			/*
			response.data = {
				"name": "projects/<project>/subscriptions/<subscription>",
				"topic": "projects/<project>/topics/<topic>",
				"pushConfig": {
					"pushEndpoint": "<push-url>"
				},
				"ackDeadlineSeconds": 10,
				"messageRetentionDuration": "600s"
			}
			*/
		})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
		});

	callback(null, 'Successfully executed');
}