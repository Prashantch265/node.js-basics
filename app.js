var elements = require('./counter');
var date = require('./date');
var calculate = require('./calculate');

console.log(elements(['prashant','ashim','ujjwol']));
console.log(date.myDate());
console.log(calculate.adder(5,6));
console.log(calculate.subtractor(18,7));
console.log(calculate.multiplication(17,8));