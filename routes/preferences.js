require("dotenv").config();
const prefRouter = require("express").Router();
const prefController = require('../controllers/prefController');


prefRouter.route("/")
    .get(prefController.findAll)
    .put(prefController.addPreference)
    .delete(prefController.removePreference)


module.exports = prefRouter;