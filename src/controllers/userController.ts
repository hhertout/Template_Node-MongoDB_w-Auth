const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req: any, res: any, next: any): void => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash: string) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then((user: any) =>
          res.status(201).json({
            status: "ok",
            message: "user created",
            user: user.email,
          })
        )
        .catch((err: any) => res.status(500).json({ error: err }))
    })
    .catch((err: any) => res.status(500).json({ error: err }))
}

exports.login = (req: any, res: any, next: any): void => {
  User.findOne({ email: req.body.email })
    .then((user: any) => {
      if (user === null) {
        res.status(401).json({ message: "invalid email or password" })
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid: any) => {
            if (!valid) {
              res.status(401).json({ message: "invalid email or password" })
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "24h" }),
              })
            }
          })
          .catch((err: any) => res.status(500).json({ error: err }))
      }
    })
    .catch((err: any) => res.status(500).json({ error: err }))
}
