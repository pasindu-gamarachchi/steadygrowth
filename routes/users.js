require("dotenv").config();
const userRouter = require("express").Router();
const userController = require('../controllers/userController');


userRouter.route('/register')
    .post(userController.registerUser);

userRouter.route('/login')
    .post(userController.loginUser);

userRouter.route('/current')
    .get(userController.findUser);

userRouter.route('/currentPreferences')
    .get(userController.findUserPrefs);

module.exports = userRouter;