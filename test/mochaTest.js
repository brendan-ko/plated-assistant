const assert = require('chai').assert;
const mocha = require('../mocha');

describe('Mocha', () => {
  it('should return hello', () => {
    assert.equal(mocha.hello(), 'hello');
  })
})