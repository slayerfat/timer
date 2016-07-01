'use strict';
const Quote = require('../src/Quote');

describe('Quote', function () {
  let quote;
  beforeEach(function () {
    quote = new Quote();
  });

  describe('Quote must reply a quote', function () {
    it('should reply a quote string', function () {
      expect(quote.random()).toEqual(jasmine.any(String));
    });
  });
});
