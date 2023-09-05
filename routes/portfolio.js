require("dotenv").config();
const portfRouter = require("express").Router();
const portfController = require('../controllers/portfolioController');


portfRouter.route("/")
    .get(portfController.findIndPortfolio)
    .put(portfController.addIndPortfolio)
    .patch(portfController.updateIndPortfolio)


module.exports = portfRouter;