const jwtAuth = require("jsonwebtoken")

module.exports = (req: any, res: any, next: any): void => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwtAuth.decode(token, process.env.SECRET_KEY)
    if (decodedToken != null) {
      const userId = token.userId
      req.auth = {
        userId: userId,
      }
    }
  } catch (err: any) {
    res.status(401).json({ error: err })
  }
}
