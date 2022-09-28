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

    data.getPredefinedBreakfast()
        .then(data => {
            // TODO: Convert to Arduino Commands
            arduino.writeData("Test Data");
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