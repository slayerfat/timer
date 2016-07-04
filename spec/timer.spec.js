'use strict';
const Timer = require('../src/Timer.js');
const soundMock = require('./mocks/soundMock');
const quoteMock = require('./mocks/quoteMock');
const timeMock = require('./mocks/timeMock');
const progressBarMock = require('./mocks/progressBarMock');
const CONSTANTS = require('../src/constants');

describe('Timer', function () {
  let timer;
  let options = {
    sound: soundMock,
    progress: progressBarMock,
    time: timeMock,
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

  describe('must say the goal', function () {
    it('should tell the goal is 30 minutes', function () {
      expect(timer.objective).toContain('El objetivo es es de 30 minutos.');
    });

    it('should tell the goal is 5 minutes', function () {
      options.time.goal = 5 * CONSTANTS.MIN;
      const anotherTimer = new Timer(options);

      expect(anotherTimer.objective).toContain('El objetivo es es de 5 minutos.');
    });
  });

  describe('must tell how many seconds have passed', function () {
    it('should tell at the start that 98765 minutes have passed', function () {
      expect(timer.msg).toContain('Han pasado 98765 minutos');
    });
  });

  describe('Timer.time function', function () {
    it('should display correct format: [HH:mm:ss]', function () {
      expect(Timer.time()).toMatch(/([\[])([[\d]{2})(:)([\d]{2})(:)([\d]{2})([\]])/);
    });
  });
});
