var request = require('request');

function questrade(response){
	var o = JSON.parse(response);
	this.access_token = o.access_token;
	this.api_server = o.api_server
}

questrade.prototype.toString = function()
{
	return "access_token : " + this.access_token;
}

questrade.prototype.accounts = function()
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
			console.log(JSON.parse(body));
		}
	);
}

questrade.prototype.positions = function(id)
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
			console.log(JSON.parse(body));
		}
	);
}

module.exports = questrade