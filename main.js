const Timer = require('./src/Timer');
const Sound = require('./src/Sound');
const Quote = require('./src/Quote');
const Time = require('./src/Time');
const ProgressBar = require('progress');
const CONSTANTS = require('./src/constants');

// if the user sets a custom time.
let time = process.argv.slice(2);
time = time.length ? parseInt(time[0]) : CONSTANTS.HALF;
let end = time * CONSTANTS.MIN < CONSTANTS.HOUR * 24 ? time * CONSTANTS.MIN : time;

const timeObj = new Time({end});
const bar = new ProgressBar('[:bar] :percent :msg', {total: end, width: 40});
const sound = new Sound({command: 'paplay'});
const quote = new Quote();
const timer = new Timer({sound, progress: bar, quote, time: timeObj});
timer.logObjective();
timer.start();
