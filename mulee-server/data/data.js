const fs = require('fs');
const path = require("path");

exports.getPredefinedBreakfast = () => {
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

exports.getIngredients = () => {
    return new Promise((resolve, reject) => {
        const ingredientsPromise = fs.promises.readFile(path.resolve(__dirname, './ingredients.json'));

        Promise.resolve(ingredientsPromise)
            .then(values => {
                let ingredientsData = JSON.parse(values);
                return resolve(ingredientsData);
            })
            .catch(err => {
                reject(err);
            });
    });
};

exports.getArduino = () => {
    return new Promise((resolve, reject) => {
        const arduinoPromise = fs.promises.readFile(path.resolve(__dirname, './arduino.json'));

        Promise.resolve(arduinoPromise)
            .then(values => {
                let arduinoData = JSON.parse(values);
                return resolve(arduinoData);
            })
            .catch(err => {
                reject(err);
            });
    });
}