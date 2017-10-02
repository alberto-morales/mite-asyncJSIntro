	var appSettings = require('./util/settings');
	var requester = require('./util/httpRequester');
	var http = require('http');
	var async = require('async');

	http.createServer(function (req, res) {
		
		var bingResult = false;
		var googleResult = false;
		
		var promise1 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		console.log('Starting Bing');
        		requester.getResponseCode('http://www.bing.es',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					bingResult = result;
        					console.log('bing: '+statusCode);
        					resolver();        					
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
        					googleResult = result;
        					console.log('google: '+statusCode);
        					resolver();
        				}
        		);
        		
            });
        }
				
		res.writeHead(200, {'Content-Type': 'text/html'});

		promise1().then(promise2).then(function() {
			console.log('bing: '+bingResult);	
			console.log('google: '+googleResult);
			console.log('Finished!');
			res.end('Finished!');
        });

	}).listen(appSettings.port, function() {
		console.log('Node server running on http://localhost:'+appSettings.port);
	});