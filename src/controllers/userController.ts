const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

export type userRequest = {
  headers: {
    authorization: string
  }
  body: {
    email: string
    password: string
  }
  cookies: {
    token: string
  }
  user: string
}
export type userResponse = {
  status(statusCode: number): any
  authorization: {
    userId: number
  }
  cookie(
    name: string,
    value: string,
    keys?: { httpOnly?: boolean; secure?: boolean; maxAge?: number; signed?: boolean }
  ): any
  clearCookie(name: string): any
  send(message: string): any
}

exports.signup = (req: userRequest, res: userResponse): void => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash: string) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then((user: { _id: number; email: string; password: string }) =>
          res.status(201).json({
            status: "ok",
            message: "user account successfully created",
            user: user.email,
          })
        )
        .catch((err: any) => res.status(500).json({ error: err }))
    })
    .catch((err: unknown) => res.status(500).json({ error: err }))
}

exports.login = (req: userRequest, res: userResponse): void => {
  User.findOne({ email: req.body.email })
    .then((user: { _id: number; email: string; password: string }) => {
      if (user === null) {
        res.status(401).json({ message: "invalid email or password" })
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid: boolean) => {
            if (!valid) {
              res.status(401).json({ message: "invalid email or password" })
            } else {
              const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, { expiresIn: "24h" })

              res.cookie("token", token, {
                httpOnly: true,
                secure: true,
              })
              res.status(200).json({ message: "login successfull" })
            }
          })
          .catch((err: unknown) => res.status(500).json({ error: err }))
      }
    })
    .catch((err: unknown) => res.status(500).json({ error: err }))
}
