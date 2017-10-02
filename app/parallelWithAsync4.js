	var appSettings = require('./util/settings');
	var requester = require('./util/httpRequester');
	var http = require('http');
	var async = require('async');

	http.createServer(function (req, res) {
		
		var startMilis = Date.now();
		
		res.writeHead(200, {'Content-Type': 'text/html'});
	
		async.parallel({
		    bingRequest: function(callback) {
				requester.getResponseCode('http://www.bing.es',
						function(statusCode) {
							var result = (statusCode == 200);
							callback(null, result);
						}
				);

		    },
		    googleRequest: function(callback) {
				requester.getResponseCode('http://www.google.es',
						function(statusCode) {
							var result = (statusCode == 200);
							callback(null, result);
						}
				);

		    },
		    nasaRequest: function(callback) {
				requester.getResponseCode('http://www.nasa.gov',
						function(statusCode) {
							var result = (statusCode == 200);
							callback(null, result);
						}
				);

		    },
		    locRequest: function(callback) {
				requester.getResponseCode('http://www.loc.gov',
						function(statusCode) {
							var result = (statusCode == 200);
							callback(null, result);
						}
				);

		    }
		}, function(err, results) {
			var bingResult = results.bingRequest;
			var googleResult = results.googleRequest;
			var nasaResult = results.nasaRequest;
			var locResult = results.locRequest;
			res.end('Finished!');
			var finishMilis = Date.now();
			console.log(finishMilis - startMilis);
		})		
	}).listen(appSettings.port, function() {
		console.log('Node server running on http://localhost:'+appSettings.port);
	});