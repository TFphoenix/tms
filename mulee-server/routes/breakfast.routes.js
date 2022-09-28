module.exports = app => {
    const breakfast = require("../controllers/breakfast.controller.js");

    var router = require("express").Router();

    // Get all predefined breakfast recipes
    router.get("/predefined", breakfast.predefinedBreakfastGetAll);

    // Start preparing predefined recipe
    router.post("/predefined", breakfast.predefinedBreakfastPrepare);

    // Get all liquid types
    router.get("/liquids", breakfast.liquidsGetAll);

    // Get all ingredients
    router.get("/ingredients", breakfast.ingredientsGetAll);

    // Create a customized breakfast recipe
    // router.post("/customized", progress.create); // TODO

    app.use('/breakfast', router);
}