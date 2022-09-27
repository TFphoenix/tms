const data = require("../data/data");

exports.predefinedBreakfastGetAll = (req, res) => {

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