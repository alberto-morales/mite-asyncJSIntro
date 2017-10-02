	var appSettings = require('./util/settings');
	var requester = require('./util/httpRequester');
	var http = require('http');

	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		
		var bingResult = false;
		var googleResult = false;
		
		console.log('Starting Bing');
		requester.getResponseCode('http://www.bing.es',
				function(statusCode) {
					var result = (statusCode == 200);
					bingResult = result;
					console.log('bing: '+statusCode);
				}
		);
		console.log('Starting Google');
		requester.getResponseCode('http://www.google.es',
				function(statusCode) {
					var result = (statusCode == 200);
					googleResult = result;
					console.log('google: '+statusCode);
				}
		);		
		console.log('bing: '+bingResult);	
		console.log('google: '+googleResult);
		
		console.log('Finished!');
		res.end('Finished!');
		
	}).listen(appSettings.port, function() {
		console.log('Node server running on http://localhost:'+appSettings.port);
	});