	var appSettings = require('./util/settings');
	var requester = require('./util/httpRequester');
	var http = require('http');
	var async = require('async');

	http.createServer(function (req, res) {

		var promise1 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		requester.getResponseCode('http://www.bing.es',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					resolver(result);        					
        				}
        		);
        		
            });
        }
		
		var promise2 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		requester.getResponseCode('http://www.google.es',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					resolver(result);
        				}
        		);
        		
            });
        };

		var promise3 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		requester.getResponseCode('http://www.nasa.gov',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					resolver(result);
        				}
        		);
        		
            });
        };

		var promise4 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		requester.getResponseCode('http://www.loc.gov',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					resolver(result);
        				}
        		);
        		
            });
        };

		res.writeHead(200, {'Content-Type': 'text/html'});
		var startMilis = Date.now();
		
		Promise.all([promise1(), promise2(), promise3(), promise4()]).then(function(results) {
			var bingResult = results[0];
			var googleResult = results[1];
			var nasaResult = results[2];
			var locResult = results[3];
			
			res.end('Finished!');
			var finishMilis = Date.now();
			console.log(finishMilis - startMilis);				
		});

	}).listen(appSettings.port, function() {
		console.log('Node server running on http://localhost:'+appSettings.port);
	});