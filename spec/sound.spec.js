'use strict';
const Sound = require('../src/Sound');

describe('Sound', function () {
  let sound;
  beforeEach(function () {
    sound = new Sound({command: 'test'});
    spyOn(sound, '_run').and.returnValue(true);
  });

  describe('The sound must be able to answer all types of sounds', function () {
    it('should be able to run info sound', function () {
      expect(sound.info()).toBe(true);
    });

    it('should be able to run warning sound', function () {
      expect(sound.warning()).toBe(true);
    });

    it('should be able to run error sound', function () {
      expect(sound.error()).toBe(true);
    });
  });
});
