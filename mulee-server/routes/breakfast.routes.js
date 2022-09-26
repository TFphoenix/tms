module.exports = app => {
    const breakfast = require("../controllers/breakfast.controller.js");

    var router = require("express").Router();

    // Create a customized breakfast recipe
    // router.post("/", progress.create); // TODO

    // Get all predefined breakfast recipes
    // router.get("/", progress.findAll); // TODO

    app.use('/breakfast', router);
}