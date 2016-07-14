'use strict';

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

  get accumulated() {
    return this._start;
  }

  /**
   * Adds an amount to the current accumulated time.
   *
   * @param {number} amount
   */
  add(amount = this.interval) {
    if (typeof amount === 'number' && amount > 0) {
      this.start += amount;
    }
  }

  /**
   * Check if the accumulated time if divisible by the divisor times X minutes.
   *
   * @param {number} mins
   * @returns {boolean}
   */
  isTime(mins = 1) {
    return this.accumulated % (this.divisor * mins) === 0;
  }
}

module.exports = Time;
