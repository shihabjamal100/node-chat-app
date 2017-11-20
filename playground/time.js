const moment = require('moment');

/* var mon = new Date().getMonth();
console.log(mon); */

var date = moment();
date.add(1, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

var current = moment();
console.log(current.format('h:mm a'));

const timeStamp = 1234;
var dateCustom = moment(timeStamp);
console.log(dateCustom.format('MMM Do, YYYY'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
