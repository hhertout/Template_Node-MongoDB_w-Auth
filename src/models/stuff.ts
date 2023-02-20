const mongooseStuff = require("mongoose")

const stuffSchema = mongooseStuff.Schema({
  name: { type: String, required: true },
})

module.exports = mongooseStuff.model("Stuff", stuffSchema)
