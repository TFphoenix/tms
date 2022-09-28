const data = require("../data/data");
const arduino = require("../services/arduino.service");

exports.predefinedBreakfastGetAll = (req, res) => {
    arduino.writeData("Test Data");

    data.getBreakfastData()
        .then(data => {
            res.send(data);
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