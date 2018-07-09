const assert = require('chai').assert;
const recipeSearch = require('../recipeSearch');

const {recipeStringCount, recipeFindBestMatch, recipeErrorMessage} = recipeSearch;

describe('recipeSearch', function() {
  describe('recipeStringCount', function() {
    it('should return 0 for no matching ingredients', function() {
      assert.equal(recipeStringCount(
        ['beef','chicken','spinach'],
        "Honey-Soy Pork with Bok Choy"), 0);
    });
    it('should return a positive int for a matching ingredient', function() {
      assert.equal(recipeStringCount(
        ['pork','spinach'],
        "Honey-Soy Pork with Bok Choy"), 1);
    });
    it('should return a positive int for multiple matching ingredients', function () {
      assert.equal(recipeStringCount(
        ['pork', 'bok choy'],
        "Honey-Soy Pork with Bok Choy"), 2);
    });
  })

  describe('recipeFindBestMatch', function() {
    it('should return an "error" message if ingredients is empty', function() {
      assert.equal(recipeFindBestMatch(
        [],
        ["Random recipe 1", "Random recipe 2"]),
        recipeErrorMessage);
    });
    it('should return an "error" message if recipeStrArr is empty', function() {
      assert.equal(recipeFindBestMatch(
        ['beef','lettuce'],
        []),
        recipeErrorMessage);
    });
    it('should return an "error" message if there all strings have 0 matches', function() {
      assert.equal(recipeFindBestMatch(
        ['beef', 'lettuce'],
        ['chicken sandwich', 'pork sliders']),
        recipeErrorMessage);
    });
    it('should return a recipe name if there is a match', function() {
      assert.equal(recipeFindBestMatch(
        ['beef', 'lettuce'],
        ['chicken sandwich', 'pork sliders', 'beef noodles']),
        'beef noodles');
    });
    it('should return the recipe name with the highest matches', function() {
      assert.equal(recipeFindBestMatch(
        ['beef', 'lettuce'],
        ['chicken sandwich', 'pork sliders', 'beef noodles', 'beef wrapped in lettuce']),
        'beef wrapped in lettuce');
    });
    //need test and design to handle equal matching recipes and which to decide to pick, current setup is choose first one.
  })
})