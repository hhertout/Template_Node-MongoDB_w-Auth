const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.decode(token, process.env.SECRET_KEY)
        const userId = token.userId
        req.auth = {
            userId : userId
        }
    }
    catch(err) {
        res.status(401).json({error: err})
    }
}