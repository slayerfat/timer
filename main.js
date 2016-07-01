const Timer = require('./src/Timer.js');
const Sound = require('./src/Sound.js');
const Quote = require('./src/Quote.js');
const ProgressBar = require('progress');
const CONSTANTS = require('./src/constants');

// if the user sets a custom time.
let time = process.argv.slice(2);
time = time.length ? parseInt(time[0]) : CONSTANTS.HALF;
let end = time < CONSTANTS.HOUR * 24 ? time : time * CONSTANTS.MIN;

const bar = new ProgressBar('[:bar] :percent :msg', {total: end, width: 40});
const sound = new Sound({command: 'paplay'});
const quote = new Quote();
const timer = new Timer({sound, progress: bar, end, quote});
timer.logObjective();
timer.start();
