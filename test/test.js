'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('Tests Setup', () => {
  it('should output a string', () => {
    var result = index.testLib();
    expect(result).to.equal("It's working!");
  })
});