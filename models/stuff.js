const mongoose = require("mongoose")

const stuffSchema = mongoose.Schema({
    name: { type: String, required: true }
})

module.exports = mongoose.model('Stuff', stuffSchema)