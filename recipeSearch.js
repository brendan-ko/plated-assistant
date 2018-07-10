const recipeErrorMessage = 'Sorry, I couldn\'t find any recipes with that Title.';
const sampleRecipes = require('./sampleRecipes');

function recipeTitleExtract(recipeData) {
  const recipeTitleObj = {};
  recipeData.forEach( (recipe) => {
    const {name}= recipe;
    const lowerTitle = name.toLowerCase();
    recipeTitleObj[lowerTitle] = recipe;
  })
  return recipeTitleObj;
}

function recipeStringCount(lowerQuerySplit, recipeStr) {
  let count = 0;
  lowerQuerySplit.forEach( (queryWord) => {
    if(recipeStr.indexOf(queryWord) !== -1) count++;
  })
  return count;
}

function recipeFindBestMatch(lowerQuery, recipeTitleObj) {
  let bestMatchTitle = null;
  let bestMatchCount = 0;
  if(lowerQuery.length === 0 || Object.keys(recipeTitleObj).length === 0) {
    return recipeErrorMessage;
  }
  else {
    if (recipeTitleObj[lowerQuery]) {
      return recipeTitleObj[lowerQuery];
    }
    else {
      const lowerQuerySplit = lowerQuery.split(' ');
      console.log(lowerQuerySplit);
      Object.keys(recipeTitleObj).forEach( (recipeTitle) => {
        console.log(recipeTitle);
        const recipeMatchCount = recipeStringCount(lowerQuerySplit, recipeTitle);
        console.log(recipeMatchCount);
        console.log(bestMatchCount)
        if (!bestMatchTitle || recipeMatchCount > bestMatchCount) {
          bestMatchTitle = recipeTitle;
          bestMatchCount = recipeMatchCount;
        }
      })
      return recipeTitleObj[bestMatchTitle];
    }
  }
}

module.exports = {
  'recipeTitleExtract': recipeTitleExtract,
  'recipeStringCount': recipeStringCount,
  'recipeFindBestMatch': recipeFindBestMatch,
  'recipeErrorMessage': recipeErrorMessage,
}