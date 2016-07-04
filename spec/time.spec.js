'use strict';
const CONSTANTS = require('../src/constants');
const Time = require('../src/Time');

describe('Time', function () {
  let time;
  beforeEach(function () {
    time = new Time();
  });

  describe('accumulatedMins must tell the correct amount', function () {
    it('should acknowledge 0 minutes', function () {
      expect(time.accumulatedMins).toBe(0);
    });

    it('should acknowledge 1 minutes', function () {
      time.start = CONSTANTS.MIN;
      expect(time.accumulatedMins).toBe(1);
    });

    it('should acknowledge 15 minutes', function () {
      time.start = CONSTANTS.MIN * 15;
      expect(time.accumulatedMins).toBe(15);
    });

    it('should not acknowledge -1 minutes', function () {
      time.start = CONSTANTS.MIN * -1;
      expect(time.accumulatedMins).toBe(0);
    });
  });
});
