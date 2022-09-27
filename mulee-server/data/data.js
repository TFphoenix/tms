const fs = require('fs');
const path = require("path");

function getBreakfastData() {
    return new Promise((resolve, reject) => {
        const ingredientsPromise = fs.promises.readFile(path.resolve(__dirname, './ingredients.json'));
        const breakfastPromise = fs.promises.readFile(path.resolve(__dirname, './breakfast.json'));

        Promise.all([ingredientsPromise, breakfastPromise])
            .then(values => {
                let ingredientsData = JSON.parse(values[0]);
                let breakfastData = JSON.parse(values[1]);

                breakfastData.forEach(breakfast => {
                    breakfast.ingredients.forEach((value, index, array) => {
                        array[index] = ingredientsData.find(ingredient => ingredient.name === value);
                    });
                });

                return resolve(breakfastData);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports = {
    getBreakfastData
}