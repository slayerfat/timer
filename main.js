const Timer = require('./src/Timer.js');
const Sound = require('./src/Sound.js');
const execFile = require('child_process').execFile;
const ProgressBar = require('progress');

const HALF = 18e5;

const bar = new ProgressBar('[:bar] :percent :msg', {total: HALF, width: 40});
const sound = new Sound({command: 'paplay', execFile});
const timer = new Timer({sound, progress: bar, end: HALF});
timer.start();
