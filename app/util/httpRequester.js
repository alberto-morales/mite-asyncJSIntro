'use strict';

(function() {

	var appSettings = require('./settings');
	var request = require('request');
	
	function HTTPRequester () {
		var self = this;
		
	};
	
	HTTPRequester.prototype.getResponseCode = function(URL, callbackFunction) {
		request({ 'url' : URL,
				  'timeout' : appSettings.timeoutValue
				}, 
				function(error, response, body) {
					var statusCode = 404;
					if (error == null && response != null) {
						statusCode = response.statusCode;
					}
					if (typeof callbackFunction !== 'undefined') {
						callbackFunction(statusCode);
					}						
				}
		);
	}
	
	module.exports = new HTTPRequester();

})();
