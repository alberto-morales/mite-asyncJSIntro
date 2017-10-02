	var appSettings = require('./util/settings');
	var requester = require('./util/httpRequester');
	var http = require('http');
	var async = require('async');

	http.createServer(function (req, res) {
		
		var bingResult = false;
		var googleResult = false;
		var nasaResult = false;
		var locResult = false;
		
		var promise1 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		requester.getResponseCode('http://www.bing.es',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					bingResult = result;
        					resolver();        					
        				}
        		);
        		
            });
        }
		
		var promise2 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		requester.getResponseCode('http://www.google.es',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					googleResult = result;
        					resolver();
        				}
        		);
        		
            });
        }
		
		var promise3 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		requester.getResponseCode('http://www.nasa.gov',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					nasaResult = result;
        					resolver();
        				}
        		);
        		
            });
        }
		
		var promise4 = function() {
            return new Promise(function(resolver, cancelar) {
 
        		requester.getResponseCode('http://www.loc.gov',
        				function(statusCode) {
        					var result = (statusCode == 200);
        					locResult = result;
        					resolver();
        				}
        		);
        		
            });
        }
		
		var startMilis = Date.now();
		res.writeHead(200, {'Content-Type': 'text/html'});

		promise1().then(promise2).then(promise3).then(promise4).then(function() {
			res.end('Finished!');
			var finishMilis = Date.now();
			console.log(finishMilis - startMilis);			
        });

	}).listen(appSettings.port, function() {
		console.log('Node server running on http://localhost:'+appSettings.port);
	});