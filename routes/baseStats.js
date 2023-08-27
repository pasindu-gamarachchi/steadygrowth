const express = require('express');
const baseStatsController = require('../controllers/baseStatsController');
const baseStatsRouter = require('express').Router();


baseStatsRouter.route("/:symb")
    .get(baseStatsController.calcAllBase);


module.exports = baseStatsRouter;