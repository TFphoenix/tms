const express = require("express");
const cors = require("cors");
const config = require("./config/general.config")
const data = require("./data/data")

const app = express();

var corsOptions = {
    origin: config.MULEE_INTERFACE
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to MuLee Server application." });
});

// initialize data
data.initializeData();

// entity routes
require("./routes/breakfast.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
