const userSchema = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new userSchema({
                email: req.body.email,
                password: hash
            })
            console.log(user)
            user.save()
                .then(user => res.status(201).json({
                    status: "ok",
                    message: "user created",
                    user: user.email
                }))
                .catch(err => res.status(500).json({ error: err }))
        })
        .catch(err => res.status(500).json({ error: err }))
}

exports.login = (req, res, next) => {
    userSchema.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: "invalid email or password" })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: "invalid email or password" })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.SECRET_KEY,
                                    { expiresIn: '24h' }
                                ),
                            })
                        }
                    })
                    .catch(err => res.status(500).json({ error: err }))
            }
        })
        .catch(err => res.status(500).json({ error: err }))
}