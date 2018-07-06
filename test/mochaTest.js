const assert = require('chai').assert;
const mocha = require('../mocha');

describe.skip('Mocha', function() {
  describe('hello', function() {
    it('should return hello', function () {
      assert.equal(mocha.hello(), 'hello');
    })
  })
  describe('add', function() {
    it('should add', function() {
      assert.equal(mocha.add([1,2,3]), 6);
    })
  })
  describe('addDynamic', function () {
    const tests = [
      { args: [1, 2, 3], expected: 6 },
      { args: [2, 6, 1], expected: 9 },
      { args: [100, 5000, -200], expected: 4900 }
    ]
    const add = mocha.add;
    tests.forEach(function (test) {
      it('should add array of ints', function () {
        let res = add(test.args);
        assert.equal(res, test.expected);
      })
    })
  })
})