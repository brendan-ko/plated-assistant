const assert = require('chai').assert;
const recipeSearch = require('../recipeSearch');

describe('recipeSearch', function() {
  describe('recipeStringCount', function() {
    it('should return 0 for no matching ingredients', function() {
      assert.equal(recipeSearch.recipeStringCount(
        ['beef','chicken','spinach'],
        "Honey-Soy Pork with Bok Choy"), 0)
    })
    it('should return a positive int for a matching ingredient', function() {
      assert.equal(recipeSearch.recipeStringCount(
        ['pork','spinach'],
        "Honey-Soy Pork with Bok Choy"), 1)
    })
    it('should return a positive int for multiple matching ingredients', function () {
      assert.equal(recipeSearch.recipeStringCount(
        ['pork', 'bok choy'],
        "Honey-Soy Pork with Bok Choy"), 2)
    })
  })
})