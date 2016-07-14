'use strict';
const CONSTANTS = require('../src/constants');
const Time = require('../src/Time');

describe('Time', function () {
  let time;
  beforeEach(function () {
    time = new Time();
  });

  describe('getters and setters', function () {
    describe('accumulated', function () {
      it('accumulated should get 0', function () {
        expect(time.accumulated).toBe(0);
      });

      it('should set a sum of the amount and current', function () {
        time.add(30);
        expect(time.accumulated).toBe(30);
        time.add(30);
        expect(time.accumulated).toBe(60);
      });

      it('should set a default of interval', function () {
        time.add();
        expect(time.accumulated).toBe(time.interval);
      });

      it('should not allow invalid types.', function () {
        time.add({});
        expect(time.accumulated).toBe(0);
        time.add([]);
        expect(time.accumulated).toBe(0);
        time.add(-1);
        expect(time.accumulated).toBe(0);
        time.add('a');
        expect(time.accumulated).toBe(0);
        time.add('1');
        expect(time.accumulated).toBe(0);
      });
    });
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
