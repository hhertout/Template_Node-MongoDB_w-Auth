const mongooseAuth = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongooseAuth.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator)

module.exports = mongooseAuth.model("User", userSchema)
