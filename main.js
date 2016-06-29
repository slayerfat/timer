const Timer = require('./Timer.js');
const Sound = require('./Sound.js');

const sound = new Sound('paplay');
const timer = new Timer({sound});
timer.start();
