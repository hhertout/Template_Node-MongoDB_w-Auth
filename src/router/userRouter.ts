const expressAuth = require("express")
const authRouter = expressAuth.Router()
const userController = require("../controllers/userController")

authRouter.post("/signup", userController.signup)
authRouter.post("/login", userController.login)

module.exports = authRouter
