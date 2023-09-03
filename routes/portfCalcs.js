const portCalcRouter = require("express").Router();
const portCalcController = require('../controllers/portCalcController')


portCalcRouter.route("/")
    .get(portCalcController.summary)


module.exports = portCalcRouter;