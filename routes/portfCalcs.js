const portCalcRouter = require("express").Router();
const portCalcController = require('../controllers/portCalcController')


portCalcRouter.route("/")
    .get(portCalcController.summary)

portCalcRouter.route("/spend")
    .get(portCalcController.spend)

module.exports = portCalcRouter;