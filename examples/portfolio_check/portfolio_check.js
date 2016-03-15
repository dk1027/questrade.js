var QuestradeJS = require('../../questrade.js');
var config = require('./config.js')

var q = new QuestradeJS(config);

/*
Prints out all the holdings of each account

For example:
SYMBOL	CURRENT MARKET VALUE	OPEN QUANTITY	CURRENT PRICE
AVO.TO	2996	200	14.98
VIU.TO	13769.2	580	23.74
VXC.TO	8625	300	28.75
SU.TO	1738	50	34.76
VSB.TO	9884	400	24.71
VFV.TO	28172.5	590	47.75
ZCN.TO	6584.4	360	18.29
XCH.TO	5052	240	21.05
*/

console.log("SYMBOL\tCURRENT MARKET VALUE\tOPEN QUANTITY\tCURRENT PRICE");
q.accounts(function accounts_(err, body){
  var o = JSON.parse(body);
  o.accounts.forEach(function processAccount(acc){
    q.positions(acc.number, function positions_(err, body){
      var o = JSON.parse(body);
      o.positions.forEach(function printPosition_(pos){
        console.log(pos.symbol + "\t" + pos.currentMarketValue +"\t"+ pos.openQuantity +"\t"+ pos.currentPrice);
      })
    });
  })
});
