const Timer = require('./src/Timer.js');
const Sound = require('./src/Sound.js');
const execFile = require('child_process').execFile;

const sound = new Sound({command: 'paplay', execFile});
const timer = new Timer({sound});
timer.start();
