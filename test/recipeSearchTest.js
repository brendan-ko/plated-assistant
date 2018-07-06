const assert = require('chai').assert;
const recipeSearch = require('../recipeSearch');

describe('recipeSearch', function() {
  describe('recipeStringCount', function() {
    it('should return 0 for no matching ingredients', function() {
      assert.equal(recipeSearch.recipeStringCount(
        ['beef','chicken','spinach'],
        "Honey-Soy Pork with Bok Choy"), 0);
    });
    it('should return a positive int for a matching ingredient', function() {
      assert.equal(recipeSearch.recipeStringCount(
        ['pork','spinach'],
        "Honey-Soy Pork with Bok Choy"), 1);
    });
    it('should return a positive int for multiple matching ingredients', function () {
      assert.equal(recipeSearch.recipeStringCount(
        ['pork', 'bok choy'],
        "Honey-Soy Pork with Bok Choy"), 2);
    });
  })

  describe('recipeFindBestMatch', function() {
    it('should return an "error" message if ingredients is empty', function() {
      assert.equal(recipeSearch.recipeFindBestMatch(
        [],
        ["Random recipe 1", "Random recipe 2"]),
        recipeSearch.recipeErrorMessage);
    });
    it('should return an "error" message if recipeStrArr is empty', function() {
      assert.equal(recipeSearch.recipeFindBestMatch(
        ['beef','lettuce'],
        []),
        recipeSearch.recipeErrorMessage);
    });
    it('should return an "error" message if there all strings have 0 matches', function() {
      assert.equal(recipeSearch.recipeFindBestMatch(
        ['beef', 'lettuce'],
        ['chicken sandwich', 'pork sliders']),
        recipeSearch.recipeErrorMessage);
    });
  })
})