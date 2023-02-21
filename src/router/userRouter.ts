const expressAuth = require("express")
const authRouter = expressAuth.Router()
const userController = require("../controllers/userController")
const userValidation = require("../middleware/userValidation")

authRouter.post("/signup", userValidation.signup, userController.signup)
authRouter.post("/login", userValidation.login, userController.login)

module.exports = authRouter
