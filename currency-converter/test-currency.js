const currency = require('./lib/currency');

console.log(`50 Canadian dollars equals to ${currency.canadianToUS(50)} US dollars.`);
console.log(`30 US dollars equals to ${currency.USToCandian(30)} Canadian dollars.`);