const Timer = require('./src/Timer.js');
const Sound = require('./src/Sound.js');

const sound = new Sound('paplay');
const timer = new Timer({sound});
timer.start();
