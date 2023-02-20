const jwtAuth = require("jsonwebtoken")
import { userRequest, userResponse } from "../controllers/userController"

module.exports = (req: userRequest, res: userResponse, next: any): void => {
  try {
    // DONT WORK
    const token = req.headers.authorization.split(", ")[1]
    const decodedToken: string = jwtAuth.decode(token, process.env.SECRET_KEY)
    const userId = req.headers.authorization.split(":")[0]
    if (decodedToken != null) {
      res.authorization = {
        userId: parseInt(userId),
      }
    }
  } catch (err: unknown) {
    res.status(401).json({ error: err })
  }
}
