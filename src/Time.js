const CONSTANTS = require('./constants');

class Time {

  /**
   * @param {Object=} options
   * @param {number=} options.end
   * @param {number=} options.divisor
   * @param {number=} options.interval
   */
  constructor(options = {}) {
    const {end = CONSTANTS.HALF, divisor = CONSTANTS.MIN, interval = CONSTANTS.SEC} = options;
    this.start = options.start || 0;
    this.divisor = divisor;
    this.interval = interval;
    this.goal = end;
  }

  set start(number) {
    if (number >= 0) {
      this._start = number;

      return;
    }

    this._start = 0;
  }

  get start() {
    return this._start;
  }

  // get divisorString() {
  //   if (divisor)
  // }

  get accumulatedMins() {
    return this.start / (this.interval * 60);
  }
}

module.exports = Time;
