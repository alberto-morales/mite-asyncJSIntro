	var appSettings = require('./util/settings');
	var requester = require('./util/httpRequester');
	var http = require('http');
	var async = require('async');

	http.createServer(function (req, res) {
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		
		var promise1 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		console.log('Starting Bing');
        		requester.getResponseCode('http://www.bing.es',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					console.log('bing: '+statusCode);
        					resolver(result);        					
        				}
        		);
        		
            });
        }
		
		var promise2 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		console.log('Starting Google');
        		requester.getResponseCode('http://www.googleg.es',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					console.log('google: '+statusCode);
        					resolver(result);
        				}
        		);
        		
            });
        };

		Promise.all([promise1(), promise2()]).then(function(results) {
			var bingResult = results[0];
			var googleResult = results[1];
			console.log('bing: ' + bingResult);	
			console.log('google: ' + googleResult);
			
			console.log('Finished!');
			res.end('Finished!');
		});

	}).listen(appSettings.port, function() {
		console.log('Node server running on http://localhost:'+appSettings.port);
	});