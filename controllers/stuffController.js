const stuffSchema = require("../models/stuff")

exports.create = (req, res, next) => {
    const stuff = new stuffSchema({
        ...req.body
    })
    stuff.save()
    .then(stuff => res.status(201).json(stuff))
}

exports.findOne = (req, res, next) => {
    const id = req.params.id
    stuffSchema.findOne({ _id: id })
        .then(stuff => res.status(200).json(stuff))
        .catch(err => res.status(400).json({ error: err }))
}

exports.findAll = (req, res, next) => {
    stuffSchema.find()
        .then(stuffs => res.status(200).json(stuffs))
        .catch(err => res.status(400).json({ error: err }))
}

exports.edit = (req, res, next) => {
    const id = req.params.id

    stuffSchema.updateOne({ _id: id }, {
        ...req.body,
        _id: id
    })
        .then(stuff => res.status(201).json({
            stuff: stuff,
            status: "ok",
            message: "stuff updated"
        }))
        .catch(err => res.status(400).json({ error: err }))
}

exports.delete = (req, res, next) => {
    const id = req.params.id

    stuffSchema.deleteOne({ _id: id })
        .then(() => res.status(201).json({
            status: "ok",
            message: "stuff deleted"
        }))
        .catch(err => res.status(400).json({ error: err }))
}