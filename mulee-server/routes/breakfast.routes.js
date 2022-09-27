module.exports = app => {
    const breakfast = require("../controllers/breakfast.controller.js");

    var router = require("express").Router();

    // Get all predefined breakfast recipes
    router.get("/", breakfast.predefinedBreakfastGetAll);

    // Create a customized breakfast recipe
    // router.post("/", progress.create); // TODO

    app.use('/breakfast', router);
}