const fs = require('fs');
const path = require("path");
// const util = require('util')

function initializeData() {
    console.log("Initializing data...");

    const ingredientsJSON = fs.readFileSync(path.resolve(__dirname, './ingredients.json'));
    const breakfastJSON = fs.readFileSync(path.resolve(__dirname, './breakfast.json'));

    const ingredientsData = JSON.parse(ingredientsJSON);
    const breakfastData = JSON.parse(breakfastJSON)

    breakfastData.forEach(breakfast => {
        breakfast.ingredients.forEach((value, index, array) => {
            array[index] = ingredientsData.find(ingredient => ingredient.name === value);
        });
    });

    // console.log(util.inspect(breakfastData, false, null, true))
    console.log("Data initialized.");
}

module.exports = {
    initializeData
}