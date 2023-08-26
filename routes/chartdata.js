const express = require('express');
const chartDataController = require('../controllers/chartDataController');
const chartDataRouter = require('express').Router();


chartDataRouter.route("/:symb")
    .get(chartDataController.findRange);


chartDataRouter.route("/ondate/:symb")
    .get(chartDataController.findRange);

module.exports = chartDataRouter;