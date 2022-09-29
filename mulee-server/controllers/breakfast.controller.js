const data = require("../data/data");
const arduino = require("../services/arduino.service");
const { logError, logWarning } = require("../services/logger.service");

exports.predefinedBreakfastGetAll = (req, res) => {
    data.getPredefinedBreakfast()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error occurred"
            });
        });
};

exports.predefinedBreakfastPrepare = (req, res) => {
    const breakfast = {
        name: req.body.name,
        liquid: req.body.liquid
    };

    Promise.all([data.getArduino(), data.getPredefinedBreakfast()])
        .then(values => {
            let arduinoCommand = toArduinoCommandPredefined(values[0], values[1], breakfast.name, breakfast.liquid);
            arduino.writeData(arduinoCommand);
            res.send({ breakfast, arduinoCommand }); // TEST
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err.message || "Unknown error occurred"
            });
        });
};

exports.customizedBreakfastPrepare = (req, res) => {
    const breakfast = {
        ingredients: req.body.ingredients,
        liquid: req.body.liquid
    };

    data.getArduino()
        .then(value => {
            let arduinoCommand = toArduinoCommandCustomized(value, breakfast.ingredients, breakfast.liquid);
            arduino.writeData(arduinoCommand);
            res.send({ breakfast, arduinoCommand }); // TEST
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err.message || "Unknown error occurred"
            });
        });
};

exports.liquidsGetAll = (req, res) => {
    data.getLiquids()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error occurred"
            });
        });
}

exports.ingredientsGetAll = (req, res) => {
    data.getIngredients()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error occurred"
            });
        });
}

// For predefined breakfast (hardcoded grams)
function toArduinoCommandPredefined(arduinoData, breakfastData, breakfastName, breakfastLiquid) {
    const breakfastIngredients = breakfastData.find(breakfast => breakfast.name === breakfastName)?.ingredients;

    // Get breakfast ingredients
    if (!breakfastIngredients || breakfastIngredients.length === 0) {
        logError("(toArduinoCommand - PREDEFINED)", "Breakfast ingredients undefined or empty");
    }

    console.log(breakfastIngredients);
    // TODO: Generalize
    // Build breakfast command
    let breakfastCommand = '';
    breakfastIngredients.forEach(ingredient => {
        ingredientSlot = arduinoData.slots.find(a => a.content === ingredient.name);
        if (!ingredientSlot) {
            logWarning("Ingredient not found", ingredient.name);
            return;
        }

        const isSlotLiquid = ingredientSlot.type === "l" || ingredientSlot.type === "y";
        const ingredientTime = isSlotLiquid ? 2000 : 500;
        breakfastCommand += `${ingredientSlot.type} ${ingredientSlot.index} ${ingredientTime},`;
    });

    return breakfastCommand;
}

// For customized breakfast (calculated grams)
function toArduinoCommandCustomized(arduinoData, breakfastIngredients, breakfastLiquid) {
    if (!breakfastIngredients || breakfastIngredients.length === 0) {
        logError("(toArduinoCommand - CUSTOMIZED)", "Breakfast ingredients undefined or empty");
    }

    // TODO: Generalize
    // Build breakfast command
    let breakfastCommand = '';
    breakfastIngredients.forEach(ingredient => {
        ingredientSlot = arduinoData.slots.find(a => a.content === ingredient.name);
        if (!ingredientSlot) {
            logWarning("Ingredient not found", ingredient.name);
            return;
        }

        const isSlotLiquid = ingredientSlot.type === "l" || ingredientSlot.type === "y";
        const ingredientTime = isSlotLiquid ? 2000 : ingredient.grams * 5;
        breakfastCommand += `${ingredientSlot.type} ${ingredientSlot.index} ${ingredientTime},`;
    });

    return breakfastCommand;
}