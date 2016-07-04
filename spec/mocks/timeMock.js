const CONSTANTS = require('../../src/constants');

const time = {
  start: 0,
  divisor: CONSTANTS.MIN,
  interval: CONSTANTS.SEC,
  goal: CONSTANTS.HALF,
  get accumulatedMins() {
    return 98765;
  }
};

module.exports = time;

