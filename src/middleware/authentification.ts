const jwtAuth = require("jsonwebtoken")
import { userRequest, userResponse } from "../controllers/userController"

module.exports = (req: userRequest, res: userResponse, next: any): void => {
  try {
    // DONT WORK
    const token = req.cookies.token
    const user: string = jwtAuth.verify(token, process.env.SECRET_KEY)
    req.user = user

    next()
  } catch (err: unknown) {
    res.clearCookie("token")
    res.status(401).json({ error: err })
  }
}