var QuestradeJS = require('./questrade.js');


// Logon to Questrade and generate a token, then make a get request (e.g. enter in browser's address bar) to redeem the refresh token for an access token
// https://login.questrade.com/oauth2/token?grant_type=refresh_token&refresh_token=REFRESH_TOKEN_HERE
// 
// For example:
// {"access_token":"DccnLT1J8A0PagGBOAknU_k9k7nnSC3I0","api_server":"https:\/\/api03.iq.questrade.com\/","expires_in":1800,"refresh_token":"AoZ0VbkO9PL56qJas4ZFBbe8y6vXOWSj0","token_type":"Bearer"}
// Then copy the response into the constructo and run ".load questapp.js" in the node REPL to run commands interactively.

var QUESTRADE_LOGIN_RESPONSE = "FILL_THIS_IN";
var q = new QuestradeJS(QUESTRADE_LOGIN_RESPONSE);

