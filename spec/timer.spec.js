'use strict';
const Timer = require('../src/Timer.js');
const soundMock = require('./mocks/soundMock');
const quoteMock = require('./mocks/quoteMock');
const progressBarMock = require('./mocks/progressBarMock');
const CONSTANTS = require('../src/constants');

describe('Timer', function () {
  let timer;
  let options = {
    sound: soundMock,
    progress: progressBarMock,
    end: CONSTANTS.HALF,
    quote: quoteMock
  };
  beforeEach(function () {
    jasmine.clock().install();

    spyOn(quoteMock, 'random');
    spyOn(progressBarMock, 'tick');

    timer = new Timer(options);
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  describe('The timer must say the goal', function () {
    it('should tell the goal is 30 minutes', function () {
      expect(timer.objective).toContain('El objetivo es es de 30 minutos.');
    });

    it('should tell the goal is 5 minutes', function () {
      options.end = 5 * CONSTANTS.MIN;
      const anotherTimer = new Timer(options);

      expect(anotherTimer.objective).toContain('El objetivo es es de 5 minutos.');
    });
  });

  describe('accumulated time should tell the correct amount', function () {
    it('should acknowledge 0 minutes', function () {
      expect(timer.accumulatedMins).toBe(0);
    });

    it('should acknowledge 1 minutes', function () {
      timer.startTime = CONSTANTS.MIN;
      expect(timer.accumulatedMins).toBe(1);
    });

    it('should acknowledge 15 minutes', function () {
      timer.startTime = CONSTANTS.MIN * 15;
      expect(timer.accumulatedMins).toBe(15);
    });
  });

  describe('should tell me how many seconds have passed', function () {
    it('should tell me at the start that 0 minutes have passed', function () {
      expect(timer.msg).toContain('Han pasado 0 minutos');
    });

    it('should tell me 1 minute have passed after 1 minute', function () {
      timer.startTime = CONSTANTS.MIN;
      jasmine.clock().tick(6e5);
      expect(timer.msg).toContain('Ha pasado 1 minuto');
    });

    it('should tell me 2 minute have passed after 2 minute', function () {
      timer.startTime = CONSTANTS.MIN * 2;
      expect(timer.msg).toContain('Han pasado 2 minutos');
    });
  });

  describe('Timer.time function', function () {
    it('should display correct format: [HH:mm:ss]', function () {
      expect(Timer.time()).toMatch(/([\[])([[\d]{2})(:)([\d]{2})(:)([\d]{2})([\]])/);
    });
  });
});
