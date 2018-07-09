const assert = require('chai').assert;
const context = require('../context');

const {createContext} = context;

describe('context', function() {
  describe('createContext', function() {
    it('should return an object with name, lifespan, and a parameter object', function() {
      assert.deepEqual(createContext('user', 5, 'HEYO'),
        {
          'name': 'user',
          'lifespan': 5,
          'parameters': { 'user': 'HEYO' }
        })
    })
  })
})