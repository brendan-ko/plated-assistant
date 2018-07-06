function recipeStringCount(ingredients, recipeStr) {
  let strCount = 0;
  ingredients.forEach( (ingredient) => {
    if (recipeStr.toLowerCase().indexOf(ingredient) !== -1) strCount++;
  })
  return strCount;
}

function recipeFind(ingredients, recipeStrArr) {

}

module.exports = {
  'recipeStringCount': recipeStringCount,
  'recipeFind': recipeFind,
}