const fs = require('fs');
const path = require("path");

exports.getBreakfastData = () => {
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
};

exports.getLiquids = () => {
    return new Promise((resolve, reject) => {
        const liquidsPromise = fs.promises.readFile(path.resolve(__dirname, './liquids.json'));

        Promise.resolve(liquidsPromise)
            .then(values => {
                let liquidsData = JSON.parse(values);
                return resolve(liquidsData);
            })
            .catch(err => {
                reject(err);
            });
    });
};