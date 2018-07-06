const recipeErrorMessage = 'Sorry, I couldn\'t find any recipes with that name.';

function recipeStringCount(ingredients, recipeStr) {
  let strCount = 0;
  ingredients.forEach( (ingredient) => {
    if (recipeStr.toLowerCase().indexOf(ingredient) !== -1) strCount++;
  })
  return strCount;
}

function recipeFindBestMatch(ingredients, recipeStrArr) {
  if(ingredients.length === 0 || recipeStrArr.length === 0) {
    return recipeErrorMessage;
  }
  else {
    let highestMatchCount = 0;
    let highestMatchStr = recipeErrorMessage;
    recipeStrArr.forEach( (recipeStr) => {
      const strCount = recipeStringCount(ingredients, recipeStr);
      if (strCount > highestMatchCount) {
        highestMatchCount = strCount;
        highestMatchStr = recipeStr;
      }
    })
    return highestMatchStr;
  }
}

module.exports = {
  'recipeStringCount': recipeStringCount,
  'recipeFindBestMatch': recipeFindBestMatch,
  'recipeErrorMessage': recipeErrorMessage,
}