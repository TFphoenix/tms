const data = require("../data/data");
const arduino = require("../services/arduino.service");

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

    Promise.all([data.getArduino, data.getPredefinedBreakfast])
        .then(values => {
            let arduinoCommand = toArduinoCommand(values[0], values[1], breakfast.name, breakfast.liquid);
            arduino.writeData(arduinoCommand);
            res.send(breakfast);
        })
        .catch(err => {
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

function toArduinoCommand(arduinoData, breakfastData, breakfastName, breakfastLiquid) {
    // TODO: Implement Arduino Command Conversion function
    return "Test Data";
}