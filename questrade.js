var request = require('request');

function questrade(options){
	this.options = {}
	if(options){
			this.options.access_token = options.access_token;
			this.options.api_server = options.api_server;
	}
}

// Save the options to path. Default: ./config.js
// WARNING: Make sure you do not accidentally share the config file as it contains your questrade access token
questrade.prototype.save = function(path){
	var save_path = path ? path : "config.js"
	var fs = require("fs");
	var self = this;
	fs.writeFile(save_path, JSON.stringify(self.options, null, 2), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
}

// Load the options from path. Default: ./config.js
questrade.prototype.load = function(path){
	var fs = require("fs");
	var load_path = path ? path : "config.js"
	this.options = JSON.parse(fs.readFileSync(load_path));
}

questrade.prototype.login = function(refresh_token, callback){
	var self = this;
	request.get(
		{
			url : 'https://login.questrade.com/oauth2/token?grant_type=refresh_token&refresh_token=' + refresh_token
		},
		function(err, response, body){
			console.log(err);
			console.log(body);
			var o = JSON.parse(body);
			self.options.access_token = o.access_token;
			self.options.api_server = o.api_server;
			if (callback) callback(err);
		}
	);
}

questrade.prototype.toString = function()
{
	return "access_token : " + this.options.access_token;
}

questrade.prototype.accounts = function(callback)
{
	request.get(
		{
			url : this.options.api_server + 'v1/accounts',
			auth : {
				bearer : this.options.access_token
			}
		},
		function(err, response, body){
			if(err){
				console.log(err);
				return;
			}
			callback(err, body);
		}
	);
}

questrade.prototype.positions = function(id, callback)
{
	request.get(
		{
			url : this.options.api_server + 'v1/accounts/' + id + '/positions',
			auth : {
				bearer : this.options.access_token
			}
		},
		function(err, response, body){
			if(err){
				console.log(err);
				return;
			}
			callback(err, body);
		}
	);
}

module.exports = questrade
