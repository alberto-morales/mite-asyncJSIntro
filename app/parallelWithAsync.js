	var appSettings = require('./util/settings');
	var requester = require('./util/httpRequester');
	var http = require('http');
	var async = require('async');

	http.createServer(function (req, res) {
		
		res.writeHead(200, {'Content-Type': 'text/html'});
	
		async.parallel({
		    bingRequest: function(callback) {
				console.log('Starting Bing');
				requester.getResponseCode('http://www.bing.es',
						function(statusCode) {
							var result = (statusCode == 200);
							console.log('bing: '+statusCode);
							callback(null, result);
						}
				);

		    },
		    googleRequest: function(callback) {
				console.log('Starting Google');
				requester.getResponseCode('http://www.google.es',
						function(statusCode) {
							var result = (statusCode == 200);
							console.log('google: '+statusCode);
							callback(null, result);
						}
				);

		    }
		}, function(err, results) {
			var bingResult = results.bingRequest;
			var googleResult = results.googleRequest;
			console.log('bing: '+bingResult);	
			console.log('google: '+bingResult);
			console.log('Finished!');
			res.end('Finished!');
		})		
	}).listen(appSettings.port, function() {
		console.log('Node server running on http://localhost:'+appSettings.port);
	});