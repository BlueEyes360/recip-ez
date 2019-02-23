// For example:
// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3

// Optional Parameters:
// i : comma delimited ingredients
// q : normal search query
// p : page
// format=xml : if you want xml instead of json

var apiCallString = "http://www.recipepuppy.com/api/?i=";
const fetch = require('node-fetch');

function getRecipes(ingredientsArray) {

    //create csv ingredients list for api call
    var ingredientString = '';
    for (var i = 0; i < ingredientsArray.length; i++) {
        if (i == 0) {
            ingredientString += (ingredientsArray[i]);
        }
        else
            ingredientString += (',' + ingredientsArray[i]);
    }

    //call api with ingredients list
    var newApiCallString = apiCallString + ingredientString;
    // console.log(newApiCallString);
    var apiReturn = getApiReturn(newApiCallString);
    return apiReturn;

}
function getApiReturn(apiCallString) {
    fetch(apiCallString)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log((myJson['results']))
        return myJson;
})
}

var testIngredients = ['carrot', 'egg'];
results = getRecipes(testIngredients);

console.log(results);
