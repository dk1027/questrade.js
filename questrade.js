var request = require('request');

function questrade(options){
	if(options){
			this.access_token = options.access_token;
			this.api_server = options.api_server;
	}
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
			self.access_token = o.access_token;
			self.api_server = o.api_server;
			if (callback) callback(err);
		}
	);
}

questrade.prototype.toString = function()
{
	return "access_token : " + this.access_token;
}

questrade.prototype.accounts = function(callback)
{
	request.get(
		{
			url : this.api_server + 'v1/accounts',
			auth : {
				bearer : this.access_token
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
			url : this.api_server + 'v1/accounts/' + id + '/positions',
			auth : {
				bearer : this.access_token
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
