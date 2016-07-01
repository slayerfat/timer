'use strict';
const Timer = require('../src/Timer.js');
const soundMock = require('./mocks/soundMock');
const quoteMock = require('./mocks/quoteMock');
const progressBarMock = require('./mocks/progressBarMock');

const HALF = 18e5;
const MIN = 6e4;
// const SEC = 1e3;

describe('Timer', function () {
  let timer;
  beforeEach(function () {
    jasmine.clock().install();

    spyOn(quoteMock, 'random');
    spyOn(progressBarMock, 'tick');

    const options = {sound: soundMock, progress: progressBarMock, end: HALF, quote: quoteMock};

    timer = new Timer(options);
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  describe('The timer must say the goal', function () {
    it('should tell the goal is 30 minutes', function () {
      expect(timer.objective).toContain('El objetivo es es de 30 minutos.');
    });
  });

  describe('should tell me how many seconds have passed', function () {
    it('should tell me at the start that 0 seconds have passed', function () {
      expect(timer.msg).toContain('Han pasado 0 minutos');
    });

    it('should tell me 1 second have passed after 1 second', function () {
      timer.startTime = MIN;
      jasmine.clock().tick(6e5);
      expect(timer.msg).toContain('Ha pasado 1 minuto');
    });

    it('should tell me 1 second have passed after 1 second', function () {
      timer.startTime = MIN * 2;
      expect(timer.msg).toContain('Han pasado 2 minutos');
    });
  });
});
